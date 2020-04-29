<template>
  <div class="container">
    <h1 class="title">Tasks > {{ this.$route.params.project }}</h1>
    <router-link to="/">Back</router-link>

    <task-form @reloadTask="reloadTask" :seedTask="{ project: this.$route.params.project }"/>

    <div class="tabs is-fullwidth is-boxed" v-model="activeTab" style="padding-top: 20px">
      <ul>
        <li :class="activeTab == 'todo' ? 'is-active' : ''" v-on:click="activeTab = 'todo'">
          <a>
            <span class="icon">
              <font-awesome-icon icon="list" />
            </span>
            Todo
          </a>
        </li>
        <li :class="activeTab == 'done' ? 'is-active' : ''" v-on:click="activeTab = 'done'">
          <a>
            <span class="icon">
              <font-awesome-icon icon="check-square" />
            </span>
            Done
          </a>
        </li>
      </ul>
    </div>

    <button class="button is-info is-light" v-on:click="reloadTask()">
      <span class="icon">
        <font-awesome-icon icon="sync" />
      </span>
      <p>Refresh</p>
    </button>

    <span :class="activeTab == 'todo' ? '' : 'is-hidden'">
      <button class="button is-danger is-light" v-on:click="redue()">
        <span class="icon">
          <font-awesome-icon icon="calendar-check" />
        </span>
        <p>Overdue to Today</p>
      </button>

      <task-table :tasks="undoneTasks" @reloadTask="reloadTask" />
    </span>

    <span :class="activeTab == 'done' ? '' : 'is-hidden'">
      <task-table :tasks="doneTasks" @reloadTask="reloadTask" />
    </span>

  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue'
import TaskTable from '@/components/TaskTable.vue'

const { getUndoneTasks, getDoneTasks } = require('@/../modules/taskwarrior')

export default {
  name: 'project-page',
  components: {
    TaskTable,
    TaskForm
  },
  data: function () {
    const projectFilter = [`project:${this.$route.params.project}`]

    return {
      undoneTasks: getUndoneTasks(projectFilter),
      doneTasks: getDoneTasks(projectFilter),
      activeTab: 'todo',
      projectFilter: projectFilter
    }
  },
  methods: {
    reloadTask () {
      console.log('reload')
      this.undoneTasks = getUndoneTasks(this.projectFilter)
      this.doneTasks = getDoneTasks(this.projectFilter)
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
