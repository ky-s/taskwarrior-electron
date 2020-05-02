<template>
  <div class="tabs is-fullwidth is-toggle" style="padding-top: 20px">
    <ul>
      <li :class="value == 'todo' ? 'is-active' : ''" @click="setActiveTab('todo')">
        <a>
          <bulma-awesome-icon icon="list" />
          Todo
        </a>
      </li>
      <li :class="value == 'done' ? 'is-active' : ''" @click="setActiveTab('done')">
        <a>
          <bulma-awesome-icon icon="check-square" />
          Done
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    setActiveTab (tab) {
      this.$emit('input', tab)
    }
  }
}
</script>

