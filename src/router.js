import Vue from 'vue'
import Router from 'vue-router'
import localizeFilter from "@/localize"

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('./views/Home.vue'),
        meta: {
            title: localizeFilter('MenuTitle_Home'),
            layout: 'main-layout',
            showInMenu: true
        }
      },{
        path: '/tasks',
        name: 'tasks',
        component: () => import('./views/Tasks.vue'),
        meta: {
            title: localizeFilter('MenuTitle_Tasks'),
            layout: 'main-layout',
            showInMenu: true
        }
      },{
        path: '/users',
        name: 'users',
        component: () => import('./views/Users.vue'),
        meta: {
            title: localizeFilter('MenuTitle_Users'),
            layout: 'main-layout',
            showInMenu: true
        }
      },{
        path: '/departments',
        name: 'departments',
        component: () => import('./views/Departments.vue'),
        meta: {
            title: localizeFilter('MenuTitle_Departments'),
            layout: 'main-layout',
            showInMenu: true
        }
      }
    ]
  })

  export default router