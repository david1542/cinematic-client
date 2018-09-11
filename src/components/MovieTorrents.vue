<template>
  <div class="container">
    <select class="form-control" v-model="selectedTorrent">
      <option
        v-bind:key="torrent.infoHash"
        v-bind:value="torrent"
        v-for="torrent in torrents"
      >
        {{ torrent.title }}
      </option>
    </select>
    <button class="btn btn-primary" @click="chooseTorrent" v-if="!readyToWatch">
      <span v-if="loading">
        <i class="fas fa-spinner fa-spin"></i>
        Adding Torrent
      </span>
      <span v-else>
        Choose Torrent
      </span>
    </button>
    <button class="btn btn-success" @click="watchMovie" v-else>
      Watch Movie
    </button>
  </div>
</template>

<script>
import { addTorrent } from '../actions/creators'
export default {
  name: 'MovieTorrents',
  props: ['torrents'],
  data () {
    return {
      selectedTorrent: this.torrents[0],
      readyToWatch: false,
      loading: false
    }
  },
  methods: {
    watchMovie () {
      this.$router.push('/watch')
    },
    chooseTorrent () {
      this.loading = true
      this.$store.dispatch(addTorrent(this.selectedTorrent.infoHash)).then(() => {
        this.loading = false
        this.readyToWatch = true
      }).catch(() => {
        this.readyToWatch = false
      })
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
button.btn-primary .fa-spinner {
  margin-right: 3px;
}
</style>
