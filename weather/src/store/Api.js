import axios from 'axios'

const basic = 'http://192.168.11.109:8088/'

const url = {
  signUp: basic + 'auth/users/create/',
  getToken: basic + 'auth/jwt/create/',
  checkToken: basic + 'auth/jwt/verify/',
  refreshToken: basic + 'auth/jwt/refresh/',
  info: basic + 'auth/users/me/',
  delete: basic + 'auth/users/delete/'

}
const key = {
  token: {
    access: "token_access",
    refresh: "token_refresh"
  },
  info: "info"
}

export default class ApiManager {
  constructor() {

  }

  async register(name, email, password) {
    let resp = null

    await axios.post(url.signUp, {
      'username': name,
      'email': email,
      'password': password
    }).then(response => {
      //success
      resp = response
    }, reason => {
      resp = reason.response
    })
    return resp
  }


  async login(name, password) {
    let resp = null
    await axios.post(url.getToken, {
      'username': name,
      'password': password
    }).then(response => {
      //success
      resp = response
    }, reason => {
      //failed
      resp = reason.response
    })
    return resp
  }

  async check(token) {
    let resp = false
    await axios.post(url.checkToken, {
      'token': token
    }).then(response => {
      //success
      resp = response.status === 200
    }, reason => {
      //failed
      resp = reason.response.status === 200
    })
    return resp
  }

  async refresh(token) {
    let resp = null
    await axios.post(url.refreshToken, {
      'refresh': token
    }).then(response => {
      //success
      resp = response
    }, reason => {
      //failed
      resp = reason.response
    })
    return resp
  }

  async getInfo(token) {
    let resp = null
    await axios.get(url.info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      //success
      resp = response
    }, reason => {
      //failed
      resp = reason.response
    })
    return resp
  }


  async delete(token, password) {
    let resp = null
    console.log(token, password)
    await axios.post(url.delete,
        {
          "current_password": password
        },
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response => {
      //success
      resp = response
    }, reason => {
      //failed
      resp = reason.response
    })
    return resp
  }


  static saveToken(token) {
    if (token.access) {
      sessionStorage.setItem(key.token.access, token.access)
    }
    if (token.refresh) {
      sessionStorage.setItem(key.token.refresh, token.refresh)
    }
  }

  static saveInfo(info) {
    if (info) {
      sessionStorage.setItem(key.info, JSON.stringify(info))
    }
  }

  static loadAccessToken() {
    return sessionStorage.getItem(key.token.access)
  }

  static loadRefreshToken() {
    return sessionStorage.getItem(key.token.refresh)
  }


  static loadInfo() {
    const info = sessionStorage.getItem(key.info)
    return JSON.parse(info)
  }
}
