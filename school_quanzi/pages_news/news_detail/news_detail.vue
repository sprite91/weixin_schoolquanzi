<template>
	<view>
		
		<view  v-if="loadState" style="padding: 80rpx 0rpx;">
			<u-skeleton
				rows="4"
				title
				loading				 
			></u-skeleton>
		</view>
		
		<view class="detail" v-else>
		  <view class="title">{{detail.title}}</view>
		  <view class="info">
		    <view class="left">      
		      <text>{{this.formatTime(detail.publish_date)}}</text> 
		      <text>{{detail.author}}</text>
		      <text>{{this.formatNum(detail.view_count)}}阅读</text>
		    </view>
		    <view class="right">
		      <u-icon name="share" size="25" />
		      <text>分享</text>
		      <button open-type="share" class="share" size="mini">
		      享
		      </button>
		    </view>
		  </view>
		  <view class="content">
		   <u-parse :content = "detail.content" :tagStyle= "tagStyle"></u-parse>
		  </view>
		  <view class="copyright">
		    <view class="top">免责声明</view>
		    <view>本文来自网络新闻创作者，不代表颍川泞小程序端的观点和立场，如有侵权请联系客服进行删除。</view>
		  </view>
		</view>

	</view>
</template>

<script>
	let id;
	import{formatNum,formatTime} from '../../utils/tools';
	import{newsDetail} from "../../api/apis"
import cellGroup from '../../uni_modules/uview-ui/libs/config/props/cellGroup';
	export default {
		data() {
			return {
				detail:{},
				tagStyle:{
					p:"line-height:1.7em;font-size:16px;padding-bottom:10rpx",
					 img:"margin:10rpx 0"
				},
				loadState:true,
			};
		},
		onLoad(e) {
		this.id  = e.id;
		this.getDetail(e.id)
		},
		
		methods:{
			newsDetail,formatNum,formatTime,
			//获取详情页数据
			getDetail(id){
				this.newsDetail({id}).then(res=>{
					console.log(res);
					this.detail = res.data
					this.loadState=false;
					uni.setNavigationBarTitle({
						title:res.data.title
					})
				})
				
			}
		}
	}
</script>

<style lang="scss">
.detail{
  padding:30rpx;
  .title{
    font-size: 50rpx;
    line-height: 1.5em;
  }
  .info{
    font-size: 28rpx;
    color:#999;
    display: flex;
    justify-content: space-between;
    padding:30rpx 0 50rpx;
    .left{
      text{
        padding-right: 15rpx;
      }
    }
    .right{
      display: flex;
      align-items: center;
      color:var(--themeColor);
      position: relative;
      .share{
        position: absolute;
        top:0;
        left:0;
        opacity: 0;
      }
      text{
        padding-left:5rpx;
      }
    }    
  }
  .content{ 
    .pstyle{
      padding:10rpx 0;
      line-height: 1.6em;
    }  
    .imgstyle{
      border-radius: 10rpx;      
    }  
  }
  .copyright{
    margin-top:30rpx;
    background:var(--globalBgColor2);
    padding:30rpx;
    font-size: 26rpx;
    color:#888;
    .top{
      font-size: 30rpx;
      padding-bottom:15rpx;
    }
  }
}
</style>
