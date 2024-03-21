<template>
	<view>
		列表
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		onLoad(){
			console.log(location.hash.split('?')[1]);
		}
	}
</script>

<style lang="scss">

</style>
