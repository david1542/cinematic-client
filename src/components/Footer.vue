<template>
  <footer>
    <h3>Cinematic &copy; 2018</h3>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
h3 {
  font-size: 20px;
  color: white;
  font-weight: bold;
}
</style>
