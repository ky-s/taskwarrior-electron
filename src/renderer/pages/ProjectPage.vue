<template>
  <div class="container" v-model="options">
    <h1 class="title">
      <router-link to="/">Tasks</router-link> [{{ options.project }}]
    </h1>
    <project-links :current="options.project" />

    <hr>

    <task-board :options="options" :key="options.project" />
  </div>
</template>

<script>
import ProjectLinks from '@/components/ProjectLinks.vue'
import TaskBoard from '@/components/TaskBoard.vue'

export default {
  name: 'project-page',
  components: {
    ProjectLinks,
    TaskBoard
  },
  data: function () {
    return {
      options: {
        project: this.$route.params.project
      }
    }
  },
  watch: { // for re-render this
    // /project/a => /project/b のときに
    // task-board が re-render されないので
    // task-board に :key 属性をつけておいて、
    // :key を変更してやる必要がある
    '$route' (to, from) {
      this.options.project = to.params.project
    }
  }
}
</script>
