<template>
  <div class="container" v-model="options">
    <h1 class="title">
      <router-link to="/">Tasks</router-link> > {{ options.project }}
    </h1>
    <project-links />

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
  watch: {
    '$route' (to, from) {
      this.options.project = to.params.project
    }
  }
}
</script>
