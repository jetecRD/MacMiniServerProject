<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container pt-0>

    <v-layout justify-center>
      <v-flex class="text-md-center" lg10>
        <v-avatar :size="mug.radius">
          <v-img :src="mug.default"
                 class="white mug elevation-2"
                 contain
          ></v-img>
        </v-avatar>
        <v-card class="card">
          <div class="top-space"></div>
          <v-list class="full-width">
            <v-user-info-list-cell v-for="i of list"
                                   :key="i.title"
                                   :title="i.title"
                                   :value="i.detail"
                                   :action="i.action ? i.action : () => {}"

            >
            </v-user-info-list-cell>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <v-container pa-0 class="alert" :class="alert.show ? 'show-alert' : ''">
      <v-layout justify-center>
        <v-flex class="text-md-center" lg6>
          <v-card style="margin-top: 50%">
            <v-card-text class="text-md-center pb-1 headline"> Do you want to delete this user?</v-card-text>
            <v-text-field class="my-1 mx-4 text-md-center title"
                          :type="password.type"
                          v-model="password.value"
            >
              <template v-slot:label>
                <h3>Enter your password</h3>
              </template>
            </v-text-field>
            <v-layout>
              <v-flex class="text-md-left full-width" lg6>
                <v-btn class="ml-4 btn"
                       @click="alert.show = false"
                >
                  Cancel
                </v-btn>
              </v-flex>
              <v-flex class="text-md-right full-width" lg6>
                <v-btn class="mr-4 btn"
                       @click="deleteAcc"
                >
                  {{okButton.title}}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
  import VUserInfoListCell from "./UserInfoListCell"
  import ApiManager from "../store/Api"

  const vue = {
    name: "User",
    components: {VUserInfoListCell},
    props: {
      info: Object
    },
    data() {
      return {
        check: false,
        alert: {
          show: false
        },
        list: [
          {title: "Name", detail: this.info.username},
          {title: "Email", detail: this.info.email},
          {title: "Id", detail: this.info.id.toString()},
          {
            title: "Delete Account", detail: "", action: this.show
          },
        ],
        mug: {
          default: require('@/assets/logo.svg'),
          radius: '200'
        },
        password: {
          value: "",
          type: "password"
        },
        okButton: {
          title: "Ok",
          enable: true
        }
      }
    },
    methods: {
      cancel() {
        this.alert.show = false
      },
      show() {
        this.alert.show = true
      },
      async deleteAcc() {
        let c = 3
        const self = this
        if (!this.check) {
          self.okButton.title = "Check " + c
          const inter = setInterval(function () {
            c -= 1
            if (c < 1) {
              self.okButton.title = "Ok"
              self.check = true
              window.clearInterval(inter)
            } else {
              self.okButton.title = "Check " + c
            }
          }, 1000)
        } else {
          const token = {
            access: ApiManager.loadAccessToken(),
            refresh: ApiManager.loadRefreshToken()
          }
          const api = new ApiManager()
          const check = await api.check(token.access)
          if (check !== undefined && !check) {
            const refresh = await api.refresh(token.refresh)
            if (refresh.status !== 200) {
              self.$router.push("/login")
              return
            }
            ApiManager.saveToken(refresh.data)
          }
          const response = await api.delete(ApiManager.loadAccessToken(), self.password.value)
          if (response.status === 204) {
            alert("success")
            self.$router.push("/login")
          }else {
            alert("failed")
          }
        }
      }
    }
  }
  export default vue
</script>

<style scoped>

  .full-width {
    width: 100%;
  }

  .mug {
    z-index: 200;
  }

  .card {
    margin-top: -100px;
  }

  .top-space {
    height: 110px;
  }

  .list:first-of-type {
    margin-top: 110px;
  }

  .btn {
    width: 70%;
  }

  .alert {
    height: 80vh;
    position: relative;
    z-index: 1000;
    top: -150vh !important;
    transition: 600ms;
  }

  .show-alert {
    transform: translateY(100vh);
  }

  .hide-alert {
    transform: translateY(0);
  }
</style>