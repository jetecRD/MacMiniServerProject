<template>
  <v-layout justify-center>
    <v-sheet :height="600"
             :width="600"
             class="my-auto"
    >
      <v-sparkline :value="values"
                   :smooth="50"
                   :gradient="['#f72047', '#ffd200', '#2aeeee', '#fa00fe']"
                   :line-width="3"
                   auto-draw
                   stroke-linecap="round"
                   :padding="20"
                   :width="500"
                   :height="200"
                   show-labels
                   style="position: relative;vertical-align: center; top: 125px; height: 50%"
                   class=""
      >
      </v-sparkline>
    </v-sheet>
  </v-layout>
</template>

<script>
  export default {
    name: "Graph",
    data() {
      return {
        values: Array.from({length: 20}, () => Math.ceil(Math.random() * 150) - 20)
      }
    }
  }
</script>

<style scoped>

</style>