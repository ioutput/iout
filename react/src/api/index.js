import Axios from 'axios'
import store from '../store'

// create an axios instance
const service = Axios.create({
  //baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000 // request timeout
});
service.interceptors.request.use(
  config => {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = 'Bearer '+store.appStore.token
    return config
  },
  error => {
    Promise.reject(error)
  }
);
service.interceptors.response.use(
  response => response,
  error => {
    /* if (error.response.status === 401) {
      store.appStore.toggleLogin(false)
      window.location.href = '/login'
    } */
  }
)

export default function http(method, url, params, headers = {}) {
  let query;
  if (params) {
    if (method === 'get' || method === 'delete') {
      query = service({
        method: method,
        url, params: params
      });
    } else {
      query = service({
        method: method,
        url, data: params,
        headers:headers
      });
    }
  } else {
    query = service({
      method: method,
      url
    });
  }
  return query.then(res => {
    return res.data
  }).catch(err => {
    return err.data;
  })
}



