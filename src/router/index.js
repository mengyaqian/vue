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
    }
	
  ]
})
