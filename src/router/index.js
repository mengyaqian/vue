import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index/index'
import Message from '@/components/message/message'
import Remind from '@/components/message/remind'
import Waring from '@/components/message/waring'
import FindSchedule from '@/components/office/findSchedule'
import IndexNotice from '@/components/office/indexNotice'
import IndexWork from '@/components/office/indexWork'
import ReportForms from '@/components/office/reportForms'
import BusinessApply from '@/components/travel/businessApply'
import Myorder from '@/components/travel/myorder'
import IndexDidi from '@/components/travel/indexDidi'
import BillList from '@/components/expenses/billList'
import DailyApply from '@/components/expenses/dailyApply'
import TravelExpense from '@/components/expenses/travelExpense'
import DailyExpense from '@/components/expenses/dailyExpense'
import CashAdvance from '@/components/expenses/cashAdvance'
import AdvanceRepay from '@/components/expenses/advanceRepay'
import UserCost from '@/components/expenses/userCost'
import BusinessApprove from '@/components/approve/businessApprove'
import MoneyApprove from '@/components/approve/moneyApprove'
import MoneyBuyApprove from '@/components/approve/moneyBuyApprove'
import VoucherList from '@/components/approve/voucherList'
import chuchaishenqingCreat from '@/components/common/chuchaishenqingCreat'
import billListNot from '@/components/expenses/billListNot'
import billListYes from '@/components/expenses/billListYes'
import billListAdd from '@/components/expenses/billListAdd'
import test from '@/components/test/test'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
	{
	   path:'/',
	   redirect:'/login'
		
	},
  {
      path: '/login',
	  meta:{title:'登陆'},
      component: Login
  },
	{
      path: '/index',
      meta:{title:'首页'},
      component: Index
  },
	{
      path: '/message/message',
      meta:{title:'消息-待办'},
      component: Message
  },
	{
      path: '/message/remind',
      meta:{title:'消息-提醒'},
      component: Remind
  },
	{
      path: '/message/waring',
      meta:{title:'消息-预警'},
      component: Waring
  },
	{
      path: '/office/findSchedule',
      meta:{title:'协同办公-日程管理'},
      component: FindSchedule
  },
	{
      path: '/office/indexNotice',
      meta:{title:'协同办公-公告'},
      component: IndexNotice
  },
	{
      path: '/office/indexWork',
      meta:{title:'协同办公-工作报告'},
      component: IndexWork
  },
	{
      path: '/office/reportForms',
      meta:{title:'协同办公-考勤报表'},
      component: ReportForms
  },
	{
      path: '/travel/businessApply',
      meta:{title:'差旅管理-出差申请单'},
      component: BusinessApply
  },
	{
      path: '/travel/myorder',
      meta:{title:'差旅管理-我的订单'},
      component: Myorder
  },
	{
      path: '/travel/indexDidi',
      meta:{title:'差旅管理-出行用车'},
      component: IndexDidi
  },
  {
    path: '/expenses/billList',
    meta:{title:'费用报销-日常开支随手记-开支流水汇总'},
    component: BillList
  },
  {
    path: '/expenses/billListNot',
    meta:{title:'费用报销-日常开支随手记-未报销'},
    component: billListNot
  },
  {
    path: '/expenses/billListYes',
    meta:{title:'费用报销-日常开支随手记-已报销'},
    component: billListYes
  },
  {
    path: '/expenses/billListAdd',
    meta:{title:'费用报销-日常开支随手记-记一笔'},
    component: billListAdd
  },
	{
    path: '/expenses/dailyApply',
    meta:{title:'费用报销-日常开支申请'},
    component: DailyApply
  },
  {
    path: '/expenses/travelExpense',
    meta:{title:'费用报销-出差费用报销'},
    component: TravelExpense
  },
	{
    path: '/expenses/dailyExpense',
    meta:{title:'费用报销-日常费用报销'},
    component: DailyExpense
  },
  {
    path: '/expenses/cashAdvance',
    meta:{title:'费用报销-现金预支'},
    component: CashAdvance
  },
	{
    path: '/expenses/advanceRepay',
    meta:{title:'费用报销-预支还款'},
    component: AdvanceRepay
  },
  {
    path: '/expenses/userCost',
    meta:{title:'费用报销-财务报表/个人报表'},
    component: UserCost
  },
  {
    path: '/approve/businessApprove',
    meta:{title:'审批-业务审批'},
    component: BusinessApprove
  },
  {
    path: '/approve/moneyApprove',
    meta:{title:'审批-财务审批'},
    component: MoneyApprove
  },
  {
    path: '/approve/moneyBuyApprove',
    meta:{title:'审批-结算及支付'},
    component: MoneyBuyApprove
  },
  {
    path: '/approve/voucherList',
    meta:{title:'审批-财务凭证'},
    component: VoucherList
  },
  {
    path:'/common/chuchaishenqingCreat',
    meta:{title:'创建出差申请单'},
    component:chuchaishenqingCreat
  },
  {
    path:'/common/chuchaishenqingCreat/:id',
    meta:{title:'修改出差申请单'},
    component:chuchaishenqingCreat
  },
  {
    path:'/test',
    meta:{title:'测试模块'},
    component:test
  }
  ]
})
