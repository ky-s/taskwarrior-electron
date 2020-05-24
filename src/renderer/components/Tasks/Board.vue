<template>
  <div>
    <task-form
      :seedTask="seedTask"
      @reloadTask="reloadTask"
      :key="formRerender">
    </task-form>

    <article class="message is-link">
      <div class="message-header">
        Task List: {{ filters.project || 'ALL' }}
      </div>
      <div class="message-body">
        <task-tabs>

          <template v-slot:shared>
            <button
              class="button is-rounded is-info is-outlined"
              @click="reloadTask()">
              <bulma-awesome-icon icon="sync" />
              <p>Refresh</p>
            </button>
          </template>

          <template v-slot:todo>
            <overdue-to-today-button
              :undoneTasks="undoneTasks"
              @reloadTask="reloadTask">
            </overdue-to-today-button>

            <task-table
              :tasks="undoneTasks"
              @reloadTask="reloadTask"
              @setForm="setForm"
              style="margin-top: 20px">
            </task-table>
          </template>

          <template v-slot:done>
            <task-table
              :tasks="doneTasks"
              @reloadTask="reloadTask"
              @setForm="setForm"
              style="margin-top: 20px">
            </task-table>
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
import OverdueToTodayButton from '@/components/OverdueToTodayButton.vue'

const {
  getUndoneTasks,
  getDoneTasks,
  findTask
} = require('@/../modules/taskwarrior')

export default {
  components: {
    TaskForm,
    TaskTabs,
    TaskTable,
    OverdueToTodayButton
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
      const newSeedTask = uuid ? findTask(uuid) : (this.filters || {})

      this.seedTask = Object.assign({}, this.seedTask, newSeedTask)
      console.log(this.seedTask)
      this.formRerender++
    }
  }
}
</script>
