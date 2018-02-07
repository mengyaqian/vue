// 公共方法封装
import axios from 'axios'
axios.defaults.timeout = 5000;                        //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.appType = 'Web';
axios.defaults.headers.lang='zh';
axios.defaults.headers.token=(localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')).token:'');
//axios.defaults.baseURL = 'https://uat.feikongbao.com/yodooweb/';   //配置接口地址
axios.defaults.baseURL = 'https://uat.feikongbao.com/api/';   //配置接口地址
var reg_exp={
	email: "^([a-zA-Z0-9_\\-\.])+@([a-zA-Z0-9_\-])+(\\.[a-zA-Z0-9_\-]{2,10}){1,3}$",
	phone: "^(0{0,1}1[3-9]{1}[0-9]{9})$",
	tel: "^([0-9]{3,4}-)*[0-9]{7,8}(-[0-9]{1,6})*$",
	pwd: "/w{6-16}",
	password: "^[^ ]{6,20}$",
	contract: "(^0{0,1}1[0-9]{10}$)|(^([0-9]{3,4}-)[0-9]{7,8}(-[0-9]{1,6})*$)",
	num: "^[0-9]+$",
	phoneAndTel: /(^1[0-9]{10}$)|(^([0-9]{3,4}-)*[0-9]{7,8}(-[0-9]{1,6})*$)/,
	all: /[`~!@#$%^&*_+<>{}\/'[\]]/,
	number:'^[0-9a-zA-Z]+$',
	float:/^[0-9]+(.)*[0-9]*$/,
}
var util={
       
        //邮箱验证
        testEmial(str) {
            return util.test(str, reg_exp.email);
        },
        //手机验证
        testPhone(str) {
            return util.test(str, reg_exp.phone);
        },
        //非空验证
        testNull(str) {
            var strmatch = /^[\s|\S]+$/;
            return util.test(str, strmatch);
        },
        //纯数字验证
        testInt(str) {
            var strmatch = /^[0-9]+$/;
            return util.test(str, strmatch);
		},
        test(str, strmatch) {
            var _regobj = RegExp(strmatch);
            if (_regobj.test(str)) {
                return true;
            } else {
                return false;
            }
		},
		trim(str){ 
			return str.replace(/(^\s*)|(\s*$)/g, ""); 
		},
		wHeight:document.documentElement.clientHeight, //浏览器高
		userInfo:JSON.parse(localStorage.getItem('userInfo')),
		get(url,params,cbk){
			axios.get(url,{params:params}).then(function(res){
				if(res.data.code || res.data.code){
					if(res.data.code == 200 || res.data.statusCode == 200){
						if(cbk){
							cbk(res.data)
						}
					}else{
						alert('操作失败')
					}
				}else{
					if(cbk){
						cbk(res.data)
					}
				}
                
			}).catch(function(error){
					console.log(error)
			});
		},
		_this:this,
		post(url,params,cbk,setting){
			if(localStorage.getItem('settings') != null || setting.noToken == true ){
				axios.post(url,params).then(function(response){
					if(response.data.statusCode){
						if(response.data.statusCode == 301){
							_this.$router.push('/login');
						}else if(response.data.statusCode == 302){
							alert('操作失败');
						}else if(response.data.statusCode == 200){
							cbk(response.data)
						}else{
							cbk(response.data)
						}
					}else{
						cbk(response.data)
					}
				}).catch(function (error) {
					console.log(error);
					 alert(error);
				});
			}else{
				_this.$router.push('/login');
			}
		},
		getDefaultTime(time){
			var t = time ? new Date(time) : new Date();
			var Mon = t.getMonth()+1;
			var Day = t.getDate();
			if(t.getMonth()+1<10){
				Mon = '0'+Mon;
			}
			if(t.getDate()<10){
				Day = '0'+Day;
			}
			return t.getFullYear()+'-'+ Mon+ '-' + Day+ ' '+ t.getHours()+':'+ t.getMinutes()+':'+ t.getSeconds();
		},
		//审批流
		getStepStatusText(steps){
            var counts = 0
			if (typeof steps == 'object' && steps.length > 0) {
				for ( var i in  steps ) {
					var statusSetting = {
					text: '',
					textColor: '',
					imgSrc: ''
					}, conclusion = steps[i].conclusion;
					switch (conclusion) {
					case 0:
						if (counts == 1) {
						statusSetting = {
							text: '未到达',
							textColor: '#666',
							imgSrc:require('../assets/noshenhe.png')
						}
						} else {
						statusSetting = {
							text: '审批中',
							textColor: '#F5A402',
							imgSrc: require('../assets/shenghezhong-tubi.png')
						}
						counts = 1;
						}
						break;
					case 1:
						statusSetting = {
						text: '通过',
						textColor: '#7AD752',
						imgSrc:require('../assets/ogrin.png')
						}
						break;
					case 2:
						statusSetting = {
						text: '驳回',
						textColor: '#EA3232',
						imgSrc: require('../assets/jujue-tubb.png')
						}
						counts = 1;
						break;
					case 3:
						statusSetting = {
						text: '转批',
						textColor: '#EA3232',
						imgSrc: require('../assets/zhuanpi.png')
						}
						break;
					case 5:
						statusSetting = {
						text: '待财务审批',
						textColor: '#F5A402',
						imgSrc: require('../assets/shenghezhong-tubi.png')
						}
						break;
					case 6:
						statusSetting = {
						text: '财务已签收',
						textColor: '#7AD752',
						imgSrc:require('../assets/ogrin.png')
						}
						break;
					case 7:
						statusSetting = {
						text: '财务审核终止',
						textColor: '#EA3232',
						imgSrc:require('../assets/jujue-tubb.png')
						}
						break;
					case 8:
						statusSetting = {
						text: '待财务结算',
						textColor: '#EA3232',
						imgSrc: require('../assets/shenghezhong-tubi.png')
						}
						break;
					case 9:
						statusSetting = {
						text: '财务已结算',
						textColor: '#7AD752',
						imgSrc:require('../assets/ogrin.png')
						}
						break;
					case 10:
						statusSetting = {
						text: '财务审批拒绝',
						textColor: '#EA3232',
						imgSrc:require('../assets/jujue-tubb.png')
						}
						break;
					case 11:
						statusSetting = {
						text: '待财务支付',
						textColor: '#EA3232',
						imgSrc:require('../assets/ogrin.png')
						}
						break;
					case 12:
						statusSetting = {
						text: '财务审批成功',
						textColor: '#7AD752',
						imgSrc: require('../assets/ogrin.png')
						}
						break;
					}
					steps[i]['statusSetting'] = statusSetting
				}
			}
		}
		
		
}

export default util


