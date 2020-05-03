<template>
  <article :class="getArticleClass">
    <div class="message-header">
      {{ task.uuid ? `Edit: uuid=${task.uuid}` : 'New' }}
      <button class="delete" @click="task.uuid = null" v-if="task.uuid" />
    </div>

    <div class="message-body">
      <form>
        <div class="field has-addons">
          <div class="control">
            <label class="label">Due</label>
            <input class="input" type="date" placeholder="Due" v-model="task.due">
          </div>

          <div class="control">
            <label class="label">Project</label>
            <input class="input" type="text" placeholder="project" list="project-list" v-model="task.project">
            <datalist id="project-list">
              <option v-for="project in projects" :value="project "/>
            </datalist>
          </div>

          <div class="control">
            <label class="label">Priority</label>
            <div class="select">
              <select v-model="task.priority">
                <option value="null"></option>
                <option value="H">High</option>
                <option value="M">Middle</option>
                <option value="L">Low</option>
              </select>
            </div>
          </div>

          <div class="control is-expanded">
            <label class="label">Tags</label>
            <input class="input" type="text" placeholder="tags" v-model="task.tags">
          </div>
        </div>

        <div class="field has-addons">
          <div class="control is-expanded">
            <label class="label">Description</label>
            <input class="input" type="text" placeholder="description" v-model="task.description" v-focus>
          </div>

          <div class="control">
            <label class="label">Save</label>
            <button class="button is-success" @click="save()" style="width: 60px">
              <bulma-awesome-icon icon="save" />
            </button>
          </div>

          <div class="control">
            <label class="label">Clear</label>
            <button class="button is-light" @click="clear()" style="width: 60px">
              <bulma-awesome-icon icon="eraser" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </article>
</template>

<script>
const {
  getProjects,
  addTask,
  modifyTask
} = require('@/../modules/taskwarrior')
const moment = require('moment')

export default {
  name: 'task-form',
  props: {
    seedTask: Object
  },

  data () {
    var task = {
      due: moment().format('YYYY-MM-DD'),
      project: '',
      priority: '',
      tags: '',
      description: ''
    }

    if (this.seedTask) {
      task = Object.assign(task, this.seedTask)
      task.due = moment(this.seedTask.due).format('YYYY-MM-DD')
    }

    return {
      task: task,
      projects: getProjects()
    }
  },

  computed: {
    getArticleClass () {
      return [
        'message',
        (this.task.uuid ? 'is-warning' : 'is-info')
      ]
    }
  },

  methods: {
    save () {
      if (this.task.uuid) {
        console.log('update')
        modifyTask(this.task.uuid, this.task)
      } else {
        console.log('create')
        addTask(this.task)
      }
      this.task.uuid = null
      this.task.description = ''
      this.$emit('reloadTask')
    },
    clear () {
      // 日付と Project はそのままがいいので clear しない
      this.task.priority = ''
      this.task.tags = ''
      this.task.description = ''
    }
  }
}
</script>
