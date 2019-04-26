<template>
  <v-app>
    <v-content>
      <router-view/>

    </v-content>
  </v-app>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {
                //
            }
        }
    }
</script>

<style>

  .text-align-center {
    text-align: center;
  }

</style>
