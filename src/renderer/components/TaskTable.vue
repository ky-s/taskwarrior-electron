<template>
  <div>
    <label class="checkbox">
      <input type="checkbox" v-model="showDone">
      show done
    </label>

    <button class="button is-warning" v-on:click="redue()">Redue</button>

    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th><abbr title="done">Done</abbr></th>
          <th><abbr title="due">Due</abbr></th>
          <th><abbr title="project">Project</abbr></th>
          <th><abbr title="priority">Priority</abbr></th>
          <th><abbr title="tags">Tags</abbr></th>
          <th><abbr title="description">Description</abbr></th>
          <th></th>
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
              <button class="button is-link">Edit</button>
            </router-link>
            <button class="button is-danger" v-on:click="deleteTask(task)">Delete</button>
          </td>
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

      const moment = require('moment')
      const due = moment(task.due)

      if (due.isBefore(moment())) {
        return 'has-text-weight-bold has-background-warning'
      } else if (due === moment()) {
        return 'has-text-weight-bold'
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
    redue () {
      const moment = require('moment')
      const { modifyTask } = require('@/../modules/taskwarrior')

      this.tasks.filter(task => { return task.status !== 'completed' })
        .forEach(task => {
          if (moment(task.due) < moment()) {
            task.due = moment().format('YYYY-MM-DD')
            modifyTask(task.uuid, task)
          }
        })
      this.$emit('reloadTask')
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
