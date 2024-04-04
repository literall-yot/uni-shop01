<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<text class="tip-text">登录尽享更多权限</text>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['redirectInfo']),
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			getUserInfo(e){
				if(e.detail.errMsg!=='getUserInfo:ok') return uni.$showMsg('您取消了登录授权')
				this.updateUserInfo(e.detail.userInfo);
				this.getToken(e.detail)
			},
			async getToken(info){
				const [err,res]= await uni.login().catch(err=>err);
				if(err || res.errMsg!=="login:ok") return uni.$showMsg('登陆失败!');
				let query={
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				const {data:loginResult}=await uni.$http.post('/api/public/v1/users/wxlogin',query)
				if(loginResult.meta.status!==200) return uni.$showMsg('登陆失败！');
				uni.$showMsg('登陆成功')
				if(!loginResult.message.token) {
					loginResult.message.token='Bearer eyJhbGciOiJIUzl1NilslnR5cCl6lkpXVCJ9.eyJ1awQiOjlzLCJpYXQiOjE1NjQ3MzAwNzkslmV4cCl6MTAwMTU2NDczMDA3OHO.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
				}
				this.updateToken(loginResult.message.token);
				this.navigateBack()
			},
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType=='switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.login-container{
	position: relative;
	height: 750rpx;
	background-color: #F8F8F8;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.btn-login{
		width: 90%;
		margin: 15px 0;
		border-radius: 100px;
		background-color: #C00000;
	}
	.tip-text{
		font-size: 12rpx;
		color: gray;
	}
	&::after{
		content: '';
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
}
</style>
