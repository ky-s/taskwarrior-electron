<template>
  <div>
    <span>projects:</span>
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

export default {
  props: {
    current: String
  },
  data: () => {
    return { projects: getProjects() }
  },
  methods: {
    getProjectClass (project) {
      return 'button is-primary is-small ' +
        (this.current === project ? '' : 'is-outlined')
    }
  }
}
</script>
