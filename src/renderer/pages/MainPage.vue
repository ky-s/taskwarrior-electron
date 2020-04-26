<template>
  <div class="container">
    <h1 class="title">Tasks</h1>

    <task-table :tasks="tasks"/>

  </div>
</template>

<script>
import TaskTable from '@/components/TaskTable.vue'

export default {
  name: 'main-page',
  components: {
    TaskTable
  },
  data: () => {
    const { getTasks } = require('@/../modules/taskwarrior')

    return { tasks: getTasks() }
  },
  methods: {
    getRowClass (task) {
      if (task.status === 'completed') {
        return 'has-background-grey-light'
      }

      return ''
    }
  }
}
</script>

