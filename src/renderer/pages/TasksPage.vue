<template>
  <div class="container" :key="rerender">
    <h1 class="title">Taskwarrior</h1>

    <select-project v-model="filters.project" />
    <check-box-today-only v-model="filters.due" class="is-pulled-right" />

    <task-board :filters="rejectNull(filters)" style="padding-top: 20px" />
  </div>
</template>

<script>
import SelectProject from '@/components/SelectProject.vue'
import CheckBoxTodayOnly from '@/components/CheckBoxTodayOnly.vue'
import TaskBoard from '@/components/Tasks/Board.vue'

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
    rejectNull (obj) {
      return Object.keys(obj)
        .filter(key =>
          obj[key] !== null &&
          obj[key] !== undefined
        )
        .reduce((acc, key) => {
          acc[key] = obj[key]
          return acc
        }, {})
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
