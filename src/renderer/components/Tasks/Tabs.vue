<template>
  <div>
    <div class="tabs is-fullwidth" style="padding-top: 20px">
      <ul>
        <li :class="activeTab == 'todo' ? 'is-active' : ''" @click="activeTab = 'todo'">
          <a>
            <bulma-awesome-icon icon="list" />
            Todo
          </a>
        </li>
        <li :class="activeTab == 'done' ? 'is-active' : ''" @click="activeTab = 'done'">
          <a>
            <bulma-awesome-icon icon="check-square" />
            Done
          </a>
        </li>
      </ul>
    </div>

    <slot name="shared"></slot>

    <span :class="activeTab == 'todo' ? '' : 'is-hidden'">
      <slot name="todo"></slot>
    </span>


    <span :class="activeTab == 'done' ? '' : 'is-hidden'">
      <slot name="done"></slot>
    </span>
  </div>
</template>

<script>

export default {
  data () {
    return {
      activeTab: 'todo'
    }
  }
}
</script>

