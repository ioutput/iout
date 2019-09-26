import {observable, action} from 'mobx'

class AppStore {
  @observable isLogin = false  //利用cookie来判断用户是否登录，避免刷新页面后登录状态丢失
  @observable userinfo = {}  //当前登录用户信息
  @observable token = ''
  @observable collapsed = false
  
  @action toggleLogin(flag,info={}) {
    this.userinfo = info  //设置登录用户信息
    if (flag) {
      localStorage.setItem('userinfo',JSON.stringify(info))
      this.isLogin = true
    } else {
      localStorage.removeItem('userinfo')
      localStorage.removeItem('token')
      this.isLogin = false
    }

  }
  @action setToken(token) {
    this.token = token
    localStorage.setItem('token',token)
  }
  @action init() {
    this.userinfo = localStorage['userinfo'] !== undefined?JSON.parse(localStorage['userinfo']):{}
    this.token = localStorage['token']
    this.isLogin = this.token !== undefined?true:false
  }
}

export default new AppStore()