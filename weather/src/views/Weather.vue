<template>
    <div class="weather">
        <div class="block">
        <h2>{{title(weather)}}</h2>
            <span>{{elements(weather)}}</span>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    const computed = mapState({weather: "weather"});
    export default {
        name: "Weather",
        computed: computed,
        methods: {
            title(w) {
                if (w[0] === undefined) {return ""}
                return w[0].locationName
            },
            elements(w) {
                if (w[0] === undefined) {return ""}
                return[...w[0]["weatherElement"]].map($0 => [$0.elementName, $0.time])
            }
        }

    }
</script>

<style scoped>


    .weather {
        text-align: center;
    }

    .block {
        position: relative;
        width: 80%;
        height: 20vh;
        top: 70px;
        background-color: lightgrey;
        margin: auto;
        border-radius: 5px;
        text-align: left;
    }

</style>