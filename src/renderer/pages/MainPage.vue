<template>
  <div class="container">
    <h1 class="title">Tasks</h1>
    <task-form @reloadTask="reloadTask" />
    <hr>

    <task-table :tasks="tasks" @reloadTask="reloadTask" />

  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue'
import TaskTable from '@/components/TaskTable.vue'

export default {
  name: 'main-page',
  components: {
    TaskTable,
    TaskForm
  },
  data: () => {
    const { getTasks } = require('@/../modules/taskwarrior')

    return { tasks: getTasks() }
  },
  methods: {
    reloadTask () {
      console.log('reload')
      const { getTasks } = require('@/../modules/taskwarrior')
      this.tasks = getTasks()
    }
  }
}
</script>
