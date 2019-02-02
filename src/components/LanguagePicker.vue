<template>
  <div class="select-container">
    <span class="label">Language:</span>
    <select
      class="select-input"
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
    <div class="caret">
      <i class="fas fa-caret-down"></i>
    </div>
  </div>
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
.select-container {
  position: relative;
  width: 300px;
  margin-right: 10px;
}
.label {
  color: white;
  font-weight: bold;
  font-size: 15px;
  float: left;
}
select.select-input {
  background-color: #808B90;
  width: 100%;
  color: white;
  font-weight: bold;
  padding: 7px 50px 7px 13px;
}
select.select-input > option {
  background-color: #808B90;
  width: 100%;
  color: white;
  font-weight: bold;
  padding: 7px 50px 7px 13px;
}
select.select-input:focus + .select-container > .caret > i  {
  transform: rotate(180deg);
}
.select-container > .caret {
  position: absolute;
  right: 10px;
  top: 17px;
  bottom: 0;
  display: flex;
  align-items: center;
}
.select-container > .caret > i {
  color: white;
  font-size: 22px;
}
.language-picker {
  max-width: 250px;
  margin-right: 10px;
}
</style>
