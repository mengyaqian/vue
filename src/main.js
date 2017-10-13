// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'
import util from '@/util/util.js'
//import axios from 'axios'

Vue.use(Element)
//axios.defaults.timeout = 5000;                        //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
//axios.defaults.baseURL = 'https://uat.feikongbao.com/yodooweb/';   //配置接口地址
/*import {Select,Button,Input} from 'element-ui'
Vue.use(Select)
Vue.use(Button)
Vue.use(Input)*/
Vue.config.productionTip = false
/*
var http = {
	get(){
		this.$http.get(url,params).then(function(res){
	
		}).catch(function(error){
				console.log(error)
		});
	},
	post(){
		this.$http.post(url,params).then(function(res){
	
		}).catch(function(error){
				console.log(error)
		});
	}
}*/


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

//export default http


