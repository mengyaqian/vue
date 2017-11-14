<template>
		<div  class="schedule">
		     <p class="p3"><i class="el-icon-arrow-left" @click="getPreMonth" ></i><span>{{year}}-{{month}}</span><i @click="getNextMonth" class="el-icon-arrow-right"></i></p>
		     <div class="dataTop"><span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span></div>
		     <div class="dataBottom clears">
			    <span v-for="item in list" @click="seeSchedule(item)" class="spans" :class="{gray:item.isThisMonth==false}" v-bind:style="{height:spanHeight,lineHeight:spanHeight}">{{item.date}}
				    <img v-if="item.haveSchedule" class="circle" src="../../assets/circle.png">
				</span>
			 </div>
			 <!--当天日程列表-->
			 <el-dialog title="日程安排" :visible.sync="dialog1" @close="closedOne" size="tiny" >
                 <div class="div2">
					   <span class="dislogTop">{{clickDate.substring(0,10)}}</span>
					   <i class="el-icon-plus addIcon"></i>
				    <p v-for="item of dayScheduleList" @click="showScheduleDetialTwo(item.id,2)"><img  class="" src="../../assets/circle.png">{{item.name}}</p>
				 </div>
			 </el-dialog>
			 <!--当天日程详情-->
			 <el-dialog title="日程安排" :visible.sync="dialog2" @close="closedTwo"  >
			    <div class="div4">
				      <i class="el-icon-plus addIcon"></i>
					<ul class="detialUl">
						<li>
							<img class="img1" src="../../assets/dsadhushosia4.png">
							<span class="span1">日程标题：</span>
							<span>{{detial.content.name}}</span>
						</li>
						<li>
							<img class="img1" src="../../assets/dsadhushosia9.png">
							<span class="span1">时间：</span>
							<span>{{detial.content.startDate.time | getTime(detial.content.allDay)}} 至{{detial.content.endDate.time | getTime(detial.content.allDay)}}</span>
						</li>
						<li>
							<img class="img1" src="../../assets/dsadhushosia2.png">
							<span class="span1">重复：</span>
							<span>{{detial.content | repeatText}}</span>
						</li>
						<li class="clear">
							<img  class="img1 fl" style="margin-top:14px"src="../../assets/dsadhushosia1.png">
							<span class="span1 fl">参与人员：</span>
							<span class="span2 fl">
								<div class="personDiv" v-for="item in detial.userList">
									<img class="img2" :src="item.avatarSmall">
									<div class="div3">{{item.nickname}}</div>
								</div>
							</span>
						</li>
						<li>
							<img class="img1" src="../../assets/dsadhushosia3.png">
							<span class="span1">地点：</span>
							<span>{{detial.content.address}}</span>
						</li>
						<li>
							<img class="img1" src="../../assets/dsadhushosia13.png">
							<span class="span1">日程详情：</span>
							<span>{{detial.content.content}}</span>
						</li>
						<li  class="clears">
							<img class="img1" src="../../assets/dsadhushosia5.png">
							<span class="span1">附件：</span>
							<div style="float:right;width:80%;" v-if="detial.ifHaveFiles">
								<p v-for="item in detial.files"><img class="img3" src="../../assets/acc1.png">{{item.name}}<a target="_blank" :href="item.etag">下载</a><a target="_blank" :href="item.etag">查看</a></p>
							</div>
							<span v-else>（无）</span>
						</li>
						<li>
							<img class="img1" src="../../assets/dsadhushosia6.png">
							<span class="span1">公开范围：</span>
							<span>{{detial.content.open | openTxt(detial.userseeList)}}</span>
						</li>
						<li>
							<img class="img1" src="../../assets/dsadhushosia12.png">
							<span class="span1">提醒时间</span>
							<span>{{detial.content.warn | warnText}}</span>
						</li>
					</ul>
					<div style="margin:0 auto;width:170px">
						<el-button type="primary" @click="showcancelSchedule">取消日程</el-button>
						<el-button type="primary" @click="editSchedule(detial.content.id)">修改</el-button>
					</div>
				 </div>
			 </el-dialog>
			<!--编辑日程-->
			<el-dialog title="日程" :visible.sync="dialog3" @close="closedThree" >
                 <div class="">
				      <div>
					        <el-row class="elRow">
								<el-col :span="1">
								   <img class="img1" src="../../assets/dsadhushosia4.png">
								</el-col>
								<el-col :span="4">日程标题</el-col>
								<el-col :span="19">
								   <el-input class="inputs" v-model="detial.content.name" placeholder="请输入日程标题"></el-input>
								</el-col>
							</el-row>
							<div  class="elRow2">
								<el-row>
									<el-col :span="1">
									<img class="img1" src="../../assets/dsadhushosia9.png">
									</el-col>
									<el-col :span="4">开始时间</el-col>
									<el-col :span="7">
									<el-date-picker class="inputs small"
											v-model="detial.startDateFormat"
											type="datetime"
											placeholder="选择开始时间"
											:format="format">
										</el-date-picker>
									</el-col>
									<el-col :span="4">结束时间</el-col>
									<el-col :span="8">
										<el-date-picker class="inputs small"
											v-model="detial.endDateFormat"
											type="datetime"
											placeholder="选择结束时间"
											:format="format">
										</el-date-picker>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="1" style="color:#fff">1</el-col>
									<el-col :span="23">全天<el-checkbox @change="allDayChange" v-model="detial.isAllDay" style="margin-left:20px"></el-checkbox></el-col>
								</el-row>
								<el-row class="mt16">
									<el-col :span="1"><img class="img1" src="../../assets/dsadhushosia2.png"></el-col>
									<el-col :span="23">
									   <span>重复：</span>
									    <el-select v-model="detial.content.repeatType" class="" placeholder="请选择">
											<el-option
											v-for="item in repeatList"
											:key="item.value"
											:label="item.name"
											:value="item.value">
											</el-option>
										</el-select>
									</el-col>
								</el-row>
								<el-row class="mt16" v-if="detial.content.repeatType != 0">
									<el-col :span="1" style="color:#fff">1</el-col>
									<el-col :span="23">
									    <span>频率：
										   <el-input class="small2" v-model="detial.content.repeatHz"></el-input>
										   <span v-if="detial.content.repeatType ==1">天</span>
										   <span v-if="detial.content.repeatType ==2">周</span>
										   <span v-if="detial.content.repeatType ==3">月</span>
										</span>
									    <span v-if="detial.content.repeatType ==2">
										    <el-checkbox v-for="item in everyWeekList" v-model="item.value">{{item.name}}</el-checkbox>
									    </span>
									</el-col>
								</el-row>
								<el-row class="mt16"  v-if="detial.content.repeatType != 0">
								    <el-col :span="1" style="color:#fff">1</el-col>
									<el-col :span="23">
									    <span>结束：</span>
										<el-select v-model="detial.content.endType" class="small2" placeholder="请选择">
											<el-option
											v-for="item in endTypeList"
											:key="item.value"
											:label="item.name"
											:value="item.value">
											</el-option>
										</el-select>
										<span  v-if="detial.content.endType == 2">发生<el-input class="small2" v-model="detial.content.endValue"></el-input>次</span>
									    <span  v-if="detial.content.endType == 3"><el-date-picker  v-model="detial.content.endValue" type="datetime" format="yyyy-MM-dd HH:mm:ss"></el-date-picker></span>
									</el-col>
								</el-row>
								<el-row class="mt16"  v-if="detial.content.repeatType != 0">
									<el-col :span="1" style="color:#fff">1</el-col>
									<el-col :span="23">
									    <span>
										   结果：每{{detial.content.repeatHz}}
										    <span v-if="detial.content.repeatType ==1">天</span>
											<span v-if="detial.content.repeatType ==2">周</span>
											<span v-if="detial.content.repeatType ==3">月</span>
										    <span v-if="detial.content.endType == 2">，共{{detial.content.endValue}}次</span>
											<span v-if="detial.content.endType == 3">，截止到{{detial.content.endValue}}</span>
										</span>
									</el-col>
								</el-row>
							</div>
							<div  class="elRow3">
                                <el-row class="mt16">
									<el-col :span="1">
									<img class="img1" src="../../assets/dsadhushosia1.png">
									</el-col>
									<el-col :span="4">参与人员</el-col>
									<el-col :span="5"> <i  @click="invitePerson(1)" class="el-icon-plus" style="cursor:pointer;text-indent:5px">添加人员</i></el-col>
									<el-col :span="14">
										<div class="personDiv" v-for="(item,index) in detial.userList">
										    <img :src="item.avatarSmall" class="img2">
											<img @click="deletePerson(index)" class="deleteIcon" src="../../assets/delete.png">
										</div>
									</el-col>
								</el-row>
								<el-row class="mt16">
									<el-col :span="1">
									<img class="img1" src="../../assets/dsadhushosia3.png">
									</el-col>
									<el-col :span="4">地点</el-col>
									<el-col :span="19">
									     <el-input   type="textarea" :rows="2"  v-model="detial.content.address" placeholder="请输入地点"></el-input>
									</el-col>
								</el-row>
								<el-row class="mt16">
									<el-col :span="1">
									<img class="img1" src="../../assets/dsadhushosia13.png">
									</el-col>
									<el-col :span="4">日程详情</el-col>
									<el-col :span="19">
									     <el-input   type="textarea" :rows="2"  v-model="detial.content.content" placeholder="请输入日程详情"></el-input>
									</el-col>
								</el-row>
								<el-row class="mt16">
									<el-col :span="1">
									<img class="img1" src="../../assets/dsadhushosia5.png">
									</el-col>
									<el-col :span="4">附件</el-col>
									<el-col :span="5"> <i class="el-icon-plus" style="cursor:pointer;text-indent:5px">添加附件</i></el-col>
									<el-col :span="14">
										<div v-if="detial.ifHaveFiles">
											<p v-for="item in detial.files"><img class="img3" src="../../assets/acc1.png">{{item.name}}<img style="margin-left:12px" src="../../assets/delete.png"></p>
										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="1"><img class="img1" src="../../assets/dsadhushosia6.png"></el-col>
									<el-col :span="4">公开范围</el-col>
									<el-col :span="19" >
									    <el-select v-model="detial.content.open" @change="openRange" class="inputs" placeholder="请选择">
											<el-option
											v-for="item in openList"
											:key="item.value"
											:label="item.name"
											:value="item.value">
											</el-option>
										</el-select>
									</el-col>
								</el-row>
								<el-row v-if="detial.content.open == 1">
								    <el-col :span="14">
										<div class="personDiv" v-for="(item,index) in detial.userseeList ">
										    <img :src="item.avatarSmall" class="img2">
											<!--<img @click="deletePerson(index)" class="deleteIcon" src="../../assets/delete.png">-->
										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="1"><img class="img1" src="../../assets/dsadhushosia12.png"></el-col>
									<el-col :span="4">提醒时间</el-col>
									<el-col :span="19" >
									    <el-select v-model="detial.content.warn" class="inputs" placeholder="请选择">
											<el-option
											v-for="item in warnList"
											:key="item.value"
											:label="item.name"
											:value="item.value">
											</el-option>
										</el-select>
									</el-col>
								</el-row>
							</div>
					  </div>
					  <div style="margin:0 auto;width:90px" @click="updateBtn"><el-button type="primary">确认修改</el-button></div>
				 </div>
			</el-dialog>
			<el-dialog title="提示" :visible.sync="dialog4" @close="closedfour" >
			    <div class="div5">
					<p>修改日程</p>
					<p class="p1" @click="updateSchedule(1)">仅修改当前日程</p>
					<p class="p1" @click="updateSchedule(2)">修改当前及以后日程</p>
				</div>
			</el-dialog>
			<el-dialog title="提示" :visible.sync="dialog5" @close="closedfive" >
			    <div class="div5">
					<p>取消日程</p>
					<p class="p1" @click="cancelSchedule(1)">取消改当前日程</p>
					<p class="p1" @click="cancelSchedule(2)">取消当前及以后日程</p>
				</div>
			</el-dialog>
			 <person></person>
		</div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
import person from '@/components/common/person.vue'
export default {
	name: 'schedule',
	components:{person},
	data () {
		return {
	       list:[],
		   spanHeight:'30px',
		   dialog1:false,
		   dialog2:false,
		   dialog3:false,
		   dialog4:false,
		   dialog5:false,
		   invitePersonType:1,
		   format:'yyyy-MM-dd HH:mm',
		   year:new Date().getFullYear(),
		   month:new Date().getMonth()+1,
		   detial:{
			   content:{
				   startDate:'',
				   endDate:'',
				   repeatType:0,
				   name:'',
				   address:'',
				   content:'',
				   open:0,
				   warn:0,
				   id:0,
				   allDay:1,
				   repeatHz:1,
				   endType:2,
				   endValue:1
			   },
			   userList:[],
			   userseeList:[], //指定可见人列表
			   files:[], //附件
			   ifHaveFiles:false,
			   isAllDay:false,
			   startDateFormat:'',
			   endDateFormat:''
		   },
		   dayScheduleList:[],
		   clickDate:'',
		   repeatList:[
			    {name:'不重复',value:0},
			    {name:'每天',value:1},
				{name:'每周',value:2},
				{name:'每月',value:3},
		   ],
		   openList:[
			   {name:'仅自己',value:0},
			   {name:'指定人可见',value:1},
			   {name:'所有同事可见',value:2},
		   ],
		   warnList:[
			   {name:'不提醒',value:0},
			   {name:'5分钟前',value:1},
			   {name:'10分钟前',value:2},
			   {name:'半小时前',value:3},
               {name:'1小时前',value:4},
			   {name:'2小时前',value:5},
			   {name:'1天前',value:6}
		   ],
		   endTypeList:[
               {name:'次数',value:2},
			   {name:'日期',value:3},
		   ],
		    everyWeekList:[
			    {name:'周一',value:false},
			    {name:'周二',value:false},
			    {name:'周三',value:false},
				{name:'周四',value:false},
                {name:'周五',value:false},
				{name:'周六',value:false},
				{name:'周日',value:false},
		   ]
		}
	},
	computed:{
		choosePersonHand(){
			return this.$store.getters.person.exportList;
		}
        /*getbilspand(){
			return this.$store.getters.travelAppspancationsDetial.id;
		},
		isShowDetial(){
			return this.$store.getters.travelAppspancationsDetial.showDetial;
		}*/
	},

    methods: {
		closedOne(){
            this.dialog1 = false
		},
		closedTwo(){
			this.dialog2 = false
		},
		closedThree(){
            this.dialog3 = false
		},
		closedfour(){
            this.dialog4 = false
		},
		closedfive(){
            this.dialog5 = false
		},
		getData(){
			var _this = this;
			var pdata = {
				year:this.year,
				month:this.month,
				date:'',
				ids:'',
				type:''
			}
			util.post('schedule/findSchedule',pdata,function(res){
                var dataList = res.dataList
				var dateInfoList = res.dateInfoList
				var newData = []
				for(let item of dataList){
                    newData[item.day] = item
				}
				for(let val of dateInfoList){
					var d = newData[val.day];
					if(d){
						val.scheduleList = d.scheduleList
						val.haveSchedule = d.scheduleList.length > 0 ?true:false
					}
				}
				_this.list = dateInfoList;
			},{format:true})
		},
		seeSchedule(datas){
           if(datas.scheduleList.length > 0){
			   this.showScheduleDetial(datas)
		   }else{
			   this.editSchedule(0);
		   }
		},
		showScheduleDetial(datas){
			console.log(datas)
			//当天日程详情和列表
			var _this = this;
			_this.clickDate = datas.day+' 00:00:00'
			if(datas.scheduleList.length == 1){
                this.dialog2 = true
			}else{
                this.dialog1 = true
			}
			var dayArr = datas.day.split('-');
			var pdata = {
				year:dayArr[0],
				month:dayArr[1],
				date:dayArr[2]
			}
			util.post('web/getschdule',pdata,function(res){
				if(res.code == 202){//仅有一个日程
                    _this.detial.content = res.content
					_this.detial.userList = res.userList[0].userList
					_this.detial.userseeList =res.userList[0].userseeList
					_this.detial.isAllDay = res.content.allDay == 1 ? true:false
					var _start = util.getDefaultTime(res.content.startDate.time);
					var _end = util.getDefaultTime(res.content.startDate.time);
					if(res.content.allDay == 1){//全天
                        _this.detial.startDateFormat = _start.substring(0,10)
						_this.detial.endDateFormat = _end.substring(0,10)
						_this.format='yyyy-MM-dd'
					}else{
                        _this.detial.startDateFormat = _start.substring(0,15)
						_this.detial.endDateFormat = _end.substring(0,15)
						_this.format='yyyy-MM-dd HH:mm'
					}
					if( res.content.files != ''){
							_this.detial.ifHaveFiles = true
							var arr = res.content.files.split(',');
							var arr2 = [];
							for(let item of arr){
								var a = item.split('＃');
								arr2.push({etag:a[0],name:a[1],size:a[2]})
							}
							_this.detial.files = arr2
					}else{
						_this.detial.ifHaveFiles = false
					}
				}else if(res.code == 203){//大于一个日程
                    _this.dayScheduleList = res.content
				}
			},{format:true})
		},
		showScheduleDetialTwo(id,dialog){
			var _this = this;
			var pdata = {
				id:id,
				//theSameDay:_this.clickDate
			}
			if(dialog == 2){
               this.dialog2 = true
			}else{
				this.dialog3 = true
			}
			
            util.post('schedule/checkSchedule',pdata,function(res){
				_this.detial.content = res.result
				_this.detial.userList = res.message[0].userList
				_this.detial.userseeList =res.message[0].userseeList
				_this.detial.isAllDay = res.result.allDay == 1 ? true:false
				var _start = util.getDefaultTime(res.result.startDate.time);
				var _end = util.getDefaultTime(res.result.endDate.time);
				if(res.result.allDay == 1){//全天
					_this.detial.startDateFormat = _start.substring(0,10)
					_this.detial.endDateFormat = _end.substring(0,10)
					_this.format = 'yyyy-MM-dd'
				}else{
					_this.detial.startDateFormat = _start.substring(0,15)
					_this.detial.endDateFormat = _end.substring(0,15)
					_this.format='yyyy-MM-dd HH:mm'
				}
				if( res.result.files != ''){
					_this.detial.ifHaveFiles = true
					var arr = res.result.files.split(',');
					var arr2 = [];
					for(let item of arr){
						var a = item.split('＃');
						arr2.push({etag:a[0],name:a[1],size:a[2]})
					}
					_this.detial.files = arr2
				}else{
					_this.detial.ifHaveFiles = false
				}
			},{format:true})
		},
		editSchedule(id){
			//type:0新增
			var _this = this;
			_this.dialog3 = true
			if(id != 0){
				_this.showScheduleDetialTwo(id,3);
			}
		},
		updateBtn(){
            this.dialog4 =true
		},
		updateSchedule(type){
			//type:1修改当前日程，2修改当前及以后日程
			//保存日程
			var _this = this;
			var cyuserIdsArr = [];
			var zduserIdsArr = [];
			for(let item of _this.detial.userList){
               cyuserIdsArr.push(item.id)
			}
			for(let item2 of _this.detial.userseeList){
               zduserIdsArr.push(item2.id)
			}
			var pdata = {
               id:_this.detial.content.id,
			   name:_this.detial.content.name,
			  // startdate:_this.detial.startDateFormat,
			  // enddate:_this.detial.endDateFormat,
			  startdate:'2017-11-2 2:30',
                enddate:'2017-11-3 6:50',
			   allday:_this.detial.content.allDay,
			   repeat:_this.detial.content.repeatType,
			   //repeatHz:_this.detial.content.repeatHz,
			   repeatHz:1,
			  // endsvalue:_this.detial.content.endValue,
			  endsvalue:1,
			   endvalue:_this.detial.content.endValue,
			   //cyuserIds:cyuserIdsArr.join(','),
			   cyuserIds:'',
			   address:_this.detial.content.address,
			   content:_this.detial.content.content,
			   zduserIds:zduserIdsArr.join(','),
			   open:_this.detial.content.open,
			   repeatvalue:'',
			   warn:_this.detial.content.warn,
			   files:_this.detial.files,
			   type:0,
			   code:0,
			   //thisDate:_this.detial.startDateFormat
			   thisDate:'2017-11-02 2:30'
			}
			var url = 'schedule/updateScheduleCurrent';
			if(type == 2){
				url ='schedule/updateSchedule'
			}
            util.post(url,pdata,function(res){
				if(res.statusCode == 200){
                   _this.dialog2=false;
					_this.dialog3=false;
					_this.dialog4=false;
				}else if(res.statusCode == 300){
					alert('已结束的日程不能修改！')
				}else{
					alert('error')
				}
                
			},{format:true})
		},
		showcancelSchedule(){
            this.dialog5 =true
		},
		cancelSchedule(type){

            //取消日程 1取消当前日程，2取消当前及以后日程
		    var _this = this;
			var options = {
				id:_this.detial.content.id,
				startDate:_this.detial.startDateFormat,
			}
			var url = '';
			if(type == 1){
               url = 'schedule/delectScheduleCurrent'
			}else{
               url = 'schedule/delectSchedule'
			}
			util.post(url,options,function(res){
                _this.$message({
					message: '日程取消成功',
					type: 'success'
				});
			},{format:true})
		},
		allDayChange(val){
           //全天选框变化
		   var r = val.target.checked;
		   if(r == true){
			   this.format = 'yyyy-MM-dd'
		   }else{
			   this.format='yyyy-MM-dd HH:mm'
		   }
		},
		openRange(val){
			//公开范围变化
			if(val == 1){//是指定人可见
				this.invitePerson(2);
			}
		},
		invitePerson(invitePersonType){//invitePersonType 1:参与人员，2指定人可见的指定人
           //选择参与人
		   this.invitePersonType = invitePersonType;
		   this.$store.commit('showPerson',true);
		   if(invitePersonType == 1){
                this.$store.commit('getimportList',this.detial.userList)
		   }else{
                 this.$store.commit('getimportList',this.detial.userseeList)
		   } 
		  
		},
		deletePerson(index){
			console.log(index)
			var list = [];
			/* list = JSON.parse(JSON.stringify(this.detial.userList)); 
			console.log(list.splice(index,1))*/
			//this.$store.commit('getimportList',list)
		},
        
        getPreMonth() {
			//上一个月
			var date = this.year.toString()+'-'+this.month.toString()+'-01';
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数
            var year2 = year;
            var month2 = parseInt(month) - 1;
            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
			}
            if (month2 < 10) {
                month2 = '0' + month2;
            }
			this.year = year2;
			this.month = month2;
			this.getData()
        },       
        getNextMonth() {
			//获取下一个月
			var date = this.year.toString()+'-'+this.month.toString()+'-01';
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中的月的天数
            var year2 = year;
            var month2 = parseInt(month) + 1;
            if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1;
            }
           var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            this.year = year2;
			this.month = month2;
			this.getData()
        }
	},
	created(){
		this.getData();
		var path =  this.$route.path;
		if(path == '/index'){
             this.spanHeight = (util.wHeight-680)/5+'px'
		}
	},
	watch:{
		choosePersonHand(data){
			if(this.invitePersonType == 1){
                  this.detial.userList=data
			}else{
				 this.detial.userseeList=data
			}	
		}
		/*getbilspand:function(val){
			if(val){
				this.activeName2= 'first';
                this.getDetial()
			}
		},
		isShowDetial(val){
			this.dialogVisible=val
		}*/
	},
	 filters: {
        getTime(time,allDay){
			var date =  util.getDefaultTime(time);
			if(allDay == 1){
               return date.substring(0,10)
			}else{
				return date.substring(0,15)
			}
			
		},
		repeatText(datas){
            if(datas.isRepeat == 0 ){
				return '不重复';
			}else{
               var t1 = '';
               if(datas.repeatType == 1){
                   t1 ='天'
			   }else if(datas.repeatType == 2){
				   t1 = '周'
			   }else if(datas.repeatType == 3){
				   t1 = '月'
			   }else{
				   return '不重复';
			   }
			   return '每'+datas.repeatHz+''+t1+'，共'+datas.endValue+'次'
			}
		},
		openTxt(open,list){
			if(open == 1){
				return '所有同事可见'
			}else if(open == 2){
				var name = '';
				for(let item of list){
                    name += item.nickname+' '
				}
				return '指定人'+name
			}else{
				return '仅自己'
			}
		},
		warnText(warn){
			var text = ''
           switch(warn){
                case 0:
				    text = '不提醒';
					break;
                case 1:
				    text = '5分钟前';
					break;
				case 2:
				    text = '10分钟前';
					break;
				case 3:
				    text = '半小时前';
					break;
				case 4:
				    text = '1小时前';
					break;
				case 5:
				    text = '2小时前';
					break;
				case 6:
				   text = '1天前';
					break;
		   }
		   return text;
		}
  }
}

</script>

<!-- Add "scoped" attribute to spanmit CSS to this component only -->
<style scoped>
@import '../../assets/css/expenseWater.css';
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .schedule{
	  text-align:left
  }
.schedule .p3{
   height:55px;
   line-height:55px;
   text-align:center
 }
  .schedule .p3 span{
     padding:0 20px
  }
  .schedule .dataTop{
     background:#E6EFF7;
	 height:35px;
	 width:100%;
	 line-height:35px;
	 border-top:1px solid #ddd;
	 border-left:1px solid #ddd
  }
 .schedule .dataTop span{
	display:inline-block;
	border-right:1px solid #ddd;
	width:14.2%
  }
  .dataBottom{

  }
  .dataBottom .spans{
	  float:left;
	  width:14.2%;
	  border:1px solid #ddd;
	  border-left:none;
	  border-bottom:none;
      font-size:12px;
	  cursor:pointer;
	  position:relative;
	  text-align:center
  }
  .gray{
	  color:#999
  }
  .circle{
	  position:absolute;
	  width:4px;
	  height:4.5px;
	  bottom:5px;
	  left:50%;
	  margin-left:-2px
  }
  .div2,.div4{
    position:relative
  }
  .div2 p{
	  height:30px;
	  line-height:30px;
	  margin-bottom:10px;
	  color:#0088cc;
	  cursor:pointer
  }
  .div2 p img{
	  width:8px;
	  height:9px;
	  margin-right:10px
  }
  .detialUl{
	  border:1px solid #ddd;
	  padding:16px

  }
  .detialUl li{
     min-height:44px;
	 line-height:44px;
	 position:relative
  }
.detialUl li .span1{
	padding:0 6px
}
.img1{
	 vertical-align:middle;
}
.detialUl li .span2{

}
.fl{
	float:left
}
.personDiv{
	line-height:20px;
	float:left;
	width:50px;
	text-align:center;
	overflow:hidden;
	position:relative
}
.personDiv .img2{
	width:35px;
	height:35px;
	border-radius:50%;
	overflow:hidden
}
.div3{
	line-height:20px
}
.img3{
	width:28px;
    height:32px;
	vertical-align:middle;
	margin-right:8px
}
.dislogTop{
	position:absolute;
	top:-48px;
	left:90px;
}
.div2 .addIcon{
	position:absolute;
	top:-48px;
	right:36px;
	cursor:pointer
}
.div4 .addIcon{
	position:absolute;
	top:-62px;
	right:36px;
	cursor:pointer
}
.elRow{
	height:50px;
	border:1px solid #ddd;
	line-height:50px;
	margin-bottom:20px;
	padding:0 15px
}
.small{width:100%}
.small2{width:80px}
.elRow2{
	min-height:120px;
	border:1px solid #ddd;
	line-height:30px;
	margin-bottom:20px;
	padding:10px 15px
}
.elRow3{
	height:340px;
	border:1px solid #ddd;
	line-height:30px;
	margin-bottom:20px;
	padding:10px 15px
}
.deleteIcon{
	position:absolute;
	right:5px;
	top:0;
    width:12px;
	height:12px;
	cursor:pointer
}
.mt16{
	margin-bottom:16px
}
.div5{
	text-align:center;
	padding:20px
}
.div5 p{
	margin-bottom:30px
}
.div5 .p1{
	color:#277BCF;
	width:240px;
	height:32px;
	border:1px solid #277BCF;
	border-radius:3px;
	line-height:32px;
	margin:20px auto;
	cursor:pointer
}
</style>



