<template>
  <div id="app">
    <router-view/>
    <Details></Details>
  </div>
</template>

<script>
import Details from './components/common/details/details'
export default {
  name: 'App',
  components:{Details}
}
</script>

<style>

</style>
