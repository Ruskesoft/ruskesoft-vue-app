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
        name: 'tasks',
        component: () => import('./views/Tasks.vue'),
        meta: {
            title: localizeFilter('Tasks'),
            layout: 'main-layout',
            showInMenu: true
        }
      },{
        path: '/employees',
        name: 'employees',
        component: () => import('./views/Employees.vue'),
        meta: {
            title: localizeFilter('Employees'),
            layout: 'main-layout',
            showInMenu: true
        }
      },{
        path: '/departments',
        name: 'departments',
        component: () => import('./views/Departments.vue'),
        meta: {
            title: localizeFilter('Departments'),
            layout: 'main-layout',
            showInMenu: true
        }
      },{
        path: '/positions',
        name: 'positions',
        component: () => import('./views/Positions.vue'),
        meta: {
            title: localizeFilter('Positions'),
            layout: 'main-layout',
            showInMenu: true
        }
      },{
        path: '/users',
        name: 'users',
        component: () => import('./views/Users.vue'),
        meta: {
            title: localizeFilter('Users'),
            layout: 'main-layout',
            showInMenu: true
        }
      }
    ]
  })

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + " | " + localizeFilter('AppTitle');
  next()
})

export default router