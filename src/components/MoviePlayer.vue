<template>
  <div class="player-container">
    <MovieHUD
      @load-subtitles="loadSubtitles"
    />
    <video
      autoplay
      controls
      ref="videoPlayer"
      crossorigin="anonymous"
    >
      <source
        v-if="video"
        :src="video"
      />
      <track
        kind="subtitles"
        srclang="he"
        :src="!customSubtitles ? subtitles : customSubtitlesUrl"
        default
      />
    </video>
    <!-- <div class="subtitles">
      <p v-html="subtitlesText"></p>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SERVER_URL } from '../config'
import { pauseTorrent } from '@/actions/creators'
import MovieHUD from './MovieHUD'
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
  components: {
    MovieHUD
  },
  data () {
    return {
      video: null,
      subtitlesText: '',
      customSubtitles: false,
      customSubtitlesUrl: null
    }
  },
  beforeDestroy () {
    this.$store.dispatch(pauseTorrent(this.selectedHash))
  },
  methods: {
    loadSubtitles ({ file }) {
      const reader = new FileReader()

      if (file) {
        this.customSubtitles = true

        reader.readAsDataURL(file)
        this.customSubtitlesUrl = reader.result

        reader.onload = () => {
          this.customSubtitlesUrl = reader.result
        }
      }
    }
    // updateSubtitles () {
    //   const activeCue = this.$refs.videoPlayer.textTracks[0].activeCues[0]

    //   if (activeCue) {
    //     this.subtitlesText = activeCue.text
    //   } else {
    //     this.subtitlesText = ''
    //   }
    // }
  },
  watch: {
    startStream () {
      if (this.startStream) {
        const token = localStorage.getItem('user-token')
        this.video = SERVER_URL + '/videos/stream?magnet=' + this.selectedHash + '&token=' + token
      }
    },
    video () {
      if (this.video) {
        this.$refs.videoPlayer.pause()
      }
    },
    startPlay () {
      if (this.startPlay) {
        this.$refs.videoPlayer.play()
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
  /* text-shadow: -1px 0 black, 0 2px black, 1px 0 black, 0 -2px black; */
  opacity: 1;
}

video::-webkit-media-text-track-display {
  direction: rtl;
}

video::-webkit-media-text-track-container {
  overflow: visible !important;
  -webkit-transform: translateY(-10%) !important;
  transform: translateY(-10%) !important;
  position: relative;
  direction: rtl;
}

/* .subtitles > p {
  position: absolute;
  bottom: 100px;
  right: 0;
  left: 0;
  text-align: center;
  color: white;
  font-size: 35px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  direction: ltr;
  z-index: 5000;
  user-select: none;
  /* text-shadow: -1px 0 black, 0 2px black, 1px 0 black, 0 -2px black; */
/* } */
</style>
