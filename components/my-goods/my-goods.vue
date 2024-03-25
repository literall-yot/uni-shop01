<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio :checked="good.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
			<image class="good-pic" :src="good.goods_small_logo || defaultImg" mode=""></image>
		</view>
		<view class="goods-item-right">
			<!-- 商品名字 -->
			<view class="goods-item-name">{{good.goods_name}}</view>
			<view class="goods-item-info">
				<view class="good-price">&yen;{{good.goods_price | toFixed}}</view>
				<uni-number-box v-if="showNum" :min="1" :value="good.goods_count" @change="changeValue" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			good: {
				type: Object,
				default: {}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				defaultImg:"https://img0.baidu.com/it/u=1306783595,364579397&fm=253&fmt=auto&app=120&f=JPEG?w=1478&h=800"
			};
		},
		methods:{
			// 勾选状态变化事件
			radioClickHandler(){
				this.$emit('radio-change',{
					goods_id:this.good.goods_id,
					goods_state:!this.good.goods_state
				})
			},
			// 数量框改变事件
			changeValue(value) {
				this.$emit('val-change',{
					goods_id:this.good.goods_id,
					goods_count:parseInt(value)
				})
			},
		},
		filters:{
			toFixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		display: flex;

		.goods-item-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 5px;

			.good-pic {
				width: 100px;
				height: 100px;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;

			.goods-item-name {
				font-size: 12px;
			}

			.goods-item-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.good-price {
					font-size: 32rpx;
					color: #C00000;
				}
			}
		}
	}
</style>
