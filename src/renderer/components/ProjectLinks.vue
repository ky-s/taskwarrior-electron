<template>
  <div>
    <span>projects:</span>
    <span v-for="project in projects">
      <router-link :to="`/project/${project}`">
        <button class="button is-outlined is-link is-small" style="margin-left: 5px">
          <p>{{ project }}</p>
        </button>
      </router-link>
    </span>
  </div>
</template>

<script>
const { getProjects } = require('@/../modules/taskwarrior')

export default {
  data: () => {
    return { projects: getProjects() }
  }
}
</script>
