<template>
  <span class="control">
    <label class="label">Projects</label>
    <span v-for="project in projects">
      <button
        :class="getProjectClass(project)"
        style="margin-left: 5px"
        @click="setProject(project)">
        <p>{{ project }}</p>
      </button>
    </span>

    <span v-if="this.value">
      <button
        class="button is-rounded is-light"
        style="margin-left: 5px"
        @click="setProject(null)">
        <p>Reset</p>
      </button>
    </span>
  </span>
</template>

<script>
const { getProjects } = require('@/../modules/taskwarrior')

export default {
  props: {
    value: String
  },
  data: function () {
    return {
      projects: getProjects()
    }
  },
  methods: {
    getProjectClass (project) {
      return 'button is-primary is-rounded ' +
        (this.value === project ? '' : 'is-outlined')
    },
    setProject (project) {
      this.$emit('input', project)
    }
  }
}
</script>
