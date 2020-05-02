<template>
  <span>
    <label class="checkbox">
      <input type="checkbox" id="checkbox-today" @change="toggle()">
      Today Only
    </label>
  </span>
</template>

<script>
const moment = require('moment')

export default {
  props: {
    value: String
  },
  methods: {
    toggle () {
      const checked = document.getElementById('checkbox-today').checked

      this.$emit('input', checked ? moment().format('YYYY-MM-DD') : null)
    }
  }
}
</script>
