<template>
  <div>
    <task-form :seedTask="seedTask" @reloadTask="reloadTask" :key="formRerender" />

    <article class="message is-link">
      <div class="message-header">
        Task List: {{ filters.project || 'ALL' }}
      </div>
      <div class="message-body">
        <task-tabs>

          <template v-slot:shared>
            <button class="button is-rounded is-info is-outlined" @click="reloadTask()">
              <bulma-awesome-icon icon="sync" />
              <p>Refresh</p>
            </button>
          </template>

          <template v-slot:todo>
            <button class="button is-rounded is-danger is-outlined" @click="redue()" v-if="overdueTasks().length > 0">
              <bulma-awesome-icon icon="calendar-check" />
              <p>Overdue to Today</p>
            </button>

            <task-table :tasks="undoneTasks" @reloadTask="reloadTask" @setForm="setForm" style="margin-top: 20px" />
          </template>

          <template v-slot:done>
            <task-table :tasks="doneTasks" @reloadTask="reloadTask" @setForm="setForm" style="margin-top: 20px" />
          </template>

        </task-tabs>
      </div>
    </article>
  </div>
</template>

<script>
import TaskForm from '@/components/Tasks/Form.vue'
import TaskTabs from '@/components/Tasks/Tabs.vue'
import TaskTable from '@/components/Tasks/Table.vue'

const { getUndoneTasks, getDoneTasks, modifyTask, findTask } = require('@/../modules/taskwarrior')
const moment = require('moment')

export default {
  components: {
    TaskForm,
    TaskTabs,
    TaskTable
  },
  props: {
    filters: Object
  },
  data: function () {
    const filterOptions = this.filterOptions()

    console.log(this.filters)

    return {
      seedTask: this.filters || {},
      formRerender: 0,
      undoneTasks: getUndoneTasks(filterOptions),
      doneTasks: getDoneTasks(filterOptions)
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
      return Object.keys(filters).reduce((acc, key) => {
        if ((filters[key] !== null) && (filters[key] !== undefined)) {
          acc = acc.concat(`${key}:${filters[key]}`)
        }
        return acc
      }, [])
    },
    setForm (uuid) {
      this.seedTask = uuid ? findTask(uuid) : (this.filters || {})
      this.formRerender++
    }
  }
}
</script>
