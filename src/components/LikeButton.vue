<template>
  <div @click.stop="click">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LikeButton',
  data () {
    return {
      active: false
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
