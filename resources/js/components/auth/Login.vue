<template>
  <v-app>
    <v-container fluid pa-0>
      <v-layout row wrap fluid fill-height justify-content-center>
        <v-flex xs12 md6>
          <v-layout column align-center justify-center fill-height>
            <form class="form-signin" @submit.prevent="submitLogin">
              <a href="#" class="d-flex mb-5">
                <span class="display-1">Login</span>
              </a>
              <span v-if="this.loginError">{{ this.loginError }}</span>
              <div class="form-row">
                <div class="form-group w-100" :class="{ 'form-group--error': $v.email.$error }">
                  <v-text-field id="inputEmail" label="E-mail" v-model="email" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" outline></v-text-field>
                  <v-text-field
                    id="inputPassword"
                    autocomplete="off" autocorrect="off"
                    label="Password"
                    v-model="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    outline>
                  </v-text-field>
                </div>
              </div>
              <button class="btn m-auto text-center white--text red btn-login" type="submit" :disabled="submitStatus === 'PENDING'">ACCEDI</button>
            </form>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
  import store from '../../store'
  import { required, minLength, between, email } from 'vuelidate/lib/validators'
  export default {
    data() {
      return {
        email: '',
        password: '',
        loginError: '',
        showPassword: false,
        submitStatus: null
      }
    },
    validations: {
      email: { required, email },
      password: { required }
    },
    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        return errors
      }
    },
    methods: {
      submitLogin() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // Submit Logic
          this.axios.post('/api/auth/login', {
            email: this.email,
            password: this.password
          }).then(response => {
            // login user, store the token and redirect to dashboard
            localStorage.setItem('token', response.headers.authorization);
            this.$router.go('/');
          }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
              this.loginError = "Username or password is incorrect";
            }
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .blue-grey.lighten-6 {
    background-color: #f5f6f8 !important;
  }
  .form-wrapper {
    min-height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .form-signin {
    width: 100%;
    max-width: 613px;
    padding: 15px;
    margin: 0 auto;
    a{
      color: inherit;
      text-decoration: none;
      &:hover {
        text-decoration: none;
        color: inherit;
      }
    }
  }
  .weboffice-title {
    font-size: 20pt;
    color: inherit;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .input-muted {
    // color: #fff;
    border-radius: 25px;
    // background-color: #3d4549;
  }
  .btn-login {
    // color: #000;
    text-align: center;
    margin: 10px 0 40px;
    border: 0;
    // font-style: italic;
    font-weight: 600;
    padding: 0 40px;
    line-height: 41px;
    font-size: 14px;
  }
  .logo {
    display: inline-block;
    height: 50px;
  }
  .error {
    display: none;
  }
  .form-group--error > .error {
    display: block;
  }
  @media (max-width: 768px) {
    .btn-login {
      width: 100%;
    }
  }
</style>
