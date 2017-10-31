/*import {playMode} from 'common/js/config'
const state={
	singer:{},
	playing:false,
	fullScreen:false,
	playList:[],
	sequenceList:playMode.sequence,
	currentIndex:-1,
	businessapplyId:'', //查看出差申请单时候的id
	
}*/
const state={
	//出差申请单详情
	travelApplicationsDetial:{
		id:'',
		showDetial:false
	},
	//选择银行卡以及创建设置默认银行卡
	bank:{
		isShow:false,
		chooseInfo:{}
	},
	//人员列表
	person:{
		isShow:false,
		importList:[],
		exportList:[]
	},
	//左侧导航当前选中的
	leftActive:'',
	//开支流水
	water:{
		item:{},
		waterShow:false,
		id:0
	}
	
}
export default state