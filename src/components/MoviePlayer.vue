<template>
  <div class="player-container">
    <video
      v-if="video"
      autoplay
      controls
      :play="startPlay"
      crossorigin="anonymous"
    >
      <source :src="video" />
      <track
        kind="subtitles"
        srclang="he"
        :src="subtitles"
        default
      />
    </video>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SERVER_URL } from '../config'
import { pauseTorrent } from '@/actions/creators'
export default {
  name: 'MoviePlayer',
  props: {
    startStream: {
      required: true,
      type: Boolean
    },
    startPlay: {
      required: true,
      type: Boolean
    }
  },
  // mounted () {
  //   const options = {
  //     imdbid: this.specificMovie.imdb_id,
  //     filename: this.selectedFileName,
  //     langcode: this.movieSettings.language.code
  //   }
  //   this.$store.dispatch(getSubtitles(options))
  // },
  data () {
    return {
      video: null
    }
  },
  beforeDestroy () {
    this.$store.dispatch(pauseTorrent(this.selectedHash))
  },
  watch: {
    startStream () {
      if (this.startStream) {
        const token = localStorage.getItem('user-token')
        this.video = SERVER_URL + '/videos/stream?magnet=' + this.selectedHash + '&token=' + token
      }
    }
  },
  computed: {
    subtitles () {
      if (this.specificMovie && this.movieSettings) {
        return SERVER_URL + '/videos/subtitles?query=' + this.specificMovie.original_title +
          '&filename=' + this.selectedFileName + '&langcode=' + this.movieSettings.language.code
      }
    },
    ...mapState('movie', [
      'selectedHash',
      'specificMovie',
      'selectedFileName',
      'movieSettings'
    ])
  }
}
</script>

<style>
.player-container {
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
video {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
}

video::cue {
  font-size: 35px;
  background: none;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  direction: rtl;
}

video::-webkit-media-text-track-display {
  direction: rtl;
}

video::-webkit-media-text-track-container {
  overflow: visible !important;
  -webkit-transform: translateY(-10%) !important;
  transform: translateY(-10%) !important;
  position: relative;
}
</style>
