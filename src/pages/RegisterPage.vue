<template>
  <AppPage>
    <h2>{{ $t('fillAllDetails') }}</h2>
    <form class="register-form">
      <div class="form-group">
        <label for="firstName">{{ $t('firstName') }}</label>
        <input
          :class="{'error-field': $v.form.firstName.$error}"
          id="firstName"
          class="input-field"
          type="text"
          v-model="form.firstName"
        />
        <div
          class="errors"
          v-show="$v.form.firstName.$error"
        >
          <span v-show="!$v.form.firstName.required">
            {{ $t('fieldRequired') }}
          </span>
        </div>
      </div>
      <div class="form-group">
        <label for="lastName">{{ $t('lastName') }}</label>
        <input
          :class="{'error-field': $v.form.lastName.$error}"
          id="lastName"
          class="input-field"
          type="text"
          v-model="form.lastName" />
          <div
            class="errors"
            v-show="$v.form.lastName.$error"
          >
            <span v-show="!$v.form.lastName.required">
              {{ $t('fieldRequired') }}
            </span>
          </div>
      </div>
      <div class="form-group">
        <label for="email">{{ $t('email') }}</label>
        <input
          :class="{'error-field': $v.form.email.$error}"
          id="email"
          class="input-field"
          type="text"
          v-model="form.email"
        />
        <div
          class="errors"
          v-show="$v.form.email.$error"
        >
          <span v-show="!$v.form.email.required">
            {{ $t('fieldRequired') }}
          </span>
          <span v-show="!$v.form.email.email">
            {{ $t('invalidEmail') }}
          </span>
        </div>
      </div>
      <div class="form-group">
        <label for="password">{{ $t('password') }}</label>
        <input
          :class="{'error-field': $v.form.password.$error}"
          id="password"
          class="input-field"
          type="password"
          v-model="form.password"
        />
        <div
          class="errors"
          v-show="$v.form.password.$error"
        >
          <span v-show="!$v.form.password.required">
            {{ $t('fieldRequired') }}
          </span>
          <span v-show="!$v.form.password.minLength">
            Password must be at least 6 characters
          </span>
        </div>
      </div>
      <div class="form-group">
        <label for="cpassword">{{ $t('cpassword') }}</label>
        <input
          :class="{'error-field': $v.form.cpassword.$error}"
          id="cpassword"
          class="input-field"
          type="password"
          v-model="form.cpassword"
        />
        <div
          class="errors"
          v-show="$v.form.cpassword.$error"
        >
          <span v-show="!$v.form.cpassword.required">
            {{ $t('fieldRequired') }}
          </span>
          <span v-show="$v.form.cpassword.required && !$v.form.password.sameAsPassword">
            Passwords don't match
          </span>
        </div>
      </div>
      <button type="button" class="button" v-on:click="submit">
        <span v-if="loading">
          Registering
          <i class="fas fa-circle-notch fa-spin"></i>
        </span>
        <span v-else>{{ $t('signUp') }}</span>
      </button>
      <router-link class="button link" :to="{name: 'LoginPage'}">
        {{ $t('login') }}
      </router-link>
    </form>
  </AppPage>
</template>

<script>
import { registerUser } from '../actions/creators'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { validationMixin } from 'vuelidate'
import { required, sameAs,
  minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'RegisterPage',
  mixins: [
    asyncDataStatus,
    validationMixin
  ],
  validations: {
    form: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      cpassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  data () {
    return {
      form: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        cpassword: null
      },
      loading: false,
      error: null
    }
  },
  mounted () {
    this.asyncDataStatus_fetched()
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        console.log(this.$v.form.$error)
        return
      }

      // Fields are good
      this.loading = true
      const { firstName, lastName, email, password } = this.form
      const userDetails = {
        firstName,
        lastName,
        email,
        password
      }

      this.$store.dispatch(registerUser(userDetails)).then(() => {
        this.$swal({
          type: 'success',
          text: `Thank you for registering to Cinematic! Now
            you need be approved in order to login`
          // footer: '<a href>Why do I have this issue?</a>'
        })
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

.register-form > .form-group > .errors {
  position: absolute;
  right: 100%;
  height: 50px;
  white-space: nowrap;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 9px 25px 0 33px;
}

.register-form > .form-group > .errors > span {
  font-weight: 600;
  font-size: 12px;
  text-align: right;
}

.register-form > .form-group {
  position: relative;
}

.register-form > .form-group > label {
  text-align: left;
  display: block;
  font-weight: bold;
}

.rtl .register-form > .form-group > label {
  text-align: right;
}

.register-form > .form-group .input-field.error-field {
  border: 2px solid red;
}

.register-form > .form-group .input-field {
  width: 100%;
	display: inline-block;
	color: #f4f2ca;
	text-align: left;
	background-color: #383A3B;
	padding: .9em 1.8em;
	border: 2px solid #383A3B;
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

.rtl .button {
  direction: rtl;
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
