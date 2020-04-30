<template>
  <div class="container">
    <h1 class="title">Tasks</h1>

    <project-links />

    <hr>

    <task-board />
  </div>
</template>

<script>
import ProjectLinks from '@/components/ProjectLinks.vue'
import TaskBoard from '@/components/TaskBoard.vue'

export default {
  name: 'main-page',
  components: {
    ProjectLinks,
    TaskBoard
  }
}
</script>
