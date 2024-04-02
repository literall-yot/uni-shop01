<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="#C00000" :checked="isFullCheck" @click="changeState" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计:<text class="amount">&yen;{{checkedGoodsPrice}}</text>
		</view>
		<!-- 结算 -->
		<view class="btn-amount">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsPrice']),
			isFullCheck(){
				return this.total===this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeState(){
				this.updateAllGoodsState(!this.isFullCheck);
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	background-color: white;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid #ddd;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #C00000;
			font-weight: bold;
		}
	}
	.btn-amount{
		min-width: 100px;
		height: 50px;
		line-height: 50px;
		padding: 0 15px;
		background-color: #C00000;
		color: #FFF;
		text-align: center;
	}
}
</style>
