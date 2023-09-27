<template>
	<view>
		<view class="header">
		  <navigator url="/pages/index/index" open-type="reLaunch" class="logo">
		    <image src="https://mp-06b56c9b-0f1c-45e0-add5-af96eacae8fb.cdn.bspapp.com/cloudstorage/images/shenhuoquanlogo.png" mode="heightFix" class="pic"/>
		  </navigator>
		
		  <view class="search"> 
		   <!-- <u-icon name="phone" class="uicon" bindtap="clickPhone"/>   -->
		    <u-icon name="search" size="36" color="#3692dc" @click="clickSearch"/>  
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"xcx-header",
		data() {
			return {
				
			};
		},
		methods: {
		    //跳转到搜索页面
		    clickSearch(){
		     uni.navigateTo({
		     	url:"/pages_search/pages_search"
		     })
		    }
		  }
	}
</script>

<style lang="scss">
.header{
  height: 120rpx;
  border:1px solid var(--themeColor);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 30rpx;
  .logo{
    height: 100rpx;
    .pic{
      height: 100%;
    }
  }
  .search{
    color:#3692dc
  }
}
</style>