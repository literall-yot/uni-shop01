<template>
	<view class="my-search-container" :style="{backgroundColor:bgColor}">
		<view class="my-search-box" :style="{borderRadius:borderRadius+'px'}" @click="searchBoxHandler">
			<uni-icons type="search" size="18" class="icon-search"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			bgColor:{
				type:String,
				default:"#C00000"
			},
			borderRadius:{
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container{
		height: 50px;
		padding: 0 15px;
		background-color: #c00000;
		display: flex;
		align-items: center;
		.my-search-box{
			width: 100%;
			height: 36px;
			background-color: #fff;
			border-radius: 18px;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon-search{
				vertical-align: bottom;
			}
			.placeholder{
				margin-left: 5px;
				font-size: 12px;
			}
		}
	}
</style>
