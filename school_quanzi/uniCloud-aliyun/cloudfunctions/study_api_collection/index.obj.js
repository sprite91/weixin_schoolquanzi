const db = uniCloud.database();
const {result} = require("xcx_utils");
let dbJQL;

module.exports = {
	_before: function () { // 通用预处理器
		this.startTime = Date.now() 
		let body =  this.getHttpInfo().body;
		if(!body) throw result(400,"required");
		this.params = JSON.parse(this.getHttpInfo().body)
		
		dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.getClientInfo()
		})
		dbJQL.setUser({
			uid: '64d4c8987ad52ddc64108efb', // 建议此处使用真实uid
			role: ['admin']
		})
	},
	//获取文章列表
	getList:async function(){
		let {navid,limit = 5,size = 0,keyword= ""} = this.params;
		let wer 
		if(keyword){
			wer = {
				_title:new RegExp(keyword,'gi')
			}
		}else{
			if(!navid) return result(400,"required");
			wer = `navid == "${navid}" && state == true`
		}
		//查询分类的表
		let res= await dbJQL.collection("study_content").where(wer).field("_title,avatar.url as picurl,is_essence,view_count,author,publish_date")
		.skip(size).limit(limit).orderBy("orderid","asc").get();
		
		let count = await dbJQL.collection("study_content").where(wer).count()
		
		return result(0,"success",res.data,count.total);
		
	},
	//获取详情页
	async detail(){
		let {id} = this.params;
		if(!id) return result(400,"required");
		let res = await dbJQL.collection("study_content").where(`_id == "${id}"`)
		.field("_title,avatar.url as picurl,is_essence,view_count,author,publish_date")
		.get({
			getOne:true
		})
		return result(0,"success",res.data)
	},
	_after:function(error,result){
		if(error) {
			throw error // 如果方法抛出错误，也直接抛出不处理
		}
		result.timeCost = Date.now() - this.startTime
		return result
	}
}
