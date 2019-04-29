<template>
  <v-app>

    <v-navigation-drawer app
                         :clipped="drawer.clipped"
                         :fixed="drawer.fixed"
                         :style="transition"
                         :permanent="drawer.permanent"
                         v-model="drawer.open">
      <v-list>
        <v-list-tile v-for="l in links" :key=l.title @click="$router.push(l.path)">
          <v-list-tile-title class="text-align-center ">
            {{l.title}}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-title class="text-align-center">
            aa
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app
               :clipped-left="toolbar.clipped_left"
               :fixed="toolbar.fixed">
      <v-toolbar-side-icon @click="drawer.open = !drawer.open"></v-toolbar-side-icon>
      <v-spacer/>
      <v-toolbar-title v-if="!search.show" class="display-1">Weather</v-toolbar-title>
      <v-text-field v-else
                    @keyup="searching"
                    class="search"
                    color="blue"
                    v-model="search.value"
                    :autofocus="search.autofocus">
      </v-text-field>
      <v-spacer/>

      <v-btn icon @click="onSearch">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon @click="refresh">
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>


    <v-content app
               :class="drawer.open ? 'pl-5' : ''">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

  import * as action from "../store/action"
  import {mapState} from 'vuex'

  const computed = mapState({token: "token"})


  export default {
    computed: computed,
    data: function () {
      return {
        links: [
          {title: "Home", path: "/home"},
          {title: "About", path: "/about"}
        ],
        drawer: {
          open: false,
          clipped: true,
          fixed: true,
        },
        toolbar: {
          clipped_left: true,
          fixed: true
        },
        transition: "transition: 400ms",
        icon: [
          'mdi-emoticon'
        ],
        search: {
          show: false,
          autofocus: true,
          value: ""
        }

      }
    },
    components: {},
    methods: {
      refresh: () => action.getWeather(),
      onSearch() {
        this.search.show = !this.search.show
      },
      searching() {
        console.log(this.search.value)
      },
      logout() {
        console.log(this.token)
      }
    },
    mounted() {
      action.getWeather()
    }
  }

</script>

<style scoped>
  .search {
    width: 70%;
    border-radius: 20px !important;
  }

</style>
