<template>
  <div>
    <form>
      <div class="field has-addons">
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

        <div class="control">
          <label class="label">Tags</label>
          <input class="input" type="text" placeholder="tags" v-model="task.tags">
        </div>
      </div>

      <div class="field has-addons">
        <div class="control">
          <label class="label">Due</label>
          <input class="input" type="date" placeholder="Due" v-model="task.due">
        </div>

        <div class="control is-expanded">
          <label class="label">Description</label>
          <input class="input" type="text" placeholder="description" v-model="task.description">
        </div>

        <div class="control">
          <label class="label">Save</label>
          <button class="button is-success" v-on:click="save()">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'task-form',
  data () {
    const moment = require('moment')
    const defaultDue = moment().format('YYYY-MM-DD')
    return {
      task: {
        due: defaultDue
      },
      projects: [
        'Electron',
        'Rails'
      ]
    }
  },
  methods: {
    save () {
      console.log(this.task.due)
      if (this.task.uuid !== undefined) {
        const { modifyTask } = require('@/../modules/taskwarrior')
        // TODO
        // modifyTask(this.task.uuid, this.task)
        console.log(modifyTask)
        console.log('update')
        console.log(this.task.description)
      } else {
        const { addTask } = require('@/../modules/taskwarrior')
        addTask(this.task)
        console.log('create')
      }
      this.task.description = ''
      this.$emit('reloadTask')
    }
  }
}
</script>
