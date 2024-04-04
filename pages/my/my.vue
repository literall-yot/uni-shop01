<template>
	<view class="my-contaier">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMax from '../../mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins:[badgeMax],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss">
page,.my-contaier{
	height: 100%;
}
</style>
