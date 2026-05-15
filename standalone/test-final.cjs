// Final full E2E test with fallback plan + correct multi-select clicking
const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs');

const CDP_PORT = 9223;
const BASE_URL = 'http://sddy.gxk.yxlearning.com';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
const clean = v => String(v || '').replace(/\s+/g, ' ').trim();
const normalize = v => clean(v).replace(/^[A-Za-z0-9]+[\.、．)\s]+/, '').trim();

function buildFallbackAnswerPlan(api) {
  if (!api || typeof api !== 'object') return [];
  const cleanv = value => String(value ?? '').replace(/\s+/g, ' ').trim();
  const stems = api?.attribute?.data?.questionStemRPS;
  if (!stems || !Array.isArray(stems)) return [];
  const result = [];
  for (const stem of stems) {
    // Prioritize listPaperQuestionRP (has standardAnswer values)
    const questions = stem?.listPaperQuestionRP || stem?.paperQuestionRPS;
    if (!Array.isArray(questions)) continue;
    for (const q of questions) {
      const text = cleanv(q.questionName || '');
      const qType = q.type;
      const options = (q.paperOptionRPS || []).map(o => ({
        id: o.paperOptionId || '',
        text: cleanv(o.context || o.optionName || ''),
        optionNo: o.optionNo,
        standardAnswer: o.standardAnswer
      }));
      let correct = [];
      const hasAnswers = options.some(o => o.standardAnswer != null && o.standardAnswer !== '');
      if (hasAnswers) {
        correct = options.filter(o => o.standardAnswer === 1 || o.standardAnswer === true || String(o.standardAnswer) === '1');
      } else {
        if (qType === 1) {
          correct = options.filter(o => o.text === '对' || o.optionNo === 1);
        } else if (qType === 3) {
          correct = options;
        } else {
          correct = options.slice(0, 1);
        }
      }
      if (correct.length) {
        result.push({ text, correct: correct.map(o => ({ id: o.id, text: o.text })) });
      }
    }
  }
  return result;
}

async function main() {
  console.log('=== Final E2E Exam Test ===\n');

  // Connect
  const targets = await new Promise((resolve, reject) => {
    http.get(`http://localhost:${CDP_PORT}/json`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { reject(e); } });
    }).on('error', reject);
  });

  const pageTarget = targets.find(t => t.url.includes('yxlearning') && t.type === 'page' && !t.url.includes('file://'));
  if (!pageTarget) { console.log('No learning page found'); return; }
  console.log('Connected:', pageTarget.url.slice(0,100));

  const browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
  const page = browser.contexts()[0]?.pages().find(p => p.url() === pageTarget.url);
  if (!page) { console.log('Page not found'); return; }

  // Navigate to exam page
  console.log('\n--- Navigating to exam list ---');
  await page.goto(`${BASE_URL}/my/exam`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(3000);

  if (page.url().includes('/login')) {
    console.log('Need login! Aborting.');
    await browser.close();
    return;
  }

  // Click pending tab
  const pt = page.locator('[du-click="pendingexambtn"]').first();
  if (await pt.count().catch(() => 0)) {
    await pt.click({ force: true });
    await sleep(2000);
    console.log('Clicked pending tab');
  }

  // Find enterable exam
  const rows = await page.locator('#joined tbody tr, table.table tbody tr').all();
  console.log(`Found ${rows.length} rows`);
  let entered = false;

  for (const row of rows) {
    if (!await row.isVisible().catch(() => false)) continue;
    const info = await row.evaluate(el => {
      const text = node => (node?.textContent || '').replace(/\s+/g, ' ').trim();
      const cells = [...el.querySelectorAll('td')];
      const titleEl = el.querySelector('.title[title], .ellipsis-2[title]');
      return {
        title: titleEl?.getAttribute('title') || text(titleEl) || text(cells[0]),
        status: text(cells[2]),
        hasBtn: !!el.querySelector('button[btn-name="toExam"]')
      };
    }).catch(() => null);
    if (!info?.hasBtn) continue;
    if (info.status && !/[待][考][试]|未通过|不及格|考试进行中/.test(info.status)) continue;
    console.log(`Entering: "${info.title}" status="${info.status}"`);

    const btn = row.locator('button[btn-name="toExam"]').first();
    await btn.click({ force: true }); await sleep(3500);

    const goBtn = page.locator('.btn-primary[du-click="goExam"], button[du-click="goExam"], button:has-text("进入考试")').first();
    if (await goBtn.count().catch(() => 0) && await goBtn.isVisible().catch(() => false)) {
      console.log('Clicking 进入考试...');
      await goBtn.click({ force: true });
      await page.waitForLoadState('domcontentloaded').catch(() => {});
      await sleep(5000);
    }
    entered = true;
    break;
  }

  if (!entered) { console.log('No enterable exam!'); await browser.close(); return; }

  console.log('Exam URL:', page.url().slice(0,150));

  // Wait for options
  let ulCount = 0;
  for (let i = 0; i < 30; i++) {
    ulCount = await page.locator('ul.options').count().catch(() => 0);
    if (ulCount > 0) { console.log(`Options loaded: ${ulCount} at retry ${i}`); break; }
    await sleep(1000);
  }
  if (!ulCount) { console.log('No options found'); await browser.close(); return; }

  // Fetch API data
  console.log('\n--- Fetching API ---');
  const url = new URL(page.url());
  const paperId = url.searchParams.get('paperId');
  const myExamRecordId = url.searchParams.get('myExamRecordId');
  console.log(`paperId: ${paperId}, myExamRecordId: ${myExamRecordId}`);

  let api = null;
  const ep = new URL('/train/cms/paper/start-do-paper-or-test.gson', url.origin);
  if (paperId) ep.searchParams.set('paperId', paperId);
  if (myExamRecordId) ep.searchParams.set('myExamRecordId', myExamRecordId);
  else if (!paperId) ep.searchParams.set('myExamRecordId', myExamRecordId || '');

  console.log('Fetching:', ep.toString().slice(0,100));
  const resp = await page.evaluate(async u => {
    const r = await fetch(u, {credentials:'include'});
    return {status:r.status,body:await r.text()};
  }, ep.toString());
  console.log(`Status: ${resp.status}, Size: ${resp.body.length}`);

  if (resp.status === 200) {
    try { api = JSON.parse(resp.body); } catch(e) { console.log('JSON parse error:', e.message); }
  }

  // If API failed, try loading cached file
  if (!api) {
    try { api = JSON.parse(fs.readFileSync('./api-response.json', 'utf8')); console.log('Using cached API'); } catch {}
  }

  if (!api) { console.log('No API data!'); await browser.close(); return; }

  // Build answer plan
  const answerPlan = buildFallbackAnswerPlan(api);
  console.log(`\nAnswer plan: ${answerPlan.length} questions`);
  for (let i = 0; i < Math.min(8, answerPlan.length); i++) {
    const item = answerPlan[i];
    const cts = (item.correct||[]).map(c => (c.text||'').slice(0,20)).join(' | ');
    console.log(`  Q${i+1}: "${(item.text||'').slice(0,50)}" -> [${cts}]${item.correct.length>1?' MULTI':''}`);
  }

  // Answer questions
  console.log('\n=== Answering questions ===');
  let totalMatched = 0, totalFallback = 0, totalClicked = 0;

  for (let idx = 0; idx < ulCount; idx++) {
    const planItem = answerPlan[idx];
    const planTexts = planItem ? (planItem.correct || []).flatMap(item => [normalize(item.id), normalize(item.text)]).filter(Boolean) : [];
    const wantedSet = new Set(planTexts.filter(Boolean));
    const isMulti = (planItem?.correct?.length || 0) > 1;

    const ul = page.locator('ul.options').nth(idx);
    await ul.scrollIntoViewIfNeeded().catch(() => {});
    await sleep(200);

    const lis = await ul.locator('li').all();
    if (!lis.length) continue;

    let anyMatched = false, anyClicked = false;
    for (const li of lis) {
      const rawText = clean(await li.textContent().catch(() => ''));
      const text = normalize(rawText);
      const isMatch = text && (wantedSet.has(text) || wantedSet.has(rawText) ||
        planTexts.some(w => w && (
          (text.includes(w) && w.length >= text.length * 0.85) ||
          (rawText.includes(w) && w.length >= rawText.length * 0.85) ||
          (w.includes(text) && text.length >= w.length * 0.85)
        )));

      if (isMatch) {
        anyMatched = true;
        // Native Playwright click ONLY — NO dispatchEvent for multi-select
        // (dispatchEvent toggles multi-select back off)
        await li.click({ timeout: 3000, force: true }).catch(() => {});
        if (!isMulti) {
          // For single-choice, also dispatch events for compatibility
          await li.evaluate(el => {
            const r = el.getBoundingClientRect();
            for (const t of ['mouseover','mousedown','mouseup','click']) {
              el.dispatchEvent(new MouseEvent(t, {bubbles:true,cancelable:true,view:window,clientX:r.left+r.width/2,clientY:r.top+r.height/2}));
            }
          });
        }
        totalClicked++; anyClicked = true;
        console.log(`  Q${idx+1}: clicked "${rawText.slice(0,50)}"${isMulti?' [multi]':''}`);
        if (isMulti) await sleep(500);
      }
    }

    // Fallback for unmatched single-choice
    if (!anyMatched && !anyClicked && lis.length && !isMulti) {
      await lis[0].click({ timeout: 3000, force: true }).catch(() => {});
      totalClicked++; totalFallback++;
      console.log(`  Q${idx+1}: FALLBACK clicked "${clean(await lis[0].textContent().catch(()=>'')).slice(0,50)}"`);
    }
    if (anyMatched) totalMatched++;
  }

  await sleep(2000);

  // Verify
  console.log('\n=== Verification ===');
  const diag = await page.evaluate(() => {
    const uls = [...document.querySelectorAll('ul.options')];
    return uls.map(ul => [...ul.querySelectorAll('li')].map(li => ({
      text: (li.textContent||'').trim().slice(0,40),
      cls: li.className
    })));
  });
  let selected = 0;
  for (let i = 0; i < diag.length; i++) {
    const sel = diag[i].some(li => /active|selected/i.test(li.cls));
    if (sel) selected++;
    const status = sel ? 'SELECTED' : 'NOT SELECTED';
    const details = diag[i].map(l => `["${l.text}" ${l.cls.split(' ').filter(c=>c).slice(0,3).join(' ')}]`).join(' ');
    console.log(`  Q${i+1}: ${status} ${details}`);
  }
  console.log(`\nResult: ${selected}/${diag.length} questions selected`);
  console.log(`Matched: ${totalMatched}, Fallback: ${totalFallback}, Total clicks: ${totalClicked}`);

  if (selected === 0) {
    console.log('No questions selected! Aborting.');
    await browser.close();
    return;
  }

  // Submit
  console.log('\n=== Submitting ===');
  const submitBtn = page.locator('button:has-text("提交答案"), span:has-text("提交答案"), #commit-answer, .btn-submit, button:has-text("提交"), button:has-text("交卷")').first();
  if (await submitBtn.count().catch(() => 0) && await submitBtn.isVisible().catch(() => false)) {
    await submitBtn.scrollIntoViewIfNeeded().catch(() => {});
    await sleep(300);
    await submitBtn.click({ timeout: 5000, force: true }).catch(() => {});
    console.log('Clicked submit');
    await sleep(2000);

    const confirmBtn = page.locator('.layui-layer-btn0, button:has-text("确定"), button:has-text("确认")').first();
    if (await confirmBtn.count().catch(() => 0)) {
      console.log('Clicking confirm...');
      await confirmBtn.click({ timeout: 3000, force: true }).catch(() => {});
      await sleep(2000);
    }
    console.log('After submit URL:', page.url().slice(0,120));

    // Check result
    if (page.url().includes('/exam/result')) {
      await sleep(2000);
      const result = await page.evaluate(() => {
        const body = document.body?.innerText || '';
        const scoreMatch = body.match(/得分[：:]\s*(\d+)/);
        const correctMatch = body.match(/答对题数[：:]\s*(\d+)\s*\/\s*(\d+)/);
        const statusMatch = body.match(/(及格|不及格|优秀|良好)/);
        return {
          score: scoreMatch?.[1] || '?',
          correct: correctMatch?.[1] || '?',
          total: correctMatch?.[2] || '?',
          status: statusMatch?.[1] || '?',
          body: body.slice(0, 500)
        };
      });
      console.log('\n=== Exam Result ===');
      console.log(`Score: ${result.score}/100`);
      console.log(`Correct: ${result.correct}/${result.total}`);
      console.log(`Status: ${result.status}`);
      console.log(`Body: ${result.body.slice(0, 300)}`);
    }
  } else {
    console.log('Submit button not found!');
  }

  await browser.close();
  console.log('\n=== Test Complete ===');
}

main().catch(e => console.error('FATAL:', e.message));
