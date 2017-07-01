<template>
   <div style="background: #494949;height: 100%;width: 100%;position: absolute">
   		<div class="head404"></div>
   		<div class="txtbg404">
	  		<div class="txtbox">
	      		<p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
	      		<p class="paddingbox">请点击以下链接继续浏览网页</p>
	      		<p>》<a class="curp" @click="$router.go(-1)">返回上一页面</a></p>
	      		<p>》<router-link :to="{name: '登录'}">返回网站首页</router-link></p>
	   		</div>
  		</div>
   </div>

</template>

<style lang="scss">
.head404 {
	width: 580px;
	height: 234px;
	margin: 50px auto 0 auto;
	background: url('../../static/images/head404.png') no-repeat;
}
.txtbg404 {
	width: 499px;
	height: 169px;
	margin: 10px auto 0 auto;
	background: url('../../static/images/txtbg404.png') no-repeat;
}

.txtbg404 .txtbox {
	width: 390px;
	position: relative;
	top: 30px;
	left: 60px;
	color: #eee;
	font-size: 13px;
}

.txtbg404 .txtbox p {
	margin: 5px 0;
	line-height: 18px;
}

.txtbg404 .txtbox .paddingbox {
	padding-top: 15px;
}

.txtbg404 .txtbox p a {
	color: #eee;
	text-decoration: none;
}

.txtbg404 .txtbox p a:hover {
	color: #999;
	text-decoration: underline;
}
</style>
