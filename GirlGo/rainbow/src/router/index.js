import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Page from  '@/components/pages/Page'
const Categray  = ()=>import('pages/Categray/Categray')
const CategrayDetail = ()=>import('pages/Categray/CategrayDetail')
const Booklist=()=>import('@/components/pages/Booklist/Booklist.vue')
const listDetail=()=>{return import('@/components/pages/Booklist/listDetail/listDetail.vue')}
const Channel = ()=> import('@/components/pages/Channel/Channel.vue') 
const Rank =()=>import('@/components/pages/Rank/Rank')
const Rankpage = ()=>import('@/components/pages/Rank/Rankpage') 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/page',
      name:'page',
      component:Page,
      children:[
        {
          path:'categray',
          name:'categray',
          component:Categray,
          children:[
            {
              path:'categrayDetail',
              name:'categrayDetail',
              component:CategrayDetail,
              beforeEnter:((to,from,next)=>{
                if(!Object.keys(to.params.data)[0]){
                  router.push({name:'categray'})
                }else{
                  next()
                }
              })
            }
          ]
        },
        {
          path:"booklist",
          name:'booklist',
          component:Booklist,
          children:[
            {
              path:"listdetail",
              name:'listdetail',
              component:listDetail,
              beforeEnter:((to,from,next)=>{
                if(!to.params.sid){
                  router.push({name:'booklist'})
                }else{
                  next()
                }
              })
            }
          ]
        },
        {
          path:'channel/:num',
          name:'channel',
          component:Channel
        },
        {
          path:"rank",
          name:'rank',
          component:Rank,
          children:[{
            path:'rankpage',
            name:'rankpage',
            component:Rankpage
          }]
        }
      ]
    },

    {
      path:'/',
      redirect:'/home'
    }
  ]
})
