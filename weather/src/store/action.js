import store from "./store"


export const plus = () => {
    store.commit('plus');
    console.log(store.state.count, "plus")
}

export const minus = () => {
    store.commit('minus');
    console.log(store.state.count, "minus")
}

export function setUser(acc, pwd) {
    store.commit('setUser', {email: acc, password: pwd});
}


export const getWeather = () => store.dispatch("getWeatherData")
