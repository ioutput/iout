
import store from '../store'
const baseUrl = 'http://goweb.ioutput.cn/'
const header = {
  'Content-type': 'application/json',
  'credentials':'include',
  'token' : store.appStore.token,
}

export default function http(method, url, params, headers = {}) {
  return new Promise((resolve, reject) => {
          let head = {
            method:method,
            headers:{...headers,header},
            mode:'no-cors'
          }
          head = method ==='post' || method ==='put' ? {
            ...head,
            body:JSON.stringify(params)
          }:head;
          fetch(baseUrl+url,head)
            .then(res =>{
              if(res.ok){
                res.json()
              }else{console.log(res.status)
                 //reject(res)
              }
                
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
          
  })
}