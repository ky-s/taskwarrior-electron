<template>
  <span>
    <label class="checkbox">
      <input type="checkbox" v-model="checked">
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
  data () {
    return { checked: this.value }
  },
  watch: {
    checked: function (checked) {
      this.$emit(
        'input',
        checked ? moment().format('YYYY-MM-DD') : null
      )
    }
  }
}
</script>
