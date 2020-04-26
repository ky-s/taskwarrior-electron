<template>
  <div>
    <div class="field has-addons">
      <div class="control">
          <label class="label">Project</label>
        <input class="input" type="text" placeholder="project">
      </div>
      <div class="control">
        <label class="label">Priority</label>
        <div class="select">
          <select>
            <option value="null"></option>
            <option value="H">High</option>
            <option value="M">Middle</option>
            <option value="L">Low</option>
          </select>
        </div>
      </div>
      <div class="control">
        <label class="label">Tags</label>
        <input class="input" type="text" placeholder="tags">
      </div>
    </div>

    <div class="field has-addons">
      <div class="control">
        <label class="label">Due</label>
        <input class="input" type="text" placeholder="Due">
      </div>
      <div class="control is-expanded">
        <label class="label">Description</label>
        <input class="input" type="text" placeholder="description">
      </div>
      <div class="control">
        <label class="label">Create</label>
        <button class="button">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tasks-form'
}
</script>
