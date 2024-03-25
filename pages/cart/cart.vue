<template>
	<view class="cart">
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text>购物车</text>
		</view>
		<view class="cart-goods-list">
			<uni-swipe-action>
				<block v-for="(item,i) in cart">
					<uni-swipe-action-item :options="options" @click="onClick($event,item)">
					<my-goods :good="item" :showRadio="true" :show-num="true" @radio-change="radioChangeHandler" @val-change="valChangeHandler"></my-goods>
				</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</view>
		<view></view>
	</view>
</template>

<script>
	import badgeMax from '../../mixins/tabbar-badge.js'
	import {mapState,mapMutations} from 'vuex'
	
	export default {
		mixins:[badgeMax],
		computed:{
			...mapState('m_cart',['cart'])
		},
		data() {
			return {
			  options:[
				  {
					  text:'找相似',
					  backgroundColor:'#000'
				  },
			        {
			            text: '移入收藏夹',
			            style: {
			                backgroundColor: '#ff2f14'
			            }
			        }, {
			            text: '删除',
			            style: {
			                backgroundColor: '#C00000'
			            }
			        }
			      ]
			};
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','deleteGoodById']),
			radioChangeHandler(e){
				this.updateGoodsState(e)
			},
			valChangeHandler(e){
				this.updateGoodsCount(e)
			},
			onClick(e,good){
				if(e.content.text=='删除') {
					this.deleteGoodById(good.goods_id)
				}
			}
		},
		onLoad() {
			console.log(this.cart[0]);
		}
	}
</script>

<style lang="scss">
	.cart{
		position: relative;
		.cart-title{
			position: fixed;
			top: 0px;
			z-index: 999;
			width: 100%;
			height: 40px;
			display: flex;
			align-items: center;
			border: 1px solid #efefef;
			padding-left: 5px;
			background-color: #fff;
			text{
				font-size: 14px;
				margin-left: 5px;
			}
		}
		// 购物车列表
		.cart-goods-list{
			padding-top: 45px;
			}
	}
</style>
