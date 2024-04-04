import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'
import store from '@/store/store'
uni.$http=$http;
// 配置请求根地址
$http.baseUrl="https://api-hmugo-web.itheima.net"
// 请求拦截器
$http.beforeRequest=function(options){
	uni.showLoading({
		title:"数据加载中..."
	})
	if(options.url.indexOf('/my/')!==-1){
		options.headers={
		  Authorization:store.state.m_user.token
	    }
	}
}
// 响应拦截器
$http.afterRequest=function(){
	uni.hideLoading()
}

uni.$showMsg=function(title="数据加载失败...",duration=1500){
	uni.showToast({
		title,
		duration,
		icon:"none"
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
