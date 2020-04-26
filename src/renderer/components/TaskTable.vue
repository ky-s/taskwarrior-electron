<template>
  <div>
    <label class="checkbox">
      <input type="checkbox" v-model="showDone">
      show done
    </label>

    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th><abbr title="due">Due</abbr></th>
          <th><abbr title="project">Project</abbr></th>
          <th><abbr title="priority">Priority</abbr></th>
          <th><abbr title="tags">Tags</abbr></th>
          <th><abbr title="description">Description</abbr></th>
        </tr>
      </thead>
      <tbody v-model="showDone">
        <tr v-for="(task, i) in tasks" :key="i" :class="getRowClass(task)">
          <td>{{ task.due }}</td>
          <td>{{ task.project }}</td>
          <td>{{ task.priority }}</td>
          <td>{{ (task.tags || []).join(', ') }}</td>
          <td>{{ task.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'tasks-table',
  props: { tasks: Array },
  data: () => {
    return { showDone: false }
  },
  methods: {
    getRowClass (task) {
      if (task.status === 'completed') {
        if (this.showDone) {
          return 'has-background-grey-light'
        }
        return 'is-hidden'
      }

      return ''
    }
  }
}
</script>
