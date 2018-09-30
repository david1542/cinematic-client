<template>
  <div>
    <div v-if="torrents && torrents.length > 0" class="settings-items">
      <TorrentsPicker
        :torrents="torrents"
        @change="torrentChanged"
      />
      <LanguagePicker
        :langs="langs"
        @change="languageChanged"
      />
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
    <div v-else-if="torrents && torrents.length === 0" class="message">
      <i class="fas fa-exclamation-circle"></i>
      No Available Torrents
    </div>
    <div v-else class="message">
      <i class="fas fa-spinner fa-spin"></i>
      Loading Torrents...
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { addTorrent, changeSettings } from '../actions/creators'
import TorrentsPicker from './TorrentsPicker'
import LanguagePicker from './LanguagePicker'
export default {
  name: 'MovieSettingsBar',
  components: {
    TorrentsPicker,
    LanguagePicker
  },
  data () {
    return {
      torrentIndex: 0,
      languageIndex: 0,
      readyToWatch: false,
      loading: false
    }
  },
  methods: {
    torrentChanged (index) {
      this.torrentIndex = index
    },
    languageChanged (index) {
      this.languageIndex = index
    },
    watchMovie () {
      const settings = {
        language: this.langs[this.languageIndex]
      }
      this.$store.dispatch(changeSettings(settings))
      this.$router.push({name: 'MoviePlayer'})
    },
    chooseTorrent () {
      const selectedTorrent = this.torrents[this.torrentIndex]
      this.loading = true
      this.$store.dispatch(addTorrent(selectedTorrent.infoHash)).then(() => {
        this.loading = false
        this.readyToWatch = true
      }).catch(err => {
        console.log(err)
        this.readyToWatch = false
      })
    }
  },
  computed: {
    ...mapState('movie', [
      'torrents',
      'availableLangs'
    ]),
    langs () {
      return this.availableLangs.filter(lang => lang.name && lang.code)
    }
  }
}
</script>

<style scoped>
.settings-items {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
}
button.btn-primary {
  height: 37px;
}
button.btn-primary .fa-spinner {
  margin-right: 3px;
}
.message {
  position: absolute;
  color: white;
  font-weight: bold;
  bottom: 0;
  left: 0;
  padding-left: 40px;
}

.message > .fas {
  font-size: 20px;
  margin-right: 4px;
}
</style>
