<template>
	<view class="my-userinfo-container">
		<view class="top-box">
			<image :src="userinfo.avatarUrl || 'https://img1.baidu.com/it/u=3595003471,3445740740&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500'" mode="" class="user-avatar"></image>
			<text class="user-name">{{userinfo.username || '李珍'}}</text>
		</view>
		<!-- 面板 -->
		<view class="pannel-list">
			<!-- 第一个面板 -->
			<view class="pannel">
				<view class="pannel-body">
					<view class="pannel-item">
						<text class="his-num">8</text>
						<text class="his-name">收藏的店铺</text>
					</view>
					<view class="pannel-item">
						<text class="his-num">17</text>
						<text class="his-name">收藏的商品</text>
					</view>
					<view class="pannel-item">
						<text class="his-num">28</text>
						<text class="his-name">关注的商品</text>
					</view>
					<view class="pannel-item">
						<text class="his-num">68</text>
						<text class="his-name">足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="pannel">
				<view class="pannel-title">
					我的订单
				</view>
				<view class="pannel-body">
					<view class="pannel-item">
						<text class="his-num iconfont icon-fukuantongzhi"></text>
						<text class="his-name">待付款</text>
					</view>
					<view class="pannel-item">
						<text class="his-num iconfont icon-receipt-address"></text>
						<text class="his-name">待收获</text>
					</view>
					<view class="pannel-item">
						<text class="his-num iconfont icon-tuihuotuikuan_dianpu"></text>
						<text class="his-name">退货/退款</text>
					</view>
					<view class="pannel-item">
						<text class="his-num iconfont icon-ding_dan"></text>
						<text class="his-name">全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="pannel">
				<view class="app-info-list">
					<view class="pannel-item">
						<text>收货地址</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
					<view class="pannel-item">
						<text>联系客服</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
					<view class="pannel-item" @click="outLogin">
						<text>退出登录</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
 import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user',['userinfo'])
		},
		methods:{
			...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
			// 退出登录
			async outLogin(){
				const [err,succ]= await uni.showModal({
					title:'提示',
					content:'您要退出登录吗？'
				})
				if(succ && succ.confirm) {
					this.updateAddress({});
					this.updateUserInfo({});
					this.updateToken('');
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../style/iconfont.css';
	.my-userinfo-container{
	height: 100%;
	background-color: #F4F4F4;
	.top-box{
		background-color: #C00000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.user-avatar{
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid #FFF;
			box-shadow: 0px 5px 5px #333333;
		}
		.user-name{
			margin: 15px 0;
			font-style: 16px;
			color: #fff;
		}
	}
	// pannel面板
	.pannel-list{
		position: relative;
		top: -15px;
		padding: 0 15px;
		.pannel{
			background-color: #FFF;
			margin-bottom: 10px;
			border-radius: 5px;
			.pannel-title{
				line-height: 45px;
				padding-left: 10px;
				font-size: 15px;
				border-bottom: 1px solid #fafafa;
			}
			.pannel-body{
				height:120rpx;
				display: flex;
				justify-content: space-evenly;
				.pannel-item{
					padding: 10px 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-size: 13px;
					text.his-num{
						font-size: 24px;
						color: #C00000;
					}
				}
			}
			// 第一个面板
			.app-info-list{
				display: flex;
				flex-direction: column;
				padding: 0 10px;
				.pannel-item{
					font-size: 15px;
					line-height: 45px;
					border-bottom: 1px solid #F4F4F4;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
}
</style>
