<template>
  <div class="select-container">
    <select
      class="select-input"
      @change="change"
    >
      <option
        :key="torrent.infoHash"
        :value="torrent"
        v-for="torrent in torrents"
      >
        {{ torrent.title }}
      </option>
    </select>
    <div class="caret">
      <i class="fas fa-caret-down"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TorrentsPicker',
  props: {
    torrents: {
      required: true,
      type: Array
    }
  },
  methods: {
    change (e) {
      const index = e.target.selectedIndex
      this.$emit('change', index)
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
  right: 7px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
.select-container > .caret > i {
  color: white;
  font-size: 22px;
}
</style>
