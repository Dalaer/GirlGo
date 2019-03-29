<template>
    <div class="recommend">
        <ul>
            <li v-for="(item,index) in list" :key='index'>
                <div class="picImg"  @touchstart="bgColor(index)" @touchend='clearcolor'
                    :class="index === ind ? 'gray' :''" @click='toDetail(item)'
                >
                    <img :src="item.cover" alt="" :class="index === ind ? 'gray' :''">
                </div>
                <h3>{{item.title}}</h3>
                <p>{{item.author}}</p>
            </li>
        </ul>
        <div class="change" @click="change"
            @touchstart="bgColor1" @touchend='clearcolor1'
            :class="show?'gray':''"
        >
            换一换
            <i class="icofont-ui-rotation"></i>
        </div>
    </div>
</template>

<script>
// import {mapMutations} from 'vuex'
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            list:[],
            ind:'',
            show:false
        }
    },
    methods:{
        // ...mapMutations('addBklist'),
        // 请求数据
        requestData(){
            let recommendStr = `&timestamp=1551964757&func_id=24%2C20%2C11%2C19%2C33&orderid=1%2C3%2C4%2C6%2C7&sign=CFC67F40E5E9D843717CF2968A8E82D9`
            let url = `/home/eva_bookstore/v1/module/query?appId=1&pageId=1&userId=8000000&type=2&key=shuqiapi&resetcache=&channelId=&versionId=&ver=&shuqi_h5=&md5key=&resetcache=${recommendStr}`
            this.$axios.get(url)
            .then((data)=>{
                let listData = data.data.data.module;
                let context = listData.find(v=>v.m_s_name==='精品推荐');
                this.getData(context.content);
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        // 处理数据
        getData(data){
            let arr = [];
            for(let i = 0,length=data.length;i<length;i++){
                arr.push({
                    bid:data[i].bid,
                    author:data[i].author_name,
                    title:data[i].bookname,
                    cover:data[i].book_cover,
                    desc:data[i].book_info,
                    words:data[i].size,
                    status:data[i].state==='1'?'完结':'连载',
                    category:data[i].class_name,
                    last_chapter_name:data[i].topic
                })
            }
            this.list=arr;
        },
        // 换一换
        change(){
            this.requestData();
        },
        bgColor(index){
            this.ind =index;
        },
        clearcolor(){
            this.ind=''
        },
        bgColor1(){
            this.show=true
        },
        clearcolor1(){
            this.show=false;
        },
        // // 跳转到详情页
        toDetail(data){
            this.$store.commit('addBklist',data)
        }

    },
    created(){
            this.requestData();
    }
}
</script>

<style lang="less" scoped>
    @import '~style/index.less';
    .recommend{
        ul{
            .padding(16,0,16,10);
            display:flex;
            li{
                width:25%;
                .padding(0,16,0,0);
                list-style:none;
                box-sizing:border-box;
                .picImg{
                    position:relative;
                    img{
                        width:100%;
                    }
                }
                .picImg.gray:after{
                    content:'';
                    display:block;
                    position:absolute;
                    top:0;
                    bottom:0;
                    left:0;
                    right:0;
                    background:@home-touch-bg-color-img;
                }
                h3{
                    font-size:@font-size-s;
                    color:@font-color-header;
                    font-weight:normal;
                    width:100%;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    .margin(5,0,0,0);
                }
                p{
                    font-size:@font-size-s;
                    color:@font-color-categray-header;
                }
            }
        }
        .change{
            .h(48);
            .l_h(48);
            text-align:center;
            font-size:@font-size-ms;
            color:@font-color-header;
            border-top:1px solid @border-bottom;
            i{
                color:@font-color-categray-header;
            }
        }
        .change.gray{
            background:@home-touch-bg-color;
        }
    }
</style>