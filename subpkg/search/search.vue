<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus" @input="input" cancelButton="none" clearButton="auto" radius="100" placeholder="请输入商品" bgColor='#fff'>
			</uni-search-bar>
		</view>
		<!-- 搜索列表 -->
		<view class="sugg-list" v-if="searchList.length>0">
			<view class="sugg-item" v-for="(item,i) in searchList" :key="i" @click="goToDetail(item)">
				<text class="sugg-name">{{item.goods_name}}</text>
				<uni-icons type="forward" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<!-- 历史列表 -->
			<view class="history-list" v-for="(item,i) in history" :key="i" @click="goToGoodsList(item)">
				<view class="tag">
					<uni-tag :text="item" type="default" :circle="true"></uni-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue:'李珍',
				timer:null,
				kw:'',
				searchList:[],
				historyList:['a','b']
			};
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer=setTimeout(()=>{
					this.kw=e.value;
					this.getSearchList()
				},500)
			},
			// 获取搜索结果列表
			async getSearchList(){
				if(this.kw===''){
					this.searchList=[];
					return
				}
				const {data:res}=await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw});
				if(res.meta.status!==200) return uni.$showMsg();
				this.searchList=res.message;
				// 调用saveHistory
				this.saveHistory(this.kw)
			},
			// 跳转到商品详情页
			goToDetail(item){
				uni.navigateTo({
					url:'../good_detail/good_detail?goods_id='+item.goods_id
				})
			},
			// 保存历史记录
			saveHistory(kw){
				// this.historyList.unshift(kw)
				let set=new Set(this.historyList);
				if (set.has(kw)) {
					set.delete(kw);
					set.add(kw);
				}else{
					set.add(kw);
				}
				this.historyList=Array.from(set);
				uni.setStorageSync('kw',this.historyList);
			},
			// 清除历史记录
			clean(){
				this.historyList=[];
				uni.clearStorageSync();
			},
			goToGoodsList(kw){
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?query="+kw
				})
			}
		},
		computed:{
			history(){
				return [...this.historyList].reverse()
			}
		},
		onLoad(){
			this.historyList=uni.getStorageSync('kw') || [];
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.search-box{
		position: sticky;
		top:0;
		z-index: 999;
	}
	
	// 搜索列表
	.sugg-list{
		padding: 0 10px;
		.sugg-item{
			padding: 5px 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text.sugg-name{
				font-size: 12px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
	
	// 搜索历史模块
	.history-box{
		padding: 0 5px;
		.history-title{
			height: 40px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #C0C0C0;
		}
		.history-list{
			.tag{
				float: left;
				padding: 5px;
				margin: 5px 5px 0 0;
			}
		}
	}
</style>
