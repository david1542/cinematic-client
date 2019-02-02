export default {
  data () {
    return {
      asyncDataStatus_ready: false,
      asyncDataStatus_loading: true
    }
  },
  methods: {
    asyncDataStatus_fetched () {
      this.asyncDataStatus_ready = true
      this.asyncDataStatus_loading = true
      this.$emit('ready')
    }
  }
}
