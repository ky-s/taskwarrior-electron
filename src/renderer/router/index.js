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
      path: '/project/:project',
      name: 'project-page',
      component: require('@/pages/ProjectPage').default
    },
    {
      path: '/tasks',
      name: 'tasks-page',
      component: require('@/pages/TasksPage').default
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
