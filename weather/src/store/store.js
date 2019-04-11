import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const mutations = {
    plus, minus, setWeather
};

export default new Vuex.Store({

    state: {
        count: 0,
        msg: "Count",
        weather: ""
    },
    mutations: {
        ...mutations
    },
    actions: {
    }

})

function setWeather(state, data) {
    state.weather = data
}

function plus(state, num = 1) {
    if (state.count >= 10) {return}
    state.count += num;
}

function minus(state, num = 1) {
    if (state.count <= 0) {return}
    state.count -= num;
}
