export default {
	namespaced:true,
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	mutations:{
		updateAddress(state,address){
			state.address=address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address));
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