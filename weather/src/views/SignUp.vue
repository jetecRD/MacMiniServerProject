<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <v-layout justify-center>
      <h1 class="mt-3 display-3">Register</h1>
    </v-layout>
    <v-card-text style="color: #f00; margin: auto; text-align: center">{{err}}</v-card-text>
    <v-layout justify-center>
      <v-flex xs12 lg5>
        <v-text-field :color="user.color"
                      :type="user.type"
                      :rules="[user.rules.format]"
                      clearable
                      v-model="user.value">

          <template v-slot:label>
            User Name
          </template>
        </v-text-field>
        <span class="red--text" v-text="user.err"></span>

        <v-text-field :rules="[email.rules.format]"
                      :color="email.color"
                      :type="email.type"
                      v-model="email.value"
                      clearable
                      class="mt-3">

          <template v-slot:label>
            E-mail
          </template>
        </v-text-field>
        <span class="red--text" v-text="email.err"></span>
        <v-text-field :color="password.color"
                      :rules="[password.rules.count, password.rules.format]"
                      :type="password.show ? 'text' : 'password'"
                      :append-icon="password.show ? 'visibility' : 'visibility_off'"
                      @click:append="password.show = !password.show"
                      v-model="password.value"
                      clearable
                      class="mt-3">

          <template v-slot:label>
            Password
          </template>
        </v-text-field>
        <span class="red--text" v-text="password.err"></span>

      </v-flex>
    </v-layout>
    <v-layout justify-center mt-4>
      <v-flex xs11 lg4>
        <v-btn class="btn-size"
               :color="btn.color"
               @click="register">
          Register
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs11 lg4>
        <v-btn class="btn-size"
               :color="btn.color"
               to="/">Cancel
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import api from '../store/Api'

  export default {
    name: "SignUp",
    data() {
      return {
        err: "",
        user: {
          value: "",
          placeholder: "User Name",
          err: "",
          color: "blue",
          type: "text",
          pattern: /.+/,
          rules: {
            format: value => {
              return this.user.pattern.test(value) || "Name Empty"
            },
            check: () => {
              return this.user.pattern.test(this.user.value)
            }
          }
        },
        email: {
          value: "",
          placeholder: "example@google.com",
          err: "",
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
        }
        ,
        password: {
          value: "",
          placeholder: "password",
          err: "",
          color: "blue",
          show: false,
          type: show => show ? "text" : "password",
          pattern: /^[\w.]*$/,
          rules: {
            count: value => {
              const warning = 'Min 4 and Max 20 characters'
              if (!value) {
                return warning
              }
              return (value.length >= 4 && value.length <= 20) || warning
            },
            format: value => {
              return this.password.pattern.test(value) || 'Contains invalid characters'
            },
            check: () => {
              const value = this.password.value
              return this.password.pattern.test(value) && value.length >= 4 && value.length <= 20
            }
          }
        }
        ,
        btn: {
          color: "info"
        }
      }
    },
    methods: {
      async register() {
        if (!this.user.rules.check() ||
            !this.email.rules.check() ||
            !this.password.rules.check()) {
          return null
        }
        const response = await api.signUp(this.user.value, this.email.value, this.password.value)
        if (response.status === 400) {
          this.errMessage(response.data)
        } else if (response.data.id) {
          alert("success")
          this.$router.push("/")
        }
      },
      errMessage(data) {
        if (data.username && data.username[0]) {
          this.user.err = data.username[0]
        }
        if (data.email && data.email[0]) {
          this.email.err = data.email[0]
        }
        if (data.password && data.password[0]) {
          this.password.err = data.password[0]
        }
      }
    }
  }


</script>

<style scoped>
  .btn-size {
    width: 100%;
  }

  .err-message {
    color: #f00;
  }

</style>