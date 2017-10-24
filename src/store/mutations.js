/*import * as types from './mutation-type'
const mutations={
	[types.SET_SINGER](state,singer){
		state.singer=singer
	},
	[types.SET_PLAYING_STATE](state,flag){
		state.flag=flag
	},
	[types.SET_FULL_SCREEN](state,flag){
		state.fullScreen=flag
	},
	[types.SET_PLAYLIST](state,list){
		state.playList=list
	},
	[types.SET_SEQUENCE_LIST](state,list){
		state.sequenceList=list
	},
	[types.SET_PLAY_MODE](state,mode){
		state.mode=mode
	},
	[types.SET_CURRENT_INDEX](state,index){
		state.currentIndex=index
	}
	
}*/
const mutations={
	detialBusinessapplyId(state,id){
		state.travelApplicationsDetial.id = id;
	},
	detialBusinessapplyShow(state,showDetial){
		state.travelApplicationsDetial.showDetial = showDetial;
	},
	showBank(state,isShow){
		state.bank.isShow = isShow
	},
	chooseBankInfo(state,chooseInfo){
		state.bank.chooseInfo = chooseInfo
	},
	showPerson(state,isShow){
		state.person.isShow = isShow
	},
	getexportList(state,exportList){
		state.person.exportList = exportList
	},
	getimportList(state,importList){
		state.person.importList = importList
	}
	
}

export default mutations

