<template>
	<view>
		<view class="footer">  
		  <view class="row">解释权归颍川泞贸易有限公司所有</view>
		  <view class="row">Copyright © {{year}} 版权所有</view>
		  <view class="row">广西壮族自治区桂林网大D座一楼102a</view>
		</view>
		
		<view class="kefu">
		  <button class="btn" open-type="contact">1</button>
		  <image src="https://mp-06b56c9b-0f1c-45e0-add5-af96eacae8fb.cdn.bspapp.com/cloudstorage/images/客服-fill.png" mode="aspectFill" class="pic"/>
		  <view class="line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"xcx-footer",
		data() {
			return {
				 year:new Date().getFullYear()
			};
		}
	}
</script>

<style lang="scss">
.footer{
  padding:50rpx 0;
  text-align: center;
  background: var(--globalBgColor2);
  border-top:1px solid var(--themeColor);
  color:var(--descColor);
  font-size: 30rpx;
  line-height: 1.8em;  
}

.kefu{
  width: 100rpx;
  height: 100rpx;
  background: var(--themeColor);
  position: fixed;
  z-index: 10;
  bottom:100rpx;
  right: 60rpx;
  border-radius: 50%;
  box-shadow: 0 0 20rpx rgba(85, 170, 255, 0.8);
  .btn{
    position: relative;
    z-index: 2;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .pic{
    width: 85%;
    height: 85%;    
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
    z-index: 1;
  }
  .line{
    width: 100%;
    height:100%;
    border:3px solid var(--themeColor);
    position: absolute;
    top:0;
    left:0;
    border-radius: 50%;
    animation: emit 1s infinite;
  }
}

@keyframes emit{
  0%{}
  100%{
    border-width: 1px;
    opacity: 0;
    transform: scale(1.5);
  }
}
</style>