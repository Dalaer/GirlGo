<template>
        <div class="header">
            <div class="icofont-rounded-left" @click="goBack"></div>
            <span>{{context}}</span>
            <div class="icofont-ui-home" @click="goHome"></div>
        </div>
</template>

<script>
import '@/icofont1/icofont.min.css';
export default {
    data(){
        return{
            list:[],
            context:''
        }
    },
    methods:{
        goBack(){
            this.$router.back();
        },
        // 到首页
        goHome(){
            this.$router.push({name:'home'});
        }
    },
    watch:{
        $route(to,from){
            switch(to.path){
                case '/page/categray':this.context='分类';break;
                case '/page/categray/categrayDetail':this.context=Object.keys(this.$route.params.data)[0];break;
                case '/page/booklist':this.context='书单';break;
                case '/page/booklist/listdetail':this.context=this.$route.params.sdesc;break;
                case '/page/channel/2':this.context='男生频道';break;
                case '/page/channel/3':this.context='女生专区';break;
                case '/page/rank':this.context='排行';break;
                case '/page/rank/rankpage':this.context=this.$route.params.title;break;
            }
        }
    },
    created(){
        switch(this.$route.path){
            case '/page/categray' : this.context='分类';break;
            case '/page/categray/categrayDetail' : this.context=Object.keys(this.$route.params.data)[0];break;
            case '/page/booklist':this.context='书单';break;
            case '/page/booklist/listdetail':this.context=this.$route.params.sdesc;break;
            case '/page/channel/2':this.context='男生频道';break;
            case '/page/channel/3':this.context='女生专区';break;
            case '/page/rank':this.context='排行';break;
            case '/page/rank/rankpage':this.context=this.$route.params.title;break;    
        }
    }
}
</script>

<style lang="less" scope>
    @import '~style/index.less';
    .header{
        .h(44);
        display:flex;
        justify-content:space-between;
        .l_h(44);
        text-align:center;
        .padding(0,10,0,10);
        font-size:@font-size-m;
        color:@font-color-header;
        border-bottom:1px solid @border-bottom;
        div{
            .l_h(44);
            color:@icon-color-header;
        }
    }
</style>