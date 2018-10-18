import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import indexs from '@/components/indexs'


Vue.use(Router)

export default new  Router({
    mode:'history',
    routes:[
        {
          path:'/',
          component:indexs,
          children:[
            {
                path:'/',
                component:index
            },
            {
                path:'/index',
                component:index 
            },
            {
                path:'/toplist/:id',
                component:resolve => require(['../components/toplist.vue'],resolve)
            },
            {
                path:'/playlist',
                component:resolve => require(['../components/playlist.vue'],resolve)
            },
            {
                path:'/playlist_detail/:id',
                component:resolve => require(['../components/playlist_detail.vue'],resolve)
            },
            {
                path:'/songDetail/:id',
                component:resolve => require(['../components/SongDetail.vue'],resolve)
            },
            {
                path:'/newCD',
                component:resolve => require(['../components/NewCD.vue'],resolve)
            },
            {
                path:'/anchor',
                component:resolve => require(['../components/anchor.vue'],resolve)
            },
            {
                path:'/singer',
                component:resolve => require(['../components/Singer.vue'],resolve)
            }
          ]  
        }, 
        {
            path:"/Search",
            component:resolve => require(['../components/Search.vue'],resolve),
            children:[
                {
                    path:"/Search/result/:kword",
                    component:resolve => require(['../components/searchResult.vue'],resolve)
                }
            ]
        }
    ],
    linkActiveClass:'active'
})
