<template>
	<view v-if="goods_info.goods_name">
		<!-- 轮播图模块 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" :circular="true" indicator-color="#ccc"
		 indicator-active-color="#fff">
			<swiper-item v-for="(item,i) in goods_info.pics">
				<view class="swiper-item" @click="preview(i)">
					<image :src="item.pics_big_url"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 商品信息模块 -->
		<view class="goods-info-box">
			<!-- 价格 -->
			<view class="price">&yen;{{goods_info.goods_price}}</view>
			<!-- 商品信息主体区域 -->
			<view class="goods-info-body">
				<view class="descript">
					<!-- 描述 -->
					<view class="goods-name">
						{{goods_info.goods_name}}
					</view>
					<!-- 收藏 -->
					<view class="favio">
						<uni-icons type="star" size="18" color="gray"></uni-icons>
						<text>收藏</text>
					</view>
				</view>
				<!-- 运费 -->
				<view class="fare">快递：免运费---{{cart.length}}</view>
			</view>
		</view>
		<!-- 更多信息 -->
		<view class="more-info">
			<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		</view>
		<!-- 商品导航模块 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		computed:{
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['total'])
		},
		watch:{
			total:{
				handler(newTotal){
					const findResult=this.options.find(x=>x.text==='购物车');
					if(findResult){
						findResult.info=newTotal
					}
				},
				immediate:true
			}
		},
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		methods: {
			...mapMutations('m_cart',['addToCart']),
			// 获取商品详情数据
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				});
				if (res.meta.status !== 200) return uni.$showMsg();
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(
					/webp/g, 'jpg');
				this.goods_info = res.message;
				// console.log(Object.entries(res.message));
			},
			// 实现图片预览
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(item => item.pics_big_url)
				})
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
				uni.switchTab({
					url:'../../pages/cart/cart'
				})
			},
			buttonClick(e) {
				if(e.content.text==="加入购物车") {
					const goods={
						goods_id:this.goods_info.goods_id,
						goods_name:this.goods_info.goods_name,
						goods_price:this.goods_info.goods_price,
						goods_count:1,
						goods_small_logo:this.goods_info.goods_small_logo,
						goods_state:true
					}
					this.addToCart(goods);
				}
			}
		},
		onLoad(option) {
			const good_id = option.goods_id;
			this.getGoodsDetail(good_id);
		}
	}
</script>

<style lang="scss">
	// 轮播图
	swiper-item {
		width: 750rpx;
		image {
			display: block;
			width: 750rpx;
		}
	}

	// 商品信息
	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			margin: 10px;
			color: #C00000;
		}
		.goods-info-body {
			.descript {
				display: flex;

				.goods-name {
					font-size: 13px;
					margin-right: 10px;
				}
				.favio {
					width: 120px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border: 1px solid #efefef;
					color: gray;
					font-size: 13px;
				}
			}
		}

		// 运费
		.fare {
			color: gray;
			font-size: 12px;
			margin: 10px 0;
		}
	}

	// 更多信息
	.more-info {
		padding-bottom: 50px;
	}

	// 商品导航
	.goods-nav {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>
