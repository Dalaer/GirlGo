<template>
	<div class='channel' ref='wrapper'>
		<div class='content'>
			<bookIntroduce :list='list1' :toDetailList='toDetailList1'></bookIntroduce>
			<div class='hot-categray'>
				<div class='common-header'>
					<h3 class='title'>{{list[1].m_s_name}}</h3>
				</div>
				<!-- 轮播图 -->
				<banner :list='listCat' :toDetailList='toDetailListCat'></banner>
		   </div>
		   <bookIntroduce :list='list2' :toDetailList='toDetailList2'></bookIntroduce>
		   <div class='common-header'>
					<h3 class='title' v-if='this.num==="3"'>女生美文榜</h3>
					<h3 class='title' v-else>男生爽文榜</h3>
				</div>
		   <BookPrefecture :Book='Bookstr'></BookPrefecture>
		   <div :class='dot?"common-bott addbg":"common-bott"' @touchstart='add' @touchend='clear'>
		    	<a href="javascript:;" @click="toRank">
		    		<span>查看更多</span>
		    	</a>
		   </div>
		   <Footer></Footer>
		</div>
	</div>
</template>
<script>
	import bookIntroduce from '../../common/bookIntroduce/bookIntroduce.vue'
	import BScroll from 'better-scroll'
	import banner from '../../common/banner/banner.vue'
	import BookPrefecture from '../../common/bookPrefecture/BookPrefecture.vue'
	import Footer from 'common/pfooter/pfooter'
	export default {
		name:'channel',
		data(){
			return {
				list:[],
				list1:[],//上面的图书介绍
				toDetailList1:[],
				listCat:[],//轮播图
				toDetailListCat:[],
				list2:[],//下面的图书介绍
				toDetailList2:[],
				Bookstr:{
					url:'module'
				},
				dot:false
			}
		},
		methods:{
			normalData(data){//处理数据
				let arr = []
				data.forEach((item)=>{
					if( item.content instanceof Array  || item.content.data){
						arr.push(item)
					}

				})
				
				arr.forEach((item,index)=>{
					if(index == 0 || index == 2){
						let content1 = [];
						let content2 = [];
						arr[index].content.forEach((item,ind)=>{
							if(ind < 4){
								content1.push(item);
							}else{
								content2.push(item);
							}
						})
					}
					if(index == 1 && this.num=='3'){
						arr[index].m_s_name='热门女生分类'
					}else if(index == 1 && this.num=='2'){
						arr[index].m_s_name='热门男生分类'
					}
				})
				return arr;
			},
			add(){
				this.dot = true
			},
			clear(){
				this.dot = false
			},
			toRank(){
				if(this.num==='3'){
					this.$router.push({name:'rankpage',params:{title:'唯美女生'},type:7})
				}else{
					this.$router.push({name:'rankpage',params:{title:'酷炫男生'},type:3})
				}
			},
			// 处理数据
			dealList(data){
				let list = [];
				for(let i = 0 ,length=data.content.length;i<length;i++){
					let con = data.content[i];
					let obj = {};
					for (let key in con) {
						this.key('author','author_name',key,con,obj);
						this.key('title','bookname',key,con,obj);
						this.key('desc','book_info',key,con,obj);
						this.key('category','class_name',key,con,obj);
						this.key('words','size',key,con,obj);
						this.key('status','stat_name',key,con,obj);
						this.key('last_chapter_name','topic',key,con,obj);
						this.key('cover','book_cover',key,con,obj);
					}
					list.push(obj)
				}
				return list;
			},
			// 变换键名
			key(news,old,key,con,txt){
				if(key === old){
					txt[news]=con[old]
				}
			}
		},
		created(){
			//请求数据
			this.num = this.$route.params.num;
			if(this.num === '3'){
				this.Bookstr.name='女生美文榜'
			}else if(this.num === '2'){
				this.Bookstr.name='男频爽文榜'
			}
			//中间的
			this.Bookstr.bookstr = `/stencil/query?appId=1&pageId=${this.num}&channelId=&versionId=&ver=&shuqi_h5=&md5key=&userId=8000000&timestamp=1552217788&type=2&resetcache=&sign=C1E7FC00AFBBFE0F66394948F31E854F&key=shuqiapi&_=1552217788946`;

			//请求数据的路径
			let url = `/home/eva_bookstore/v1/stencil/query?appId=1&pageId=${this.num}&channelId=&versionId=&ver=&shuqi_h5=&md5key=&userId=8000000&timestamp=1552217788&type=2&resetcache=&sign=C1E7FC00AFBBFE0F66394948F31E854F&key=shuqiapi&_=1552217788946`
			this.$axios.get(url)
						.then((data)=>{
							console.log(data)
							this.list = this.normalData(data.data.data.module);
							this.list1 = this.list[0];
							this.toDetailList1=this.dealList(this.list1);
							this.listCat = this.list[1];
							// banner的数据传送 四个模块儿 四本书
							for(let i=0,length=this.listCat.content.data.length;i<length;i++){
								this.toDetailListCat.push(this.dealList(this.listCat.content.data[i]))
							}
							this.list2 = this.list[2];
							this.toDetailList2=this.dealList(this.list2);
							this.$nextTick(()=>{
								var wrapper = this.$refs['wrapper'];
								var scroll = new BScroll(wrapper,{click:true});
							})
						})
						
		},
		components:{
			bookIntroduce,banner,
			BookPrefecture,Footer
		},
		mounted(){
			//实例化bscroll
		}
	}

</script>
<style lang='less' scoped>
@import '~style/index.less';
	.channel{
		color:@font-color-normal;
		// .w(375);
		overflow: hidden;
		.top(44);
		.bottom(0);
		.left(0);
		.right(0);
		position:fixed;
		.hot-categray{
			position:relative;
		}
		.common-header{
			width:100%;
			.padding(16,0,0,0);
			font-size: 0px;
			position:relative;
			.title{
				font-weight:normal;
				font-size: @font-size-ms;
				color:@font-color-header;
				display: inline-block;
				.h(16);
				.l_h(16);
				position:relative;
				.padding(0,0,0,16);
			}
			.title:after{
				content: '';
				.w(3);
				.h(14);
				display: inline-block;
				background-color:@state-color;
				position:absolute;
				.top(1);
				.left(0);
			}
		}
		.addbg{
			background-color:@bg-touch;
		}
	}
</style>