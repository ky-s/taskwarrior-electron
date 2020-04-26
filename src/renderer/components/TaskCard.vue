<template>
  <div :class="getCardClass(task)" :v-model="task">
    <div class="card-content">
      <div class="columns">
        <div class="column">
          <strong>{{ task.due }}</strong>
        </div>
        <div class="column">
          {{ task.project }}
        </div>
        <div class="column">
          {{ task.priority }}
        </div>
        <div class="column">
          {{ task.tags }}
        </div>
        <div class="column is-four-fifths">
          <div class="content">
            {{ task.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task-card',
  props: {
    task: Object
  },
  methods: {
    getCardClass (task) {
      if (task.status === 'completed') {
        return 'card has-background-grey-light'
      }

      return 'card'
    }
  }
}
</script>

