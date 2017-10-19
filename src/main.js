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

localStorage.setItem('userInfo',JSON.stringify({
	avatarSmall:'http://7xp2os.com1.z0.glb.clouddn.com/201610131518326404187.png',
	bankName:'',
	bankNo:'',
	birthday:'2016-10-13 15:18:31',
	card:"",
	companyTaxScale:0,
	createDate:"2016-10-13 15:18:31",
	department:"技术部",
	departmentId:865,
	description:"",
	easemobId:"chat4835",
	email :"",
	erpAccount: "",
	id:4835,
	idCard:"",
	license:"",
	mobile:"13599999996",
	nickname:"秦守志",
	orgCode:"8599HL9",
	orgId:711,
	orgName:"查42bug",
	passport:"",
	password:"E10ADC3949BA59ABBE56E057F20F883E",
	position:513,
	positionName:"开发工程师",
	protectOn:false,
	receiver:"",
	remark:"",
	resourceFor:0,
	resourceMap:{},
	sex:0,
	status:2,
	systemRoleIds:"1,20",
	tag:"",
	tel:"13599999996",
	token:"",
	type:2,
	updateDate:"2016-10-13 15:18:31",
	username:"13599999996",
}))
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


//export default http


