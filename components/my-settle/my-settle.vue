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
		<view class="btn-amount" @click="checkSettle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsPrice']),
			...mapGetters('m_user',['addStr']),
			...mapState('m_user',['token']),
			...mapState('m_cart',['cart']),
			isFullCheck(){
				return this.total===this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			// 商品的全选与取消全选
			changeState(){
				this.updateAllGoodsState(!this.isFullCheck);
			},
			// 支付
			checkSettle(){
				if(!this.checkedCount) return uni.$showMsg('请选择商品');
				if(!this.addStr) return uni.$showMsg('请选择收货地址');
				// if(!this.token) return uni.$showMsg('请先登录');
				if(!this.token) return this.delayNavigate()
				this.payOrder()
			},
			// 提示登录
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请先登录！'+n+'S后自动跳转到登录页',
					mask:true,
					duration:1500
				})
			},
			// 发起微信支付
			async payOrder(){
				// 1.创建订单
				// 1.1创建订单信息对象
				const orderInfo={
					order_price:this.checkedGoodsPrice,
					consignee_addr:this.addStr,
					goods:this.cart.filter(x=>x.goods_state).map(i=>({
							goods_id:i.goods_id,
							goods_price:i.goods_price,
							goods_number:i.goods_count
						})
						
					)
				};
				// 1.2发起请求，
				const {data:res}=await uni.$http.post('/api/public/v1/my/orders/create',orderInfo);
				console.log(res);
				if(res.meta.status!==200) return uni.$showMsg('创建订单失败！') 
				// 1.3获取订单编号
				const order_number=res.message.order_number;
				// 2.订单预支付
				// 2.1发起请求
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number})
				console.log(res2);
				// 2.2预付订单生成失败
				if(res2.meta.status!==200) return uni.$showMsg('预付订单失败！');
				// 2.3得到订单必要的参数
				const payInfo=res2.message.pay;
				
				// 3.发起支付
				// 3.1调用uni.requestPayment()发起支付
				const [err,succ]= await uni.requestPayment(payInfo);
				// 3.2支付失败
				if(err) return uni.$showMsg('支付失败！');
				// 3.3完成了支付，进一步查询支付的结果
				const{data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number});
				// 3.4检测到订单未支付
				if(res3.meta.status!==200) return uni.$showMsg('订单未支付');
				// 3.5支付成功
				uni.showToast({
					icon:'success',
					title:'支付成功'
				})
			},
			delayNavigate(){
				this.seconds=3;
				this.showTips(this.seconds);
				this.timer=setInterval(()=>{
					this.seconds--
					if(this.seconds<=0){
						clearInterval(this.timer);
						return uni.switchTab({
							url:'../../pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						
					}
					this.showTips(this.seconds);
				},1000)
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
