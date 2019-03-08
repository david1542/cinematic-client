<template>
  <div class="select-container">
    <span class="label">{{ $t('subtitles') }}:</span>
    <select
      class="select-input"
      @change="change"
    >
      <option
        v-for="(lang, index) in langs"
        :selected="index === languageIndex"
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
    },
    languageIndex: {
      required: true,
      type: Number
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

.rtl .select-container {
  margin-right: 0;
  margin-left: 10px;
}

.label {
  color: white;
  font-weight: bold;
  font-size: 15px;
  float: left;
}

.rtl .label {
  float: right;
  direction: rtl;
}

select.select-input {
  background-color: #808B90;
  width: 100%;
  color: white;
  font-weight: bold;
  padding: 7px 50px 7px 13px;
}

.rtl select.select-input {
  direction: rtl;
  text-align: right;
  padding: 7px 13px 7px 50px;
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

.rtl .select-container > .caret {
  right: initial;
  left: 7px;
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
