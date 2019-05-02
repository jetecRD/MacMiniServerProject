<template>
  <v-app>

    <v-navigation-drawer app
                         :clipped="drawer.clipped"
                         :fixed="drawer.fixed"
                         :style="transition"
                         :permanent="drawer.permanent"
                         v-model="drawer.open">
      <v-list>
        <v-list-tile v-for="l in links" :key=l.title @click="push(l)">
          <v-list-tile-title class="text-md-center">
            {{l.title}}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-title class="text-md-center">
            Logout
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app
               :clipped-left="toolbar.clipped_left"
               :fixed="toolbar.fixed">
      <v-toolbar-side-icon @click="drawer.open = !drawer.open"></v-toolbar-side-icon>
      <v-spacer/>
      <v-toolbar-title v-if="!search.show" class="display-1">{{toolbar.title}}</v-toolbar-title>
      <v-text-field v-else
                    id="search"
                    @keyup="searching"
                    @click:clear="clear"
                    class="search title"
                    color="blue"
                    v-model="search.value"
                    clearable
                    :autofocus="search.autofocus">
      </v-text-field>
      <v-spacer/>
      <v-btn icon @click="onSearch" v-if="buttonIsShow()">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon v-else style="pointer-events: none">
        <v-icon></v-icon>
      </v-btn>
      <v-btn icon @click="refresh" v-if="buttonIsShow()">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn icon v-else style="pointer-events: none">
        <v-icon></v-icon>
      </v-btn>

    </v-toolbar>

    <v-content app
               :class="drawer.open ? 'pl-5' : ''"
    >
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

  import * as action from "../../store/action"
  import {mapState} from 'vuex'

  const computed = {
    ...mapState({weather: "weather"})
  }


  export default {
    name: "home",
    computed: computed,
    data: function () {
      return {
        links: [
          {title: "Weather", path: "/"},
          {title: "About", path: "/about"}
        ],
        drawer: {
          open: false,
          clipped: true,
          fixed: true,
        },
        toolbar: {
          clipped_left: true,
          fixed: true,
          title: this.$router.currentRoute.name.firstUpperCase()
        },
        transition: "transition: 400ms",
        icon: [
          'mdi-emoticon'
        ],
        search: {
          show: false,
          autofocus: true,
          value: ""
        },
        buttonIsShow() {
          return this.$router.currentRoute.name === 'weather'
        },


      }
    },
    components: {},
    methods: {
      push(l) {
        this.toolbar.title = l.title
        this.$router.push(l.path)
      },
      refresh() {
        console.log()
        this.search.show = false
        this.search.value = ""
        action.getWeather()
      },
      onSearch() {
        this.search.show = !this.search.show
        if (this.search.value.length <= 0) {
          action.filterWeather(this.weather.origin)
        }
      },
      clear() {
        action.filterWeather(this.weather.origin)
      },
      searching(key) {
        if (key.keyCode === 27) {
          this.onSearch()
        }
        const markedText = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/   //注音+聲調
        if (markedText.test(this.search.value.slice(-1))) {
          return
        }
        if (this.search.value.length > 0) {
          const w = this.weather.origin.filter(w => w.locationName.includes(this.search.value))
          action.filterWeather(w)
        } else {
          this.clear()
        }
      },
      logout() {
        if (window.confirm("Do you want to sign out?")) {
          sessionStorage.clear()
          this.$router.push("/login")
        }
      }
    },
    mounted() {
      action.getWeather()
    }
  }


</script>

<style scoped>
  html {
    background-color: gray;
  }
  .search {
    width: 70%;
  }


</style>
