import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import book from './book'
let store = new Vuex.Store({
    modules:{
        book
    }
})
export default store