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
      path: '/message',
      meta:{title:'消息-待办'},
      component: Message
  },
	{
      path: '/remind',
      meta:{title:'消息-提醒'},
      component: Remind
  },
	{
      path: '/waring',
      meta:{title:'消息-预警'},
      component: Waring
  },
	{
      path: '/findSchedule',
      meta:{title:'协同办公-日程管理'},
      component: FindSchedule
  },
	{
      path: '/indexNotice',
      meta:{title:'协同办公-公告'},
      component: IndexNotice
  },
	{
      path: '/indexWork',
      meta:{title:'协同办公-工作报告'},
      component: IndexWork
  },
	{
      path: '/reportForms',
      meta:{title:'协同办公-考勤报表'},
      component: ReportForms
  },
	{
      path: '/businessApply',
      meta:{title:'差旅管理-出差申请单'},
      component: BusinessApply
  },
	{
      path: '/myorder',
      meta:{title:'差旅管理-我的订单'},
      component: Myorder
  },
	{
      path: '/indexDidi',
      meta:{title:'差旅管理-出行用车'},
      component: IndexDidi
  },
  {
    path: '/billList',
    meta:{title:'费用报销-日常开支随手记-开支流水汇总'},
    component: BillList
  },
  {
    path: '/billListNot',
    meta:{title:'费用报销-日常开支随手记-未报销'},
    component: billListNot
  },
  {
    path: '/billListYes',
    meta:{title:'费用报销-日常开支随手记-已报销'},
    component: billListYes
  },
  {
    path: '/billListAdd',
    meta:{title:'费用报销-日常开支随手记-记一笔'},
    component: billListAdd
  },
	{
    path: '/dailyApply',
    meta:{title:'费用报销-日常开支申请'},
    component: DailyApply
  },
  {
    path: '/travelExpense',
    meta:{title:'费用报销-出差费用报销'},
    component: TravelExpense
  },
	{
    path: '/dailyExpense',
    meta:{title:'费用报销-日常费用报销'},
    component: DailyExpense
  },
  {
    path: '/cashAdvance',
    meta:{title:'费用报销-现金预支'},
    component: CashAdvance
  },
	{
    path: '/advanceRepay',
    meta:{title:'费用报销-预支还款'},
    component: AdvanceRepay
  },
  {
    path: '/userCost',
    meta:{title:'费用报销-财务报表/个人报表'},
    component: UserCost
  },
  {
    path: '/businessApprove',
    meta:{title:'审批-业务审批'},
    component: BusinessApprove
  },
  {
    path: '/moneyApprove',
    meta:{title:'审批-财务审批'},
    component: MoneyApprove
  },
  {
    path: '/moneyBuyApprove',
    meta:{title:'审批-结算及支付'},
    component: MoneyBuyApprove
  },
  {
    path: '/voucherList',
    meta:{title:'审批-财务凭证'},
    component: VoucherList
  },
  {
    path:'/chuchaishenqingCreat',
    meta:{title:'创建出差申请单'},
    component:chuchaishenqingCreat
  },
  {
    path:'/chuchaishenqingCreat/:id',
    meta:{title:'修改出差申请单'},
    component:chuchaishenqingCreat
  }
  ]
})
