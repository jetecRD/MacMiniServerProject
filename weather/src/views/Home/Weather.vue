<template>
  <v-container fluid fill-height>
    <v-layout justify-start column>
      <v-flex class="mb-5" v-for="w in weather.filter" :key="w.locationName">
        <v-card class="card">
          <v-card-text class="title"><h2 class="ml-3 ">{{w.locationName}}</h2></v-card-text>
          <table class="table full-width">
            <tr>
              <th>開始時間</th>
              <th>結束時間</th>
              <th>概況</th>
              <th>舒適度</th>
              <th>降雨機率</th>
            </tr>
            <tr v-for="(v, i) in w.weatherElement.Wx" :key="i">
              <td> {{timeFormatted(v.startTime)}}</td>
              <td> {{timeFormatted(v.endTime)}}</td>
              <td> {{w.weatherElement.Wx[i].parameter.parameterName}}<br/>
                {{w.weatherElement.MinT[i].parameter.parameterName}} ~
                {{w.weatherElement.MaxT[i].parameter.parameterName}}
              </td>
              <td> {{w.weatherElement.CI[i].parameter.parameterName}}</td>
              <td> {{w.weatherElement.PoP[i].parameter.parameterName}}%</td>
            </tr>
          </table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapState} from 'vuex'

  const computed = mapState({weather: "weather"})
  export default {
    name: "Weather",
    computed: computed,
    data: function () {
      return {}
    },
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
  .table {
    table-layout: fixed;
    text-align: center;
    border-collapse: collapse;
  }

  .table th {
    font-size: 19px;
    border-bottom: 1px black solid;
  }

  .table td {
    font-size: 16px;
  }

  .full-width {
    width: 100%;
  }

  .card {
    border-radius: 5px;
  }

  .title {
    width: 100%;
    padding: 10px;
    background-color: #ccc;
  }
</style>