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
        <th style="width: 10%">Edit/Delete</th>
      </tr>
    </thead>
    <tbody v-model="showDone">
      <tr v-for="(task, i) in tasks" :key="i" :class="getRowClass(task)">
        <td>
          <input type="checkbox" :checked="task.status == 'completed'" :disabled="task.status == 'completed'" v-on:change="doneTask(task)">
        </td>
        <td>{{ dateFormat(task.due) }}</td>
        <td>{{ task.project }}</td>
        <td>{{ task.priority }}</td>
        <td>{{ (task.tags || []).join(', ') }}</td>
        <td>{{ task.description }}</td>
        <td>
          <router-link :to="getEditLink(task)">
            <button class="button is-primary">
              <span class="icon">
                <font-awesome-icon icon="edit" />
              </span>
            </button>
          </router-link>
          <button class="button is-danger" v-on:click="deleteTask(task)">
            <span class="icon">
              <font-awesome-icon icon="trash" />
            </span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'tasks-table',
  props: {
    tasks: Array,
    showDone: Boolean
  },
  methods: {
    getRowClass (task) {
      if (task.status === 'completed') {
        return this.showDone ? 'has-background-grey-light' : 'is-hidden'
      }

      const moment = require('moment')
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

      return ''
    },
    getEditLink (task) {
      return `/edit/${task.uuid}`
    },
    dateFormat (due) {
      const moment = require('moment')
      return moment(due).format('YYYY-MM-DD')
    },
    doneTask (task) {
      const { doneTask } = require('@/../modules/taskwarrior')
      if (doneTask(task.uuid)) {
        this.$emit('reloadTask')
      }
    },
    deleteTask (task) {
      if (window.confirm('Are you sure?')) {
        const { deleteTask } = require('@/../modules/taskwarrior')
        if (deleteTask(task.uuid)) {
          this.$emit('reloadTask')
        }
      }
    }
  }
}
</script>
