import {request} from "../utils/request.js"

//获取学习资料详情
export function ziliaoDetail(data){
		return request({
		url:"/collection/detail",
		method:"POST",
		data
	})
}

//获取首页导航
export function listNav(){
		return request({
		url:"/nav/get",
		method:"POST"
	})
}

//获取新闻列表
export function queryNews(data){
		return request({
		url:"/news/get",
		method:"POST",
		data
	})
}

//获取新闻详情
export function newsDetail(data){
		return request({
		url:"/news/detail",
		method:"POST",
		data
	})
}

//获取分方向学习资讯
export function collectionNews(data){
		return request({
		url:"/collection/getList",
		method:"POST",
		data
	})
}

//获取相关图片
export function getPic(data){
		return request({
		url:"/pic/getPic",
		method:"POST",
		data
	})
}