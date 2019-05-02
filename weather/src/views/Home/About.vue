<template>
  <v-container >
    <User :info="info"></User>

  </v-container>
</template>

<script>
  import ApiManager from '../../store/Api'
  import User from "../../components/User"
  export default  {
    name: "about",
    components: {User},
    data() {
      return {
        info: ApiManager.loadInfo()
      }
    },
    mounted() {
      const a = function () {

      }
      console.log(typeof (a))
    }
  }
</script>
