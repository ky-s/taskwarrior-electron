<template>
  <div class="container">
    <h1 class="title">Tasks</h1>

    <label class="checkbox is-pulled-right">
      <input type="checkbox" id="checkbox-today" v-on:change="updateFilters()">
      TodayOnly
    </label>

    <span class="has-text-weight-semibold">Projects:</span>
    <span v-for="project in projects">
      <button :class="getProjectClass(project)" style="margin-left: 5px" v-on:click="setProject(project)">
        <p>{{ project }}</p>
      </button>
    </span>

    <span v-if="this.filters.project">
      <button class="button is-light is-small" style="margin-left: 5px" v-on:click="setProject(null)">
        <p>Reset</p>
      </button>
    </span>

    <hr>

    <task-board :filters="filters" :key="rerender" />
  </div>
</template>

<script>
import TaskBoard from '@/components/TaskBoard.vue'
const { getProjects } = require('@/../modules/taskwarrior')
const moment = require('moment')

export default {
  name: 'tasks-page',
  components: {
    TaskBoard
  },
  data: function () {
    return {
      filters: {},
      projects: getProjects(),
      rerender: 0
    }
  },
  methods: {
    getProjectClass (project) {
      return 'button is-primary is-small ' +
        (this.filters.project === project ? '' : 'is-outlined')
    },
    updateFilters () {
      if (document.getElementById('checkbox-today').checked) {
        this.filters.due = moment().format('YYYY-MM-DD')
      } else {
        delete this.filters.due
      }

      this.rerender++
    },
    setProject (project) {
      if (project) {
        this.filters.project = project
      } else {
        delete this.filters.project
      }
      this.rerender++
    }
  }
}
</script>
