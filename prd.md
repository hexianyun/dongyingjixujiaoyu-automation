# 产品说明书

## 目标

一个浏览器插件，用来自动化东营继续教网的登录以及完成学习中心的视频播放和考试。

## 预期

用户在插件中输入用户名密码，可以自动完成学习中心的视频播放和考试。

## 插件页面设计

开始按钮一个，停止按钮一个。

## 插件流程

1\. 直接从  东营市专业技术人员公需科目培训平台 http://sddy.gxk.yxlearning.com/index 进入，



2\. 等待用户登录后手动点击开始



7\.点击我的学习

<a href="#" class="dropdown-toggle apply-tt" data-toggle="dropdown" intro-tag="guide6" data-position="bottom" aria-expanded="false">我的学习<span class="caret"></span><span class="smalltop" style="visibility: hidden;"></span></a>



8\.点击学习中心

<a id="header\_learning" href="/my/learning">学习中心</a>



9\.检查正在学习中

<div class="tab-content personal\_tab\_content" id="C34B7BF6\_AA97\_4E6D\_48AD\_7D7ED25DF138-content" style="padding:;">

&#x20;   <!--<div id="introduce"  class="tab-pane fade in active">

&#x20;   123	12

&#x20;   </div>

&#x20;   <div id="introduce2"  class="tab-pane fade in">

&#x20;   	34

&#x20;   </div>-->

<div id="824CC80C\_CDF1\_E7F6\_2B0B\_3E7942F017EE" content-index="1" content-type="" class="tab-pane fade in active"><!--去掉左右边距-->

<div class="row dd"><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="DE59DA7C\_E6F3\_6873\_00F6\_FA6DD2D72F02">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/a4aeba2b-17a3-48f4-a0c5-8af8ac8caf02.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年人工智能">

&#x09;						2026年人工智能

&#x09;					</a>

&#x09;					<input hidden="" value="fc55761e-1a72-4ac8-88df-73531299c463">

&#x09;					<input hidden="" value="2">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="74E1C4B0\_6547\_D634\_4FB0\_BAA034B937B7">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/9cc128ae-90a9-452a-916a-e2bbcd347691.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年数字技术">

&#x09;						2026年数字技术

&#x09;					</a>

&#x09;					<input hidden="" value="b158accf-dddb-4ab4-8c9d-7f2cd3c43860">

&#x09;					<input hidden="" value="2">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="DB17B915\_292C\_FD14\_DDA0\_3DFDE74790C8">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/de607213-5906-4afa-96b4-fb5ef343760e.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年知识产权">

&#x09;						2026年知识产权

&#x09;					</a>

&#x09;					<input hidden="" value="5295e38d-2abd-486d-a3e6-67f1bc4ab754">

&#x09;					<input hidden="" value="2">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2.5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="E73A0629\_D685\_C1AB\_B606\_7CE0F3ABC9B2">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/1ea31f60-9f38-4b6c-9c0d-da717700fce4.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年网络安全">

&#x09;						2026年网络安全

&#x09;					</a>

&#x09;					<input hidden="" value="39aee57e-5fab-4385-9a05-cda56b1b7b58">

&#x09;					<input hidden="" value="1">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 95.3%;">

&#x09;									<span class="sr-only" style="right: 30%;">95.3%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="2C24CCE0\_483D\_3202\_2F6B\_E3327DCDD57A">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/1ccb25ec-3f41-4e43-8a42-49a7d99d3fcf.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年应急管理">

&#x09;						2026年应急管理

&#x09;					</a>

&#x09;					<input hidden="" value="2e264e09-e48d-4fc4-bd25-b1b3dfee3755">

&#x09;					<input hidden="" value="2">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="C55ED468\_DAC7\_0B53\_D65B\_491A70443BB1">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/679eb3a2-031c-4571-997d-796edfc54ab0.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年保密安全">

&#x09;						2026年保密安全

&#x09;					</a>

&#x09;					<input hidden="" value="39c0e281-629a-4cc6-a0b2-d9775f94e71d">

&#x09;					<input hidden="" value="2">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2.5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="5C20C990\_0C44\_BC0B\_C8AB\_0A5C4DEDEC2F">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/95b82f16-68b4-48b4-82eb-4d1b11a2465b.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年政绩观学习教育">

&#x09;						2026年政绩观学习教育

&#x09;					</a>

&#x09;					<input hidden="" value="09c69e75-9258-41a0-9170-274495a2afa8">

&#x09;					<input hidden="" value="2">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="08DA7C6B\_17D2\_9BDE\_5450\_1BB6A2B44BE1">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/461edad2-70a5-4574-b125-d17f8e1c4b99.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年团队合作建设">

&#x09;						2026年团队合作建设

&#x09;					</a>

&#x09;					<input hidden="" value="b729b4fd-2685-4a3d-b037-1be1a53447b3">

&#x09;					<input hidden="" value="1">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 98.1%;">

&#x09;									<span class="sr-only" style="right: 30%;">98.1%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="5A772812\_E66D\_E640\_59DE\_BBEAD13F5A5F">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/0f987b31-71b4-4ce3-b008-ab5bda6973ef.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年职业道德养成">

&#x09;						2026年职业道德养成

&#x09;					</a>

&#x09;					<input hidden="" value="783b8308-9f05-45f7-8e1e-e7cba557fa18">

&#x09;					<input hidden="" value="2">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="62425194\_1651\_096F\_2280\_3B2BDC9F197D">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/81e42264-feea-477d-b5f9-4d5e2991c3b8.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年科学精神培育">

&#x09;						2026年科学精神培育

&#x09;					</a>

&#x09;					<input hidden="" value="d236de95-92a2-46dc-b4fc-bae4875cd4b1">

&#x09;					<input hidden="" value="1">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 87%;">

&#x09;									<span class="sr-only" style="right: 30%;">87%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="352E1158\_7DBA\_CA47\_531D\_37E4A439EFC5">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/94a75b8f-b5ba-4660-872e-708ef4013d9b.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年党的二十届四中全会精神解读">

&#x09;						2026年党的二十届四中全会精神解读

&#x09;					</a>

&#x09;					<input hidden="" value="c8e9beed-e12c-4f06-a58a-fd1f74555f9a">

&#x09;					<input hidden="" value="1">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80.2%;">

&#x09;									<span class="sr-only" style="right: 30%;">80.2%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">5.5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="A3E3F80B\_8AB4\_9272\_1557\_23DC4F41446E">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/0384c9c8-465a-44c4-931d-4067cb8606da.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-21 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年习近平新时代中国特色社会主义思想">

&#x09;						2026年习近平新时代中国特色社会主义思想

&#x09;					</a>

&#x09;					<input hidden="" value="98ad034e-1fab-4df2-b888-4396ddc6d110">

&#x09;					<input hidden="" value="1">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 92.2%;">

&#x09;									<span class="sr-only" style="right: 30%;">92.2%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2.5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="367842DD\_5544\_8F74\_8A6C\_94486D352F63">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20250415/a0f581e2-3e5f-4d91-98e2-e9a68c05e8e5.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2025-05-09 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2025年《中华人民共和国黄河保护法》解读">

&#x09;						2025年《中华人民共和国黄河保护法》解读

&#x09;					</a>

&#x09;					<input hidden="" value="980a4722-3986-4b2e-a534-ef18cddcc1e8">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="E9E6DEDD\_DAFB\_AF54\_9EB3\_55034768ADC0">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20250415/b9afdc04-e343-4f72-9d8f-8b9675e33378.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2025-05-09 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2025年数字技术">

&#x09;						2025年数字技术

&#x09;					</a>

&#x09;					<input hidden="" value="90a5b0af-449f-4d69-b5f4-031f3d90223f">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="8F5FAEC2\_FA70\_6EA1\_17D5\_930E1C5656BA">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20250415/aa278cd9-d780-4c2c-9a20-825119f38bc2.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2025-05-09 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2025年应急管理">

&#x09;						2025年应急管理

&#x09;					</a>

&#x09;					<input hidden="" value="85d48169-7b7f-4723-b262-44b955b6d108">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2.5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="43F6CA63\_EF98\_0D49\_5A22\_03A8E04001AF">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20250415/bea2ca38-7435-416a-90d5-53ae78586772.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2025-05-09 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2025年科学精神培育">

&#x09;						2025年科学精神培育

&#x09;					</a>

&#x09;					<input hidden="" value="3e75d15c-2846-42b1-9a2e-41173f6afdc4">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="57B1255A\_7A02\_7E24\_22DC\_0246FE645F50">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20250415/4bea169d-ded1-48fa-8e0d-6d2b9fb7b918.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2025-05-09 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2025年人才国际化">

&#x09;						2025年人才国际化

&#x09;					</a>

&#x09;					<input hidden="" value="c7dcc08b-a8f8-493b-9528-a247e2c8df96">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2.5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="3E55A282\_C766\_6023\_FBEF\_4D7951D6EE38">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20250415/4ecf1886-821e-4d3e-bb23-fbe9ca39329a.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2025-05-09 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2025年网络安全">

&#x09;						2025年网络安全

&#x09;					</a>

&#x09;					<input hidden="" value="ee6a741b-2b8a-4380-892b-95e36fcdbc79">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="AE89FD48\_C7BB\_589B\_4FA0\_8AD81E60145A">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20250415/d81763f6-c176-48fd-9ada-f7778054cb67.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2025-05-09 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2025年专业技术人员职业道德和能力建设">

&#x09;						2025年专业技术人员职业道德和能力建设

&#x09;					</a>

&#x09;					<input hidden="" value="83517634-eca4-4c59-ba7d-e4483ffe24a7">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="B4F65644\_0F8B\_B5BC\_3448\_2D088D39BF2B">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20250415/3eb476d2-50a9-45c5-b18f-ac04637b17e6.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2025-05-09 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2025年知识产权">

&#x09;						2025年知识产权

&#x09;					</a>

&#x09;					<input hidden="" value="c01bb54c-3fc6-4318-84fb-afb2ccb6a89c">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="29CE885B\_D404\_B3EC\_49DF\_5E427FE15CFC">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20250415/d19297d2-5531-4ecb-9940-fa58a324adfe.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2025-05-09 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2025年深入贯彻中央八项规定精神学习教育">

&#x09;						2025年深入贯彻中央八项规定精神学习教育

&#x09;					</a>

&#x09;					<input hidden="" value="e95d37e8-27bc-4da0-ad16-a8cd41fd49e5">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">6学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="0DDFE345\_17FF\_BF1B\_2DE3\_1145C6A88006">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20250415/c7991158-5d85-4ca0-88c1-6a11f11dbdba.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2025-05-09 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2025年习近平新时代中国特色社会主义思想">

&#x09;						2025年习近平新时代中国特色社会主义思想

&#x09;					</a>

&#x09;					<input hidden="" value="d8ecb81e-46fd-481b-8976-0fe82bc1bd37">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="E655D3DA\_4031\_FC7C\_3394\_E8EAFB83E29A">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20240417/06ead6e5-b539-498c-9f37-7555d71a6232.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2024-05-24 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2024年医养健康">

&#x09;						2024年医养健康

&#x09;					</a>

&#x09;					<input hidden="" value="df14d764-6371-4224-b587-dc4512b4cd93">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="5CE8F0FC\_3960\_6D62\_06CC\_7D5148A51002">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20240417/b290da75-1178-4714-938e-a087ea54d341.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2024-05-24 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2024年黄河流域生态保护和高质量发展">

&#x09;						2024年黄河流域生态保护和高质量发展

&#x09;					</a>

&#x09;					<input hidden="" value="5532700d-7160-47d1-af74-dafe6b64434e">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="E209BE43\_9EC9\_26C6\_40AF\_5D01307C5BC9">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20240417/9e3b518c-9dd5-4c81-a971-e2bd7f9a64fb.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2024-05-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2024年数字技术和网络安全">

&#x09;						2024年数字技术和网络安全

&#x09;					</a>

&#x09;					<input hidden="" value="d432b42e-0a6c-48ea-a8a7-8ab6fb6992d4">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="68E7BCC3\_F869\_E385\_C652\_AA134CE7D3D2">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20240417/bd4e7928-1219-4080-aaf8-02ceb080a117.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2024-05-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2024年应急管理">

&#x09;						2024年应急管理

&#x09;					</a>

&#x09;					<input hidden="" value="4aa2c049-0018-4751-bf11-91c34b302ff0">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="ACBCDBC7\_2C08\_081A\_1CE2\_B5CD8FC3849F">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20240417/7b2e712a-9ded-4310-bb3e-f2ab17a532be.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2024-05-22 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2024年知识产权">

&#x09;						2024年知识产权

&#x09;					</a>

&#x09;					<input hidden="" value="241779c6-65a7-4ac6-95d1-a15e9e7170b0">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="82BFFCB5\_6F9C\_FB9B\_144B\_92EE3D908AA6">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20240417/af10fc69-69c8-4fee-81f4-80e18fe5a878.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2024-05-22 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2024年绿色低碳高质量发展">

&#x09;						2024年绿色低碳高质量发展

&#x09;					</a>

&#x09;					<input hidden="" value="7a001530-2b10-4b86-b9bb-f5187ca3b131">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="4ADBC990\_F951\_DAE2\_9E79\_62A936B40B41">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20240417/976b90dd-b667-4083-aaad-5c955559ed4f.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2024-05-22 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2024年专业技术人员职业道德和能力建设">

&#x09;						2024年专业技术人员职业道德和能力建设

&#x09;					</a>

&#x09;					<input hidden="" value="4610e77a-89a9-4ed6-9f70-14fffb9aa4f7">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="F35A8D78\_4198\_BD33\_6999\_121A8FE86F8E">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20240417/6b626afc-4ec0-4410-a3c5-1c9e629fde4b.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2024-05-21 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2024年习近平新时代中国特色社会主义思想">

&#x09;						2024年习近平新时代中国特色社会主义思想

&#x09;					</a>

&#x09;					<input hidden="" value="121a7116-ed71-490b-a9bc-ae4f4a407237">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">7学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="470FD672\_9906\_12C4\_B3D5\_A51161722AB2">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20230525/5172e989-defe-46d8-be9c-f842c4451317.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2023-06-15 \~ 2023-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="数字经济">

&#x09;						数字经济

&#x09;					</a>

&#x09;					<input hidden="" value="8a59034f-41e2-4b9b-96cf-851021213fa4">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="D6FA8156\_117C\_102B\_D561\_467982FAAB6C">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20230524/a7264e2f-3fd0-4431-a0c0-d69e2c702663.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2023-06-15 \~ 2023-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="乡村振兴">

&#x09;						乡村振兴

&#x09;					</a>

&#x09;					<input hidden="" value="0b9cb833-bf83-44a0-9eef-08d44f7b97df">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="8E3CBC31\_6E25\_6C10\_9888\_2D61805731F4">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20230525/ef74ecf8-ecb7-4a4b-9b20-eaa71b2bc1ae.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2023-06-15 \~ 2023-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="黄河流域战略">

&#x09;						黄河流域战略

&#x09;					</a>

&#x09;					<input hidden="" value="aed83c80-fdd7-4b2b-a662-ad98ed1a7309">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2.5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="F8A07382\_2F98\_8B88\_DAAE\_2BBE8CFF4254">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20230525/a760f293-1fd5-4519-b4b4-90e19a456fcc.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2023-06-15 \~ 2024-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="党的二十大精神解读与习近平新时代中国特色社会主义思想">

&#x09;						党的二十大精神解读与习近平新时代中国特色社会主义思想

&#x09;					</a>

&#x09;					<input hidden="" value="c37edfa4-9852-4660-93e4-69fea232dd84">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">10学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="8EBBFA2A\_AFE0\_9496\_407C\_11EFAD7EE703">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20230525/645c095f-de9f-4bf3-a477-8fd16a8c6e89.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2023-06-15 \~ 2023-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="人力资源">

&#x09;						人力资源

&#x09;					</a>

&#x09;					<input hidden="" value="c1357602-3f9f-49f7-8843-8839d8a8f014">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="41114DD1\_A520\_B858\_BC9F\_BEC6B77AA244">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20230525/47333715-d3f5-4bbc-9330-afc3a5277fb1.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2023-06-15 \~ 2023-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="八大战略十大创新">

&#x09;						八大战略十大创新

&#x09;					</a>

&#x09;					<input hidden="" value="2160a54d-cf32-4291-99c7-16317fbe5d01">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">2.5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="77CE1027\_2304\_BF23\_C0BE\_324DE5BD551A">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20220429/9eb93bb2-4981-4a49-9978-b523fa5a626a.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2022-08-29 \~ 2022-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="专业技术人员职业道德和能力建设">

&#x09;						专业技术人员职业道德和能力建设

&#x09;					</a>

&#x09;					<input hidden="" value="0b8c84ba-b9e7-4c80-b95b-6ae630dce31c">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="3D151AD3\_6259\_A0CE\_BB63\_D36A0C6B6620">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20220429/dd6614e0-9e78-492c-ac75-d4790059cd55.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2022-08-28 \~ 2022-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="疫情防控">

&#x09;						疫情防控

&#x09;					</a>

&#x09;					<input hidden="" value="8ef79288-96d1-45e3-9719-dbf62ff5fa44">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="408161BA\_218A\_B994\_75B9\_A863B5A6739F">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20220429/6b770b05-a589-4559-9cf4-006829718842.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2022-08-27 \~ 2022-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="山东省\&quot;八大发展战略、十大创新”">

&#x09;						山东省"八大发展战略、十大创新”

&#x09;					</a>

&#x09;					<input hidden="" value="3a613c19-bd16-45f9-b983-579acf66a910">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">6学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="E943D86E\_9104\_0690\_03C6\_77896FBE6E05">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20220429/e5550e61-0850-4f57-9d0f-4e53650fe711.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2022-08-27 \~ 2022-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="黄河流域生态保护和高质量发展">

&#x09;						黄河流域生态保护和高质量发展

&#x09;					</a>

&#x09;					<input hidden="" value="3fed04a0-67ad-4fdf-ad7e-7f0081017638">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="DD6DAB9F\_5EEC\_14B3\_99CF\_1EB6569B3C0D">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20220429/bb0eac21-1214-4d20-b853-40011f76793f.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2022-08-27 \~ 2022-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="党的十九届六中全会精神">

&#x09;						党的十九届六中全会精神

&#x09;					</a>

&#x09;					<input hidden="" value="ab2d1069-423f-47d3-8aba-632c5e6870b4">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">6学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="72466FB3\_8902\_E663\_5429\_74900E354804">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20220429/d1a4df80-86d3-4cd6-a831-9e9c6fc8a1f5.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2022-08-27 \~ 2022-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="习总书记新时代中国特色社会主义思想">

&#x09;						习总书记新时代中国特色社会主义思想

&#x09;					</a>

&#x09;					<input hidden="" value="3b848ddc-ea80-4afd-95af-8d5e00cb01c9">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">5学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="1C3EE833\_ADBE\_E9BC\_1E41\_A4B1C97E44CA">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20201022/3eec6ee9-bf43-4b9a-8ab0-ed693d38a0d0.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2020-11-10 \~ 2020-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="工伤保险专题培训">

&#x09;						工伤保险专题培训

&#x09;					</a>

&#x09;					<input hidden="" value="4492432d-03c3-41d4-be8d-fadaa067ee1f">

&#x09;					<input hidden="" value="-1">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">10学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div><!--view里面的每个item的布局方式-->

<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-bottom:20px;" id="210DD2D7\_FCB1\_C1A0\_D29C\_9EEB9FF39B48">

<!--课程内容-->

<div class="course-expand hover-expand">

&#x09;<div class="course-expand-container">

&#x09;	<div class="course-wrap course-list">

&#x09;		<ul class="course-card-list">

&#x09;			<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20200602/fb28fb20-718b-4976-9fd1-9eae201137af.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2020-10-15 \~ 2023-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2020年专业技术人员公需科目培训班">

&#x09;						2020年专业技术人员公需科目培训班

&#x09;					</a>

&#x09;					<input hidden="" value="87dd28aa-9d9d-40a4-9a45-2206c9620c3a">

&#x09;					<input hidden="" value="3">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">20学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>

&#x09;		</ul>

&#x09;	</div>

&#x09;</div>

</div>	

</div></div>

</div><div id="D21DE912\_9978\_E9CC\_71B7\_6999C59AAA82" content-index="2" content-type="" class="tab-pane fade in "><!--去掉左右边距-->

<div class="row dd"><!--空数据模板-->

<div class="non-data-container">

&#x09;<img class="mt60" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAB1CAYAAADnecsjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QzQ5NENFMDQ5QTExRTg5ODQ3RUNGQzFFQjUzRDcwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE0QzQ5NENGMDQ5QTExRTg5ODQ3RUNGQzFFQjUzRDcwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTRDNDk0Q0MwNDlBMTFFODk4NDdFQ0ZDMUVCNTNENzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTRDNDk0Q0QwNDlBMTFFODk4NDdFQ0ZDMUVCNTNENzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4S4Q93AAANk0lEQVR42uxd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">

&#x09;<p class="mt20 phtml" du-html="phtml" id="phtml">无数据……</p>

</div>

</div>

</div><div id="375A416E\_02CF\_4A32\_5715\_016C622887E0" content-index="3" content-type="" class="tab-pane fade in "><!--去掉左右边距-->

<div class="row dd"><!--空数据模板-->

<div class="non-data-container">

&#x09;<img class="mt60" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAB1CAYAAADnecsjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QzQ5NENFMDQ5QTExRTg5ODQ3RUNGQzFFQjUzRDcwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE0QzQ5NENGMDQ5QTExRTg5ODQ3RUNGQzFFQjUzRDcwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTRDNDk0Q0MwNDlBMTFFODk4NDdFQ0ZDMUVCNTNENzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTRDNDk0Q0QwNDlBMTFFODk4NDdFQ0ZDMUVCNTNENzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4S4Q93AAANk0lEQVR42uxd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">

&#x09;<p class="mt20 phtml" du-html="phtml" id="phtml">无数据……</p>

</div>

</div>

</div></div>



10\.从第一个卡片开始检查<span class="sr-only" style="right: 30%;">？%</span>。

<li class="course-card-item projection">

&#x09;				<a href="javascript:void(0)" du-click="courseck">

&#x09;					<div class="item-box new">

&#x09;						<div du-show="showGreenChoice" class="xx-blue" style="display: none;">

&#x09;							<div>选修</div>

&#x09;						</div>

&#x09;						<div du-show="showBlueChoice" class="bx-green" style="display: none;">

&#x09;							<div>必修</div>

&#x09;						</div>

&#x09;						<img src="/group1/UIMG/20260412/a4aeba2b-17a3-48f4-a0c5-8af8ac8caf02.jpg" alt="" title="" class="item-img">

&#x09;						<div class="play\_bg"></div>

&#x09;						<!--新增已过期显示-->

&#x09;						<div du-show="learngqybm" class="learning-state learning-state-cxybm" style="display: none;">

&#x09;							<div class="state-cxybm">

&#x09;								<span class="state-cxybm-gq">已过期</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnjx" class="learning-state learning-state-jx" style="">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">继续学习</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learnbkcx" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修中</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="needToRenovate" class="learning-state learning-state-jx" style="display: none;">

&#x09;							<div class="state-jx">

&#x09;								<span class="state-jx-1">重修课程</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div du-show="learncx" class="learning-state learning-state-cx" style="display: none;">

&#x09;							<div class="state-cx">

&#x09;								<span class="state-cx-gq">已过期</span>

&#x09;								<br>

&#x09;								<span class="state-cx-1">重新报名</span>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="item-status" du-show="learngTime" style="">

&#x09;							<span class="item-status-step f12"><span class="course-details-applyEnd">学习期限</span>：<span>2026-04-23 \~ 2026-12-31</span></span>

&#x09;						</div>

&#x09;					</div>

&#x09;				</a>

&#x09;				<div class="item-tt ellipsis-2">

&#x09;					<a du-click="titlena" href="javascript:void(0)" class="item-tt-link" title="2026年人工智能">

&#x09;						2026年人工智能

&#x09;					</a>

&#x09;					<input hidden="" value="fc55761e-1a72-4ac8-88df-73531299c463">

&#x09;					<input hidden="" value="2">

&#x09;				</div>



&#x09;				<div class=" hasprogerss">

&#x09;					<div class="item-line item-line-bottom yjd">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div> -->

&#x09;						<div class="pull-left learning-jdt-width ml5" style="width: 50%;">

&#x09;							<div class="progress progress-striped progress-border">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="right: 30%;">100%</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;						<div class="pull-right text-f999 f14 mr5" du-html="thmltime">3学时</div>

&#x09;					</div>

&#x09;					<div class="item-line item-line-bottom wjd ml5" style="width: calc(100% - 10px);">

&#x09;						<!-- <div class="pull-left">

&#x20;                               <span class="item-cell item-price">学习进度</span>

&#x20;                           </div>	 -->

&#x09;						<div class="pull-right learning-jdt-width" style="width: 100%">

&#x09;							<div class="progress progress-striped">

&#x09;								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">

&#x09;									<span class="sr-only" style="color:#333;width:50px;">不计进度</span>

&#x09;								</div>

&#x09;							</div>

&#x09;						</div>

&#x09;					</div>

&#x09;				</div>

&#x09;			</li>





11\.如果100%</span>就不需要点击进入，如果%</span> 不到100%</span>点击进入。

例如：

<span class="sr-only" style="right: 30%;">100%</span>  不要进入。

<span class="sr-only" style="right: 30%;">95.3%</span>  点击进入。



12\.进入后是视频页面，先查看此页面的总学时进度。

<ul class="pt5" id="8059b19d-6ce4-4170-8a9c-27f074bca42b-videos" style="">

&#x20;   <li id="a8445e6f-b604-4d98-a146-f64473aa73e5" class="clearfix videoLi" type="0" data-toggle="tooltip" data-placement="top" title="" data-original-title="《网络数据安全管理条例》解读（一）-邵国安">

&#x20;   <div class="video-info ellipsis-1" islocked="false" data-toggle="tooltip" data-placement="bottom" title=""><span class="iconfont video-icon-margin icon-bofang icon-dagouyouquan"></span>1-1《网络数据安全管理条例》解读（一）-邵国安

&#x20;   </div>

&#x09;<div class="progress video-progress">

&#x20;       <div id="a8445e6f-b604-4d98-a146-f64473aa73e5-progress" class="progress-bar finish" style="width:100%;"></div>

&#x20;       <span id="a8445e6f-b604-4d98-a146-f64473aa73e5-badge" class="badge">100%</span>

&#x20;   </div>

</li><li id="28ffe9cc-e6d6-4f9c-8a77-4a5eabde4d1d" class="clearfix videoLi" type="0" data-toggle="tooltip" data-placement="top" title="" data-original-title="《网络数据安全管理条例》解读（二）-邵国安">

&#x20;   <div class="video-info ellipsis-1" islocked="false" data-toggle="tooltip" data-placement="bottom" title=""><span class="iconfont video-icon-margin icon-bofang"></span>1-2《网络数据安全管理条例》解读（二）-邵国安

&#x20;   </div>

&#x09;<div class="progress video-progress">

&#x20;       <div id="28ffe9cc-e6d6-4f9c-8a77-4a5eabde4d1d-progress" class="progress-bar" style="width:89%;"></div>

&#x20;       <span id="28ffe9cc-e6d6-4f9c-8a77-4a5eabde4d1d-badge" class="badge">89%</span>

&#x20;   </div>

</li><li id="3f5eea82-8678-4109-b9de-ac9452b2da92" class="clearfix videoLi" type="0" data-toggle="tooltip" data-placement="top" title="" data-original-title="《网络数据安全管理条例》解读（三）-邵国安">

&#x20;   <div class="video-info ellipsis-1" islocked="false" data-toggle="tooltip" data-placement="bottom" title=""><span class="iconfont video-icon-margin icon-bofang icon-dagouyouquan"></span>1-3《网络数据安全管理条例》解读（三）-邵国安

&#x20;   </div>

&#x09;<div class="progress video-progress">

&#x20;       <div id="3f5eea82-8678-4109-b9de-ac9452b2da92-progress" class="progress-bar finish" style="width:100%;"></div>

&#x20;       <span id="3f5eea82-8678-4109-b9de-ac9452b2da92-badge" class="badge">100%</span>

&#x20;   </div>

</li><li id="7e7ca892-c31d-4764-83a5-474ff7215b8c" class="clearfix videoLi active" type="0" data-toggle="tooltip" data-placement="top" title="" data-original-title="《网络数据安全管理条例》解读（四）-邵国安">

&#x20;   <div class="video-info ellipsis-1" islocked="false" data-toggle="tooltip" data-placement="bottom" title=""><span class="iconfont video-icon-margin icon-bofang"></span>1-4《网络数据安全管理条例》解读（四）-邵国安

&#x20;   </div>

&#x09;<div class="progress video-progress">

&#x20;       <div id="7e7ca892-c31d-4764-83a5-474ff7215b8c-progress" class="progress-bar progress-bar-success progress-bar-striped active" style="width:91%;"></div>

&#x20;       <span id="7e7ca892-c31d-4764-83a5-474ff7215b8c-badge" class="badge">91%</span>

&#x20;   </div>

</li></ul>



13\.以下是课程目录的 HTML 结构片段，每个 <li> 是一个视频：

<li class="clearfix videoLi active">

&#x20;   <div class="video-info">...视频标题...</div>

&#x20;   <div class="progress video-progress">

&#x20;       <div class="progress-bar" style="width:89%;"></div>

&#x20;       <span class="badge">89%</span>

&#x20;   </div>

</li>

在页面中获取所有 class="videoLi" 的 <li> 元素。检查每个 <li> 内部 <span class="badge"> 的文本。如果文本不是 100%（或者其内部的 .progress-bar 没有 finish 类），则将其标记为“未完成视频”。找到列表中的第一个未完成视频，模拟鼠标点击（click()）该 <li> 以开始播放。当检测到当前播放的视频进度达到 100% 后，等待 2-3 秒（防止页面加载延迟），然后自动寻找并点击下一个未完成的视频。



14\.在视频播放中会出现答题弹窗，可以设置选择第一个后提交，如果选择正确答题弹窗就会消失，如果打错就点击完成过十几秒又会出现，然后选第二个在提交，如果还不正确等出现了再选第三个，直到正确为止

答题框示例如下：

<div class="bplayer-question-wrap" style="display: flex;">

&#x20;   <div class="bplayer-question-content">

&#x20;       <div class="bplayer-question-header">答题</div>

&#x20;       <div class="bplayer-question-body">

&#x20;           <img class="image">

&#x20;           <div class="title">

&#x20;           【单选题】有关主管部门在开展网络数据安全监督检查时，应当加强协同配合、信息沟通，合理确定检查频次和检查方式，避免不必要的检查和交叉重复检查。</div>

&#x20;           <div class="options">

&#x20;               <div class="option-item" style="display: flex;">

&#x20;                   <div class="option-char">A</div>

&#x20;                   <div class="option-item-content">错</div>

&#x20;               </div>

&#x20;               <div class="option-item" style="display: flex;">

&#x20;                   <div class="option-char">B</div>

&#x20;                   <div class="option-item-content">对</div>

&#x20;               </div>

&#x20;               <div class="option-item">

&#x20;                   <div class="option-char">C</div>

&#x20;                   <div class="option-item-content"></div>

&#x20;               </div>

&#x20;               <div class="option-item">

&#x20;                   <div class="option-char">D</div>

&#x20;                   <div class="option-item-content"></div>

&#x20;               </div>

&#x20;               <div class="option-item">

&#x20;                   <div class="option-char">E</div>

&#x20;                   <div class="option-item-content"></div>

&#x20;               </div>

&#x20;               <div class="option-item">

&#x20;                   <div class="option-char">F</div>

&#x20;                   <div class="option-item-content"></div>

&#x20;               </div>

&#x20;           </div>

&#x20;       </div>

&#x20;       <div class="bplayer-question-footer" id="bplayer-question-footer">

&#x20;           <div class="commit bplayer-btn">提交</div>

&#x20;           <div class="skip bplayer-btn">跳过</div>

&#x20;       </div>

&#x20;       <div class="result">

&#x20;           <div class="bplayer-question-result">

&#x20;               <div class="answer-image correct"></div>

&#x20;               <div class="explain">

&#x20;                   <div class="explain-title">解析：</div>

&#x20;                   <div class="explain-content"></div>

&#x20;               </div>

&#x20;               <div class="wrong-time"></div>

&#x20;           </div>

&#x20;           <div class="bplayer-question-footer">

&#x20;               <div class="complete bplayer-btn">完成</div>

&#x20;           </div>

&#x20;       </div>

&#x20;   </div>

</div>





15\.当遍历发现所有 <li> 的进度都是 100% 时，返回学习中心，

<a class="glyphicon glyphicon-arrow-left backindex back" du-click="goBack" du-scope="0DC00961\_EF15\_252F\_BBF8\_DBC1D0FD99AB"></a>



16\.当在学习中心所有课程达到100%</span> ，进入在线考试。

http://sddy.gxk.yxlearning.com/my/exam



17\.进入待参加考试

<span class="mr100 cursor-p active" du-click="pendingexambtn" du-scope="B0AEFFDC\_1113\_DDE5\_173D\_C020494BAEA8">待参加考试（<span class="text-blue" du-html="pendingexam" du-scope="B0AEFFDC\_1113\_DDE5\_173D\_C020494BAEA8">7</span>）</span>



18\.查看带参加考试的科目。

<div id="joined" style="padding: 30px 5px; display: block;" du-render="tab1" du-scope="B0AEFFDC\_1113\_DDE5\_173D\_C020494BAEA8"><!--用于 100% 宽度，占据全部视口（viewport）的容器-->

<div class="container-fluid  " style="padding:0 15px;margin-bottom:0px;" id="7873198B\_2722\_5148\_4DB8\_4281811A7AB5"><!--数据数据-表格展示-->

<!--此处删除了table-responsive-->

<div class="" id="BE8CC106\_CB70\_D222\_C595\_8EA634B57E03">

&#x09;<table class="table table-hover table-center " style="table-layout: auto;">

&#x09;	<thead>

&#x09;		<tr><th class="posi-r" style="width:480px;text-align:left" colspan=""><span class="trText">考试</span><div class="dp-ib ml5 f10 posi-r lift" style="width:22px;" data-btn="lift"><span class="iconfont icon-shengxu f10"></span><br><span class="iconfont icon-jiangxu f10"></span></div><i class="f14 glyphicon glyphicon-question-sign ml5 mr5 mt5 hidden" title=""></i></th><th class="posi-r" style=";text-align:left" colspan=""><span class="trText">考试期限</span><div class="dp-ib ml5 f10 posi-r lift" style="width:22px;" data-btn="lift"><span class="iconfont icon-shengxu f10"></span><br><span class="iconfont icon-jiangxu f10"></span></div><i class="f14 glyphicon glyphicon-question-sign ml5 mr5 mt5 hidden" title=""></i></th><th class="posi-r" style=";text-align:left" colspan=""><span class="trText">状态</span><div class="dp-ib ml5 f10 posi-r lift" style="width:22px;" data-btn="lift"><span class="iconfont icon-shengxu f10"></span><br><span class="iconfont icon-jiangxu f10"></span></div><i class="f14 glyphicon glyphicon-question-sign ml5 mr5 mt5 hidden" title=""></i></th><th class="posi-r" style=";text-align:left" colspan=""><span class="trText">考试次数</span><div class="dp-ib ml5 f10 posi-r lift" style="width:22px;" data-btn="lift"><span class="iconfont icon-shengxu f10"></span><br><span class="iconfont icon-jiangxu f10"></span></div><i class="f14 glyphicon glyphicon-question-sign ml5 mr5 mt5 hidden" title=""></i></th><th class="posi-r" style=";text-align:left" colspan=""><span class="trText">成绩</span><div class="dp-ib ml5 f10 posi-r lift" style="width:22px;" data-btn="lift"><span class="iconfont icon-shengxu f10"></span><br><span class="iconfont icon-jiangxu f10"></span></div><i class="f14 glyphicon glyphicon-question-sign ml5 mr5 mt5 hidden" title=""></i></th><th class="posi-r" style="width:100px;text-align:left" colspan=""><span class="trText">操作</span><div class="dp-ib ml5 f10 posi-r lift" style="width:22px;" data-btn="lift"><span class="iconfont icon-shengxu f10"></span><br><span class="iconfont icon-jiangxu f10"></span></div><i class="f14 glyphicon glyphicon-question-sign ml5 mr5 mt5 hidden" title=""></i></th></tr>

&#x09;	</thead>

&#x09;	<tbody><tr><td style="width:480px;text-align:left;padding:0px;padding-left:8px">

&#x09;<div class="p10 leftimgframe" style="text-align: left;">

&#x09;	<img class="orderimgwh left" src="/group1/UIMG/20260412/679eb3a2-031c-4571-997d-796edfc54ab0.jpg" alt="">

&#x09;	<div class="orderright ml15">

&#x09;		<div class="ellipsis-2 f16 title lh36 title" title="2026年保密安全">

&#x09;			2026年保密安全

&#x09;		</div>

&#x09;		<div class="f14 schedule showType">班级考试</div>

&#x09;	</div>

&#x09;	<div class="clearfix"></div>

&#x09;</div>

</td><td style=";text-align:left;padding:0px;padding-left:8px"><p>2026-04-23</p>-<p>2026-12-31</p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p>待考试</p><p></p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p><span class=" mr10">1/99</span><span class="bg-yellow describe-icon-tip" title="" data-toggle="tooltip" data-placement="top" style="display:none;"><i class="glyphicon glyphicon-question-sign"></i></span></p></td><td style=";text-align:left">5.0</td><td td-type="btns" style="width:100px;text-align:left"><button type="button" btn-name="toExam" class="btn btn-default btn-block"><span class="glyphicon glyphicon-"></span>进入考试</button><button type="button" btn-name="learn" class="btn btn-link btn-block"><span class="glyphicon glyphicon-"></span>继续学习</button></td></tr><tr><td style="width:480px;text-align:left;padding:0px;padding-left:8px">

&#x09;<div class="p10 leftimgframe" style="text-align: left;">

&#x09;	<img class="orderimgwh left" src="/group1/UIMG/20260412/9cc128ae-90a9-452a-916a-e2bbcd347691.jpg" alt="">

&#x09;	<div class="orderright ml15">

&#x09;		<div class="ellipsis-2 f16 title lh36 title" title="2026年数字技术">

&#x09;			2026年数字技术

&#x09;		</div>

&#x09;		<div class="f14 schedule showType">班级考试</div>

&#x09;	</div>

&#x09;	<div class="clearfix"></div>

&#x09;</div>

</td><td style=";text-align:left;padding:0px;padding-left:8px"><p>2026-04-23</p>-<p>2026-12-31</p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p>待考试</p><p></p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p><span class=" mr10">0/99</span><span class="bg-yellow describe-icon-tip" title="" data-toggle="tooltip" data-placement="top" style="display:none;"><i class="glyphicon glyphicon-question-sign"></i></span></p></td><td style=";text-align:left">0.00</td><td td-type="btns" style="width:100px;text-align:left"><button type="button" btn-name="toExam" class="btn btn-default btn-block"><span class="glyphicon glyphicon-"></span>进入考试</button><button type="button" btn-name="learn" class="btn btn-link btn-block"><span class="glyphicon glyphicon-"></span>继续学习</button></td></tr><tr><td style="width:480px;text-align:left;padding:0px;padding-left:8px">

&#x09;<div class="p10 leftimgframe" style="text-align: left;">

&#x09;	<img class="orderimgwh left" src="/group1/UIMG/20260412/0f987b31-71b4-4ce3-b008-ab5bda6973ef.jpg" alt="">

&#x09;	<div class="orderright ml15">

&#x09;		<div class="ellipsis-2 f16 title lh36 title" title="2026年职业道德养成">

&#x09;			2026年职业道德养成

&#x09;		</div>

&#x09;		<div class="f14 schedule showType">班级考试</div>

&#x09;	</div>

&#x09;	<div class="clearfix"></div>

&#x09;</div>

</td><td style=";text-align:left;padding:0px;padding-left:8px"><p>2026-04-23</p>-<p>2026-12-31</p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p>待考试</p><p></p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p><span class=" mr10">0/99</span><span class="bg-yellow describe-icon-tip" title="" data-toggle="tooltip" data-placement="top" style="display:none;"><i class="glyphicon glyphicon-question-sign"></i></span></p></td><td style=";text-align:left">0.00</td><td td-type="btns" style="width:100px;text-align:left"><button type="button" btn-name="toExam" class="btn btn-default btn-block"><span class="glyphicon glyphicon-"></span>进入考试</button><button type="button" btn-name="learn" class="btn btn-link btn-block"><span class="glyphicon glyphicon-"></span>继续学习</button></td></tr><tr><td style="width:480px;text-align:left;padding:0px;padding-left:8px">

&#x09;<div class="p10 leftimgframe" style="text-align: left;">

&#x09;	<img class="orderimgwh left" src="/group1/UIMG/20260412/a4aeba2b-17a3-48f4-a0c5-8af8ac8caf02.jpg" alt="">

&#x09;	<div class="orderright ml15">

&#x09;		<div class="ellipsis-2 f16 title lh36 title" title="2026年人工智能">

&#x09;			2026年人工智能

&#x09;		</div>

&#x09;		<div class="f14 schedule showType">班级考试</div>

&#x09;	</div>

&#x09;	<div class="clearfix"></div>

&#x09;</div>

</td><td style=";text-align:left;padding:0px;padding-left:8px"><p>2026-04-23</p>-<p>2026-12-31</p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p>待考试</p><p></p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p><span class=" mr10">0/99</span><span class="bg-yellow describe-icon-tip" title="" data-toggle="tooltip" data-placement="top" style="display:none;"><i class="glyphicon glyphicon-question-sign"></i></span></p></td><td style=";text-align:left">0.00</td><td td-type="btns" style="width:100px;text-align:left"><button type="button" btn-name="toExam" class="btn btn-default btn-block"><span class="glyphicon glyphicon-"></span>进入考试</button><button type="button" btn-name="learn" class="btn btn-link btn-block"><span class="glyphicon glyphicon-"></span>继续学习</button></td></tr><tr><td style="width:480px;text-align:left;padding:0px;padding-left:8px">

&#x09;<div class="p10 leftimgframe" style="text-align: left;">

&#x09;	<img class="orderimgwh left" src="/group1/UIMG/20260412/de607213-5906-4afa-96b4-fb5ef343760e.jpg" alt="">

&#x09;	<div class="orderright ml15">

&#x09;		<div class="ellipsis-2 f16 title lh36 title" title="2026年知识产权">

&#x09;			2026年知识产权

&#x09;		</div>

&#x09;		<div class="f14 schedule showType">班级考试</div>

&#x09;	</div>

&#x09;	<div class="clearfix"></div>

&#x09;</div>

</td><td style=";text-align:left;padding:0px;padding-left:8px"><p>2026-04-23</p>-<p>2026-12-31</p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p>待考试</p><p></p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p><span class=" mr10">0/99</span><span class="bg-yellow describe-icon-tip" title="" data-toggle="tooltip" data-placement="top" style="display:none;"><i class="glyphicon glyphicon-question-sign"></i></span></p></td><td style=";text-align:left">0.00</td><td td-type="btns" style="width:100px;text-align:left"><button type="button" btn-name="toExam" class="btn btn-default btn-block"><span class="glyphicon glyphicon-"></span>进入考试</button><button type="button" btn-name="learn" class="btn btn-link btn-block"><span class="glyphicon glyphicon-"></span>继续学习</button></td></tr><tr><td style="width:480px;text-align:left;padding:0px;padding-left:8px">

&#x09;<div class="p10 leftimgframe" style="text-align: left;">

&#x09;	<img class="orderimgwh left" src="/group1/UIMG/20260412/95b82f16-68b4-48b4-82eb-4d1b11a2465b.jpg" alt="">

&#x09;	<div class="orderright ml15">

&#x09;		<div class="ellipsis-2 f16 title lh36 title" title="2026年政绩观学习教育">

&#x09;			2026年政绩观学习教育

&#x09;		</div>

&#x09;		<div class="f14 schedule showType">班级考试</div>

&#x09;	</div>

&#x09;	<div class="clearfix"></div>

&#x09;</div>

</td><td style=";text-align:left;padding:0px;padding-left:8px"><p>2026-04-23</p>-<p>2026-12-31</p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p>待考试</p><p></p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p><span class=" mr10">0/99</span><span class="bg-yellow describe-icon-tip" title="" data-toggle="tooltip" data-placement="top" style="display:none;"><i class="glyphicon glyphicon-question-sign"></i></span></p></td><td style=";text-align:left">0.00</td><td td-type="btns" style="width:100px;text-align:left"><button type="button" btn-name="toExam" class="btn btn-default btn-block"><span class="glyphicon glyphicon-"></span>进入考试</button><button type="button" btn-name="learn" class="btn btn-link btn-block"><span class="glyphicon glyphicon-"></span>继续学习</button></td></tr><tr><td style="width:480px;text-align:left;padding:0px;padding-left:8px">

&#x09;<div class="p10 leftimgframe" style="text-align: left;">

&#x09;	<img class="orderimgwh left" src="/group1/UIMG/20260412/1ccb25ec-3f41-4e43-8a42-49a7d99d3fcf.jpg" alt="">

&#x09;	<div class="orderright ml15">

&#x09;		<div class="ellipsis-2 f16 title lh36 title" title="2026年应急管理">

&#x09;			2026年应急管理

&#x09;		</div>

&#x09;		<div class="f14 schedule showType">班级考试</div>

&#x09;	</div>

&#x09;	<div class="clearfix"></div>

&#x09;</div>

</td><td style=";text-align:left;padding:0px;padding-left:8px"><p>2026-04-23</p>-<p>2026-12-31</p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p>待考试</p><p></p></td><td style=";text-align:left;padding:0px;padding-left:8px"><p><span class=" mr10">0/99</span><span class="bg-yellow describe-icon-tip" title="" data-toggle="tooltip" data-placement="top" style="display:none;"><i class="glyphicon glyphicon-question-sign"></i></span></p></td><td style=";text-align:left">0.00</td><td td-type="btns" style="width:100px;text-align:left"><button type="button" btn-name="toExam" class="btn btn-default btn-block"><span class="glyphicon glyphicon-"></span>进入考试</button><button type="button" btn-name="learn" class="btn btn-link btn-block"><span class="glyphicon glyphicon-"></span>继续学习</button></td></tr></tbody>

&#x09;</table>

</div>

<div style="clear: both;"></div></div></div>





19\. 进入考试

<button type="button" btn-name="toExam" class="btn btn-default btn-block"><span class="glyphicon glyphicon-"></span>进入考试</button>



20\.计入考试

<button class="btn btn-primary" du-click="goExam" du-html="btnWrite" du-scope="9FC215F1\_B987\_5682\_6A2E\_DB560E7C53FA">进入考试</button>



21\.获取本考试的URL和cookie拿到全卷题目 JSON。

例如：请求网址

http://sddy.gxk.yxlearning.com/train/cms/paper/start-do-paper-or-test.gson?paperId=117e034e-dd78-40de-9083-e252c68cc762\&myExamRecordId=812961a6-4fed-4070-aa4d-e3ea6090600e

cookie

client\_id=64980788; cmsloginCookie=Z9PI3klG/vDRfd1WSgMsw/C/kAW4ZN1h^security:p9W2H2P5ymbTG3UGY7412w==^1; projectId=z211; JSESSIONID=44CA8BB81761882D0CA6C002B4200A81





22\.使用 Playwright 模拟人手点击对应的选项，然后点击“提交答案”按钮。

<span class="span-hollowblue pt10 pb10 dp-ib cursor-p" style="width: 100%;" id="commit-answer" du-click="onsubmit" du-scope="2DB8990D\_117D\_813D\_5768\_A924A2E6A8C4">提交答案</span>









