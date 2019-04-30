<template>
  <!--<div class="about">-->
  <v-container>
    <User :info="info"></User>

  </v-container>
  <!--</div>-->
</template>

<script>
  import ApiManager from '../../store/Api'
  import User from "../../components/User"
  export default  {
    name: "about",
    components: {User},
    data() {
      return {
        info: {}
      }
    },
    mounted() {
      this.info = ApiManager.loadInfo()
    }
  }
</script>
