import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tasks-page',
      component: require('@/pages/TasksPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
