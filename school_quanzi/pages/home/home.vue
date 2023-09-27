<template>
	<view>
		<xcx-header></xcx-header>

		<view class="banner">
			<swiper previous-margin="30rpx" circular autoplay interval="3000" indicator-dots
				indicator-active-color="#3893ff" 
				indicator-color="rgba(85, 170, 255, 0.3)"
				>
				<swiper-item  v-for="(item,index) in picList" :key="index">
					<image referrer="no-referrer|origin|unsafe-url" :src="item.icon"></image>
				</swiper-item>
			</swiper>
		</view>


		<view class="scrollNav">
			<scroll-view scroll-x>

				<navigator 
					open-type="reLaunch"
					url="/pages/differ/differ"
		    class="item" v-for="(item,index) in navArr" :key="item._id" 
			> 
					<view class="pic">
						<image :src="item.icon" mode="" />
					</view>
					<view class="text">
						{{item.classname}}
					</view>
				</navigator> 

			</scroll-view>
		</view>
		<view class="about">
			<view class="pubTitle">
				<view class="en">introduce</view>
				<view class="cn">Guet三院科协简介</view>
				<view class="line"></view>
			</view>

			<view class="content">
				<view class="row">
					三院科协是计算机与信息安全学院最大的社团，拥有最大的地盘，最齐全的设施。我们社团主要以人才培养为主，从大一开始招新通过笔试面试选拔，开放OJ（online judge，是一种自动评测代码的系统）进行C语言和简单算法的练习，加入社团后学习自己喜欢的技术，我们这里有经验丰富的学长学姐可以给你指点迷津。
					</view>
				<view class="row">
					这里有一群热爱学习的小伙伴，大家都是为了共同的目标，为了自己美好的未来一起奋斗。三院科协不仅只在三院招新，欢迎各个学院的学弟学妹们加入到科协的大家庭当中。在这里没有所谓的阶级关系，而有一群跟你一起学习的小伙伴以及丰富的设备和硬件条件、资源。
					</view>
				<view class="row">目前主要面向大一进行招新。具体介绍欢迎访问三院科协官方网站，上面都有你想要了解的，欢迎加入到我们的大家庭当中！！三院科协欢迎各位新生的到来！
				</view>
			</view>

		</view>



		<view class="news">
			<view class="pubTitle">
				<view class="en">News</view>
				<view class="cn">新闻资讯</view>
				<view class="line"></view>
			</view>
			<view class="content">
				<view class="box" v-for="item in newsArr" :key="item._id">
					<news-item :item="item"></news-item>
				</view>
			</view>
		</view>

		<xcx-footer></xcx-footer>
	</view>
</template>

<script>
import {listNav,queryNews,getPic} from "../../api/apis.js"
import cellGroup from '../../uni_modules/uview-ui/libs/config/props/cellGroup';
import { formatNum } from '../../utils/tools';
	export default {
		data() {
			return {
				navArr: [],
				newsArr: [],
				picList:[]
			};
		},
		onPullDownRefresh() {
			this.getNavData()
			this.getNewsData()
		},
		onLoad() {
			this.getNavData()
			this.getNewsData()
			this.getSwiper()
		},
		methods:{
			listNav,getPic,queryNews,
			//获取轮播图列表
			getSwiper(){
				this.getPic({}).then(res=>{
					this.picList = res.data.slice(1,5);
				})
			},
			//点击导航栏跳转
			clickNav(){
				// uni.reLaunch({
				// 	url:"/pages/differ/differ?idx"+this.index
				// })
				console.log();
			},
			//获取导航栏
			 getNavData(){
				this.listNav().then(res=>{
					 this.navArr = res.data
				})
			
			},
			//获取新闻列表
			getNewsData(){
				this.queryNews({
					limit:3,
					hot:true
				}).then(res=>{
					this.newsArr = res.data
				})
			},
	
			
			
		}
	}
</script>

<style lang="scss">
	.banner {
		padding-top: 30rpx;

		swiper {
			height: 460rpx;

			swiper-item {
				image {
					width: 690rpx;
					height: 460rpx;
					border-radius: 30rpx;
				}
			}
		}
	}

	//菜单导航
	.scrollNav {
		padding: 60rpx 30rpx;

		scroll-view {
			white-space: nowrap;

			.item {
				display: inline-block;
				padding: 0 25rpx;
				text-align: center;

				.pic {
					width: 105rpx;
					height: 105rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					font-size: 32rpx;
					color: var(--globalColor);
					padding-top: 10rpx;
				}
			}

			.item:first-child {
				padding-left: 0;
			}

			.item:last-child {
				padding-right: 0;
			}

		}
	}

	//公司介绍
	.about {
		padding: 50rpx 30rpx 80rpx;
		background: url(https://mp-3309c116-4743-47d6-9979-462d2edf878c.cdn.bspapp.com/cloudstorage/fcc4ad5c-56a5-4f30-b1bc-4d1d2f1f63a2.jpg) no-repeat;
		background-size: cover;

		.content {
			.row {
				line-height: 1.6em;
				text-indent: 2em;
				font-size: 32rpx;
				padding: 20rpx 0;
				border-bottom: 1rpx dashed var(--themeColor);
				color: var(--focusColor)
			}

			.row:first-child {
				padding-top: 0;
			}

			.row:last-child {
				padding-bottom: 0;
				border-bottom: none;
			}
		}
	}

	.news {
		padding: 50rpx 30rpx;
	}
</style>