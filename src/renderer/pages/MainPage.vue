<template>
  <div class="container">
    <h1 class="title">Tasks</h1>

    <task-form @reloadTask="reloadTask" />
    <hr>

    <button class="button is-dark" v-on:click="redue()">
      <span class="icon">
        <font-awesome-icon icon="calendar-check" />
      </span>
      <p>Redue</p>
    </button>

    <task-table :tasks="undoneTasks" @reloadTask="reloadTask" />

    <label class="checkbox">
      <input type="checkbox" v-model="showDone">
      show done
    </label>

   <task-table :tasks="doneTasks" @reloadTask="reloadTask" :class="showDone ? '' : 'is-hidden'" />

  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue'
import TaskTable from '@/components/TaskTable.vue'

const { getUndoneTasks, getDoneTasks } = require('@/../modules/taskwarrior')

export default {
  name: 'main-page',
  components: {
    TaskTable,
    TaskForm
  },
  data: () => {
    return {
      undoneTasks: getUndoneTasks(),
      doneTasks: getDoneTasks(),
      showDone: false
    }
  },
  methods: {
    reloadTask () {
      console.log('reload')
      this.undoneTasks = getUndoneTasks()
      this.doneTasks = getDoneTasks()
    },
    redue () {
      const moment = require('moment')
      const { modifyTask } = require('@/../modules/taskwarrior')

      this.undoneTasks
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
