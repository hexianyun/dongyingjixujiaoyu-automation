// Background service worker for the extension

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch (message.type) {
    case 'getCookies':
      chrome.cookies.getAll({ domain: 'yxlearning.com' }, function(cookies) {
        sendResponse({ cookies: cookies });
      });
      return true; // Required for async response

    case 'fetchExamQuestions':
      fetchExamQuestions(message.url, message.cookies)
        .then(questions => sendResponse({ questions: questions }))
        .catch(error => sendResponse({ error: error.message }));
      return true;

    default:
      sendResponse({ error: 'Unknown message type' });
  }
});

// Function to fetch exam questions
async function fetchExamQuestions(url, cookies) {
  try {
    const cookieString = cookies.map(c => `${c.name}=${c.value}`).join('; ');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Cookie': cookieString,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exam questions:', error);
    throw error;
  }
}

console.log('Background service worker loaded');
