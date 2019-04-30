<template>
  <v-container>
    <v-layout>
      <v-flex lg12>
        <v-card>
          <v-card-text >Name: {{info.username}}</v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-text >Email: {{info.email}}</v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-text >Id: {{info.id}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "User",
    props: {
      info: Object
    }
  }
</script>

<style scoped>
  .block {
    text-align: center;
  }
</style>