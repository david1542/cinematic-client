<template>
  <AppPage>
    <h2>{{ $t('signInToAccount') }}</h2>
    <form
      class="login-form"
      @keydown.enter="login"
    >
      <div class="form-group">
        <label for="email">{{ $t('email') }}</label>
        <input
          id="email"
          class="input-field"
          type="text"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="password">{{ $t('password') }}</label>
        <input
          id="password"
          class="input-field"
          type="password"
          v-model="password" />
      </div>
      <button
        type="button"
        class="button"
        @click="login"
      >
        <span v-show="loading">
          {{ $t('logging') }}
          <i class="fas fa-circle-notch fa-spin"></i>
        </span>
        <span v-show="!loading">
          {{ $t('login') }}
        </span>
      </button>
    </form>
    <router-link class="button" :to="{name: 'RegisterPage'}">
      {{ $t('createAccount') }}
    </router-link>
  </AppPage>
</template>

<script>
import { loginUser } from '../actions/creators'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  name: 'LoginPage',
  data () {
    return {
      email: null,
      password: null,
      loading: false,
      error: null
    }
  },
  mixins: [
    asyncDataStatus
  ],
  mounted () {
    this.asyncDataStatus_fetched()
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
        this.$router.push({name: 'HomePage'})
      }).catch(res => {
        const { error } = res.response.data

        this.loading = false
        // this.error = error
        this.$swal({
          type: 'error',
          text: error
          // footer: '<a href>Why do I have this issue?</a>'
        })
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
  margin-top: 100px;
  margin-bottom: 30px;
  font-weight: bold;
}
.login-form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
}

.login-form > button {
  margin: 15px auto;
}

.rtl .login-form > button {
  direction: rtl;
}

.login-form > button > span > i{
  margin-left: 5px;
}

.login-form > .form-group .input-field {
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

.rtl .login-form > .form-group .input-field {
  text-align: right;
}

.login-form > .form-group .input-field:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #383A3B inset;
  box-shadow: 0 0 0 30px #383A3B inset;
  -webkit-text-fill-color: #f4f2ca !important;
}
.login-form > .form-group > label {
  text-align: left;
  display: block;
  font-weight: bold;
}

.rtl .login-form > .form-group > label {
  text-align: right;
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
  outline: none;
  text-decoration: none;
}

.button:hover {
  color: #fff;
}
</style>
