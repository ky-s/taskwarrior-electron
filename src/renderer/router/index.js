import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/pages/MainPage').default
    },
    {
      path: '/edit/:uuid',
      name: 'edit-page',
      component: require('@/pages/EditPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
