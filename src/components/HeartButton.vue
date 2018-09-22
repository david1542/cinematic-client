<template>
  <div
    @click="click"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <i
      :class="{hidden: !hovered && !isActive}"
      class="fas fa-heart"></i>
    <i
      :class="{hidden: hovered || isActive}"
      class="far fa-heart"></i>
  </div>
</template>

<script>
export default {
  name: 'HeartButton',
  props: {
    isActive: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      hovered: false
    }
  },
  methods: {
    click () {
      if (this.hovered && this.isActive) {
        this.hovered = false
      }
    },
    mouseEnter () {
      this.hovered = true
    },
    mouseLeave () {
      this.hovered = false
    }
  }
}
</script>

<style scoped>
i {
  transition: 0.3s;
  position: absolute;
  font-size: 15px;
}

i.hidden {
  opacity: 0;
  pointer-events: none;
}

i.visible {
  opacity: 1;
  pointer-events: initial;
}

.fas {
  color: #FF3A53;
}
</style>
