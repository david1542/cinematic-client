<template>
  <div class="container">
    <select class="form-control" @change="changeTorrent">
      <option v-bind:key="torrent.infoHash" v-for="torrent in torrents">{{ torrent.infoHash }}</option>
    </select>
    <button class="btn btn-primary btn-sm" @click="chooseTorrent">Choose Torrent</button>
  </div>
</template>

<script>
export default {
  name: 'MovieTorrents',
  props: ['torrents'],
  data () {
    return {
      selectedTorrent: null
    }
  },
  methods: {
    changeTorrent (torrent) {
      console.log(torrent)
    //   this.selectedTorrent = torrent
    },
    chooseTorrent () {
      console.log(this.selectedTorrent)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
}
select.form-control {
  width: 300px;
  margin-right: 10px;
}
button.btn-primary {
  height: 37px;
}
</style>
