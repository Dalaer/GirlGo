<template>
    <div class="wrpper" ref="wrpper">
        <div class="content">
            <div class="tab">
                <ul class="tab-top tab-class">
                    <li v-for="(item,index) in tablist" :key="index"
                        :class="ind1 === index ? 'green' : ''"
                        @click="changeInd1(index)"
                    >
                        {{item.name}}
                    </li>
                </ul>
                <ul class="tab-middle tab-class">
                    <li v-for="(word,index2) in wordlist" :key="index2"
                        :class="ind2 === index2 ? 'green' : ''"
                        @click="changeInd2(index2)"
                    >
                        {{word.name}}
                    </li>
                </ul>
                <ul class="tab-bottom tab-class">
                    <li v-for="(text,index3) in hotlist" :key="index3"
                        :class="ind3 === index3 ? 'green' : ''"
                        @click="changeInd3(index3)"
                    >
                        {{text.name}}
                    </li>
                </ul>
            </div>
            <div class="context">
                <ul>
                    <li  v-for="(book,num) in contextList" :key="num"
                             @touchstart='bgcolor(num)' @touchend='clearcolor'
                            :class='num===ind ? "gray" :""'
                            @click="toDetail(num)"
                    >
                        <div class="imgPic">
                            <img :src="book.cover" alt="">
                        </div>
                        <div class="left-content">
                            <h3>{{book.title}}</h3>
                            <p class="left-author">{{book.author}}</p>
                            <p class="left-desc">{{book.desc}}</p>
                            <p class="left-tags">
                                <span :class="book.status===1? 'finished' : 'serialized'">
                                    {{book.status===1?'完结' : '连载'}}
                                </span>
                                <span class="words">{{parseInt((book.words/100000))+'万'}}</span>
                                <span v-for="(item,inde) in book.tags.split(',')" :key="inde" v-if="inde<2">
                                    {{item}}
                                </span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import qs from 'qs'
export default {
    data(){
        return{
            tablist:[],
            contextList:[],
            wordlist:[
                {
                    name:'全部',
                    words:''
                },
                {
                    name:'20万字',
                    words:1
                },
                {
                    name:'20-100万字',
                    words:2
                },
                {
                    name:'100万字以上',
                    words:3
                }
            ],
            hotlist:[
                {
                    name:'最热',
                    sort:'monHot'
                },
                {
                    name:'最新',
                    sort:'updateTime'
                },
                {
                    name:'完结',
                    status:2
                }
            ],
            ind1:0,
            ind2:0,
            ind3:0,
            ind:''   
        }
    },
    methods:{
        // deal数据 ---- 上面的导航部分
        dealData(){
            // 拿到cid
            // 拿到 '现代言情'
            let relatedName = '';
            let key = Object.keys(this.$route.params.data)[0];
            relatedName = this.$route.params.data[key].relatedName;
            let cid = this.$route.params.data[key].cid
            let url = `/webapi/rank/classrelation?_=1552216994342`;
            this.$axios.post('/hehe'+url,qs.stringify({
                type: 2,
				cid,
				timestamp: 1551966633060,
				sign: 'df3b4b7141faff1e50242552ae6c0f07',
				shuqi_h5: ''
            }))
            .then((res)=>{
                this.tablist = res.data.data.class;
                this.classLength = res.data.data.class.length;
                this.tagLength = res.data.data.tag.length;
                this.tablist=this.tablist.concat(res.data.data.tag) ;
                this.tablist.unshift({
                    name: "全部",
                    relatedName
                }) 
                // 处理下部分显示的数据 -----必须放到这里 因为要拿到这个数据给列表赋值 而这个赋值过程是异步的
                this.dealBook();
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        // 改变index值
        changeInd1(ind){
            this.ind1 = ind;
            this.dealBook();
        },
        changeInd2(ind){
            this.ind2 = ind
            this.dealBook();
        },
        changeInd3(ind){
            this.ind3 = ind
            this.dealBook();
        },
        // deal数据 ---- 下方的书本
        dealBook(){
            let ind1 = this.ind1<this.classLength ? this.ind1-1 : this.ind1-1-this.tagLength;
            let key = this.ind1<this.classLength ? 'secondCate' : 'tag';
            let val = this.tablist[this.ind1].relatedName;
            let key2 = this.ind3 > 2 ? 'sort' : 'status';
            let val2 = this.hotlist[this.ind3][key2];
            let url = `/novel/i.php?do=is_caterank&p=1&page=1&words=${this.wordlist[this.ind2].words}&shuqi_h5=&onlyCpBooks=1&${key}=${val}&${key2}=${val2}&_=1551966633220`
            this.$axios.get('/haha'+url)
            .then((data)=>{
                this.contextList = data.data.data;
                // 处理去详情页的值
                this.toDetailList=this.contextList;
				this.toDetailList.map(v=>v.status=v.status===1?'完结':'连载');
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        bgcolor(num){
            this.ind=num
        },
        clearcolor(){
            this.ind=''
        },
        // 跳转到详情页
        toDetail(num){
            this.$store.commit('addBklist',this.toDetailList[num])
        }
    },
    created(){
        // 处理上部分tab的数据
        this.dealData();
    },
    mounted(){
        // this.dealBook();
        // console.log(this.tablist)
        this.scroll = new BScroll(this.$refs.wrpper,{click:true})
    }
}
</script>

<style lang="less" scoped>
    @import '~style/index.less';
    .wrpper{
        position:fixed;
        .top(44);
        .bottom(0);
        z-index:20;
        overflow:hidden;
        .w(375);
        background:@categray-bg-color;
        .content{
            .tab{
                .padding(0,0,0,16);
                background:#fff;
                .tab-class{
                    display:flex;
                    flex-wrap:wrap;
                    list-style:none;
                    border-bottom:1px solid @border-bottom;
                    .padding(12,0,0,0);
                    li{
                        .margin(0,24,12,0);
                        color:@font-color-header;
                        font-size:@font-size-ms;
                    }
                    li.green{
                        color:@icon-color-header;
                    }
                }
            }
            .context{
                .margin(6,0,0,0);
                background:#fff;
                ul{
                    .gray{
                        background:@home-touch-bg-color;
                    }
                    li{
                        .padding(20,16,20,16);
                        display:flex;
                        .imgPic{
                            .w(84);
                            .h(112);
                            // float:left;
                            .margin(0,16,0,0);
                            img{
                                height:100%;
                            }
                        }
                        .left-content{
                            color:@font-color-categray-header;
                            h3{
                                font-size:@font-size-m;
                                color:@font-color-header;
                                font-weight:normal;
                            }
                            .left-author{
                                .margin(8,0,0,0)
                            }
                            .left-desc{
                                .h(36);
                                .margin(8,0,0,0);
                                overflow:hidden;
                                font-size:@font-size-ms;
                                text-overflow:ellipsis;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                            }
                            .left-tags{
                                .margin(8,0,0,0);
                                span{
                                    border:1px solid @categray-novel-border;
                                    border-radius:unit(3/@rem-size,rem);
                                    .margin(0,4,0,0);
                                    .padding(0,6,0,6);
                                }
                                span.finished{
                                    color:@categray-novel-finished;
                                    border-color:@categray-novel-finished-border;   
                                }
                                span.serialized{
                                    color:@categray-novel-serialized;
                                    border-color:@categray-novel-serialized-border;  
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>