<template>
  <AppPage>
    <h2>Fill in all the details</h2>
    <form class="register-form">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input id="firstName" class="input-field" type="text" v-model="firstName" />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input id="lastName" class="input-field" type="text" v-model="lastName" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" class="input-field" type="text" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" class="input-field" type="password" v-model="password" />
      </div>
      <button type="button" class="button" v-on:click="register">
        <span v-if="loading">
          Registering
          <i class="fas fa-circle-notch fa-spin"></i>
        </span>
        <span v-else>Sign Up!</span>
      </button>
      <router-link class="button link" :to="{name: 'LoginPage'}">
        Log in
      </router-link>
    </form>
  </AppPage>
</template>

<script>
import { registerUser } from '../actions/creators'
export default {
  name: 'RegisterPage',
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
        this.$router.push({name: 'HomePage'})
      }).catch(err => {
        this.error = err
      })
    }
  }
}
</script>

<style scoped>
.page-container {
  color: white;
}
h2 {
  font-size: 25px;
  margin-bottom: 30px;
  font-weight: bold;
}
.register-form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
}

.register-form > button {
  margin-top: 15px;
}

.register-form > button > span > i{
  margin-left: 5px;
}

.register-form > .form-group > label {
  text-align: left;
  display: block;
  font-weight: bold;
}

.register-form > .form-group .input-field {
  width: 100%;
	display: inline-block;
	color: #f4f2ca;
	text-align: left;
	background-color: #383A3B;
	padding: .9em 1.8em;
	border: none;
	outline: none;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
  caret-color: #f4f2ca;
}
.register-form > .form-group .input-field:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #383A3B inset;
  -webkit-text-fill-color: #f4f2ca !important;
}

.button {
  display: inline-block;
  width: 60%;
  height: 40px;
  line-height: 40px;
  position: relative;
  overflow: hidden;
  font-weight: bold;
  color: white;
  background-color: #48B0E3;
  border: 2px solid #48B0E3;
  transition: color .5s;
  border-radius: 20px;
  margin: auto;
  outline: none;
  text-decoration: none;
}

.button:hover {
  color: #fff;
}

.login-reference {
  margin-top: 60px;
}
.login-reference > h2 {
  font-size: 23px;
}
.link {
  margin-top: 15px;
}
</style>
