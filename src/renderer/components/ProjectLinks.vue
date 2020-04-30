<template>
  <div>
    <span>
      <router-link to="/">
        <button class="button is-primary is-small" style="margin-left: 5px">
          <p>ALL</p>
        </button>
      </router-link>
    </span>

    <span>
      <router-link :to="`/?due=${today}`">
        <button class="button is-primary is-small" style="margin-left: 5px">
          <p>Today</p>
        </button>
      </router-link>
    </span>

    <span class="has-text-weight-semibold">Projects:</span>
    <span v-for="project in projects">
      <router-link :to="`/project/${project}`">
        <button :class="getProjectClass(project)" style="margin-left: 5px">
          <p>{{ project }}</p>
        </button>
      </router-link>
    </span>
  </div>
</template>

<script>
const { getProjects } = require('@/../modules/taskwarrior')
const moment = require('moment')

export default {
  props: {
    current: String
  },
  data: () => {
    return {
      today: moment().format('YYYY-MM-DD'),
      projects: getProjects()
    }
  },
  methods: {
    getProjectClass (project) {
      return 'button is-primary is-small ' +
        (this.current === project ? '' : 'is-outlined')
    }
  }
}
</script>
