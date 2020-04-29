<template>
  <div class="container">
    <h1 class="title">Tasks</h1>

    <task-form @reloadTask="reloadTask" />

    <div class="tabs is-fullwidth is-boxed" v-model="activeTab" style="padding-top: 20px">
      <ul>
        <li :class="activeTab == 'todo' ? 'is-active' : ''" v-on:click="activeTab = 'todo'">
          <a>Todo</a>
        </li>
        <li :class="activeTab == 'done' ? 'is-active' : ''" v-on:click="activeTab = 'done'">
          <a>Done</a>
        </li>
      </ul>
    </div>

    <button class="button is-light is-pulled-right" v-on:click="reloadTask()">
      Refresh
    </button>

    <div :class="activeTab == 'todo' ? '' : 'is-hidden'">
      <button class="button is-dark" v-on:click="redue()">
        <span class="icon">
          <font-awesome-icon icon="calendar-check" />
        </span>
        <p>Overdue to Today</p>
      </button>

      <task-table :tasks="undoneTasks" @reloadTask="reloadTask" />
    </div>

    <div :class="activeTab == 'done' ? '' : 'is-hidden'">
      <task-table :tasks="doneTasks" @reloadTask="reloadTask" />
    </div>

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
      activeTab: 'todo'
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
