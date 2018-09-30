<template>
  <div class="page-container">
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer'
export default {
  name: 'AppPage',
  components: {
    Footer
  }
}
</script>

<style>
.page-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 100%;
  background-image: url('../assets/theater.jpg');
  z-index: 0;
  min-height: 100%;
  background-size: 100vw 100vh;
  background-attachment: fixed;
}
main {
  padding-top: 64px;
  padding-bottom: 150px;
  position: relative;
}
</style>
