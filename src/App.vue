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
						href:'/message/message',
						child:[]
					},
					{
						name:'提醒',
						href:'/message/remind',
						child:[]
					},
					{
						name:'预警',
						href:'/message/waring',
						child:[]
					}
		    ],
		    //协同办公侧栏
		    office:[
		      {
			      name:'日程管理',
						href:'/office/findSchedule',
						child:[]
			    },
					{
						name:'公告',
						href:'/office/indexNotice',
						hasChild:[]
					},
					{
						name:'工作报告',
						href:'/office/indexWork',
						hasChild:[]
					},
					{
						name:'考勤报表',
						href:'/office/reportForms',
						hasChild:[]
					}
		    ],
		    //差旅管理侧栏
				travel:[
					{
						name:'出差申请',
						href:'/travel/businessApply',
						child:[]
					},
					{
						name:'我的订单',
						href:'/travel/myorder',
						child:[]
					},
					{
						name:'出行用车',
						href:'/travel/indexDidi',
						child:[]
					}
				],
				//费用报销
				expenses:[
					{
						 name:'日常开支随手记',
						 href:'/expenses/billList',
						 child:[
							 {name:'开支流水汇总',href:'/expenses/billList'},
							 {name:'未报销',href:'/expenses/billListNot'},
							 {name:'已报销',href:'/expenses/billListYes'}
						 ]
					},
					{
						 name:'日常开支申请',
						 href:'/expenses/dailyApply',
						 child:[]
					},
					{
						 name:'出差费用报销',
						 href:'/expenses/travelExpense',
						 child:[]
					},
					{
						 name:'日常费用报销',
						 href:'/expenses/dailyExpense',
						 child:[]
					},
					{
						 name:'现金预支',
						 href:'/expenses/cashAdvance',
						 child:[]
					},
					{
						 name:'预支还款',
						 href:'/expenses/advanceRepay',
						 child:[]
					},
					{
						 name:'财务报表',
						 href:'/expenses/userCost',
						 child:[
							  {name:'个人报表',href:'/userCost'},
								{name:'项目报表',href:'/projectCost'}
						 ]
					}
				],
				//审批
				approve:[
					{
						 name:'业务审批',
						 href:'/approve/businessApprove',
						 child:[]
					},
					{
						 name:'财务审批',
						 href:'/approve/moneyApprove',
						 child:[]
					},
					{
						 name:'结算及支付',
						 href:'/approve/moneyBuyApprove',
						 child:[]
					},
					{
						 name:'财务凭证',
						 href:'/approve/voucherList',
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
  cursor: pointer;
	text-decoration:none;
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
.el-table td, .el-table th.is-leaf{
	text-align:center
}

</style>
