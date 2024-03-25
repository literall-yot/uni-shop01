<template>
	<view class="cates">
		<my-search :bgColor="'#C00000'" :borderRadius="10" @click="goToSearch"></my-search>
		<view class="cates_container">
			<scroll-view scroll-y="true" class="left-menu" :style="{height: wh+'px'}">
				<block v-for="(item,i) in cateList" :key="item.cat_id">
					<view :class="['left-scroll-item',active==i? 'active' : '']" @click="changeActive(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 二级列表 -->
			<scroll-view scroll-y="true" class="right-content" :style="{height: wh+'px'}" :scroll-top="scrollTop">
				<view class="cate_leval2" v-for="(item2,i2) in cate_leval_2" enable-back-to-top="true">
					<!-- 二级标题 -->
					<view class="cate_leval2_title">
						/&nbsp;{{item2.cat_name}}&nbsp;/
					</view>
					<!-- 三级列表 -->
					<view class="cate_leval3_list">
						<view class="cate_leval3_item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon" mode=""></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMax from '../../mixins/tabbar-badge.js'
	
	export default {
		mixins:[badgeMax],
		data() {
			return {
				// 当前屏幕可用高度
				wh:0,
				// 一级分类列表数据
				cateList:[],
				active:0,
				// 二级分类列表数据
				cate_leval_2:[],
				scrollTop:1
			}
		},
		methods: {
			// 定义分类列表数据的方法
			async getCateList(){
				const {data:res}=await uni.$http.get('/api/public/v1/categories');
				if(res.meta.status!==200) return uni.$showMsg();
				this.cateList=res.message;
				this.cate_leval_2=res.message[0].children;
			},
			changeActive(i){
				this.active=i;
				this.cate_leval_2=this.cateList[i].children;
				this.scrollTop=this.scrollTop==1? 0 :1 ;
			},
			// 跳转到商品列表页
			gotoGoodsList(obj){
				uni.navigateTo({
					url:'../../subpkg/goods_list/goods_list?cid='+obj.cat_id
				})
			},
			// 跳转到搜索页
			goToSearch(){
				uni.navigateTo({
					url:'../../subpkg/search/search'
				})
			}
		},
		onLoad() {
			const sysInfo=uni.getSystemInfoSync();
			this.wh=sysInfo.windowHeight-50;
			// 调用分类列表数据的方法
			this.getCateList()
		}
	}
</script>

<style lang="scss">
	.cates_container{
		display: flex;
		border-bottom: 1px solid #E5E5E5;
		.left-menu{
			width: 120px;
			.left-scroll-item{
				height: 60px;
				line-height: 60px;
				text-align: center;
				font-size: 24rpx;
				background-color: #F7F7F7;
			}
			.active{
				position: relative;
				background-color: #C0C0C0;
				color: #c00000;
				&::before{
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					content: '';
					display: block;
					width: 5px;
					height: 30px;
					background-color: #c00000;
				}
			}
		}
		// 二级分类
		.right-content{
			.cate_leval2{
				.cate_leval2_title{
					height: 80rpx;
					line-height: 80rpx;
					font-size: 16px;
					font-weight: bold;
					text-align: center;
				}
			}
			.cate_leval3_list{
				display: flex;
				flex-wrap: wrap;
				.cate_leval3_item{
					width: 33.333%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					image{
						width: 60rpx;
						height: 60rpx;
					}
					text{
						font-size: 12px;
						margin: 10px 0;
					}
				}
			}
		}
	}
</style>
