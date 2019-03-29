<template>
	<div class='footer'>
		<a href="http://t.shuqi.com/route.php?pagename=#!/ac/in/ct/download" class='downloadBtn'>下载书旗小说客户端</a>
		<h4 class='fo-adv'>海量图书，更高品质阅读体验</h4>
		<p>©2016书旗网shuqi.com</p>
		<p>粤ICP备13078413号-1</p>
		<p><span>网络文化经营许可证：粤网文[2017]3018-499号</span></p>
		<p>增值电信业务经营许可证：粤B2-20130742</p>
		<p>广州阿里巴巴文学信息技术有限公司 版权所有</p>
		<p>广州市天河区黄埔大道西平云路163号广电平云广场B塔13层自编03单元</p>
		<p>020-39225959</p>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'pfooter'
	}
</script>
<style lang='less' scoped>
	@import '~style/index.less';
	.footer{
		.padding(24,16,22,16);
		color:@font-color-categray-header;
		background-color:@categray-bg-color;
		text-align: center;
		font-size:@font-size-ms;
		.l_h(15);
		.downloadBtn{
			display: block;
			text-decoration: none;
			background-color:@icon-color-header;
			color:@home-bg-color;
			.h(39);
			.l_h(39);
			border:1px solid @icon-color-header;
			.padding(0,10,0,10);
			border-radius:5px;
		}
		.fo-adv{
			color:@font-color-header;
			font-size: @font-size-ms;
			.l_h(20);
			.margin(10,12,10,12);
		}
		p{
			font-size: @font-size-s;
			.l_h(20);
		}
	}
</style>