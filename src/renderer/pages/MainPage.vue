<template>
  <div class="container">
    <h1 class="title">MainPage</h1>

    <task-card v-for="(task, i) in tasks" :key="i" :task="task" />

  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue'

export default {
  name: 'main-page',
  components: {
    TaskCard
  },
  data: () => {
    const { getTasks } = require('@/../modules/taskwarrior')

    return { tasks: getTasks() }
  }
}
</script>

