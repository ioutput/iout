import http from './'
//日志
let model = 'log'
export const list = (params) => {
 		return http('get',model,params)
}

