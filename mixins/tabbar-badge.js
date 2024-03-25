import {mapGetters} from 'vuex'

export default {
	computed:{
		...mapGetters('m_cart',['total'])
	},
	onShow() {
		this.setBadge()
		// console.log(this.total);
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				index:2,
				text:String(this.total)
			})
		}
	},
}