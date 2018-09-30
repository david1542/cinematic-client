<template>
  <select
    class="form-control language-picker"
    @change="change"
  >
    <option
      v-for="(lang, index) in langs"
      :key="index"
      :value="lang.code"
    >
      {{ lang.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'LanguagePicker',
  props: {
    langs: {
      required: true,
      type: Array
    }
  },
  methods: {
    change (e) {
      this.$emit('change', e.target.selectedIndex)
    }
  }
}
</script>

<style scoped>
.language-picker {
  max-width: 250px;
  margin-right: 10px;
}
</style>
