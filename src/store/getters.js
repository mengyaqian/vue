//从getter里面取数据   除了对state里的数据坐下代理，还可以做计算属性
/*export const singer = state=>state.singer
export const playing = state=>state.playing
export const fullScreen= state=>state.fullScreen
export const playList= state=>state.playList
export const sequenceList= state=>state.sequenceList
export const currentIndex= state=>state.currentIndex
export const currentSong=(state)=>{
	return state.playList[state.currentIndex]||{}
}*/
export const travelApplicationsDetial = state=>state.travelApplicationsDetial
export const bank = state =>state.bank
export const person = state => state.person
export const leftActive = state =>state.leftActive
export const water = state =>state.water
export const otherWater = state => state.otherWater
export const billListRefresh = state => state.billListRefresh
