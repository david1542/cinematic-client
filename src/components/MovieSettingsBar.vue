<template>
  <div>
    <div v-if="torrents && torrents.length > 0" class="settings-items">
      <TorrentsPicker
        :torrents="torrents"
        :torrentIndex="torrentIndex"
        @change="torrentChanged"
      />
      <LanguagePicker
        :langs="availableLangs"
        :languageIndex="languageIndex"
        @change="languageChanged"
      />
      <button
        class="button"
        @click="watchMovie"
      >
        {{ $t('watchMovie') }}
      </button>
    </div>
    <div v-else-if="torrents && torrents.length === 0" class="message">
      <i class="fas fa-exclamation-circle"></i>
      {{ $t('noTorrents') }}
    </div>
    <div v-else class="message">
      <i class="fas fa-spinner fa-spin"></i>
      {{ $t('searchingTorrents') }}
    </div>
  </div>
</template>

<script>
import { changeSettings } from '../actions/creators'
import TorrentsPicker from './TorrentsPicker'
import LanguagePicker from './LanguagePicker'
export default {
  name: 'MovieSettingsBar',
  props: {
    torrents: {
      type: Array
    },
    langs: {
      type: Array
    }
  },
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
        language: this.availableLangs[this.languageIndex]
      }
      this.$store.dispatch(changeSettings(settings))
      this.$emit('add-torrent', this.torrentIndex)
    }
  },
  watch: {
    langs () {
      if (this.langs) {
        const index = this.langs.findIndex(lang => lang.code === this.$i18n.locale)
        this.languageIndex = index !== -1 ? index : 0
      }
    }
  },
  computed: {
    availableLangs () {
      return this.langs.filter(lang => lang.name && lang.code)
    }
  }
}
</script>

<style scoped>
.settings-items {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-left: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.rtl .settings-items {
  left: initial;
  right: 0;
  padding-left: 0;
  padding-right: 40px;
  flex-direction: row-reverse;
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

.rtl .message {
  left: initial;
  right: 0;
  direction: rtl;
  padding-left: 0;
  padding-right: 40px;
  font-size: 15px;
}

.message > .fas {
  font-size: 20px;
  margin-right: 4px;
}

.rtl .message > .fas {
  margin-right: 0px;
  margin-left: 4px;
}

.button {
  display: inline-block;
  width: 20%;
  height: 35px;
  line-height: 32px;
  position: relative;
  overflow: hidden;
  font-weight: bold;
  color: white;
  background-color: #48B0E3;
  border: 2px solid #48B0E3;
  -webkit-transition: color .5s;
  transition: color .5s;
  border-radius: 20px;
  outline: none;
  text-decoration: none;
}

.rtl .button {
  direction: rtl;
}
</style>
