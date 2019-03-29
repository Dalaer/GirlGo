<template>
<div class="waibian">
     <div class="ss" ref='wra'>
        <ul class="content" >
            <li class="first">
                <p v-for='(item,index) in sexList' @touchstart='cut(item.gender,index)'
                    :class='index===ind?"active":"" ' :key="index"
                >{{item.text}}</p>
            </li>
            <li class="xholi" v-for='(item2,index) in bookList'
                @click='dot(index)' :key="index"
            >
                <div class="oliLeft"><img :src='item2.cover'></div>
                <div class="oliright">
                    <p class="title">{{item2.title}}</p>
                    <div class="author">
                        <p>{{item2.author}}</p>
                        <span class="see"></span><span>{{item2.reads}}万</span>
                    </div>
                    <div class="last">
                        <span :class='item2.status=="连载"?"ts":"ts2"'>{{item2.status}}</span>
                        <span>{{item2.words}}万字</span>
                        <span>{{item2.tags[0]}}</span>
                        <span>{{item2.tags[1]}}</span>
                    </div>
                </div>
            </li>  
        </ul>
    </div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            sexList:[{text:'男生',gender:'1'},{text:'女生',gender:'2'}],
            show:false,
            ind:1,
            bookList:[],
        }
    },
    methods:{
        dot(index){
            this.$store.commit('addBklist',this.bookList[index]);
        },
        cut( gender ,index ){
            this.ind = index;
            this.show = !this.show;
            let data = this.$route.params.orderid;
            let url = `novel/i.php?do=is_novelrank&p=1&page=1&size=10&onlyCpBooks=1&gender=${gender}&type=${data}`
            this.$axios.get("/haha/"+url)
            .then((res)=>{
                this.bookList = res.data.data;
                for( var i = 0 ; i < this.bookList.length ;  i++ ){
                     if(this.bookList[i].status === 0){
                    this.bookList[i].status = "连载"
                    }else if(this.bookList[i].status === 1){
                        this.bookList[i].status = "完结"
                    }
                    var tags = [];
                    tags.push(this.bookList[i].tags.split(',')[0]);
                    tags.push(this.bookList[i].tags.split(',')[1]);
                    this.bookList[i].tags=tags; 
                    this.bookList[i].reads = parseFloat(this.bookList[i].reads/10000).toFixed(1);
                    this.bookList[i].words = parseFloat(this.bookList[i].words/10000).toFixed(1);
                }
                setTimeout(()=>{
                    let el = this.$refs.wra
                    this.scroll=new BScroll(el,{probeType:3,click:"true"})
                    console.log(this.scroll);
                },20)
            })
        },
    },
    mounted(){
        this.cut(1,0);
    },
    
}
</script>

<style lang="less" scoped>
    @import '~style/index.less';
.waibian{
    position:relative;
    overflow:hidden;
    .ss{
        position:fixed;
        .top(44);
        .w(375);
        left:0;
        right:0;
        bottom:0;
        z-index:12;
        background:#fff;
        overflow:hidden;
        .active{
            border-bottom:2px solid #00C98D;
            color:#00C98D;
        }
        .content{
            .first{
                .h(43);
                .l_h(43);
                border-bottom:1px solid #F6F6F6;
                font-size:@font-size-s;
                p{
                    width:50%;
                    float:left;
                    text-align:center;
                }
            }
            .xholi{ 
                list-style:none;
                display:flex;
                .padding(20,16,20,0);
                .margin(0,0,0,16);
                border-bottom:1px solid #F8F8F8;
                .w(343);
                .h(75);
                .oliLeft{
                    .w(56);
                    .h(74);
                    img{
                        width:100%;
                        height:100%;
                    }  
                }
                .oliright{
                    .margin(0,10,0,10);
                    .title{
                            font-size:@font-size-ms;
                            .margin(0,0,6,0);
                        }
                    .author{
                        display:flex;
                        justify-content:space-between;
                        .w(271);
                        .h(16);
                        font-size:@font-size-s;
                        color:#999;
                    }
                    .last{
                        .margin(6,0,0,0);
                        .ts{
                            border:1px solid #D4E9FF;
                            color:#499FFF;
                        }
                        .ts2{
                            border:1px solid #CAF4E7;
                            color:#00C98D;
                        }
                        span{
                            display:block;
                            .padding(0,2,0,2);
                            border:1px solid #E6E6E6;
                            float:left;
                            .h(19);
                            font-size:@font-size-s;
                            .margin(0,5,0,0);
                            border-radius:2px;
                            color:#999;
                        }
                    }
                }
            }
        }
    }
}   
   
</style>