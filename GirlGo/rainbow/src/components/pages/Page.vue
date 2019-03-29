<template>
    <div>
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from 'common/pheader/Header'
export default {
    components:{
        Header
    }
}
</script>

<style lang="less">
    // @import '~style/index.less'
</style>