<template>
	<view>
		<xcx-header></xcx-header>
		<view class="banner">
			<image mode="aspectFit" class="pic"  referrer="no-referrer|origin|unsafe-url" :src="lujin"></image>
		</view>
		
		
			<v-tabs v-model="current" 
			:tabs="navArr"
			field="classname"
			 activeColor = "#3692dc"
			 @change="changeTab"></v-tabs>
		
			<view class="content">
				<view class="box" v-for="item in newsArr" :key="item._id">
					<comtent-item :item="item"></comtent-item> 
				</view>
			</view>

		<xcx-footer></xcx-footer>

	</view>
</template>

<script>
	let navid = "64d9bf1521821b2af5ec4e0a";
	let index= 0;
	import {listNav,collectionNews,getPic} from "../../api/apis.js"
import cellGroup from "../../uni_modules/uview-ui/libs/config/props/cellGroup.js";
import colorGradient from "../../uni_modules/uview-ui/libs/function/colorGradient.js";
	export default {
		data() {
			return {
				navActive: 0,
				navArr: [],
				newsArr: [],
				loading: false,
				isData: false,
				current:0,
				lujin:""
			};
		},
		 onLoad(e) {
			
		 this.getNavList()
		
		
		
		this.getCollection()	
		this.getPicUrl()
		},
		
		methods:{
			listNav,collectionNews,getPic,
			
			//获取图片
			getPicUrl(){
				this.getPic({
					keyword:"b1"
				}).then(res=>{
					console.log(res);
					this.lujin = res.data[0].icon
					console.log(this.lujin);
				})
			},
			changeTab(index) {
				
			      console.log('当前选中的项：' + index)
				  navid = this.navArr[index]?._id
				  console.log(navid);
				  this.getCollection()
			    },
			//获取导航栏tab
			async getNavList(){
				await this.listNav().then(res=>{
					this.navArr= res.data 
				 })

			 },
			 //获取分类的学习资料
			 getCollection(){
				 this.collectionNews({
					 navid
				 }).then(res=>{
					 this.newsArr = res.data
				 })
			 }
		}
	}
</script>

<style lang="scss">
	.banner {
		width: 100%;
		height: 400rpx;

		.pic {
			width: 100%;
			height: 100%;
		}
	}

	
	
</style>