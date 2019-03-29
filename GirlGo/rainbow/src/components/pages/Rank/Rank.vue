<template>
<div>
    <div class="wrapper singer" ref='wrapper'>
        <ul class="conte big-content" >
            <li class="oli" v-for='(item,index) in dataList'
              :key='index'
              @click='touchEnd(item.orderid,item.content.title)'>
                <div>
                    <div class="icon" :style="{backgroundPositionX:(-index*36)+'px'}"></div>
                    <div class="right">
                        <a></a>
                        <p class="title">{{item.content.title}}</p>
                        <p class="desc">{{item.content.desc}}</p>
                    </div>
                </div>
            </li>
            <pfooter></pfooter>
        </ul>
    </div>
    <router-view></router-view>
    </div>
</template>
<script>
import pfooter from '../../common/pfooter/pfooter'
import BScroll from 'better-scroll'
// :style="'{backgroundPositionX:'+item.parameter.icon.x+'px}'"
export default {
    components:{
        pfooter
    },
    data(){
        return{
            dataList:[],
            colorList:[],
            position:[]
        }
    },
    methods:{
       // this.$router.push({name:'Xqy',params:items})
       touchEnd(orderid,title){
          // let orderid = this.dataList.orderid
            console.log(orderid);
            this.$router.push({name:'rankpage',params:{orderid,title}})
       }
    },
    mounted(){
        let url ='eva_bookstore/v1/stencil/query?appId=1&pageId=4&channelId=&versionId=&ver=&shuqi_h5=&md5key=&userId=8000000&timestamp=1552207656&type=2&resetcache=&sign=B3E5CC0D399A166BE0A4F721A1547DF1&key=shuqiapi'
        this.$axios.get('/home/'+url) 
        .then((res)=>{
            let list = res.data.data.module
            console.log(list)
            for( var i= 0 ; i < list.length ; i++ ){
                if( i%2 == 0){
                    this.dataList.push(list[i]); 
                    //this.position.push(list[i].parameter.icon)
                }else if(i%2!=0){
                    this.colorList.push(list[i].content.color);
                }
            }
            console.log(this.dataList[1].parameter.icon.x);
            console.log(this.dataList[1].orderid)
            
        })

        let el = this.$refs.wrapper
        this.scroll=new BScroll(".wrapper",{probeType:2,click:'true'})
        
    }
}
</script>
// :style='{background-position:'+item.parameter.icon+'}'
// :style='{backgroundPositionX:'+item.parameter.icon.x+'}'
<style lang="less" scoped>
    @import '../../../icofont1/icofont.css';
   @import '~style/index.less';
   .singer{
        position:fixed;
        .w(375);
        .top(44);
        .left(0);
        .right(0);
        .bottom(0);
        overflow:hidden;
   }
    .big-content{
        background:#F0F0F2;
    }
    .icon{
        .w(30);
        .h(30);
        .margin(10,0,0,0);
        float:left;
        background:url('../../../assets/rank_icon.png') ;
        background-size:cover;
    }
    .oli{
        .w(375);
        .h(50);
        .padding(21,20,21,20);
       
        .margin(0,0,8,0);
        background:#fff;
        list-style:none;
        
        .right{
            .h(50);
            .padding(6,0,6,0);
            .margin(0,0,0,50);
            .title{
                
                font-size:@font-size-ms;
            } 
            .desc{
            .margin(10,0,0,0);
            font-size:@font-size-s;
        }
        }
       
    }
</style>