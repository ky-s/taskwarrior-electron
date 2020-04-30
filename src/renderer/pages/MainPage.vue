<template>
  <div class="container">
    <h1 class="title">Tasks</h1>

    <span>
      <router-link to="/tasks">
        <button class="button is-primary is-small" style="margin-left: 5px">
          <p>Tasks</p>
        </button>
      </router-link>
    </span>

    <project-links />

    <hr>

    <task-board :options="options" :key="options.due" />
  </div>
</template>

<script>
import ProjectLinks from '@/components/ProjectLinks.vue'
import TaskBoard from '@/components/TaskBoard.vue'

export default {
  name: 'main-page',
  components: {
    ProjectLinks,
    TaskBoard
  },
  data: function () {
    const options = this.$route.query || {}

    return { options: options }
  },
  watch: { // for re-render this
    '$route' (to, from) {
      this.options = to.query || {}
    }
  }
}
</script>
