<template>
  <div
    class="loader-container"
    :class="{'visible': loading}"
  >
    <vue-circle
      ref="movieCircle"
      :progress="progressUpdate"
      :size="200"
      :reverse="false"
      line-cap="round"
      :fill="fill"
      empty-fill="rgba(0, 0, 0, .1)"
      :animation-start-value="0.0"
      :start-angle="0"
      insert-mode="append"
      :thickness="10"
      :show-percent="true"
      @vue-circle-progress="progress_step"
      @vue-circle-end="progress_end">
        <p>{{ $t('loaded') }}</p>
    </vue-circle>
  </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress'
export default {
  components: {
    VueCircle
  },
  props: {
    loading: {
      required: true,
      type: Boolean
    },
    progress: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      fill: { gradient: ['#FF2E00'] }
    }
  },
  methods: {
    progress_step (event, progress, stepValue) {
      // console.log(stepValue)
    },
    progress_end (event) {
      // console.log('Circle progress end')
    }
  },
  computed: {
    progressUpdate () {
      let value = this.progress || 0
      value = value === 0 ? 1.5 : value
      if (this.$refs.movieCircle) {
        this.$refs.movieCircle.updateProgress(value)
      }
      return value
    }
  }
}
</script>

<style scoped>
.loader-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: -10;
  opacity: 0;
  transition: opacity 0.3s;
  color: white !important;
}

.loader-container.visible {
  opacity: 1;
  z-index: 10;
}

.percent-text {
  color: white !important;
}

.loader-container p {
  color: white;
  font-size: 22px;
}
</style>
