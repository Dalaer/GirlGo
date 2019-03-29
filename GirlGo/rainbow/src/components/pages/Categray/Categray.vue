<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <ul class="final">
                <li v-for="(item,index) in list" :key="index" class="final_li">
                    <dl>
                        <dt>{{index==='girl' ? '女生分类' : '男生分类'}}</dt>
                        <dd v-for="(data,index2) in list[index]" :key="index2"
                            @click="todetail(data)"
                        >
                            <!-- @touchstart='bgcolor(index2)' @touchend='clearcolor'
                            :class='index2===ind2 ? "gray" : "" ' -->
                            <div class="picImg"
                               :style="{backgroundPositionY:index === 'girl' ? -index2*52+'px' : -(index2+list['girl'].length)*53+'px'}" 
                            ></div>
                            <div v-for="(title,index3) in data" :key="index3" class="text">
                                <p>{{index3}}</p>
                                <ul>
                                    <li v-for="(series,index4) in title.list" :key="index4">
                                        {{series}} |
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </dl>
                </li> 
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import qs from 'qs';
import BScroll from 'better-scroll'
export default {
    data(){
        return{
            list:{}
        }
    },
    methods:{
        todetail(data){
            let cid = data[Object.keys(data)[2]];
            this.$router.push({name:'categrayDetail',params:{data,cid:cid}})
        }
    },
    created(){
        let url = 'http://walden1.shuqireader.com/webapi/rank/classrelation?_=1551966449269'
        this.$axios.post(url,qs.stringify({
            type: 1,
            timestamp: 1551966449267,
            sign: '2677b8e200048e2662fe0270c0837bcc',
            shuqi_h5:''
        }))
        .then((res)=>{
            this.list=res.data.data; 
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{click:true})
    }
}
</script>

<style lang="less" scoped>
   @import '~style/index.less';
    .wrapper{
        position:fixed;
        .top(44);
        .bottom(0);
        overflow:hidden;
        font-size:@font-size-s;
        .final{
            .padding(0,0,1,0);
            .w(375);
            .final_li{
                dl{
                    dt{
                        .padding(13.5,0,10,16);
                        background:@bg-categray-header;
                        color:@font-color-categray-header;
                        .l_h(12);
                    }
                    dd{
                        overflow:hidden;
                        position:relative;
                        .margin(0,0,0,16);
                        .padding(14,0,10,0);
                        .h(40);
                        border-bottom:1px solid @border-bottom;
                        .picImg{
                            .w(36);
                            .h(43);
                            .margin(0,0,10,0);
                            float:left;
                            background:url('../../../assets/data_img.png');
                            background-size:cover;
                        }
                        .text{
                            .margin(0,0,0,50);
                            .h(38);
                            p{
                                font-size:@font-size-m;
                                color:@font-color-header;
                                .h(24); 
                            }
                            ul{
                                display:flex;
                                li{
                                    list-style:none;
                                    font-size:@font-size-s;
                                    color:@font-color-categray-header;
                                    .margin(0,5,0,0);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>