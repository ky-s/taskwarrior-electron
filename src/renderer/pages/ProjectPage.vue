<template>
  <div class="container">
    <h1 class="title">
      <router-link to="/">Tasks</router-link> > {{ this.$route.params.project }}
    </h1>
    <project-links />

    <task-board :options="{ project: this.$route.params.project }"/>
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
  }
}
</script>
