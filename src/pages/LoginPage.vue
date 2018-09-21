<template>
  <div class="login-page">
    <Navbar />
    <h2>Already have an account? Sign in!</h2>
    <form class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" class="form-control" type="text" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" class="form-control" type="password" v-model="password" />
      </div>
      <button type="button" class="btn btn-lg btn-success" v-on:click="login">
        <span v-if="loading">
          Logging in
          <i class="fas fa-circle-notch fa-spin"></i>
        </span>
        <span v-else>Log In</span>
      </button>
    </form>
  </div>
</template>

<script>
import { loginUser } from '../actions/creators'
import Navbar from '@/components/Navbar'
export default {
  name: 'LoginPage',
  components: {
    Navbar
  },
  data () {
    return {
      email: null,
      password: null,
      loading: false,
      error: null
    }
  },
  methods: {
    login () {
      this.loading = true
      const { email, password } = this
      const userDetails = {
        email,
        password
      }

      this.$store.dispatch(loginUser(userDetails)).then(() => {
        this.$router.push('/')
      }).catch(err => {
        this.error = err
      })
    }
  }
}
</script>

<style>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-image: url('../assets/theater.jpg');
  background-size: cover;
  padding-bottom: 150px;
  color: white;
}
.login-page > h2 {
  font-size: 25px;
  margin-top: 100px;
  margin-bottom: 30px;
  font-weight: bold;
}
.login-page > .login-form {
  display: flex;
  flex-direction: column;
  width: 400px;
}

.login-page > .login-form > button {
  margin-top: 15px;
}

.login-page > .login-form > button > span > i{
  margin-left: 5px;
}

.login-page > .login-form > .form-group > label {
  text-align: left;
  display: block;
}
</style>
