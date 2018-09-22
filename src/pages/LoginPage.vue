<template>
  <AppPage>
    <h2>Sign in to your account</h2>
    <form
      class="login-form"
      @keydown.enter="login"
    >
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          class="form-control"
          type="text"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          class="form-control"
          type="password"
          v-model="password" />
      </div>
      <button
        type="button"
        class="btn btn-lg btn-success"
        :click="login"
      >
        <span v-if="loading">
          Logging in
          <i class="fas fa-circle-notch fa-spin"></i>
        </span>
        <span v-else>Log In</span>
      </button>
    </form>
  </AppPage>
</template>

<script>
import { loginUser } from '../actions/creators'
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
  margin-top: 15px;
}

.login-form > button > span > i{
  margin-left: 5px;
}

.login-form > .form-group > label {
  text-align: left;
  display: block;
}
</style>
