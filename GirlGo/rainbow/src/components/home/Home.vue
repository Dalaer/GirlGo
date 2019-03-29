<template>
    <div class="home" ref='wrapper'>
        <div class="content">
            <div class="top">
                <div class="picImg">
                    <div class="logo-img">
                        <img src="../../assets/logo.png" alt="">
                    </div>
                    <div class="logo-word">
                        <img src="../../assets/logo-word.png" alt="">
                    </div>
                </div>
                <div class="ico-img">
                    <span class="ying-img">
                        <img src="../../assets/ying.png" alt="">
                    </span>
                    <span class="book-img">
                        <img src="../../assets/book.png" alt="">
                    </span>
                    <span class="search-img" @click="search">
                        <i class="icofont-search"></i>
                    </span>
                </div>
            </div>
            <div class="pages">
                <ul>
                    <router-link 
                        v-for="(item,index) in pageList" :key="index"
                        tag="li" :to="{path:item.path}"
                    >
                        <i :style="{backgroundPositionY:-index*48+'px'}"></i>
                        {{item.context}}
                    </router-link>
                </ul>
            </div> 
            <div class="banner">
                <a :href="banner.linkUrl">
                    <img :src="banner.imgUrl" :alt="banner.title">
                </a>
            </div>
            <div class="series">
                <ul>
                    <li>
                        <p class="title">精品推荐</p>
                        <Recommend></Recommend>
                        <div class="empty"></div>
                    </li>
                    <li>
                        <BookIntroduce :list='girlList' :toDetailList='girlToDetail'></BookIntroduce>
                        <div class="empty"></div>
                    </li>
                    <li>
                        <BookIntroduce :list="boyList" :toDetailList='boyToDetail'></BookIntroduce>
                        <div class="empty"></div>
                    </li>
                    <li>
                        <p class="title">新书专区</p>
                        <BookPrefecture :Book='newBook'></BookPrefecture>
                        <div class="change" @click='toNewBook'
                            @touchstart='bgcolor1' @touchend='clearcolor1'
                            :class='show1?"gray":""'
                        >
                            查看更多
                        </div>
                        <div class="empty"></div>
                    </li>
                    <li>
                        <p class="title">书旗畅销榜</p>
                        <BookPrefecture :Book="sellOut"></BookPrefecture>
                        <div class="change" @click="toBookSell"
                             @touchstart='bgcolor2' @touchend='clearcolor2'
                            :class='show2?"gray":""'
                        >
                            查看更多
                        </div>
                        <div class="empty"></div>
                    </li>
                    <li>
                        <p class="title">精选书单</p>
                        <SelectBook></SelectBook>
                        <div class="change" @click="toBookList"
                             @touchstart='bgcolor3' @touchend='clearcolor3'
                            :class='show3?"gray":""'
                        >
                            查看更多
                        </div>
                        <div class="empty"></div>
                    </li>
                    <li>
                        <p class="title">根据你的兴趣为你推荐</p>
                        <ForYou></ForYou>
                    </li>
                </ul>
            </div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll';
import Recommend from './homeCom/Recommend';
import BookPrefecture from 'common/bookPrefecture/BookPrefecture';
import SelectBook from './homeCom/SelectBook';
import ForYou from './homeCom/ForYou';
import BookIntroduce from 'common/bookIntroduce/bookIntroduce';
import { Toast } from 'mint-ui';
import Footer from 'common/pfooter/pfooter';

export default {
    data(){
        return {
            pageList:[
                {
                    path:'/page/categray',name:'categray',context:'分类'
                },
                {
                    path:'/page/rank',name:'rank',context:'排行'
                },
                {
                    path:'/page/channel/3',name:'channel',context:'女频'
                },
                {
                    path:'/page/channel/2',name:'channel',context:'男频'
                },
                {
                    path:'/page/booklist',name:'booklist',context:'书单'
                }
                
            ],
            banner:{},
            newBook:{
                name:'新书专区',
                bookstr:'/module/query?appId=1&pageId=1&userId=8000000&type=2&key=shuqiapi&resetcache=&channelId=&versionId=&ver=&shuqi_h5=&md5key=&resetcache=&timestamp=1551964757&func_id=11%2C33%2C11%2C19%2C33%2C12%2C33%2C11%2C19%2C33&orderid=18%2C19%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C30&sign=98F194015552872F5EBDECE0A5C01157'},
            sellOut:{
                name:'书旗畅销榜',
                bookstr:'/module/query?appId=1&pageId=1&userId=8000000&type=2&key=shuqiapi&resetcache=&channelId=&versionId=&ver=&shuqi_h5=&md5key=&resetcache=&timestamp=1551964757&func_id=11%2C33%2C11%2C19%2C33%2C12%2C33%2C11%2C19%2C33&orderid=18%2C19%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C30&sign=98F194015552872F5EBDECE0A5C01157'},
            girlList:[],
            boyList:[],
            show1:false,
            show2:false,
            show3:false,
            girlToDetail:[],
            boyToDetail:[],
        }
    },
    components:{
        Recommend,BookPrefecture,SelectBook,ForYou,BookIntroduce,Footer
    },
    methods:{
        // 处理男生热文 女胜美文的数据
        getlist(){
            let listStr = `&timestamp=1551964757&func_id=11%2C33%2C11%2C19%2C33%2C11%2C33%2C11%2C19%2C33&orderid=8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17&sign=8F1AF48FB44E4248DFEF5784D99589E4`;
            let url = `home/eva_bookstore/v1/module/query?appId=1&pageId=1&userId=8000000&type=2&key=shuqiapi&resetcache=&channelId=&versionId=&ver=&shuqi_h5=&md5key=&resetcache=${listStr}`;
            this.$axios.get(url)
            .then((data)=>{
                let dataList = data.data.data.module;
                this.girlList = dataList.find(v=>v.m_s_name==='女生美文' && v.content instanceof Array);
                this.girlToDetail = this.dealList(this.girlList);
                this.boyList = dataList.find(v=>v.m_s_name==='男生热文' && v.content instanceof Array);
                this.boyToDetail = this.dealList(this.boyList);
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        // 跳转到 新书专区 ------》 新书潜力
        toNewBook(){
            this.$router.push({name:'rankpage',params:{type:5,title:'新书潜力'}})
        },
        // 跳转到 书旗畅销榜 ------》 新书畅销
        toBookSell(){
            this.$router.push({name:'rankpage',params:{type:1,title:'精品畅销'}})
        },
        // 精选书单 ------》 精品书单
        toBookList(){
            this.$router.push('/page/booklist')
        },
        // 搜索
        search(){
            Toast('该功能暂未开放')
        },
        bgcolor1(){
            this.show1=true
        },
        clearcolor1(){
            this.show1=false
        },
        bgcolor2(){
            this.show2=true
        },
        clearcolor2(){
            this.show2=false
        },
        bgcolor3(){
            this.show3=true
        },
        clearcolor3(){
            this.show3=false
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
        // 获得
        this.getlist();
        // 获取banner广告图
        let bannerStr = '&timestamp=1551964757&func_id=24%2C20%2C11%2C19%2C33&orderid=1%2C3%2C4%2C6%2C7&sign=CFC67F40E5E9D843717CF2968A8E82D9'
        let url = `/home/eva_bookstore/v1/module/query?appId=1&pageId=1&userId=8000000&type=2&key=shuqiapi&resetcache=&channelId=&versionId=&ver=&shuqi_h5=&md5key=&resetcache=${bannerStr}`
        this.$axios.get(url)
        .then((data)=>{
            let dataList = data.data.data.module;
            let banner = dataList.find(v=>v.m_s_name==='首页顶部banner');
            this.banner = {
                imgUrl:banner.content[0].image_url,
                title:banner.content[0].link_text,
                linkUrl:banner.content[0].link_url
            }
            this.scroll = new Bscroll(this.$refs.wrapper,{click:true})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
</script>

<style lang="less" scoped>
    @import url('../../icofont1/icofont.min.css');
    @import '~style/index.less';
    .home{
        background:@home-bg-color;
        .top(0);
        .bottom(0);
        left:0;
        right:0;
        position:fixed;
        overflow:hidden;
        .top{
            .h(44);
            display:flex;
            justify-content:space-between;
            align-items:center;
            box-sizing:border-box;
            border-bottom:1px solid @border-bottom;
            .picImg{
                display:flex;
                align-items:center;
                .margin(0,0,0,16);
                div{
                    display:block;
                }
                div.logo-img{
                    .w(25);
                    .margin(0,8,0,0);
                    img{
                        width:100%;
                    }
                }
                div.logo-word{
                    .w(72);
                    img{
                        width:100%;
                        height:100%;
                    }
                }
            }
            .ico-img{
                font-size:@font-size-l;
                color:@icon-color-header;
                // .l_h(44);
                // vertical-align:middle;
                span{
                    display:inline-block;
                    .margin(10,10,0,0);
                    .w(20);
                    .h(20);
                    img{
                        width:100%;
                    }
                }
                span:last-child{
                    .margin(5,10,0,0);
                }
            }
        }
        .gray{
            background:@home-touch-bg-color;
        }
        .pages{
            ul{
                .padding(15,0,10,0);
                .margin(0,20,0,20);
                display:flex;
                justify-content:space-around;
                text-align:center;
                li{
                    list-style:none;
                    font-size:@font-size-ms;
                    i{
                        background:url('../../assets/pages.png');
                        background-size:cover;
                        .h(44);
                        .w(44);
                        display:block;
                        .margin(0,0,8,0)
                    }
                }
            }
        }
        .banner{
            a{
                display:block;
                img{
                    width:100%;
                }
            }
        }
        .series{
            ul{
                li{
                    font-size:0;
                    .padding(16,0,0,0);
                    .title{
                        position:relative;
                        font-size:@font-size-ms;
                        color:@font-color-header;
                        .padding(0,0,0,16);
                        .h(14);
                    }
                    .title:after{
                        content:'';
                        display:block;
                        position:absolute;
                        .w(3);
                        .h(14);
                        .left(0);
                        .top(1);
                        background:@icon-color-header;
                    }
                    .change{
                        .h(48);
                        .l_h(48);
                        text-align:center;
                        font-size:@font-size-ms;
                        color:@font-color-header;
                        border-top:1px solid @border-bottom;
                        i{
                            color:@font-color-categray-header
                        }
                    }
                    .empty{
                        .h(8);
                        background:@home-empty-color;
                    }
                }
                li:nth-child(1),li:nth-child(2),li:nth-child(3){
                    .padding(0,0,0,0);
                }
            }
        }
    }
</style>
