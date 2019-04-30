import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


const mutations = {
  setWeather, filterWeather
}
const actions = {
  getWeatherData
}

export default new Vuex.Store({

  state: {
    weather: {
      origin: {},
      filter: {}
    },
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  }

})

function setWeather(state, data) {
  state.weather.origin = data
  state.weather.filter = data
}

function filterWeather(state, data) {
  state.weather.filter = data
}

async function getWeatherData({commit}) {
  const url = "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=rdec-key-123-45678-011121314&format=JSON"
  let a = []
  await axios.get(url).then(
      response => {
        let data = response.data.cwbopendata.dataset.location
        for (let i of data) {
          let m = {}
          m["locationName"] = i.locationName
          m["elementKeys"] = i.weatherElement.map($0 => $0.elementName)
          m["weatherElement"] = {}
          for (let e of i.weatherElement) {
            m.weatherElement[e.elementName] = e.time
          }
          a.push(m)
        }
      },
      () => {
        console.log("get weather error")
      })
  commit("setWeather", a)
}