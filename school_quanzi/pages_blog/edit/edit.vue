<template>
	<view class="edit">
		<view class="title">
			<input type="text" v-model="artObj.title" placeholder="请输入完整的标题" placeholder-class="placeholderClass">
		</view>
		<view class="content">
			<editor			
			class="myEdit"
			placeholder="写点什么吧~~"
			show-img-size
			show-img-toolbar
			show-img-resize
			@ready="onEditReady"
			@focus="onFocus"
			@statuschange="onStatuschange"
			></editor>
		</view>
		<view class="btnGroup">
			<u-button @click="onSubmit" type="primary" text="确认发表" :disabled="!artObj.title.length"></u-button>
		</view>
		<view class="tools"v-if="toolShow">
			<view class="item" @click="clickHead">
				<text class="iconfont icon-zitibiaoti" :class="headShow ? 'active' : ''"></text> 
			</view>
			<view class="item" @click="clickBold">
				<text class="iconfont icon-zitijiacu" :class="boldShow ? 'active': ''"></text> 
			</view>
			<view class="item" @click="clickItalic">
				<text class="iconfont icon-zitixieti" :class="italicShow ? 'active' : ''"></text> 
			</view>
			<view class="item" @click="clickDivider"><text class="iconfont icon-fengexian"></text> </view>
			<view class="item" @click="clickInsertImage"><text class="iconfont icon-charutupian"></text> </view>
			<view class="item" @click="editOk"><text class="iconfont icon-duigou_kuai"></text> </view>
		</view>
	</view>
</template>

<script>
	import {getImgSrc,getProvince} from "@/utils/tools.js"	
	const db=uniCloud.database()
	export default {		
		data() {
			return {
				toolShow:false,
				headShow:false,
				boldShow:false,
				italicShow:false,
				artObj:{
					title:"",
					content:"",
					description:"",
					picurls:"",
					province:""
				}
			};
		},		
		
		onLoad(){
			getProvince().then(res=>{				
				this.artObj.province=res
			})
		},
		
		methods:{
			//点击提交按钮
			onSubmit(){
				this.editorCtx.getContents({
					success:res=>{
						this.artObj.description=res.text.slice(0,80);
						this.artObj.content=res.html;
						this.artObj.picurls=getImgSrc(res.html)
						uni.showLoading({
							title:"发布中..."
						})						
						this.addData();
					}
				})
			},
			
			addData(){
				db.collection("quanzi_article").add({
					...this.artObj
				}).then(res=>{					
					uni.hideLoading();
					uni.showToast({
						title:"发布成功"
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/index/index"
						})
					},800)
				})
			},
			
			
			
			//初始化
			onEditReady(){
				uni.createSelectorQuery().in(this).select('.myEdit').fields({
					size:true,
					context:true
				},res=>{					
					this.editorCtx=res.context
				}).exec()
			},
			
			
			checkStatus(name, detail, obj) {
				if (detail.hasOwnProperty(name)) {
					this[obj] = true;					
				} else {
					this[obj] = false;
				}
			},
			
			
			// 当样式发生改变的时候
			onStatuschange(e){
				let detail=e.detail
				this.checkStatus("header",detail,"headShow");
				this.checkStatus("bold",detail,"boldShow");
				this.checkStatus("italic",detail,"italicShow");				
			},
			
			
			//添加图像
			clickInsertImage(){
				uni.chooseImage({					
					success:async res=>{
						
						uni.showLoading({
							title:"上传中请稍后",
							mask:true
						})
						for (let item of res.tempFiles) {
							let suffix = item.path.substring(item.path.lastIndexOf("."));
							let randomName=Date.now() + "" + String( Math.random() ).substr(3,6)+suffix
							
							let res= await uniCloud.uploadFile({
								filePath:item.path,
								cloudPath:item.name || randomName
							})
							this.editorCtx.insertImage({
								src:res.fileID
							})							
						}
						uni.hideLoading()
					}
				})
			},
			
			
			//点击工具条的确认
			editOk(){
				this.toolShow=	false;
			},
			
			//加粗
			clickBold(){
				this.boldShow=!this.boldShow
				this.editorCtx.format("bold")
			},
			
			//设置倾斜
			clickItalic(){
				this.italicShow=!this.italicShow;
				this.editorCtx.format("italic")
			},
			
			//添加大标题
			clickHead(){
				this.headShow=!this.headShow
				this.editorCtx.format("header",this.headShow ? 'H2':false)
			},
			
			//添加分割线
			clickDivider(){
				this.editorCtx.insertDivider();
			},
			
			
			//离开焦点
			onFocus(){
				this.toolShow=true
			}
		}
	}
</script>

<style lang="scss">
/deep/ .ql-blank::before{
	font-style: normal;
	color:#e0e0e0;
}
	
.edit{
	padding:30rpx;
	.title{
		input{
			height: 120rpx;
			font-size: 46rpx;
			border-bottom:1px solid #e4e4e4;
			margin-bottom:30rpx;
			color:#000;
		}
		.placeholderClass{
			color:#e0e0e0;
		}
	}
	.content{
		.myEdit{
			height: calc(100vh - 500rpx);
			margin-bottom:30rpx;
		}		
	}
	.tools{
		width: 100%;
		height: 80rpx;
		background: #fff;
		border-top:1rpx solid #f4f4f4;
		position: fixed;
		left:0;
		bottom:0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.iconfont{
			font-size: 36rpx;
			color:#333;
			&.active{
				color:#0199FE
			}
		}
	}
}

</style>
