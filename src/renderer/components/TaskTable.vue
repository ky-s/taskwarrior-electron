<template>
  <table class="table is-fullwidth is-hoverable">
    <thead>
      <tr>
        <th style="width: 5%"><abbr title="done">Done</abbr></th>
        <th style="width: 10%"><abbr title="due">Due</abbr></th>
        <th style="width: 10%"><abbr title="project">Project</abbr></th>
        <th style="width: 5%"><abbr title="priority">Priority</abbr></th>
        <th style="width: 10%"><abbr title="tags">Tags</abbr></th>
        <th><abbr title="description">Description</abbr></th>
        <th style="width: 10%"><abbr title="edit-dealete">Edit/Delete</abbr></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, i) in tasks" :key="i" :class="getRowClass(task)">
        <td>
          <input type="checkbox" :id="`checkbox-${task.uuid}`" :checked="task.status == 'completed'" @change="doneOrUndoneTask(task)">
        </td>
        <td>{{ dateFormat(task.due) }}</td>
        <td>{{ task.project }}</td>
        <td>{{ task.priority }}</td>
        <td>{{ (task.tags || []).join(', ') }}</td>
        <td>{{ task.description }}</td>
        <td>
          <router-link :to="getEditLink(task)">
            <button class="button is-primary">
              <bulma-awesome-icon icon="edit" />
            </button>
          </router-link>
          <button class="button is-danger" @click="deleteTask(task)">
            <bulma-awesome-icon icon="trash" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const { doneTask, undoneTask, deleteTask, findTask } = require('@/../modules/taskwarrior')
const moment = require('moment')

export default {
  name: 'tasks-table',
  props: {
    tasks: Array
  },
  methods: {
    getRowClass (task) {
      if (task.status === 'completed') {
        return 'has-background-grey-light'
      }

      if (task.due !== null) {
        const due = moment(task.due)
        const today = moment()

        if (due.isBefore(moment())) {
          if (due.year === today.year &&
              due.month === today.month &&
              due.date() === today.date()) {
            // due = today
            return 'has-text-weight-bold'
          } else {
            // due < today (overdue)
            return 'has-text-weight-bold has-background-warning'
          }
        }
      }

      return ''
    },
    getEditLink (task) {
      return `/edit/${task.uuid}`
    },
    dateFormat (due) {
      if (due) {
        return moment(due).format('YYYY-MM-DD')
      }
      return ''
    },
    doneOrUndoneTask (task) {
      const checkbox = document.getElementById(`checkbox-${task.uuid}`)

      if (checkbox.checked) {
        doneTask(task.uuid)
      } else {
        undoneTask(task.uuid)
      }
      Object.assign(task, findTask(task.uuid))
    },
    deleteTask (task) {
      if (window.confirm('Are you sure?')) {
        if (deleteTask(task.uuid)) {
          this.$emit('reloadTask')
        }
      }
    }
  }
}
</script>
