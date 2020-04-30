<template>
  <div>
    <task-form @reloadTask="reloadTask" :seedTask="seedTask" />

    <div class="tabs is-fullwidth is-toggle" style="padding-top: 20px">
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
      <button class="button is-danger is-light" v-on:click="redue()" v-if="overdueTasks().length > 0">
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

const { getUndoneTasks, getDoneTasks, modifyTask } = require('@/../modules/taskwarrior')
const moment = require('moment')

export default {
  components: {
    TaskTable,
    TaskForm
  },
  props: {
    filters: Object
  },
  data: function () {
    const filterOptions = this.filterOptions()

    return {
      seedTask: this.filters || {},
      undoneTasks: getUndoneTasks(filterOptions),
      doneTasks: getDoneTasks(filterOptions),
      activeTab: 'todo'
    }
  },
  methods: {
    reloadTask () {
      console.log('reload')
      const filterOptions = this.filterOptions()

      this.undoneTasks = getUndoneTasks(filterOptions)
      this.doneTasks = getDoneTasks(filterOptions)
    },
    redue () {
      this.overdueTasks()
        .forEach(task => {
          task.due = moment().format('YYYY-MM-DD')
          modifyTask(task.uuid, task)
        })
      this.reloadTask()
    },
    overdueTasks () {
      const today = moment(
        new Date().setHours(0, 0, 0, 0) // beginning of day
      )

      return this.undoneTasks
        .filter(task => moment(task.due) < today)
    },
    filterOptions () {
      const filters = this.filters
      return Object.keys(filters).reduce(
        (acc, key) => acc.concat(`${key}:${filters[key]}`),
        [])
    }
  }
}
</script>
