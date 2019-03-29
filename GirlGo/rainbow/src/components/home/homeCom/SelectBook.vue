<template>
    <div class="bookList">
        <ul>
            <li v-for='(item,index) in list' :key="index">
                <div class="left-text">
                    <h3>{{item.title}}</h3>
                    <p>{{item.sdesc}}</p>
                    <div class="squral-tag">
                        <span v-for="(tag,ind) in item.tags" :key="ind">
                            {{tag}}
                        </span>
                    </div>
                </div>
                <div class="right-img">
                    <div v-for="(img,index1) in item.imgs" :key='index1'>
                        <img :src="img.cover" alt="" >
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
            list:[]
        }
    },
    methods:{
        getData(data){
            let arr = [];
            let con = data.data;
            for( let i = 0 , length = con.length;i<length;i++ ){
                arr.push({
                    title:con[i].title,
                    sdesc:con[i].sdesc,
                    tags:con[i].tags.split(','),
                    sid:con[i].id,
                    imgs:con[i].items
                })
            }
            this.list = arr;
        }
    },
    created(){
        let bookListStr = '&timestamp=1551964757&func_id=12%2C33%2C11%2C28%2C33%2C12%2C33%2C11%2C19&orderid=31%2C32%2C33%2C34%2C35%2C36%2C37%2C38%2C39&sign=8B437FAC68764D298872E5BC181F0826'
        let url = `/home/eva_bookstore/v1/module/query?appId=1&pageId=1&userId=8000000&type=2&key=shuqiapi&resetcache=&channelId=&versionId=&ver=&shuqi_h5=&md5key=&resetcache=${bookListStr}`
        this.$axios.get(url)
        .then((data)=>{
            let listData = data.data.data.module;
            let context = listData.find(v=>v.m_s_name==='精选书单'&&v.content.data);
            this.getData(context.content)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
</script>

<style lang="less" scoped>
    @import '~style/index.less';
    .bookList{
        ul{
            .padding(0,0,0,16);
            li{
                .padding(20,16,20,0);
                list-style:none;
                display:flex;
                border-bottom:1px solid @border-bottom;
                .left-text{
                    .margin(0,16,0,0);
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
                        font-size:@font-size-m;
                        color:@font-color-header;
                        font-weight:normal;
                    }
                    p{
                        .margin(11,0,8,0);
                        .h(36);
                        overflow:hidden;
                        text-overflow:ellipsis;
                        .l_h(18);
                        font-size:@font-size-s;
                        color:@font-color-categray-header;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                }
                .right-img{
                    .margin(11,0,0,0);
                    .w(84);
                    .h(80);
                    position:relative;
                    div{
                        position:absolute;
                        .top(20);
                        .w(45);
                        .h(60);
                        z-index:20;
                        img{
                            width:100%;
                            border:1px solid @home-img-border;
                            box-sizing:border-box;
                        }
                    }
                    div:nth-child(1){
                        .left(0);
                    }
                    div:nth-child(2){
                        .top(0);
                        .bottom(0);
                        .w(60);
                        .h(80);
                        left:50%;
                        transform:translateX(-50%);
                        z-index:21;
                    }
                    div:nth-child(3){
                        .right(0)
                    }
                }
            }
        }
    }
</style>