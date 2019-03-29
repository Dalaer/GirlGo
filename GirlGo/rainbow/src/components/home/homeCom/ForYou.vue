<template>
    <div class="foryou">
        <ul>
            <li v-for="(item,index) in list" :key="index" v-if="index<10"
                @touchstart='bgcolor(index)' @touchend='clearcolor'
                :class="index===ind?'gray':''"
                @click='toDetail(item)'
            >
                <div class="left-img">
                    <img :src="item.cover" alt="">
                </div>
                <div class="right-text">
                    <h3>{{item.title}}</h3>
                    <p class="author">{{item.author}}</p>
                    <p class="describe">{{item.desc}}</p>
                    <div class="squral-tag">
                        <span :class="item.status === '连载' ? 'serialized' : 'finished'">{{item.status}}</span>
                        <span>{{Math.ceil(item.words/1000)+'万'}}</span>
                        <span v-for="(tag,inde) in item.tags" :key="inde" v-if="inde<2">
                            {{tag}}
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[],
            ind:''
        }
    },
    methods:{
        getData(data){
            let arr = [];
            for(let i = 0 , length=data.length;i<length;i++){
                arr.push({
                    title:data[i].bookname,
                    author:data[i].author_name,
                    cover:data[i].book_cover,
                    desc:data[i].introduction,
                    words:data[i].size,
                    tags:data[i].tag,
                    status:data[i].stat_name,
                    last_chapter_name:data[i].topic,
                    category:data[i].class_name
                })
            }      
            this.list = arr;   
        },
        bgcolor(index){
            this.ind=index
        },
        clearcolor(){
            this.ind=''
        },
        // 跳转到详情页
        toDetail(data){
            this.$store.commit('addBklist',data)
        }
    },
    created(){
        let foryouStr = `&timestamp=1551964757&func_id=12%2C33%2C11%2C28%2C33%2C12%2C33%2C11%2C19&orderid=31%2C32%2C33%2C34%2C35%2C36%2C37%2C38%2C39&sign=8B437FAC68764D298872E5BC181F0826`
        let url = ` http://bookstoreapi.shuqireader.com/eva_bookstore/v1/module/query?appId=1&pageId=1&userId=8000000&type=2&key=shuqiapi&resetcache=&channelId=&versionId=&ver=&shuqi_h5=&md5key=&resetcache=${foryouStr}`
        this.$axios.get(url)
        .then((data)=>{
            let listData = data.data.data.module;
            let context = listData.find(v=>v.m_s_name==='为你推荐');
            // 处理数据
            this.getData(context.content);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
</script>

<style lang="less" scoped>
    @import '~style/index.less';
    .foryou{
        .padding(0,0,0,16);
        ul{
            .gray{
                background:@home-touch-bg-color;
            }
            li{
                box-sizing:border-box;
                .padding(20,16,20,0);
                border-bottom:1px solid @border-bottom;
                display:flex;
                .left-img{
                    .w(84);
                    .h(112);
                    .margin(0,16,0,0);
                    img{
                        width:100%;
                        border:1px solid @border-bottom;
                    }
                }
                .right-text{
                    font-weight:normal;
                    font-size:@font-size-s;
                    flex:1;
                    .squral-tag{
                        span{
                            display:inline-block;
                            border:1px solid @categray-novel-border;
                            .padding(0,6,0,6);
                            .margin(0,4,0,0);
                            font-size:@font-size-s;
                            color:@font-color-categray-header;
                            border-radius:unit(2/@rem-size,rem);
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
                    h3{
                        font-weight:normal;
                        font-size:@font-size-m;
                    }
                    p{
                        color:@font-color-categray-header;
                    }
                    .author{
                        .margin(8,0,8,0);
                    }
                    .describe{
                        overflow:hidden;
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:2;
                        .margin(0,0,8,0);
                        // .h(30);
                    }
                }
            }
        }
    }
</style>