<template >
  <v-list-tile @click="action">
    <v-list-tile-title v-text="title">
    </v-list-tile-title>
    <span v-text="value"></span>
  </v-list-tile>
</template>

<script>
  export default {
    name: "VUserInfoListCell",
    props: {
      click: Boolean,
      title: String,
      value: String,
      action: Function
    }
  }
</script>

<style scoped>

</style>