<template>
  <div class="player-container">
    <video autoplay controls crossorigin="anonymous">
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
  data () {
    return {
      video: null
    }
  },
  mounted () {
    const token = localStorage.getItem('user-token')
    this.video = SERVER_URL + '/videos/stream?magnet=' + this.selectedHash + '&token=' + token

    // const options = {
    //   imdbid: this.specificMovie.imdb_id,
    //   filename: this.selectedFileName,
    //   langcode: this.movieSettings.language.code
    // }
    // this.$store.dispatch(getSubtitles(options))
  },
  beforeDestroy () {
    this.$store.dispatch(pauseTorrent(this.selectedHash))
    this.video = null
  },
  computed: {
    subtitles () {
      return SERVER_URL + '/videos/subtitles?query=' + this.specificMovie.original_title +
        '&filename=' + this.selectedFileName + '&langcode=' + this.movieSettings.language.code
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
}
video {
  width: 100%;
  height: 100%;
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
