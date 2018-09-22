<template>
  <div
    class="wrapper"
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
  name: 'BigHeartButton',
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
.wrapper {
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  padding-top: 3px;
  padding-right: 1px;
}
i {
  color: white;
  transition: 0.3s;
  position: absolute;
  font-size: 30px;
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
