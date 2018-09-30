<template>
  <select
    class="form-control"
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
select.form-control {
  width: 300px;
  margin-right: 10px;
}
</style>
