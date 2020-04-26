<template>
  <div class="card has-background-grey-lighter" :v-model="task">
    <div class="card-content">
      <strong>{{ task.due }}</strong>
      <div class="content">
        {{ task.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task-card',
  props: {
    task: Object
  }
}
</script>

