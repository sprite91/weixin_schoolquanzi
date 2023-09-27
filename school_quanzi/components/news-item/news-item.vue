<template>
	<view>
		<view
		 @click="clickDetail"
		class="nsitem">
		  <view class="pic">
		    <image class="img" :src="item.picurl" mode="aspectFill"/>
		  </view>
		  <view class="text">
		    <view class="title">
		      {{item.title}}
		    </view>
		    <view class="info">
		      <view class="block">
		        <u-icon name="clock" size="20" class="uicon"/>
		        <text>{{this.formatTime(item.publish_date)}}</text>
		      </view>
		      <view class="block">
		        <u-icon name="eye" size="20" class="uicon"/>
		        <text>{{this.formatNum(item.view_count)}}</text>
		      </view>      
		      <view class="block">
		        <u-icon name="account" size="20" class="uicon"/>
		        <text>{{item.author}}</text>
		      </view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
import{formatNum,formatTime} from '../../utils/tools';

	export default {
		name:"news-item",
		props:{
					item:{
						type:Object,
						default(){
							return {
								
							}
						}
						},
						title:"",
						author:""
					},
		data() {
			return {
				
			};
		},
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			formatNum,formatTime,
			clickDetail(){
				uni.navigateTo({
					url:"/pages_news/news_detail/news_detail?id="+this.item._id
				})
			}
		}
	}
</script>

<style lang="scss">
.nsitem{
  display: flex;
  justify-content: space-between;
  padding-bottom:30rpx;
  .pic{
    width: 220rpx;
    height: 150rpx;
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .text{
    width: 440rpx;
    height: 150rpx;
    text-align:justify;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title{
      line-height: 1.4em;
      color:var(--globalColor);
      font-size: 32rpx;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;				
      text-overflow: ellipsis;	
      display: -webkit-box;		
      -webkit-line-clamp: 2;
      line-clamp: 2;					
      -webkit-box-orient: vertical;
    }
    .info{
      display: flex;
      justify-content: space-between;
      font-size: 28rpx;
      color: var(--descColor);    
      .block{
        display: flex;
        align-items: center;
      }
      .uicon{
        color: var(--descColor);  
        margin-right: 6rpx;
      }  
    }
  }
}
</style>