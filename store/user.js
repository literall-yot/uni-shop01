export default {
	namespaced:true,
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 重定向Object对象
		redirectInfo:null
	}),
	mutations:{
		updateAddress(state,address){
			state.address=address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address));
		},
		updateUserInfo(state,newUserInfo){
			state.userinfo=newUserInfo;
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo));
		},
		updateToken(state,newToken){
			state.token=newToken;
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token || 'Bearer eyJhbGciOiJIUzl1NilslnR5cCl6lkpXVCJ9.eyJ1awQiOjlzLCJpYXQiOjE1NjQ3MzAwNzkslmV4cCl6MTAwMTU2NDczMDA3OHO.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPol' || 'Bearer eyJhbGciOiJIUzl1NilslnR5cCl6lkpXVCJ9.eyJ1awQiOjlzLCJpYXQiOjE1NjQ3MzAwNzkslmV4cCl6MTAwMTU2NDczMDA3OHO.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
		},
		updateRedirectInfo(state,info){
			state.redirectInfo=info;
			console.log(info);
		}
	},
	getters:{
		addStr(state){
			if(state.address==undefined) return '';
			const {provinceName,cityName,countyName,detailInfo}=state.address;
			return provinceName+cityName+countyName+detailInfo
		}
	}
}