import http from './'
//用户
let model = '/user'
export const login = (params) => {
	return http('post',model+'/login',params)
 }
 //获取列表
export const list = (params)=> {
	return http('get',model,params)
}
//详情
export const view = (params)=> {
	return http('get',model+'/view?id='+params)
}
//创建
export const create = (params) => {
	return http('post',model+'/create',params)
}
//更新
export const update = (params) => {
	return http('put',model+'/update?id='+params.id,params)
}
//删除
export const del = (params) => {
	return http('delete',model+'/delete?id='+params)
}


