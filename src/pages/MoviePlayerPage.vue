<template>
  <div class="player-container">
    <video autoplay v-bind:src="video" controls></video>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SERVER_URL } from '../config'
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
  },
  computed: mapState('movie', [
    'selectedHash'
  ])
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
</style>
