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
		
	},
	//获取图片列表
	getPic:async function(){
		let {limit = 5,keyword= ""} = this.params;
		let wer 
		if(keyword){
			wer = {
				classname:new RegExp(keyword,'gi')
			}
		}else{
			wer = `state == true`
		}
		//查询分类的表
		let res= await dbJQL.collection("swiper").where(wer)
		.limit(limit).orderBy("orderid","asc").get();
		
		
		let arr = res.data.map(item=>{
			return {
				_id:item._id,
				classname:item.classname,
				icon:item.icon.url
			}
		})
		return result(0,"success",arr)
		
	},
	_after:function(error,result){
		if(error) {
			throw error // 如果方法抛出错误，也直接抛出不处理
		}
		result.timeCost = Date.now() - this.startTime
		return result
	}
}
