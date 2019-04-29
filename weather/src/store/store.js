import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);


const mutations = {
  setWeather, setToken, setUser
};
const actions = {
  getWeatherData
}

export default new Vuex.Store({

  state: {
    weather: {},
    key: {
      token: "token",
      user: "user"
    },
    token: null,
    user: null
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  }

})

function setWeather(state, data) {
  state.weather = data
}

function setUser(state, data) {
  state.user = {
    username: data.username,
    email: data.email,
    id: data.id
  }
}

function setToken(state, data) {
  state.token = {
    refresh: data.refresh,
    access: data.access
  }
}
function clean(state) {
  state.token = null
  state.user = null
}

async function getWeatherData({commit}) {
  // const vue = new Vue()
  const url = "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=rdec-key-123-45678-011121314&format=JSON"
  let a = []
  await axios.get(url).then(
      response => {
        let data = response.data.cwbopendata.dataset.location
        for (let i of data) {
          let m = {}
          m["locationName"] = i.locationName
          //
          m["elementKeys"] = i.weatherElement.map($0 => $0.elementName)
          //
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