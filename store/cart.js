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
		},
		// 动态更新商品的选中状态
		updateAllGoodsState(state,newState){
			state.cart.forEach(item=>item.goods_state=newState)
			this.commit('m_cart/saveToStorage')
		}
	},
	getters:{
		// 商品总数
		total(state){
			// let n=0
			// state.cart.forEach(x=>n+=x.goods_count)
			// return n
			return  state.cart.reduce((t,item)=>t+=item.goods_count,0)
		},
		// 已选商品总数
		checkedCount(state){
			return state.cart.filter(item=>item.goods_state===true).reduce((t,i)=>t+=i.goods_count,0)
		},
		// 已选shang'pin'de 总价格
		checkedGoodsPrice(state){
			return state.cart.filter(x=>x.goods_state==true).reduce((p,item)=>p+=item.goods_count*item.goods_price,0).toFixed(2);
		}
	}
}