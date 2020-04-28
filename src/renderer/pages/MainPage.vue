<template>
  <div class="container">
    <h1 class="title">Tasks</h1>

    <task-form @reloadTask="reloadTask" />
    <hr>

    <label class="checkbox">
      <input type="checkbox" v-model="showDone">
      show done
    </label>

    <button class="button is-dark" v-on:click="redue()">
      <span class="icon">
        <font-awesome-icon icon="calendar-check" />
      </span>
      <p>Redue</p>
    </button>

    <task-table :tasks="tasks" :showDone="showDone" @reloadTask="reloadTask" />

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

    return {
      tasks: getTasks(),
      showDone: false
    }
  },
  methods: {
    reloadTask () {
      console.log('reload')
      const { getTasks } = require('@/../modules/taskwarrior')
      this.tasks = getTasks()
    },
    redue () {
      const moment = require('moment')
      const { modifyTask } = require('@/../modules/taskwarrior')

      this.tasks.filter(task => { return task.status !== 'completed' })
        .forEach(task => {
          if (moment(task.due) < moment()) {
            task.due = moment().format('YYYY-MM-DD')
            modifyTask(task.uuid, task)
          }
        })
      this.reloadTask()
    }
  }
}
</script>
