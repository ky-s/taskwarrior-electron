<template>
  <div class="container">
    <h1 class="title">Tasks</h1>

    <check-box-today-only v-model="filters.due" class="is-pulled-right" />

    <select-project v-model="filters.project" />

    <hr>

    <task-board :filters="filters" :key="rerender" />
  </div>
</template>

<script>
import SelectProject from '@/components/SelectProject.vue'
import CheckBoxTodayOnly from '@/components/CheckBoxTodayOnly.vue'
import TaskBoard from '@/components/TaskBoard.vue'
const moment = require('moment')

export default {
  name: 'tasks-page',
  components: {
    SelectProject,
    CheckBoxTodayOnly,
    TaskBoard
  },
  data: function () {
    return {
      filters: {},
      rerender: 0
    }
  },
  methods: {
    toggleTodayFilter () {
      if (document.getElementById('checkbox-today').checked) {
        this.filters.due = moment().format('YYYY-MM-DD')
      } else {
        delete this.filters.due
      }
    },
    reload () {
      this.rerender++
    }
  },
  watch: {
    filters: {
      handler: function () {
        this.rerender++
      },
      deep: true
    }
  }
}
</script>
