<template>
  <div v-model="task">
    <form>
    <div class="field has-addons">
      <div class="control">
        <label class="label">Project</label>
        <input class="input" type="text" placeholder="project" list="project-list" :value="task.project">
        <datalist id="project-list">
          <option v-for="project in projects" :value="project "/>
        </datalist>
      </div>

      <div class="control">
        <label class="label">Priority</label>
        <div class="select">
          <select :value="task.priority">
            <option value="null"></option>
            <option value="H">High</option>
            <option value="M">Middle</option>
            <option value="L">Low</option>
          </select>
        </div>
      </div>

      <div class="control">
        <label class="label">Tags</label>
        <input class="input" type="text" placeholder="tags" :value="task.tags">
      </div>
    </div>

    <div class="field has-addons">
      <div class="control">
        <label class="label">Due</label>
        <input class="input" type="date" placeholder="Due" :value="task.due">
      </div>

      <div class="control is-expanded">
        <label class="label">Description</label>
        <input class="input" type="text" placeholder="description" :value="task.description">
      </div>

      <div class="control">
        <label class="label">Create</label>
        <button class="button">Create</button>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'tasks-form',
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
  }
}
</script>
