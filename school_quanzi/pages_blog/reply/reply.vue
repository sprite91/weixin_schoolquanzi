<template>
	<view class="reply">
		<view class="top">
			<comment-item :closeBtn="true" :childState="true" :item="replyItem"></comment-item>
		</view>
		<view class="list">
			<view class="row" v-for="item in childReplyArr">
				<comment-item @removeEnv="commentEnv" :childState="true" :item="item"></comment-item>
			</view>
		</view>
		
		<view>
			<comment-frame 
			@commentEnv="commentEnv"
			:commentObj="commentObj" 
			:placeholder="`回复：${giveName(this.replyItem)}`"></comment-frame>			
		</view>
		
	</view>
</template>


<script>
	import {giveName,giveAvatar} from "../../utils/tools.js"
	const db=uniCloud.database()
	export default {
		data() {
			return {
				replyItem:null,
				commentObj:{
					article_id:"",
					comment_type:1,
					reply_user_id:"",
					reply_comment_id:""
				},
				childReplyArr:[]
			};
		},
		onLoad(e){
			let replyItem=uni.getStorageSync("replyItem");
			if(!replyItem) return uni.navigateBack();
			this.replyItem=replyItem || {}
			this.commentObj.article_id=this.replyItem.article_id;
			this.commentObj.reply_user_id=this.replyItem.user_id[0]._id;
			this.commentObj.reply_comment_id=this.replyItem._id;
			this.getComment();
		},
		onUnload(){
			uni.removeStorageSync("replyItem")
		},
		methods:{
			giveName,giveAvatar,
			//评论成功后的回调
			commentEnv(){
				this.childReplyArr=[];
				this.getComment();
			},
			
			
			//获取子集评论列表
			getComment(){
				let commentTemp=db.collection("quanzi_comment")
				.where(`article_id == "${this.replyItem.article_id}" && comment_type==1 && 
reply_comment_id == "${this.replyItem._id}"`).orderBy("comment_date desc").limit(10).getTemp();
				let userTemp=db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
			
				db.collection(commentTemp,userTemp).get().then(res=>{
					console.log(res);					
					this.childReplyArr=res.result.data
				})
			}
		}
	}
</script>

<style lang="scss">
.reply{
	.top{
		padding:30rpx;
		border-bottom:15rpx solid #eee;
	}
	.list{
		padding:30rpx;
		padding-bottom:120rpx;
		.row{
			padding-bottom:15rpx;
		}
	}
}
</style>
 