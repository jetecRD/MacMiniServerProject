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

class ApiManager {
  constructor() {

  }

  async signUp(name, email, password) {
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
      //success
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
      //success
      resp = reason.response.status === 200
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
      //success
      resp = reason.response
    })
    return resp
  }


  async delete(token, password) {
    let resp = null
    await axios.get(url.info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      //success
      resp = response
    }, reason => {
      //success
      resp = reason.response
    })
    return resp
  }
}

export default new ApiManager()
