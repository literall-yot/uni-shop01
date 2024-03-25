<template>
	<view class="home">
		<!-- 搜索模块 -->
		<view class="search-box">
			<my-search @click="goToSearch"></my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" indicator-color="#ccc" indicator-active-color="#fff" :autoplay="true" :interval="1500" :duration="1000" circular>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'../../subpkg/good_detail/good_detail?goods_id='+item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="onClickHandle(item)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<view class="floor-title">
					<image :src="item.floor_title.image_src" mode="widthFix"></image>
				</view>
				<view class="floor-content">
					<!-- 左侧图片 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
					</navigator>
					<!-- 右侧图片 -->
					<view class="right-img-box">
						<navigator v-for="(item2,i2) in item.product_list.slice(1)" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width+'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMax from '../../mixins/tabbar-badge.js'
	
	export default {
		mixins:[badgeMax],
		data() {
			return {
				// 轮播图数据列表
				swiperList:[],
				// 分类导航数据列表
				navList:[],
				// 楼层数据列表
				floorList:[]
			}
		},
		methods: {
			// 获取轮播图数据列表的方法
			async getSwiperList(){
				const {data:res}=await uni.$http.get("/api/public/v1/home/swiperdata");
				if(res.meta.status!==200) return uni.$showMsg();
				this.swiperList=res.message;
			},
			// 获取分类导航数据的方法
			async getNavList(){
				const {data:res}=await uni.$http.get("/api/public/v1/home/catitems");
				if(res.meta.status!==200) return uni.$showMsg();
				this.navList=res.message;
			},
			// 获取楼层数据的方法
			async getFloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata');
				if(res.meta.status!==200) return uni.$showMsg();
				// 对拿到的数据进行处理
				res.message.forEach(item=>{
					item.product_list.forEach(item2=>{
						item2.url=item2.navigator_url.replace(/\/pages\/goods_list/,'/subpkg/goods_list/goods_list');
					});
				});
				this.floorList=res.message;
				// console.log(this.floorList[0].product_list[1]);
			},
			onClickHandle(item){
				if(item.name=='分类') {
					uni.switchTab({
						url:'../cate/cate'
					})
				}
			},
			// 跳转到搜索页
			goToSearch(){
				uni.navigateTo({
					url:'../../subpkg/search/search'
				})
			}
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
	// 轮播图模块
	swiper{
		height: 330rpx;
		.swiper-item,image{
			width: 100%;
			height: 100%;
		}
	}
	
	// 分类导航模块
	.nav-list{
		display:flex;
		justify-content: space-around;
		background-color: #fff;
		.nav-item{
			margin: 15rpx 0;
			image{
				width: 128rpx;
				height: 140rpx;
			}
		}
	}
	
	// 楼层模块
	.floor-list{
		.floor-item{
			.floor-title{
				padding: 10rpx 0;
				image{
					width: 100%;
				}
			}
			.floor-content{
				display: flex;
				.left-img-box{
					padding-left: 15rpx;
				}
				.right-img-box{
					display: flex;
					flex-wrap: wrap;
					image{
						padding-left: 15rpx;
					}
				}
			}
		}
	}
	
	// 搜索模块
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
