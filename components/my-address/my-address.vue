<template>
	<view class="address">
		<!-- 选择收货地址按钮 -->
		<view class="chose-address-box" v-if="JSON.stringify(address)=='{}'">
			<button type="primary" style="background-color: #4CD964;" size="mini" class="chose-btn" @click="choseAddressHandler">选择收货地址+</button>
		</view>
		<!-- 收货地址 -->
		<view class="address-info-box" v-else @click="choseAddressHandler">
			<view class="row1">
				<view class="row1-left">
					<text class="left-tag">收货人：</text>
					<text class="left-uname">{{address.userName}}</text>
				</view>
				<view class="row1-right">
					<text>联系电话：</text>
					<text class="phone">{{address.telNumber}}</text>
					<uni-icons type="forward" size="18"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					<text class="row2-tag">详细收货地址：</text>
				</view>
				<view class="row2-right">
					<text class="row2-address">{{addStr}}</text>
				</view>
			</view>
		</view>
		<!-- 边框图片 -->
		<image src="https://img2.baidu.com/it/u=898081016,2277042480&fm=253&fmt=auto&app=138&f=JPEG?w=332&h=500" class="border-image"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				// address:{}
			};
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			async choseAddressHandler(){
				const [err,succ]=await uni.chooseAddress().then(err=>err);
				if(err==null && succ.errMsg=="chooseAddress:ok"){
					// this.address=succ;
					this.updateAddress(succ);
				}
				if(err && err.errMsg==='chooseAddress:fail auth deny') {
					this.reAuth()
				}
			},
			async reAuth(){
				const [err,succ]=await uni.showModal({
					content:'检测到您没有打开地址权限，是否去设置打开？',
					showCancel:true,
					cancelText:'取消',
					confirmText:'确定'
				});
				if(err) return
				if(succ.cancel) return uni.$showMsg('您取消了用户授权');
				if(succ.confirm) {
					this.getArr()
					return console.log('您需要进一步操作');
				} 
			},
			getArr(){
				uni.openSetting({
					success: (settingResult) => {
						console.log(Object.values(settingResult));
						if(!settingResult['scope.address']) return uni.$showMsg('您取消了授权！')
						if(settingResult['scope.address']) return uni.$showMsg('授权成功，请选择收货地址')
					}
				})
			}
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addStr'])
		},
		onLoad() {
			console.log(this.address);
		}
	}
</script>

<style lang="scss">
	.address{
		// 选择收货地址按钮
		.chose-address-box{
			height: 70px;
			background-color: #F5F5F5;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		// 详细收货地址
		.address-info-box{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: 12px;
			padding: 0 5px;
			.row1{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.row1-left{}
				.row1-right{
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.row2{
				margin-top: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.row2-left{
					flex: 1;
				}
				.row2-right{
					flex: 3;
					.row2-address{
						// white-space: nowrap;
						// overflow: hidden;
						// text-overflow: ellipsis;
					}
				}
			}
		}
		// 边框图片
		.border-image{
			display: block;
			width: 100%;
			height: 30px;
			box-sizing: border-box;
		}
	}
</style>
