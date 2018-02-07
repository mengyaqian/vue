<template>
  <div class="home">
	    <div style="margin:90px 20px 10px">
			<div style="border:1px solid blue;margin-left:200px;margin-top:200px">
			<p>父组件</p>
			<!--<testModelOne :va="status" :child-object="obj" ></testModelOne>-->
            <testModelOne ref="chil" />
			<el-select v-model="status" placeholder="请选择">
				<el-option
				  v-for="item in listStatus"
				  :key="item.status"
				  :label="item.name"
				  :value="item.status">
				</el-option>
			</el-select>
			<div @click="initAppPage()">查询</div>
			</div>
		</div>	
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
import testModelOne from '@/components/test/testModelOne.vue'
export default {
  name: 'Home',
  components:{testModelOne},
  data () {
    return {
	    dataOne:{},
		dataTwo:{},
		listStatus:[
	        {name:'全部状态',status:'-2'},
			{name:'未提交',status:'0'},
			{name:'审批中',status:'1'},
			{name:'审批通过',status:'3'},
			{name:'审批拒绝',status:'4'},
			{name:'待财务签收',status:'5'},
			{name:'待财务结算',status:'6'},
			{name:'财务审核终止',status:'7'},
			{name:'待财务支付',status:'9'},
			{name:'财务结算终止',status:'10'},
			{name:'财务已支付',status:'12'},
			{name:'已出行',status:'14'}
	  ],
	  status:'-2',
	  obj:{},
	  picdata:{
		"id": "pptv://page/cate/joke", 
		"title": "搞笑", 
		"head": [
			{
				"id": "joke_logo", 
				"tid": "t_header_2", 
				"data": {
					"source": "json", 
					"dlist": [ ]
				}
			}, 
			{
				"id": "Happy_Topbar", 
				"tid": "t_header_1", 
				"data": {
					"source": "json", 
					"title": "搞笑顶部导航", 
					"dlist": [
						{
							"id": "record", 
							"title": "播放记录", 
							"subtitle": "", 
							"icon": "http://sr3.pplive.com/cms/40/08/420462a279acbe7b942cfe917564f7bb.png", 
							"iconed": "http://sr3.pplive.com/cms/40/08/420462a279acbe7b942cfe917564f7bb.png", 
							"target": "native", 
							"link": "pptv://page/history"
						}, 
						{
							"id": "search", 
							"title": "电影顶部导航-搜索", 
							"subtitle": "养虾1年挣5000万,你好！面试官,英超,烈火刀影,熊爸熊孩子,小楼又东风,寻梦环游记,奇门遁甲", 
							"icon": "http://sr4.pplive.com/cms/20/48/3ca7889db8b07c62dc914a2201694f8e.png", 
							"iconed": "http://sr4.pplive.com/cms/20/48/3ca7889db8b07c62dc914a2201694f8e.png", 
							"target": "native", 
							"link": "pptv://page/search"
						}
					]
				}
			}
		], 
		"modules": [
			{
				"id": "joke-filter", 
				"tid": "t_filter_1", 
				"data": { }
			}, 
			{
				"id": "joke_slide", 
				"tid": "t_slide_1", 
				"data": {
					"source": "json", 
					"title": "幻灯", 
					"dlist": [
						{
							"title": "笑成傻逼！中日韩英四语大PK", 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27332553&sid=8070041", 
							"img": "http://sr1.pplive.cn/cms/32/84/3fdfb91f122759522c8c71e6d950482d.jpg", 
							"online": 1517198460
						}, 
						{
							"title": "作死男家中假装出轨被女友完爆！", 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27317833&sid=8069892", 
							"img": "http://sr3.pplive.cn/cms/42/61/7e3b0e80d69e2f0b5e7c65c66b47d117.jpg", 
							"online": 1516846380
						}, 
						{
							"title": "快住手！你们都对教科书做了什么？", 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27250985&sid=8070041", 
							"img": "http://sr3.pplive.cn/cms/25/43/9b2ecfeaf3f9dac610c32724493459de.jpg", 
							"online": 1515638700
						}
					]
				}, 
				"scale": 0.4667
			}, 
			{
				"id": "joke_overlay", 
				"tid": "t_overlay_1", 
				"data": {
					"source": "local", 
					"title": "查看全部搞笑视频", 
					"target": "native", 
					"link": "pptv://page/cate/joke?type=75340&pagetype=filter", 
					"dlist": [ ]
				}
			}, 
			{
				"id": "joke_filter_2", 
				"tid": "t_filter_2", 
				"data": {
					"source": "json", 
					"title": "精选筛选", 
					"target": "native", 
					"link": "pptv://page/cate/joke?type=75340", 
					"dlist": [
						{
							"id": "0|75348", 
							"title": "恶搞整蛊", 
							"target": "native", 
							"link": "pptv://page/cate/joke?type=75340&pagetype=quick&position=0%7C75348"
						}, 
						{
							"id": "0|75349", 
							"title": "搞笑自拍", 
							"target": "native", 
							"link": "pptv://page/cate/joke?type=75340&pagetype=quick&position=0%7C75349"
						}, 
						{
							"id": "0|75350", 
							"title": "相声小品", 
							"target": "native", 
							"link": "pptv://page/cate/joke?type=75340&pagetype=quick&position=0%7C75350"
						}, 
						{
							"id": "0|75351", 
							"title": "超萌系列", 
							"target": "native", 
							"link": "pptv://page/cate/joke?type=75340&pagetype=quick&position=0%7C75351"
						}, 
						{
							"id": "0|75352", 
							"title": "动物奇趣", 
							"target": "native", 
							"link": "pptv://page/cate/joke?type=75340&pagetype=quick&position=0%7C75352"
						}, 
						{
							"id": "0|75353", 
							"title": "开心广告", 
							"target": "native", 
							"link": "pptv://page/cate/joke?type=75340&pagetype=quick&position=0%7C75353"
						}, 
						{
							"id": "0|75489", 
							"title": "爆笑秀场", 
							"target": "native", 
							"link": "pptv://page/cate/joke?type=75340&pagetype=quick&position=0%7C75489"
						}, 
						{
							"id": "0|0", 
							"title": "全部", 
							"target": "native", 
							"link": "pptv://page/cate/joke?type=75340&pagetype=filter&position=0%7C0"
						}
					]
				}
			}, 
			{
				"id": "joke-recommend", 
				"tid": "t_recommend_1", 
				"data": {
					"source": "json", 
					"dlist": [
						{
							"title": "【福利】影视会员3元啦，去广告、看大片", 
							"target": "html5", 
							"link": "http://vip.pptv.com/activity/2017/laxin/ios/?plt=app", 
							"img": "http://sr2.pplive.cn/cms/38/38/1f98b08d491fe243cf37e9e3a9958793.png", 
							"online": 1511506860
						}, 
						{
							"title": "男人VS女人嘿嘿嘿完事后都在想什么", 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27322223&sid=8070484", 
							"img": "http://sr2.pplive.com/cms/38/38/1f98b08d491fe243cf37e9e3a9958793.png", 
							"online": 1497579660
						}
					]
				}
			}, 
			{
				"id": "joke_news", 
				"tid": "t_horizontal_1", 
				"data": {
					"source": "json", 
					"title": "最新更新", 
					"showcount": "4", 
					"showslogan": "换一批试试", 
					"dlist": [
						{
							"title": "别被渣女欺骗玩弄感情", 
							"overlap": "快离这些渣女远一点", 
							"overlap_new": {
								"left": "快离这些渣女远一点"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27317755&sid=8070484", 
							"img": "http://sr1.pplive.cn/cms/30/73/5c13d8d791425d76e1f1ee4c399ca0ae.jpg", 
							"online": 1517207640
						}, 
						{
							"title": "骚年打110问伟哥怎么吃", 
							"overlap": "网友：是该吃药了", 
							"overlap_new": {
								"left": "网友：是该吃药了"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27319181&sid=8069998", 
							"img": "http://sr3.pplive.cn/cms/63/68/26446c7625adaee04b0c2ae78792c4eb.jpg", 
							"online": 1517206980
						}, 
						{
							"title": "如果吉冈里帆成为你的女票", 
							"overlap": "你的朋友会有什么反应", 
							"overlap_new": {
								"left": "你的朋友会有什么反应"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27302663&sid=8069892", 
							"img": "http://sr2.pplive.cn/cms/26/23/a6f4ce1e90c7ef87419cb1cf500a198b.jpg", 
							"img_bg": "http://sr2.pplive.cn/cms/26/23/a6f4ce1e90c7ef87419cb1cf500a198b.jpg", 
							"online": 1516585380
						}, 
						{
							"title": "戏精送女生朋友TT飙演技", 
							"overlap": "疯狂暗示测试她的反应", 
							"overlap_new": {
								"left": "疯狂暗示测试她的反应"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27302635&sid=8070041", 
							"img": "http://sr2.pplive.cn/cms/31/53/475295d7708e0b92547d1cc7a0cc47ce.jpg", 
							"img_bg": "http://sr2.pplive.cn/cms/31/53/475295d7708e0b92547d1cc7a0cc47ce.jpg", 
							"online": 1516584840
						}, 
						{
							"title": "教你如何一招驯服犬系男友", 
							"overlap": "弥漫着恋爱的酸臭味", 
							"overlap_new": {
								"left": "弥漫着恋爱的酸臭味"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27302641&sid=8070484", 
							"img": "http://sr1.pplive.cn/cms/52/88/d1189cdfc8dc173fcfc541abd9ded532.jpg", 
							"img_bg": "http://sr1.pplive.cn/cms/52/88/d1189cdfc8dc173fcfc541abd9ded532.jpg", 
							"online": 1516584960
						}, 
						{
							"title": "男友买了震动内裤送给女友", 
							"overlap": "从前有个女友系列", 
							"overlap_new": {
								"left": "从前有个女友系列"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27282861&sid=8069892", 
							"img": "http://sr2.pplive.cn/cms/19/57/ae879d4da4b94dcdb47cbba159caf109.jpg", 
							"img_bg": "http://sr2.pplive.cn/cms/19/57/ae879d4da4b94dcdb47cbba159caf109.jpg", 
							"online": 1516243200
						}, 
						{
							"title": "当爹的给孩子们洗完澡后", 
							"overlap": "熊娃们笑了 妈妈哭了", 
							"overlap_new": {
								"left": "熊娃们笑了 妈妈哭了"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27302713&sid=8081707", 
							"img": "http://sr4.pplive.cn/cms/18/19/ad4917f436744343d6a6be406996614c.jpg", 
							"img_bg": "http://sr4.pplive.cn/cms/18/19/ad4917f436744343d6a6be406996614c.jpg", 
							"online": 1516586100
						}, 
						{
							"title": "妹子被男友逼跳泰国艳舞", 
							"overlap": "喊不要但身体却很诚实", 
							"overlap_new": {
								"left": "喊不要但身体却很诚实"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27277547&sid=8070126", 
							"img": "http://sr4.pplive.cn/cms/29/57/82058e3bcc72f0c60511132ed9535ef5.jpg", 
							"img_bg": "http://sr4.pplive.cn/cms/29/57/82058e3bcc72f0c60511132ed9535ef5.jpg", 
							"online": 1516155060
						}, 
						{
							"title": "女主播校园直播偶遇熊孩子", 
							"overlap": "当场露屁屁笑屎了", 
							"overlap_new": {
								"left": "当场露屁屁笑屎了"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27283299&sid=8081707", 
							"img": "http://sr2.pplive.cn/cms/30/63/0043af2cdee9fd0fa9fcb05210058f8f.jpg", 
							"img_bg": "http://sr2.pplive.cn/cms/30/63/0043af2cdee9fd0fa9fcb05210058f8f.jpg", 
							"online": 1516246740
						}, 
						{
							"title": "实拍小伙表白成功抛摔女神", 
							"overlap": "网友：史上最快分手", 
							"overlap_new": {
								"left": "网友：史上最快分手"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27272049&sid=8070484", 
							"img": "http://sr3.pplive.cn/cms/11/24/512c2eee09c801ba63f4feed1698f811.gif", 
							"img_bg": "http://sr3.pplive.cn/cms/11/24/512c2eee09c801ba63f4feed1698f811.gif", 
							"online": 1516065180
						}, 
						{
							"title": "昔日女神黄圣依惨遭鬼畜", 
							"overlap": "蛇皮走位魔性鹅鹅鹅", 
							"overlap_new": {
								"left": "蛇皮走位魔性鹅鹅鹅"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27233963&sid=8079817", 
							"img": "http://sr2.pplive.cn/cms/16/80/41916bf660b1fe63b1aed061ce559bc0.gif", 
							"online": 1515379020
						}, 
						{
							"title": "妹子假扮明星在商场闲逛", 
							"overlap": "结果场面失控了…", 
							"overlap_new": {
								"left": "结果场面失控了…"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27235837&sid=8079817", 
							"img": "http://sr1.pplive.cn/cms/18/58/c0e4ecbdbdf85313461877b5607ee04d.jpg", 
							"online": 1515400200
						}
					]
				}
			}, 
			{
				"id": "joke_ad", 
				"tid": "t_ad_1", 
				"data": {
					"source": "net", 
					"adstyle": "t_ad_1", 
					"dlist": [ ]
				}
			}, 
			{
				"id": "joke_recommend", 
				"tid": "t_horizontal_1", 
				"data": {
					"source": "json", 
					"title": "小编推荐", 
					"showcount": "4", 
					"showslogan": "换一批试试", 
					"dlist": [
						{
							"title": "如何优雅的揩油美女", 
							"overlap": "小哥亲身教学", 
							"overlap_new": {
								"left": "小哥亲身教学"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27272243&sid=8069892", 
							"img": "http://sr2.pplive.cn/cms/10/99/9951126c1f38d53fab8b15523cd1dc8d.gif", 
							"img_bg": "http://sr2.pplive.cn/cms/10/99/9951126c1f38d53fab8b15523cd1dc8d.gif", 
							"online": 1516066980
						}, 
						{
							"title": "被疑不穿内衣妹纸当街自测", 
							"overlap": "一旁男朋友还神助攻", 
							"overlap_new": {
								"left": "一旁男朋友还神助攻"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27307925&sid=8069895", 
							"img": "http://sr4.pplive.cn/cms/61/73/bb0246e2c3beb45d3902b5c8d9eae5a1.jpg", 
							"img_bg": "http://sr4.pplive.cn/cms/61/73/bb0246e2c3beb45d3902b5c8d9eae5a1.jpg", 
							"online": 1516671960
						}, 
						{
							"title": "1940年的健身房长这个样子", 
							"overlap": "那时健身的姐姐们都好漂亮", 
							"overlap_new": {
								"left": "那时健身的姐姐们都好漂亮"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27307703&sid=8070484", 
							"img": "http://sr3.pplive.cn/cms/24/84/a8522c06e7eac8b2fd61859fe13e93ca.gif", 
							"img_bg": "http://sr3.pplive.cn/cms/24/84/a8522c06e7eac8b2fd61859fe13e93ca.gif", 
							"online": 1516670160
						}, 
						{
							"title": "白人女孩不喜欢亚洲男孩？", 
							"overlap": "小伙子上街搭讪求证", 
							"overlap_new": {
								"left": "小伙子上街搭讪求证"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27307935&sid=8069895", 
							"img": "http://sr4.pplive.cn/cms/25/21/be655a1fac8e9bf4362d38ec05c14f18.jpg", 
							"img_bg": "http://sr4.pplive.cn/cms/25/21/be655a1fac8e9bf4362d38ec05c14f18.jpg", 
							"online": 1516672260
						}, 
						{
							"title": "女主播惨遭大黑牛袭击", 
							"overlap": "场面一度很尴尬", 
							"overlap_new": {
								"left": "场面一度很尴尬"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27235459&sid=8079817", 
							"img": "http://sr3.pplive.cn/cms/67/52/1456e3441d1c8f7f21695a06adf5ec8a.jpg", 
							"online": 1515397680
						}, 
						{
							"title": "00后CEO扬言灭掉阿里腾讯", 
							"overlap": "80后90后要哭了", 
							"overlap_new": {
								"left": "80后90后要哭了"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27235497&sid=8079817", 
							"img": "http://sr4.pplive.cn/cms/19/27/8a1d9dafc58bb821b8049f740ebfcb47.jpg", 
							"online": 1515396900
						}, 
						{
							"title": "实拍骚气哥教室唱《痒》", 
							"overlap": "来啊，造孽啊~", 
							"overlap_new": {
								"left": "来啊，造孽啊~"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27216697&sid=8079817", 
							"img": "http://sr4.pplive.cn/cms/17/45/24da1dbc0809642057d5f77842c0125a.jpg", 
							"online": 1515032460
						}, 
						{
							"title": "骚年用503胶水洗澡作死", 
							"overlap": "502表示不服", 
							"overlap_new": {
								"left": "502表示不服"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27212577&sid=8079817", 
							"img": "http://sr1.pplive.cn/cms/13/03/c355e05dd2ad674af5ef69aeafaad6bb.jpg"
						}, 
						{
							"title": "美女直播往嘴里塞灯泡糖", 
							"overlap": "结果拔不出来了", 
							"overlap_new": {
								"left": "结果拔不出来了"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27212299&sid=8079817", 
							"img": "http://sr1.pplive.cn/cms/37/45/87e82c5c3b056434401a5fa4b4e85500.jpg"
						}, 
						{
							"title": "新郎对着新娘唱《丑八怪》", 
							"overlap": "网友：岳父正提大刀赶来", 
							"overlap_new": {
								"left": "网友：岳父正提大刀赶来"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27173885&sid=8079817", 
							"img": "http://sr2.pplive.cn/cms/97/33/58b0351f8d08e8a48722877fb932eb35.jpg", 
							"online": 1514170800
						}, 
						{
							"title": "汪星人装扮成雪人萌到一片", 
							"overlap": "汪星人：拜托 很冷诶", 
							"overlap_new": {
								"left": "汪星人：拜托 很冷诶"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27160043&sid=8079817", 
							"img": "http://sr1.pplive.cn/cms/72/41/046a0d3f7852e5957cb8ac69110429cf.gif", 
							"online": 1513934220
						}, 
						{
							"title": "小伙坐一次14万豪华头等舱", 
							"overlap": "贫穷再次限制了我的想象", 
							"overlap_new": {
								"left": "贫穷再次限制了我的想象"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27145037&sid=8079817", 
							"img": "http://sr3.pplive.cn/cms/26/00/c29116411a7d7bed49e247c01d026e89.jpg", 
							"online": 1513648920
						}
					]
				}
			}, 
			{
				"id": "joke_cool", 
				"tid": "t_horizontal_1", 
				"data": {
					"source": "json", 
					"title": "爆笑秀场", 
					"showcount": "4", 
					"showslogan": "换一批试试", 
					"dlist": [
						{
							"title": "女友神模仿紫薇和尔康吵架", 
							"overlap": "最后那条鱼的演技最好", 
							"overlap_new": {
								"left": "最后那条鱼的演技最好"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27252251&sid=8069939", 
							"img": "http://sr4.pplive.cn/cms/30/12/65a7e8dea8947711a397ca74cc65e4c5.jpg", 
							"img_bg": "http://sr4.pplive.cn/cms/30/12/65a7e8dea8947711a397ca74cc65e4c5.jpg", 
							"online": 1515650940
						}, 
						{
							"title": "男同性恋体验摸妹子胸部", 
							"overlap": "摸完反应全是这样的", 
							"overlap_new": {
								"left": "摸完反应全是这样的"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27239749&sid=8069998", 
							"img": "http://sr3.pplive.cn/cms/17/10/14d810e89579e19f09d0b073aeac1c68.jpg", 
							"img_bg": "http://sr3.pplive.cn/cms/17/10/14d810e89579e19f09d0b073aeac1c68.jpg", 
							"online": 1515465420
						}, 
						{
							"title": "骚年跟网友打赌和妹妹接吻", 
							"overlap": "桐崎荣二", 
							"overlap_new": {
								"left": "桐崎荣二"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27273101&sid=8046828", 
							"img": "http://sr3.pplive.cn/cms/17/69/d571b0f775b98e818bc6a783b2e0d550.jpg", 
							"img_bg": "http://sr3.pplive.cn/cms/17/69/d571b0f775b98e818bc6a783b2e0d550.jpg", 
							"online": 1516072620
						}, 
						{
							"title": "来中国很久的老外回家过年", 
							"overlap": "网友：笑出猪叫声", 
							"overlap_new": {
								"left": "网友：笑出猪叫声"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27266789&sid=8070484", 
							"img": "http://sr1.pplive.cn/cms/51/34/74f7b7c3c922095bb20f08b92471a790.jpg", 
							"img_bg": "http://sr1.pplive.cn/cms/51/34/74f7b7c3c922095bb20f08b92471a790.jpg", 
							"online": 1515981120
						}, 
						{
							"title": "大妈公交车上演绎freestyle", 
							"overlap": "老年有嘻哈", 
							"overlap_new": {
								"left": "老年有嘻哈"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27160295&sid=8070041", 
							"img": "http://sr4.pplive.cn/cms/17/50/800ab84537eeebc8edc2d3b13a426529.jpg"
						}, 
						{
							"title": "喵喵吸了猫薄荷后飘飘欲仙", 
							"overlap": "猫咪：我感觉自己上天了！", 
							"overlap_new": {
								"left": "猫咪：我感觉自己上天了！"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27127495&sid=8081705", 
							"img": "http://sr2.pplive.cn/cms/42/71/49bad9a39c43e7b4828b15c6a3a4cd17.jpg", 
							"img_bg": "http://sr2.pplive.cn/cms/42/71/49bad9a39c43e7b4828b15c6a3a4cd17.jpg", 
							"online": 1513303800
						}, 
						{
							"title": "萌娃打针鬼畜表情崩溃秀", 
							"overlap": "慢半拍是什么鬼", 
							"overlap_new": {
								"left": "慢半拍是什么鬼"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27114579&sid=8079817", 
							"img": "http://sr2.pplive.cn/cms/38/77/c8a2ca3c52894794a7fd042a5374f3c7.jpg", 
							"img_bg": "http://sr2.pplive.cn/cms/38/77/c8a2ca3c52894794a7fd042a5374f3c7.jpg", 
							"online": 1513133580
						}, 
						{
							"title": "妹妹在家被欠揍哥哥整蛊", 
							"overlap": "气得直跺脚", 
							"overlap_new": {
								"left": "气得直跺脚"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27140293&sid=8070522", 
							"img": "http://sr2.pplive.cn/cms/21/63/01396aecc35e0bb6a8b2542968bc0849.gif", 
							"img_bg": "http://sr2.pplive.cn/cms/21/63/01396aecc35e0bb6a8b2542968bc0849.gif", 
							"online": 1513575060
						}, 
						{
							"title": "国外公司整蛊恶搞员工", 
							"overlap": "电梯升至万米高空", 
							"overlap_new": {
								"left": "电梯升至万米高空"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27092227&sid=8069892", 
							"img": "http://sr2.pplive.cn/cms/26/89/9ff59a6ccd29b796194f49e516b58c40.jpg", 
							"online": 1512722160
						}, 
						{
							"title": "我知道做坏事会有报应", 
							"overlap": "但没想到会这么快", 
							"overlap_new": {
								"left": "但没想到会这么快"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27029979&sid=8070041", 
							"img": "http://sr1.pplive.cn/cms/38/21/a0362ff63d0baa1430eaf9059f492fcc.gif", 
							"online": 1511752560
						}, 
						{
							"title": "精致女孩是怎么喝水的", 
							"overlap": "女神女汉一秒切换", 
							"overlap_new": {
								"left": "女神女汉一秒切换"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27035775&sid=8070126", 
							"img": "http://sr4.pplive.cn/cms/31/51/314a430d95ec992e85d10e98b58a89af.jpg", 
							"online": 1511835660
						}, 
						{
							"title": "专治各种挑衅嘚瑟不服", 
							"overlap": "no作no die", 
							"overlap_new": {
								"left": "no作no die"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27013037&sid=8069998", 
							"img": "http://sr2.pplive.cn/cms/93/76/3321177ccf9dc4b8a0935f9ddda083dc.gif", 
							"online": 1511492340
						}
					]
				}
			}, 
			{
				"id": "joke_ad_1", 
				"tid": "t_ad_1", 
				"data": {
					"source": "net", 
					"adstyle": "t_ad_1", 
					"dlist": [ ]
				}
			}, 
			{
				"id": "joke_Hoax", 
				"tid": "t_horizontal_1", 
				"data": {
					"source": "json", 
					"title": "搞怪恶作剧", 
					"showcount": "4", 
					"showslogan": "换一批试试", 
					"dlist": [
						{
							"title": "给情侣男脖子抹上口红印", 
							"overlap": "女朋友瞬间发飙", 
							"overlap_new": {
								"left": "女朋友瞬间发飙"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27292127&sid=8069892", 
							"img": "http://sr1.pplive.cn/cms/19/45/c1505b474ad7a1c0f72c1880d1ad95a5.jpg", 
							"img_bg": "http://sr1.pplive.cn/cms/19/45/c1505b474ad7a1c0f72c1880d1ad95a5.jpg", 
							"online": 1516329840
						}, 
						{
							"title": "两拖车抢生意把车扯对半", 
							"overlap": "路人看傻眼", 
							"overlap_new": {
								"left": "路人看傻眼"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27292129&sid=8069892", 
							"img": "http://sr3.pplive.cn/cms/94/13/41ece38dc25262d4628aeb5e591116b7.jpg", 
							"img_bg": "http://sr3.pplive.cn/cms/94/13/41ece38dc25262d4628aeb5e591116b7.jpg", 
							"online": 1516329900
						}, 
						{
							"title": "肌肉男举重结果竟掉进坑里", 
							"overlap": "吓坏路人 反应爆笑", 
							"overlap_new": {
								"left": "吓坏路人 反应爆笑"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27292137&sid=8069892", 
							"img": "http://sr3.pplive.cn/cms/13/87/da1769db915cc6ba1e5f777b340baf87.jpg", 
							"img_bg": "http://sr3.pplive.cn/cms/13/87/da1769db915cc6ba1e5f777b340baf87.jpg", 
							"online": 1516329900
						}, 
						{
							"title": "小哥街上用水气球砸路人", 
							"overlap": "幸亏跑的够快", 
							"overlap_new": {
								"left": "幸亏跑的够快"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27277561&sid=8069892", 
							"img": "http://sr1.pplive.cn/cms/23/78/4c939e7c0771d8b258ff4d8640ca7c24.jpg", 
							"img_bg": "http://sr1.pplive.cn/cms/23/78/4c939e7c0771d8b258ff4d8640ca7c24.jpg", 
							"online": 1516155240
						}, 
						{
							"title": "用磁铁从路人身上偷东西", 
							"overlap": "路人：这怕是个啥子吧", 
							"overlap_new": {
								"left": "路人：这怕是个啥子吧"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27282873&sid=8069892", 
							"img": "http://sr1.pplive.cn/cms/37/20/d1858d162c69c21f69b42b3f1691695c.jpg", 
							"online": 1516243380
						}, 
						{
							"title": "小伙自制大雪球偷砸路人", 
							"overlap": "没被逮住算你命大", 
							"overlap_new": {
								"left": "没被逮住算你命大"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27282883&sid=8069892", 
							"img": "http://sr4.pplive.cn/cms/22/41/fca4c3b5acf20d03cf4b0047d75ad812.jpg", 
							"online": 1516243380
						}, 
						{
							"title": "找路人假扮男友给妈打电话", 
							"overlap": "小哥紧张的都结巴了", 
							"overlap_new": {
								"left": "小哥紧张的都结巴了"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27266845&sid=8070522", 
							"img": "http://sr3.pplive.cn/cms/16/13/03b3751e98179333f8d8f10b2542872b.jpg", 
							"online": 1515981900
						}, 
						{
							"title": "妹子用性感妹子测试男友", 
							"overlap": "结尾有点甜", 
							"overlap_new": {
								"left": "结尾有点甜"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27266879&sid=8079817", 
							"img": "http://sr4.pplive.cn/cms/33/60/90215785c5eff38bfef725df9f4b6b35.jpg", 
							"online": 1515982140
						}, 
						{
							"title": "打扮成流浪汉向妹子索吻", 
							"overlap": "长得帅果然不一样", 
							"overlap_new": {
								"left": "长得帅果然不一样"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27244823&sid=8069892", 
							"img": "http://sr2.pplive.cn/cms/34/75/fa212ba135d6429274bf027cd4c62267.jpg", 
							"online": 1515547920
						}, 
						{
							"title": "用塑料瓶制造“枪声”整蛊", 
							"overlap": "歪果仁真会玩", 
							"overlap_new": {
								"left": "歪果仁真会玩"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27139787&sid=8069892", 
							"img": "http://sr3.pplive.cn/cms/14/86/a9e9d028ff3bf5701af3c3502d9a60b0.gif", 
							"online": 1513561140
						}, 
						{
							"title": "一条鲨鱼朝你攻击过来", 
							"overlap": "卖鱼店吓人恶作剧", 
							"overlap_new": {
								"left": "卖鱼店吓人恶作剧"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27108645&sid=8069892", 
							"img": "http://sr4.pplive.cn/cms/25/46/5a39aff1416cdc9ddab9da76b57cae33.jpg", 
							"online": 1513045260
						}, 
						{
							"title": "美女地铁跟路人分享耳机", 
							"overlap": "太撩人了", 
							"overlap_new": {
								"left": "太撩人了"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27074885&sid=8070522", 
							"img": "http://sr4.pplive.cn/cms/42/69/49b3335ef6f82e3e62a6f29e63b00616.jpg", 
							"online": 1512457140
						}
					]
				}
			}, 
			{
				"id": "joke_cute", 
				"tid": "t_horizontal_1", 
				"data": {
					"source": "json", 
					"title": "奇趣逗比", 
					"showcount": "4", 
					"showslogan": "换一批试试", 
					"dlist": [
						{
							"title": "或许这就是恋爱的触电感", 
							"overlap": "网友：缺个男的 哦不外套也缺", 
							"overlap_new": {
								"left": "网友：缺个男的 哦不外套也缺"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27302671&sid=8070484", 
							"img": "http://sr3.pplive.cn/cms/19/80/af00b3dd7bf88affd2cc0009d2742c00.gif", 
							"img_bg": "http://sr3.pplive.cn/cms/19/80/af00b3dd7bf88affd2cc0009d2742c00.gif", 
							"online": 1516585500
						}, 
						{
							"title": "戏精妹妹的日常第二弹", 
							"overlap": "沉迷情景剧不可自拔", 
							"overlap_new": {
								"left": "沉迷情景剧不可自拔"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27292029&sid=8070041", 
							"img": "http://sr1.pplive.cn/cms/11/41/223006042b0951e1466d438e2b751dde.jpg", 
							"img_bg": "http://sr1.pplive.cn/cms/11/41/223006042b0951e1466d438e2b751dde.jpg", 
							"online": 1516329300
						}, 
						{
							"title": "影视剧里注孤生的钢铁直男", 
							"overlap": "这操作令人窒息", 
							"overlap_new": {
								"left": "这操作令人窒息"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27282963&sid=8070041", 
							"img": "http://sr2.pplive.cn/cms/36/51/5fb1fd237af90bafd415cb4efe9c0836.jpg", 
							"online": 1516244040
						}, 
						{
							"title": "有个随时坠入剧情的妹妹", 
							"overlap": "小哥一脸生无可恋", 
							"overlap_new": {
								"left": "小哥一脸生无可恋"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27272021&sid=8070041", 
							"img": "http://sr4.pplive.cn/cms/17/24/89dc3163f421d80b12978d88e861d9c8.jpg", 
							"online": 1516065660
						}, 
						{
							"title": "骚年用吸尘器吸马蜂窝", 
							"overlap": "实力作死", 
							"overlap_new": {
								"left": "实力作死"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27273089&sid=8069998", 
							"img": "http://sr2.pplive.cn/cms/10/73/9221e0876b4013d3ffb66097b65beb7c.jpg", 
							"online": 1516072860
						}, 
						{
							"title": "拔河时用表情干扰对方", 
							"overlap": "不能直视", 
							"overlap_new": {
								"left": "不能直视"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27272991&sid=8070484", 
							"img": "http://sr1.pplive.cn/cms/10/81/f07e9e721c0283f911e9711637854a25.jpg", 
							"online": 1516071420
						}, 
						{
							"title": "学校乐器比赛男同学亮了", 
							"overlap": "小哥，你是认真的吗！", 
							"overlap_new": {
								"left": "小哥，你是认真的吗！"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27267183&sid=8070484", 
							"img": "http://sr1.pplive.cn/cms/29/38/35e24c563970ba0e63c507fca07c32e8.jpg", 
							"online": 1515984360
						}, 
						{
							"title": "亚洲舞王尼古拉斯·赵四", 
							"overlap": "网友：鬼步创始人", 
							"overlap_new": {
								"left": "网友：鬼步创始人"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27266801&sid=8069874", 
							"img": "http://sr3.pplive.cn/cms/41/36/3e5f9797abfe8e7280a575b11935344f.jpg", 
							"online": 1515981360
						}, 
						{
							"title": "日本骚气网红跳辣眼舞蹈", 
							"overlap": "灵魂摄影师", 
							"overlap_new": {
								"left": "灵魂摄影师"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27244793&sid=8070041", 
							"img": "http://sr3.pplive.cn/cms/13/72/8335bcbbba19fa362d67324136c79ec0.jpg", 
							"online": 1515547560
						}, 
						{
							"title": "弟弟失恋小哥放high歌", 
							"overlap": "网友：好想揍他", 
							"overlap_new": {
								"left": "网友：好想揍他"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27240015&sid=8069998", 
							"img": "http://sr1.pplive.cn/cms/93/95/e3ad78b8b331dc28e00f39fb5f37856f.jpg", 
							"online": 1515466560
						}, 
						{
							"title": "男子上节目靠吹牛求职", 
							"overlap": "在场老板都笑喷了", 
							"overlap_new": {
								"left": "在场老板都笑喷了"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27073287&sid=8070484", 
							"img": "http://sr3.pplive.cn/cms/12/55/115996335537f2beb4d73d79a2d9d095.jpg", 
							"online": 1512440520
						}, 
						{
							"title": "花式表白却是被花式虐心", 
							"overlap": "老铁扎心了", 
							"overlap_new": {
								"left": "老铁扎心了"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=26915629&sid=8070484", 
							"img": "http://sr3.pplive.cn/cms/39/64/6095638867d6086af2e6ab6f2517d727.jpg", 
							"online": 1509947760
						}
					]
				}
			}, 
			{
				"id": "joke_ad_2", 
				"tid": "t_ad_1", 
				"data": {
					"source": "net", 
					"adstyle": "t_ad_1", 
					"dlist": [ ]
				}
			}, 
			{
				"id": "joke_modest", 
				"tid": "t_horizontal_1", 
				"data": {
					"source": "json", 
					"title": "低调内涵", 
					"showcount": "4", 
					"showslogan": "换一批试试", 
					"dlist": [
						{
							"title": "和前任说的最后一句话？", 
							"overlap": "竟然有这么多都给了前任", 
							"overlap_new": {
								"left": "竟然有这么多都给了前任"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27307707&sid=8070484", 
							"img": "http://sr4.pplive.cn/cms/29/26/5bee3811f8a7222a227735022e0db3c0.jpg", 
							"img_bg": "http://sr4.pplive.cn/cms/29/26/5bee3811f8a7222a227735022e0db3c0.jpg", 
							"online": 1516670400
						}, 
						{
							"title": "女票和兄弟共处一室会怎样", 
							"overlap": "骚年：我拿不动刀了？", 
							"overlap_new": {
								"left": "骚年：我拿不动刀了？"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27272979&sid=8070041", 
							"img": "http://sr2.pplive.cn/cms/35/42/39bc4faf060450b3d7cbb357b9cfdba7.jpg", 
							"online": 1516071420
						}, 
						{
							"title": "3岁的萌娃成功被爸爸套路", 
							"overlap": "30岁前不能想交男友", 
							"overlap_new": {
								"left": "30岁前不能想交男友"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27266821&sid=8081707", 
							"img": "http://sr3.pplive.cn/cms/42/66/3a1dee47bd94081c5c2a93e7fba7f1fe.jpg", 
							"online": 1515981540
						}, 
						{
							"title": "女主播在吃鸡时向小哥借枪", 
							"overlap": "小哥女友当场“捉奸”", 
							"overlap_new": {
								"left": "小哥女友当场“捉奸”"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27257851&sid=8070041", 
							"img": "http://sr4.pplive.cn/cms/88/43/2947c03f9f1e526bf00ac811654cf560.jpg", 
							"online": 1515742140
						}, 
						{
							"title": "如果变成异性你会做什么", 
							"overlap": "会选择跟自己交往吗", 
							"overlap_new": {
								"left": "会选择跟自己交往吗"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27222715&sid=8079817", 
							"img": "http://sr3.pplive.cn/cms/18/87/c900cdda8ec20e8ccabf29eaa0cad475.jpg", 
							"online": 1515189600
						}, 
						{
							"title": "别人撩妹VS你撩妹的区别", 
							"overlap": "我们不一样~", 
							"overlap_new": {
								"left": "我们不一样~"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27222589&sid=8079817", 
							"img": "http://sr4.pplive.cn/cms/32/21/0ecd8b89e00ae94f1ffdf0e80d1eac24.jpg", 
							"online": 1515121500
						}, 
						{
							"title": "2017已过去我还是单身狗", 
							"overlap": "你脱单了吗", 
							"overlap_new": {
								"left": "你脱单了吗"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27207895&sid=8079817", 
							"img": "http://sr2.pplive.cn/cms/36/95/dbf6f85cff940fc2361db70e62738232.jpg", 
							"online": 1514861940
						}, 
						{
							"title": "女友嘿嘿时父亲遗照挂满屋", 
							"overlap": "想找个灵魂伴侣系列三", 
							"overlap_new": {
								"left": "想找个灵魂伴侣系列三"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27183951&sid=8070041", 
							"img": "http://sr2.pplive.cn/cms/29/61/d1492d81061c1093f35383f7a9384c1e.jpg", 
							"online": 1514345340
						}, 
						{
							"title": "小哥全程监视女友健身", 
							"overlap": "看完整个人都绿了", 
							"overlap_new": {
								"left": "看完整个人都绿了"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=27175317&sid=8070126", 
							"img": "http://sr1.pplive.cn/cms/40/16/12e8a7256edde26c6984e9aeaf22a952.jpg", 
							"online": 1514192100
						}, 
						{
							"title": "单身的你跟一对情侣出去玩", 
							"overlap": "感受一下这大写的心酸", 
							"overlap_new": {
								"left": "感受一下这大写的心酸"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=26871989&sid=8070041", 
							"img": "http://sr2.pplive.cn/cms/32/86/6d5fac587b84ce00379ad2f9c497430d.jpg"
						}, 
						{
							"title": "手里拿把梯子就能畅通无阻", 
							"overlap": "疯狂实验恶搞路人", 
							"overlap_new": {
								"left": "疯狂实验恶搞路人"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=26815581&sid=8079817", 
							"img": "http://sr1.pplive.cn/cms/10/08/5afde10e5ff7766f21293e396e73eb02.jpg", 
							"online": 1508381160
						}, 
						{
							"title": "不能让男朋友知道的事", 
							"overlap": "爆笑街采", 
							"overlap_new": {
								"left": "爆笑街采"
							}, 
							"target": "native", 
							"link": "pptv://page/player/halfscreen?type=vod&vid=26802459&sid=8079817", 
							"img": "http://sr4.pplive.cn/cms/25/95/6ab299d898c18a636d29a08445a43601.jpg", 
							"online": 1508204940
						}
					]
				}
			}, 
			{
				"id": "joke_footlogo", 
				"tid": "t_feature_1", 
				"data": {
					"source": "json", 
					"icon": "http://sr4.pplive.com/cms/40/42/7288ad673254a690893ff921d1cadc5b.png", 
					"dlist": [
						{
							"img": "http://sr4.pplive.cn/cms/57/18/3a68fd1f1db6cf569f5b067e16f7d4f0.png", 
							"online": 1502190660
						}
					]
				}, 
				"scale": 0.1493
			}
		], 
		"overlap": [ ]
	},
	numdata:{
		"message": "success", 
		"data": [
			{
				"MODULE": "joke-recommend", 
				"POSITION": "2", 
				"VV": 3, 
				"UV": 3
			}, 
			{
				"MODULE": "joke-recommend", 
				"POSITION": "1", 
				"VV": 3, 
				"UV": 3
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "12", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "in_fashion", 
				"POSITION": "more", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "11", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "10", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "10", 
				"VV": 3, 
				"UV": 3
			}, 
			{
				"MODULE": "joke_cute", 
				"POSITION": "7", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "bubble_25494_0126-0131 移动IOS大首页", 
				"POSITION": "-1", 
				"VV": 3, 
				"UV": 3
			}, 
			{
				"MODULE": "joke_cute", 
				"POSITION": "8", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_slide", 
				"POSITION": "3", 
				"VV": 21, 
				"UV": 21
			}, 
			{
				"MODULE": "0|75352", 
				"POSITION": "-1", 
				"VV": 8, 
				"UV": 8
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "12", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_cute", 
				"POSITION": "exchange", 
				"VV": 29, 
				"UV": 14
			}, 
			{
				"MODULE": "0|75349", 
				"POSITION": "-1", 
				"VV": 29, 
				"UV": 27
			}, 
			{
				"MODULE": "joke_slide", 
				"POSITION": "1", 
				"VV": 33, 
				"UV": 31
			}, 
			{
				"MODULE": "joke_slide", 
				"POSITION": "2", 
				"VV": 36, 
				"UV": 35
			}, 
			{
				"MODULE": "joke_cute", 
				"POSITION": "1", 
				"VV": 7, 
				"UV": 7
			}, 
			{
				"MODULE": "joke_cute", 
				"POSITION": "2", 
				"VV": 6, 
				"UV": 6
			}, 
			{
				"MODULE": "joke_cute", 
				"POSITION": "3", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_cute", 
				"POSITION": "4", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "10", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "12", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "11", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "exchange", 
				"VV": 50, 
				"UV": 23
			}, 
			{
				"MODULE": "0|75353", 
				"POSITION": "-1", 
				"VV": 4, 
				"UV": 4
			}, 
			{
				"MODULE": "joke_cool", 
				"POSITION": "2", 
				"VV": 29, 
				"UV": 29
			}, 
			{
				"MODULE": "joke_footlogo", 
				"POSITION": "1", 
				"VV": 4, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_cool", 
				"POSITION": "1", 
				"VV": 17, 
				"UV": 16
			}, 
			{
				"MODULE": "0|75348", 
				"POSITION": "-1", 
				"VV": 32, 
				"UV": 31
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "1", 
				"VV": 11, 
				"UV": 11
			}, 
			{
				"MODULE": "joke_cool", 
				"POSITION": "6", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "2", 
				"VV": 9, 
				"UV": 9
			}, 
			{
				"MODULE": "joke_cool", 
				"POSITION": "3", 
				"VV": 14, 
				"UV": 14
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "3", 
				"VV": 13, 
				"UV": 13
			}, 
			{
				"MODULE": "joke_cool", 
				"POSITION": "4", 
				"VV": 14, 
				"UV": 14
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "4", 
				"VV": 6, 
				"UV": 6
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "5", 
				"VV": 4, 
				"UV": 4
			}, 
			{
				"MODULE": "joke_cool", 
				"POSITION": "12", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_cool", 
				"POSITION": "7", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_cool", 
				"POSITION": "8", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "record", 
				"POSITION": "-1", 
				"VV": 4, 
				"UV": 4
			}, 
			{
				"MODULE": "0|0", 
				"POSITION": "-1", 
				"VV": 11, 
				"UV": 11
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "1", 
				"VV": 11, 
				"UV": 11
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "9", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "0|75350", 
				"POSITION": "-1", 
				"VV": 92, 
				"UV": 87
			}, 
			{
				"MODULE": "joke_cute", 
				"POSITION": "12", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "7", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "5", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "8", 
				"VV": 5, 
				"UV": 5
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "10", 
				"VV": 3, 
				"UV": 3
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "4", 
				"VV": 10, 
				"UV": 9
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "5", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "11", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "3", 
				"VV": 11, 
				"UV": 10
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "6", 
				"VV": 5, 
				"UV": 5
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "12", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "2", 
				"VV": 10, 
				"UV": 10
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "3", 
				"VV": 8, 
				"UV": 8
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "9", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "9", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "4", 
				"VV": 24, 
				"UV": 23
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "8", 
				"VV": 3, 
				"UV": 3
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "1", 
				"VV": 68, 
				"UV": 66
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "7", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "2", 
				"VV": 81, 
				"UV": 80
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "1", 
				"VV": 55, 
				"UV": 54
			}, 
			{
				"MODULE": "0|75489", 
				"POSITION": "-1", 
				"VV": 18, 
				"UV": 18
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "5", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_news", 
				"POSITION": "exchange", 
				"VV": 53, 
				"UV": 25
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "4", 
				"VV": 9, 
				"UV": 9
			}, 
			{
				"MODULE": "search", 
				"POSITION": "-1", 
				"VV": 16, 
				"UV": 16
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "3", 
				"VV": 22, 
				"UV": 22
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "2", 
				"VV": 43, 
				"UV": 43
			}, 
			{
				"MODULE": "joke_modest", 
				"POSITION": "exchange", 
				"VV": 89, 
				"UV": 34
			}, 
			{
				"MODULE": "joke_Hoax", 
				"POSITION": "exchange", 
				"VV": 40, 
				"UV": 20
			}, 
			{
				"MODULE": "0|75351", 
				"POSITION": "-1", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "8", 
				"VV": 2, 
				"UV": 2
			}, 
			{
				"MODULE": "joke_recommend", 
				"POSITION": "9", 
				"VV": 1, 
				"UV": 1
			}, 
			{
				"MODULE": "joke_cool", 
				"POSITION": "exchange", 
				"VV": 36, 
				"UV": 15
			}
		], 
		"code": 0
		}
	  
    }
  },
  methods:{
      initAppPage(){
	     this.$refs.chil.chilFn('我是父元素传过来的'+this.status)
	  /* this.obj = {
            p: "固定名称",
            plt: this.status,
          };*/
	 },
	 handData(){
	    let list = this.picdata.modules;
	    for(let item of list){
		    if(item.data.dlist){
			   if(item.data.dlist.length>0){
					this.numdata.data.find(function(x){
						if(x.MODULE==item.id){				
						   let obj = item.data.dlist[x.POSITION-1];
						   if(typeof(obj) == 'undefined'){
						      return;
						   }else{
						     obj.VV = x.VV;
						   }
						}
					})
				}
			}
		}
		console.log(this.picdata);
	 },
	 //异步数据
	 getdataOne(){
	    let pdata={
		    createTime:'2018-01-03 00:00:00',
			endTime:'2018-02-02 23:59:59',
			orderNo:true,
			page:1,
			status:-2,
			type:0
		};
		var _this=this;
		util.post('business/listAllTripBill',pdata,function(res){
			return res.data.pageModel;
			
		})
		
	    
	 },
	 async getdataTwo(){
	    let pdata={
		   uuId:"40288192614f442601614f4606a10000"
		};
		var _this=this;
		return new Promise(function(resolve,reject){
		    util.post('business/newQueryBusinessTrip',pdata,function(res){
			    resolve(res.data.passengerBean)
			 })
		})
	 },
	 getdata(){
	   //let a = this.dataOne;
	   //let b = this.dataTwo;
	   let a =  this.getdataOne();
	   let b =  this.getdataTwo();
	   console.log('----------');
	   console.log(a);
	   console.log(b);
	   b.then(function(result){console.log(result)});

	    console.log('++++++');
	 },
	 


	 
	 
	  
  },
  created(){
     //this.handData();
	// this.getdataOne();
	// this.getdataTwo();
	 this.getdata();

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bannerBox{
  width:300px;
  height:300px;
  margin-left:200px;
  position:relative;
  overflow:hidden;
}

  

  .bg-purple {
    background: #d3dce6;
  }
    .bg-purple-light {
	   background:blue
	}
 
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  
</style>
