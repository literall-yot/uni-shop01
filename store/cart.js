export default {
	// 为当前模块开启命名空间
	namespaced:true,
	state:()=>({
		// {goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state},
		cart: JSON.parse(uni.getStorageSync('cart')||'[]')
	}),
		
	mutations:{
		addToCart(state,goods){
			const findResult=state.cart.find(x=>x.goods_id===goods.goods_id);
			if(!findResult){
				state.cart.unshift(goods)
			}else{
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateGoodsState(state,obj){
			const findResult= state.cart.find(x=>x.goods_id===obj.goods_id);
			findResult.goods_state=obj.goods_state;
			this.commit('m_cart/saveToStorage');
		},
		updateGoodsCount(state,obj){
			const findResult= state.cart.find(x=>x.goods_id===obj.goods_id);
			findResult.goods_count=obj.goods_count;
			this.commit('m_cart/saveToStorage');
		},
		deleteGoodById(state,good_id){
			state.cart=state.cart.filter(x=>x.goods_id!==good_id);
			this.commit('m_cart/saveToStorage');
		}
	},
	getters:{
		total(state){
			let n=0
			state.cart.forEach(x=>n+=x.goods_count)
			return n
		}
	}
}