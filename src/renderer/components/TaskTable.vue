<template>
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
    <tbody>
      <tr v-for="(task, i) in tasks" :key="i" :task="task" :class="getRowClass(task)">
        <td>{{ task.due }}</td>
        <td>{{ task.project }}</td>
        <td>{{ task.priority }}</td>
        <td>{{ task.tags }}</td>
        <td>{{ task.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'tasks-table',
  props: { tasks: Array },
  methods: {
    getRowClass (task) {
      if (task.status === 'completed') {
        return 'has-background-grey-light'
      }

      return ''
    }
  }
}
</script>
