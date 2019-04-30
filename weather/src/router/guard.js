
import ApiManager from "../store/Api"

/* eslint-disable */
const key = "page"
export const globalGuard = (to, from, next) => {
  // console.log("TO: ", to)
  // console.log("FROM: ", from)
  next()
}


export const homeGuard = (to, from, next) => {
  const token = {
    access: ApiManager.loadAccessToken(),
    refresh: ApiManager.loadRefreshToken()
  }
  if (token.access && token.refresh) {
    (async function () {
      const api = new ApiManager()
      const check = await api.check(token.access)
      if (check !== undefined && !check) {
        const refresh = await api.refresh(token.refresh)
        if (refresh.status !== 200) {
          next("/login")
          return
        }
        console.log("reload token")
        ApiManager.saveToken(refresh.data)
      }
    })()
    next()
  } else {
    next("/login")
  }
}