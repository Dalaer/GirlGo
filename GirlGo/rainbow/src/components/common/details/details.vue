<template>
    <div v-show='bkList.author' class="big">
        <div class="top">
            <div class="icofont-rounded-left" @click='toBack'></div>
            <span>书籍详情</span>
            <div class="icofont-ui-home" @click='toHome'></div>
        </div>
        <div class="details" ref="menuWrapper">
            <div class='detwrappe'>
                <div class="content">
                <div class="title2">
                    <div class="left2">
                        <img :src="this.bkList.cover">
                    </div>
                    <div class="text2">
                        <p class="text11">{{this.bkList.title}}</p>
                        <p class="text12">{{this.bkList.author}}</p>
                        <span class="text13">{{this.bkList.category}}</span><span>{{this.bkList.words}}万</span>
                        <p class="text14">{{this.bkList.status}}中</p>
                    </div>
                </div>
                <div class="button">
                    <div class="read" @click='read'>继续阅读</div>
                    <div class="lx" @click="lx">离线下载</div>
                    <!--加入书架后样式tjh加入暑假前的样式tj,加入成功后为为已添加-->
                    <div @click="rackTz" :class='colors===true?"tj":"tjh" '>加入书架</div>
                </div>
                <div class="desc">
                    {{this.bkList.desc}}
                </div>
                <div class="ml">
                    <ul>
                        <li @click="read">
                            <span class="dy1">更新</span>
                            <span class="dy2">{{this.bkList.last_chapter_name}}</span>
                            <span class="dy3">></span>
                        </li>
                        <li @click="read">
                        <span class="dy1">目录</span>
                        <span class="dy2">16小时前更新</span>
                        <span class="dy3">></span>
                        </li>
                    </ul>
                    
                </div>
                <div class="kb"></div>
                <!--精华评论标题-->
                <div class="chat">
                    <h3>精华评论</h3>
                </div>
                <div class="chatBig">
                    <div class="chatCon" v-for='(item4,index) in chatList'>
                        <div class="fatoux">
                            <div class="toux"> </div>
                            <p class="nickName">{{item4.nickName}}</p>
                        </div>
                        <div class="chatText">
                            <p class="shuo">{{item4.text}}</p>
                        </div>
                    </div>
                </div>
                <div class="kb"></div>
                <!--看过这些书的人还在看 标题-->
                <div class="chat">
                    <h3>看过这些书的人还在看</h3>
                </div>
                <div class="xsBook">
                    <ul>
                        <li v-for='(item5,index) in xsList'>
                            <div class="imgs"><img :src="item5.cover"></div>
                            <p class="bookname">{{item5.bookname}}</p>
                            <p>{{item5.author_name}}</p>
                        </li>
                    </ul>
                </div>
                <div class="kb"></div>
                <div class="chat">
                    <h3>图书相关信息</h3><span @touchstart="btShuo" :class='show===true?"icofont-rounded-up":"icofont-rounded-down"'></span>
                </div>
                <div id="bq-fa" :class="show===true?'bq-fa-show':'bq-fa-hide'">
                    <p>
                        <span>版权来源：</span><span class="bqsm-xs">书旗小说</span>
                    </p>
                    <p>
                        本书的数字版权由磨铁数盟提供，授权本软件使用，制作,发行，若包含不良信息，请及时告知客服。
                    </p>
                </div>
                <pfooter></pfooter>
            </div>
            </div> 
        </div>
    </div>
</template>
<script>
import pfooter from '../pfooter/pfooter'
import {mapState,mapMutations} from 'vuex'
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    components:{pfooter},
    data(){
        return {
            chatList:[],
            xsList:[],
            colors:true,
            show:true
        }
    },
    methods:{
        rackTz(){
            this.colors=false;
            this.$store.commit('addRacklist',this.bkList);            
            Toast('加入书架成功');
        },
        btShuo(){
            this.show = !this.show;
         },
        read(){
            Toast('此功能暂未开放');
        },
        lx(){
            MessageBox({
                title: '离线下载本书',
                message: '请先下载书旗小说客户端',
                showCancelButton: true,
                cancelButtonText:'暂不下载',
                confirmButtonText:'去下载',
                cancelButtonClass:"no",
                confirmButtonClass:"yes"
            }).then(action=>{
               // this.$router.push({name:'onload'});
                window.location.href="http://t.shuqi.com/route.php?pagename=#!/ac/in/ct/download";
            })
        },
        // top的返回处理
        toBack(){
            this.$store.commit('addBklist',{});
        },
        toHome(){
            this.$router.push('/home');
            this.$store.commit('addBklist',{});
        }
    },
     computed:{
        ...mapState({
            bkList :state=> state.book.bkList,
            rackList :state=> state.book.rackList
        })
     },
     watch:{
         bkList:function(val,val2){
             this.colors = !this.rackList.includes(val);
             console.log(this.colors)
         }
     },
     created(){
        //http://read.xiaoshuo1-sm.com/novel/i.php?do=sp_get&authorId=83540&bookId=5123804&fetch=merge&sqUid=8000000&source=store&size=3&page=1
         let url = `novel/i.php?do=sp_get&authorId=83540&bookId=5123804&fetch=merge&sqUid=8000000&source=store&size=3&page=1`;
            this.$axios.get("/haha/"+url)
            .then((res)=>{
                this.chatList = res.data.data;
                 setTimeout(()=>{
                    let els = this.$refs.menuWrapper
                    this.scroll=new BScroll(els,{probeType:2,click:true})
                },300)  
            });
        // http://bookapi.shuqiapi.com/?bamp=sqdk&dataFrom=sm&bid=5123804&bkName=%E6%9C%80%E5%BC%BA%E7%8B%82%E5%85%B5&authName=%E7%83%88%E7%84%B0%E6%BB%94%E6%BB%94&authorid=83540&limit=8&ver=03.04.21.11&fr_pr_id=10002&tk=NTEyMzgwNDQxN2FjNTllOWY4MzU0MA%253D%253D&shuqi_h5=&_=1552355396722
        let urls = `?bamp=sqdk&dataFrom=sm&bid=5123804&bkName=%E6%9C%80%E5%BC%BA%E7%8B%82%E5%85%B5&authName=%E7%83%88%E7%84%B0%E6%BB%94%E6%BB%94&authorid=83540&limit=8&ver=03.04.21.11&fr_pr_id=10002&tk=NTEyMzgwNDQxN2FjNTllOWY4MzU0MA%253D%253D&shuqi_h5=&_=1552355396722`;
          this.$axios.get("/hkx/"+urls)
            .then((res)=>{
                this.xsList = res.data.data.dk.bookinfo; 
            });    
     },
     mounted(){
        let els = document.getElementsByClassName("detwrappe")[0];
        this.scroll = new BScroll(els,{probeType:3,click:true})
        // 判断是否已添加书架
        let shows = this.xsList.includes(v=>v.title===this.bkList.title);
        // console.log(shows)
     }
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
@import '../../../icofont1/icofont.min.css';
.big{
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    z-index:19;
    .top{
        .h(44);
        display:flex;
        justify-content:space-between;
        .l_h(44);
        text-align:center;
        .padding(0,10,0,10);
        font-size:@font-size-m;
        color:@font-color-header;
        border-bottom:1px solid @border-bottom;
        z-index:20;
        background:#fff;
        div{
            .l_h(44);
            color:@icon-color-header;
        }
    }
    .details{
        z-index:200;
        position:fixed;
        .top(45);
        .w(375);
        bottom:0;
        left:0;
        right:0;
        background:#fff;
        overflow:hidden;
        .detwrappe{
            .w(375);
            height:100%;
            overflow:hidden;
        }
        .content{
            overflow:hidden;
        }
        .title2{
            .w(343);
            .h(130);
            .padding(20,16,16,16);
            display:flex;
            .left2{
                .w(98);
                .h(130);
                img{
                    width:100%;
                    height:100%;
                }
            }
            .text2{
                .w(229);
                .h(130);
                color:#999;
                .margin(0,0,0,12);
                font-size:@font-size-ms;
                .text11{
                    font-size:@font-size-l;
                    color:#333;
                    .margin(8,0,0,0);
                }
                .text12{
                    .h(20);
                    .padding(12,0,8,0);
                }
                .text13{
                    .margin(8,8,10,0);
                }
                .text14{
                    .margin(8,0,0,0);
                }
            }
        }
        .button{
            display:flex;
             justify-content:space-between;
            .padding(0,16,0,16);
            .h(41);
            .w(343);
            
            div{
                .h(39);
                .w(83);
                border-radius:5px;
                border:1px solid #00C98D;
                font-size:@font-size-ms;
                .l_h(39);
                text-align:center;
                .padding(0,10,0,10);
                
            }
            
            .read{
                
                    background:#00C98D;
                    color:#fff;
                }
            .lx,.tj{
                 border:1px solid #00C98D;
                color:#00C98D;
            }
            .tjh{
                background:#E6E7ED;
                 border:1px solid #E6E7ED;
                color:#C6C7CC;
            }

        }
        .desc{
            .w(343);
            .padding(14,0,0,0);
            .margin(0,16,0,16);
            .l_h(22);
             font-size:@font-size-ms;
            color:#999; 
        }
        .ml{
            .padding(0,16,0,16);
            ul{
                li{      
                    
                    .w(343);
                    .l_h(54);
                    border-bottom:1px solid #F7F7F7;
                    list-style:none;
                    font-size:@font-size-s;
                    color:#999;
                    display:flex;
                    justify-content:space-between;
                    .dy1{
                        font-size:@font-size-ms;
                        color:#333;
                        .margin(0,30,0,0);
                    }
                    .dy2{
                        flex:1;
                    }
                    .dy3{
                        float:right;
                    }
                }
            }
        }
        .kb{
            .h(8);
            .w(375);
            background:#F0F0F2;
        }
        
        .chat{
            .h(16);
            .w(355);
            .padding(16,20,16,0);
            font-size:@font-size-ms;
            color:#333;
            
            display:flex;
            span{
                float:right;                
            }
            h3{
            flex:1;           
            .padding(0,0,0,8);
            font-weight:normal;
            border-left:2px solid #00C98D;  
            float:left;          
            }
        }
        .chatCon{
            border-bottom:1px solid #F7F7F7;
            .fatoux{
                display:flex;
            }
            .toux{
                .w(30);
                .h(30);
                border-radius:50%;
                background:#333;
                .margin(0,15,0,0);
            }
            .w(330);
            .h(77);
            .margin(0,0,0,16);
            .padding(20,0,0,0);
            font-size:@font-size-ms;
            color:#333;
            .chatText{
                .margin(0,0,0,44); 
            }
            .shuo{
                .h(50);
                .w(307);
                
            }
        }
        .xsBook{
            .w(359);
            .padding(16,0,16,16);
            overflow:hidden;
            ul{
                li{
                        float:left;
                        list-style:none;
                        .margin(0,16,16,0);
                    .imgs{
                        .w(73);
                        .h(98);
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    p{
                        font-size:@font-size-s;
                        color:#999;
                        .w(73);
                        white-space:nowrap;
                        text-overflow:ellipsis;
                        overflow:hidden;
                        .margin(3,0,0,0);
                    }
                    .bookname{
                        color:#333;
                    }
                }
            }
            
        }
        #bq-fa{
            font-size:@font-size-ms;
            color:#999;
            .padding(0,16,10,16);
            .bqsm-xs{
                color:@state-color;
                .w(345);
               
            }
        }

    }
    .yes{
            .h(39);
            .w(83);
            border-radius:5px;
            border:1px solid #00C98D;
            font-size:@font-size-ms;
            .l_h(39);
            text-align:center;
            background:#00C98D;
            color:#fff;
            .margin(0,20,0,10);
        }
        .no{
            .h(39);
            .w(83);
            border-radius:5px;
            border:1px solid #00C98D;
            font-size:@font-size-ms;
            .l_h(39);
            text-align:center;
            .margin(0,10,10,10);
            color:#00C98D;
        }
    .mint-msgbox{
        .h(150);
    }
    .bq-fa-show{
        display:block;
    }
    .bq-fa-hide{
        display:none;
    }
    .mint-msgbox-content{
        border-bottom:none;
    }
}
</style>