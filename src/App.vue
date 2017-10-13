<template>
  <div id="app">
     <myheader></myheader>
	 <myleftNav :leftData="leftJson"></myleftNav>
    <router-view/>
  </div>
</template>

<script>
import header from '@/components/common/header.vue'
import leftNav from '@/components/common/leftNav.vue'
export default {
  name: 'app',
  components:{
    myheader: header,
	myleftNav:leftNav
  },
  data () {
    return {
	  leftJson:{
	    //消息侧栏
	    message:[
		    {
			  name:'待办',
			  href:'/message',
			  child:[]
			},
			{
			  name:'提醒',
			  href:'/remind',
			  child:[]
			},
			{
			  name:'预警',
			  href:'/waring',
			  child:[]
			}
		],
		//协同办公侧栏
		office:[
		    {
			    name:'日程管理',
				href:'/findSchedule',
				child:[]
			},
			{
			    name:'公告',
				href:'/indexNotice',
				hasChild:[]
			},
			{
			    name:'工作报告',
				href:'/indexWork',
				hasChild:[]
			},
			{
			    name:'考勤报表',
				href:'/reportForms',
				hasChild:[]
			}
		],
		//差旅管理侧栏
		travel:[
		    {
			    name:'出差申请',
				href:'/businessApply',
				child:[]
			},
			{
			    name:'我的订单',
				href:'/myorder',
				child:[]
			},
			{
			    name:'出行用车',
				href:'/indexDidi',
				child:[]
			}
		]
	  }
    }
  }
}
</script>

<style>
#app {
  font-family: '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  font-size:14px;
}
.clears:before, .clears:after {content: '';display: table;}
.clears:after {clear: both;}
.clears {*zoom: 1;}
.clear {clear: both;overflow: hidden;}
body,p,div{margin:0;padding:0;}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
  cursor: pointer
}
/*没有二级导航  右边盒子*/
.rightBox{
  padding-left:160px;
  padding-top:70px
}
/*有二级导航  右边盒子*/
.rightBox2{
  padding-left:360px;
  padding-top:70px
}
.noData{
  color:#277BCF
}
/*二级导航菜单样式*/
.leftTwoNav{
  width:200px;
  background:#EBF0F5;
  position:fixed;
  top:70px;
  bottom:0;
  left:160px;
}
</style>
