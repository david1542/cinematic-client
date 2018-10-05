<template>
  <div class="hud-container">
    <div class="option-wrapper">
      <label for="file">
        <i class="far fa-closed-captioning action-icon"></i>
      </label>
      <input type="file" id="file" ref="filesInput" class="custom-file-input"
        @change="loadSubtitles">
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieHUD',
  methods: {
    loadSubtitles () {
      const { files } = this.$refs.filesInput
      const file = files[0]
      this.$emit('load-subtitles', { file })
    }
  }
}
</script>

<style>
.hud-container {
  position: absolute;
  bottom: 18%;
  right: 58px;
  background-color: #218DF9;
  display: flex;
  padding: 4px 8px;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.hud-container > .option-wrapper {
  margin-bottom: -2px;
}

.hud-container > .option-wrapper > label {
  margin: 0;
}

.hud-container > .option-wrapper > input {
  display: none;
}
.hud-container .action-icon {
  font-size: 30px;
  color: white;
  transition: 0.2s;
  cursor: pointer;
}
.hud-container .action-icon:hover {
  color: #1978C3;
}
</style>
