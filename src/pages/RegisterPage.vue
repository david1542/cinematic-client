<template>
  <div class="register-page">
    <nav-bar />
    <h2>Sign up today for free!</h2>
    <form class="register-form">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input id="firstName" class="form-control" type="text" v-model="firstName" />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input id="lastName" class="form-control" type="text" v-model="lastName" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" class="form-control" type="text" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" class="form-control" type="text" v-model="password" />
      </div>
      <button type="button" class="btn btn-lg btn-success" v-on:click="register">
        <span v-if="loading">
          Registering
          <i class="fas fa-circle-notch fa-spin"></i>
        </span>
        <span v-else>Sign Up!</span>
      </button>
    </form>
    <div class="login-reference">
      <h2>Registered user? Sign in here</h2>
      <router-link to="/login" class="btn btn-primary">Sign In</router-link>
    </div>
  </div>
</template>

<script>
import { registerUser } from '../actions/creators'
import Navbar from '@/components/Navbar'
export default {
  name: 'RegisterPage',
  components: {
    'nav-bar': Navbar
  },
  data () {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      loading: false,
      error: null
    }
  },
  methods: {
    register () {
      this.loading = true
      const { firstName, lastName, email, password } = this
      const userDetails = {
        firstName,
        lastName,
        email,
        password
      }

      this.$store.dispatch(registerUser(userDetails)).then(() => {
        this.$router.push('/')
      }).catch(err => {
        this.error = err
      })
    }
  }
}
</script>

<style>
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 100%;
  background-image: url('../assets/theater.jpg');
  background-size: cover;
  padding-bottom: 150px;
  color: white;
}
.register-page > h2 {
  font-size: 25px;
  margin-top: 100px;
  margin-bottom: 30px;
  font-weight: bold;
}
.register-page > .register-form {
  display: flex;
  flex-direction: column;
  width: 400px;
}

.register-page > .register-form > button {
  margin-top: 15px;
}

.register-page > .register-form > button > span > i{
  margin-left: 5px;
}

.register-page > .register-form > .form-group > label {
  text-align: left;
  display: block;
}

.register-page > .login-reference {
  margin-top: 60px;
}
.register-page > .login-reference > h2 {
  font-size: 23px;
}
</style>
