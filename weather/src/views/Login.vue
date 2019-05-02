<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <v-layout justify-center>
      <h1 class="mt-3 display-3">Login</h1>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 lg5>
        <v-text-field :rules="[user.rules.format]"
                      :color="user.color"
                      :type="user.type"
                      @keyup.enter="userNameEnterUp"
                      v-model="user.value">

          <template v-slot:label>
            {{user.label}}
          </template>
        </v-text-field>
        <v-text-field :id="password.id"
                      :color="password.color"
                      :rules="[password.rules.count, password.rules.format]"
                      :type="password.show ? 'text' : 'password'"
                      :append-icon="password.show ? 'visibility' : 'visibility_off'"
                      @click:append="password.show = !password.show"
                      @keyup.enter="login"
                      v-model="password.value"
                      class="mt-3">

          <template v-slot:label>
            {{password.label}}
          </template>
        </v-text-field>

        <span class="red--text">{{err}}</span>
      </v-flex>
    </v-layout>
    <v-layout justify-center mt-4>
      <v-flex xs11 lg4>
        <v-btn class="btn-size"
               :color="btn.color"
               @click="login">
          Login
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs11 lg4>
        <v-btn class="btn-size"
               :color="btn.color"
               to="/signUp">
          SignUp
        </v-btn>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import ApiManager from '../store/Api'

  export default {
    name: "Login",
    data: function () {
      return {
        err: "",
        user: {
          value: "",
          label: "User Name",
          color: "blue",
          type: "email",
          pattern: /^.+$/,
          rules: {
            format: value => {
              return value.length > 0 || 'Empty Name'
            },
            check: () => {
              return this.user.value.length > 0
            }
          }
        },
        email: {
          value: "",
          label: "example@google.com",
          color: "blue",
          type: "email",
          pattern: /^[\w.-_]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)+$/,
          rules: {
            format: value => {
              return this.email.pattern.test(value) || 'Invalid e-mail'
            },
            check: () => {
              return this.email.pattern.test(this.email.value)
            }
          }
        },
        password: {
          id: "password",
          value: "",
          label: "Password",
          color: "blue",
          show: false,
          pattern: /^[\w.]*$/,
          type: show => show ? "text" : "password"
          ,
          rules: {
            count: value => (value.length >= 4 && value.length <= 20) || 'Min 4 and Max 20 characters',
            format: value => {
              return this.password.pattern.test(value) || 'Contains invalid characters'
            },
            check: () => {
              const value = this.password.value
              return this.password.pattern.test(value) && value.length >= 4 && value.length <= 20
            }
          }
        },
        btn: {
          color: "info"
        }
      }
    },
    methods: {
      check() {
        return this.user.rules.check() && this.password.rules.check()
      },
      userNameEnterUp() {
        const target = document.getElementById(this.password.id)
        if (!this.check()) {
          target.focus()
        } else {
          this.login()
        }
      },
      async login() {

        let api = new ApiManager()
        if (!this.check()) {
          return
        }
        this.err = ""
        const response = await api.login(this.user.value, this.password.value)
        if (response.status === 200) {
          ApiManager.saveToken(response.data)
          const info = await api.getInfo(response.data.access)
          if (info.status === 200) {
            ApiManager.saveInfo(info.data)
            this.$router.push("/")
          }
        }else {
          this.err = "Username or password is wrong, please check again."
        }
      }
    }
  }

</script>

<style scoped>
  .btn-size {
    width: 100%;
  }
</style>