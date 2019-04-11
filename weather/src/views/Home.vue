<template>
    <div class="home">
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <!--<Main title="Count"-->
              <!--button_plus="Plus"-->
              <!--button_minus="Minus"/>-->
        <weather></weather>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'
    import * as actions from "../store/action";
    import Main from '@/components/Main.vue'
    import Weather from "./Weather";

    export default {
        name: 'home',
        components: {
            Weather,
            // HelloWorld,
            Main
        },
        mounted() {
            getWeather(this)
        }
    }

    async function getWeather(caller) {
        caller.$http.get("https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=rdec-key-123-45678-011121314&format=JSON")
            .then(
                response => {
                    let data = response.body.cwbopendata.dataset.location
                    // for (let i of data) {
                    //     w += JSON.stringify(i) + "<br/> <br/> <hr/> <br/>"
                    // }
                    actions.setWeather(data)
                },
                () => {
                    actions.setWeather("")
                })
    }
</script>

<style scoped>

    .weather {
        text-align: center;
    }
</style>