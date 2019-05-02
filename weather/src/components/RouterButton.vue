<template>
  <v-btn  :class="originCheck() ? 'text-origin' : ''" :to="to">
    <slot>Link</slot>
  </v-btn>
</template>

<script>
  const toTypes = String | Location
  const originTypes =  String | Boolean

  const accessKey = [
      "true", "origin", ""
  ]
  export default {
    name: "router-button",
    props: {
      to: toTypes,
      origin: originTypes
    },
    methods: {
      originCheck() {
        return accessKey.includes(this.origin) || this.origin === true
      },
    }
  }
</script>

<style scoped>
  .text-origin {
    text-transform: none !important;
  }
</style>