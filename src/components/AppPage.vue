<template>
  <div class="page-container">
    <!-- <Navbar /> -->
    <main>
      <slot></slot>
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Navbar from './Navbar'
import Footer from './Footer'
export default {
  name: 'AppPage',
  components: {
    Navbar,
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
  margin-bottom: 100px;
}
</style>
