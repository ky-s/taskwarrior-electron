<template>
  <button class="button is-rounded is-danger is-outlined" @click="redue()" v-if="overdueTasks().length > 0">
    <bulma-awesome-icon icon="calendar-check" />
    <p>Overdue to Today</p>
  </button>
</template>

<script>
const { modifyTask } = require('@/../modules/taskwarrior')
const moment = require('moment')

export default {
  props: {
    undoneTasks: Array
  },
  methods: {
    redue () {
      this.overdueTasks()
        .forEach(task => {
          task.due = moment().format('YYYY-MM-DD')
          modifyTask(task.uuid, task)
        })
      this.$emit('reloadTask')
    },
    overdueTasks () {
      const today = moment(
        new Date().setHours(0, 0, 0, 0) // beginning of day
      )

      return this.undoneTasks
        .filter(task => moment(task.due) < today)
    }
  }
}
</script>
