<template>
    <div class="weather">
        <!-- eslint-disable-next-line -->
        <div class="block" v-for="w of weather" >
            <h2 id="locationName">{{w.locationName}}</h2>
            <table class="table">
                <tr>
                    <th>start</th>
                    <th>end</th>
                    <th>Wx</th>
                    <th>MaxT</th>
                    <th>MinT</th>
                    <th>CI</th>
                    <th>PoP</th>
                </tr>
                <!-- eslint-disable-next-line -->
                <tr v-for="(v, i) in w.weatherElement.Wx">
                    <td> {{timeFormatted(v.startTime)}}</td>
                    <td> {{timeFormatted(v.endTime)}}</td>
                    <td> {{w.weatherElement.Wx[i].parameter.parameterName}}</td>
                    <td> {{w.weatherElement.MaxT[i].parameter.parameterName}}</td>
                    <td> {{w.weatherElement.MinT[i].parameter.parameterName}}</td>
                    <td> {{w.weatherElement.CI[i].parameter.parameterName}}</td>
                    <td> {{w.weatherElement.PoP[i].parameter.parameterName}}</td>
                </tr>
            </table>
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
            timeFormatted(d) {
                const date = new Date(d)
                const df = require('date-format')
                return df.asString('MM/dd-hh:mm', date)

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
        height: 23vh;
        top: 70px;
        background-color: lightgrey;
        margin: 10px auto 30px;
        border-radius: 5px;
        text-align: left;
    }


    .table{
        border-collapse: collapse;
        border: 1px black solid;
        text-align: center;
        width: 100%;
        margin-top: 20px;
        table-layout: fixed;
    }
    .table td, th{
        border: 1px black solid;
    }


    #locationName {
        position: relative;
        top: 8px;
        left: 20px;
    }

</style>