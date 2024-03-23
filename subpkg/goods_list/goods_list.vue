<template>
	<view class="goods-container">
		<view class="goods-list">
			<view v-for="(item,i) in goodslist" :key="item.goods_id" @click="goToDetail(item)">
				<my-goods :good="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:5,
					pagenum:1,
					pagesize:10
				},
				goodslist:[],
				total:0,
				flag:false
			};
		},
		methods:{
			async getGoodsList(cb){
				this.flag=true;
				const {data:res}=await uni.$http.get('/api/public/v1/goods/search',this.queryObj);
				this.flag=false;
				cb && cb();
				if(res.meta.status!==200) return uni.$showMsg()
				this.goodslist=[...this.goodslist,...res.message.goods];
				this.total=res.message.total;
				console.log(this.goodslist[0]);
			},
			// 跳转到商品详情页
			goToDetail(item){
				uni.navigateTo({
					url:'../good_detail/good_detail?goods_id='+item.goods_id
				})
			},
		},
		onLoad(option){
			this.queryObj.query=option.query || ''
			this.queryObj.cid=option.cid || '';
			this.getGoodsList();
		},
		// 监听向上滚动动作
		onReachBottom(){
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕')
			if(this.flag) return
			this.queryObj.pagenum++;
			this.getGoodsList()
		},
		// 监听下拉动作
		onPullDownRefresh(){
			console.log(4);
			// 初始化配置
			this.queryObj.pagenum=1,
			this.total=0,
			this.goodslist=[],
			this.flag=false
			// 重新发起请求
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	.goods-container{
		.goods-list{
			
		}
	}
</style>
