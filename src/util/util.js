// 公共方法封装
import axios from 'axios'
axios.defaults.timeout = 5000;                        //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'https://uat.feikongbao.com/yodooweb/';   //配置接口地址
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
		wHeight:document.documentElement.clientHeight, //浏览器高
		get(url,params,cbk){
			axios.get(url,{params:params}).then(function(res){
				if(res.data.code == 200 || res.data.statusCode == 200){
					if(cbk){
						cbk(res.data)
					}
				}else{
					alert('操作失败')
				}
                
			}).catch(function(error){
					console.log(error)
			});
		},
		_this:this,
		post(url,params,cbk,setting){
			var index=0;
			var body='';
			 if(setting){
				if(setting.format){
					axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
					for(let p in params){
						if(index!=0)
						  body+='&'
						body+=p+'='+params[p]
						index++;
					}
				}else{
					body=params;
				}
			 }else{
				body=params;
			 }
			 axios.post(url,body)
			 .then(function (response) {
				 console.log(response);
				 if(response.data.code=='301' || response.data.statusCode == '301'){
					 _this.$router.push('/login')
				 }else if(response.data.code == '302' || response.data.statusCode == '302'){
					alert('操作失败');
				 }else if(response.data.code=='200' || response.data.statusCode == '200'){
					 cbk(response.data)
				 }else{
					alert(response.data.message);
				 }
			 }).catch(function (error) {
				console.log(error);
				 alert(error);
			 });
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
		}
}

export default util


