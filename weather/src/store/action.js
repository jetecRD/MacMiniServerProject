import store from "./store"



export function clean() {
    sessionStorage.clear()
}

export const getWeather = () => store.dispatch("getWeatherData")
