//获取富文本内的图片url地址
export function getImgSrc(richtext,num=3) {
	let imgList = [];
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
		  imgList.push(capture);
	});
	imgList=imgList.slice(0,num)
	return imgList;
}

//向外导出省份
export function getProvince(){
	return new Promise((resolve,reject)=>{
		let historyProvince=uni.getStorageSync("historyProvince");
		if(historyProvince){			
			if((Date.now() - historyProvince.time) > 1000*60*60){				
				getIp().then(res=>{
					resolve(res)
				}).catch(err=>{
					reject(err)
				})	
			}else{				
				resolve(historyProvince.province);
			}
		}else{			
			getIp().then(res=>{
				resolve(res)
			}).catch(err=>{
				reject(err)
			})		
		}	
	})
}

//获取所在省市
function getIp(){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:"https://restapi.amap.com/v3/ip?key=0225f8f2f00a1812cb31b7fdf7ce3eda",
			success:res=>{				
				let str=""				
				typeof(res.data.province) == "string" ? str=res.data.province :str="火星"
				resolve(str)
				let obj={
					province:str,
					time:Date.now()
				}
				uni.setStorageSync("historyProvince",obj);				
			},
			fail:err=>{
				reject(err)
			}
		})
	})	
}

//获取昵称
export function giveName(item){
	return  item.user_id[0]?.nickname ||  item.user_id[0]?.username || item.user_id[0]?.mobile || "请设置昵称"	
}

//获取默认头像
export function giveAvatar(item){	
	return item.user_id[0]?.avatar_file?.url ?? 'https://mp-06b56c9b-0f1c-45e0-add5-af96eacae8fb.cdn.bspapp.com/cloudstorage/images/user-default.jpg'
}


const db = uniCloud.database();
const utilsObj = uniCloud.importObject("utilsObj",{
	customUI:true
});
//点赞操作数据库
export async function likeFun(artid){
	
	let count = await db.collection("quanzi_like")
	.where(`article_id == "${artid}" 
	&& user_id== $cloudEnv_uid`).count();
	if(count.result.total){
		db.collection("quanzi_like").where(`article_id == "${artid}" 
	&& user_id== $cloudEnv_uid`).remove();
	utilsObj.operation("quanzi_article","like_count",artid,-1)
	}else{
		db.collection("quanzi_like").add({
			article_id:artid
		})
		utilsObj.operation("quanzi_article","like_count",this.artid,1)
	}
}

//数量格式化
export function formatNum(num) {
  return num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(1) + 'k' : num >= 1e4 ? (num / 1e4).toFixed(1) + 'w' : num;
}

//日期格式化
export function formatTime(value, type = 0) {
  var time = new Date(value);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  month = month < 10 ? "0" + month : month;
  date = date < 10 ? "0" + date : date;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  var arr = [
    year + "-" + month + "-" + date,
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second,
    year + "年" + month + "月" + date,
    year + "年" + month + "月" + date + " " + hour + ":" + minute + ":" + second,
    hour + ":" + minute + ":" + second,
    month + "-" + date,
    year + "/" + month + "/" + date + " " + hour + ":" + minute
  ]
  return arr[type];
}