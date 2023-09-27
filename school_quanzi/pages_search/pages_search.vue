<template>
	<view>
		<u-search style="margin-top: 15rpx;" placeholder="请输入搜索内容" v-model="keyword" :clearabled="true"
			:animation="true" border-color="#3893ff" search-icon-color="#3893ff" margin="10rpx" @change="onChange"
			@search="onSearch" @custom="onSearch" @clear="onClear">
		</u-search>

		<view class="history" v-if="!contentList.length &&historyList.length">
			<view class="title">
				<view class="text">搜索历史</view>
				<view class="remove" @click="removeHis">
					<u-icon name="trash" size="25" />
					<text class="font">清空历史</text>
				</view>
			</view>
			<view class="big">
				<view class="content" v-for="(item,index) in historyList" :key="index">
					<text class="item" :data-value ="item" @click="tapHisItem">{{item}}</text>
				</view>
			</view>
	
		</view>

		<view class="total" v-if="total">
			共检索出<text>{{total}}</text>篇学习资料
		</view>

		<view class="main">
			<view class="box" v-for="(item,index) in contentList" :key="index">
				<comtent-item :item="item"></comtent-item>
			</view>
		</view>

		<u-empty v-if="!contentList.length && !historyList.length"/>


	</view>
</template>

<script>
	 let kw;
	import {collectionNews} from "@/api/apis.js"
	export default {
		data() {
			return {
	            keyword:"",
				historyList: [],
				contentList: [],
				total: 0
			};
		},
		onLoad() {
			let searchKeyArr = uni.getStorageSync("searchKeyArr") || null
			if(searchKeyArr){
				this.historyList = searchKeyArr
			}
		},
		methods: {
			//提示语
			showToast() {
			if(this.contentList){
				uni.showToast({
					title:"查询成功！",
					icon:"success"
				})
				}
				else{
					uni.showToast({
						title:"抱歉，未查询到相关数据~",
						icon:"none"
					})
				}
			},
	//清空历史记录
		removeHis(){
				this.historyList=[],
				uni.removeStorageSync("searchKeyArr"),
				this.keyword="",
				this.contentList=[],
				this.total = 0
			},
			//点击历史搜索的每一项
			tapHisItem(e){
				this.keyword= e.currentTarget.dataset.value
				this.getSearch(this.keyword)
				this.keyword=""
			},
			//点击清空,
			onClick(){
			    this.keyword="",
				this.contentList=[],
				this.total = 0
				
			},
			//获取搜索结果
			getSearch(keyword){
				this.collectionNews({
					keyword,
					limit:10
				}).then(res=>{
					
					this.total = res.total,
					this.contentList = res.data
					this.showToast()
				})
			},
			collectionNews,
			//输入框改变时
			onChange() {

			},

			//确认搜索时
			onSearch() {
				console.log(this.keyword);
				this.getSearch(this.keyword)
				let hisArr = this.historyList || [];
				hisArr.unshift(this.keyword)
				hisArr = [...new Set(hisArr)];
				this.historyList = hisArr.slice(0,10),
				uni.setStorageSync("searchKeyArr",hisArr)
				this.keyword=""
			}
		}
	}
</script>

<style lang="scss">
	/* pages/search/search.wxss */
	.history {
		padding: 30rpx;
	}

	.history .title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		color: #666;
	}

	.history .title .text {
		font-size: 32rpx;

	}

	.history .title .remove {
		color: #999;
		display: flex;
		align-items: center;
	}

	.history .title .remove .font {
		padding-left: 5rpx;
	}

	.big {
		padding: 20rpx 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap
	}
	.content{
		margin: 10rpx;
	}

	.history .content .item {
		background: #85b4e5;
		color: #333;
		font-size: 30rpx;
		padding: 8rpx 25rpx;
		margin: 10rpx;
		border-radius: 12rpx;

	}

	.total {
		padding: 30rpx 30rpx 0;
		font-size: 28rpx;
		color: #666;
	}

	.total text {
		color: #3893ff
	}
</style>