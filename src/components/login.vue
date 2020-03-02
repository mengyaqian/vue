<template>
  <div class="login">
    <div class="header"></div>
	<div class="loginCenter">
	    <div class="login-top">
			<p>扫码登录333</p>
			<p class="border-bottom">密码登录</p>
		</div>
		<div class="pwd-box clears">
		   <p class="p1"><img src="../assets/logo.jpg"></p>
		   <div class="div1">
		      <el-input placeholder="请输入手机号" v-model="mobile" size="large"></el-input>
		   </div>
		   <div class="div1">
		     <el-input placeholder="请输入密码" v-model="pwd" size="large" type="password"></el-input>
		   </div>
		   <div class="div1">
		      <el-button style="width:100%" type="primary" size="large"  @click="logins">登陆</el-button>
		   </div>
		   <div class="div1">
		       <el-button style="float:left" type="text">忘记密码？</el-button>
			   <el-button style="float:right" type="text">新用户注册</el-button>
		   </div>
		</div>
	</div>
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
  name: 'Login',
  data() {
        return{
		    msg:'',
		    mobile:'',
		    pwd:''
	    }
  },
  methods:{
    logins(){
	    if(!util.testNull(this.mobile)){
		   this.msg = '请输入手机号';
		}else if(!util.testPhone(this.mobile)){
		   this.msg = '请输入正确的手机号';
		}else if(!util.testNull(this.pwd)){
		   this.msg = '请输入密码';
		}else{
		   this.msg='';
		}
		if(this.msg != ''){
		    this.$message({
			  showClose: true,
			  message: this.msg,
			  type: 'error'
			});
		}else{
		  var _this=this;
		  util.post('token',{mobile:_this.mobile,password:_this.pwd},function(data){
			if(data.statusCode == 200){
				var _setting = data.data;
				_setting.easemob = data.easemobSetting || '0';
				localStorage.setItem('settings', JSON.stringify(_setting));
				//getOrgan();
				_this.$router.push('/index')
			}else if(data.statusCode == 1019){
				//location.href = '../front/index-register.jsp?register=1&&tel='+mobile+'&&password='+pwd;
			}else{
				console.log(data.msg)
			}
				
		  },{noToken:true});
		 
		}
		
	 }
  }
}
</script>

<style scoped>
.header{
    height: 70px;
    line-height: 70px;
    text-align: center;
    background: #277BCF;
    position: fixed;
    top: 0px;
	left:0;
	right:0;
    z-index: 8;
}
.loginCenter{
    position: relative;
    margin: 100px auto 0;
    width: 500px;
    border: 1px solid #d0d0d0;
    padding-top: 10px;
    background: #fff;
    box-shadow: 0 0 10px #d0d0d0;
}

.login-top {
    height: 70px;
    line-height: 70px;
    margin: 0 40px;
	border-bottom:1px solid #ddd;
}
.login-top p{
    display:inline-block;
	width:200px;
}
.border-bottom {
    color: #277BCF;
    border-bottom: 4px solid #277BCF;
}
.pwd-box{
  width:70%;
  margin:10px auto
}
.p1{
    margin: 20px auto;
    width: 70px;
    height: 70px;
    border-radius: 60px;
    border: 1px solid #2C7ED0;
}
.p1 img{
    width: 50px;
    height: 50px;
    display: block;
    margin: 10px auto;
    border-radius: 80px;
}
.div1{
  margin-bottom:28px
}
</style>
