<template>
  <div class="container">
    <h1 class="title">Edit Task</h1>
    <task-form @reloadTask="nothing" :seedTask="task" />

    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue'

export default {
  name: 'edit-page',
  components: {
    TaskForm
  },
  data: function () { // this.$route を参照するためには、アロー関数を使ってはいけない
    const { findTask } = require('@/../modules/taskwarrior')
    const task = findTask(this.$route.params.uuid)
    console.log(task)

    return { task: task }
  },
  methods: {
    nothing () { } // こんなの使わずになんとかしたい
  }
}
</script>
