<template>
		<div  class="creatBusinessApply" >
					<div class="rightBox">
					   <div style="padding:20px 30px">
					    <p class="title-p">申请信息<el-checkbox style="float:right" v-model="detialData.ifAdvance">是否预支</el-checkbox></p>
					    <el-row :gutter="20">
							<el-col :span="12">
								<el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">申请人<b>*</b>:</div></el-col>
										<el-col :span="18"><el-input class="grid2" v-model="detialData.proposer" readonly></el-input></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
										<el-col :span="6"><div class="grid1">同行人:</div></el-col>
										<el-col :span="18">
											<el-select @change="personChange" v-model="handleData.passengerBean" multiple  filterable placeholder="请选择同行人" style="width:100%">
												   <el-option-group
													v-for="group in personList"
													:key="group.id"
													:label="group.name">
													<el-option
														v-for="item in group.users"
														:key="item.id"
														:label="item.nickname"
														:value="item.id">
													</el-option>
													</el-option-group>
											</el-select>
										</el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
										<el-col :span="6"><div class="grid1">审批方式<b>*</b>:</div></el-col>
										<el-col :span="18">
											<el-select v-model="detialData.approvalType" placeholder="请选择审批方式" class="grid2">
												<el-option v-for="item in applyStyle" :key="item.value" :label="item.label" :value="item.value"></el-option>
											</el-select>
										</el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <el-row :gutter="20">
							        <div class="grid-div2">
										<el-col :span="6"><div class="grid1">申请部门<b>*</b>:</div></el-col>
										<el-col :span="18"><el-input class="grid2" v-model="detialData.applyDepartName" readonly></el-input></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
									<div class="grid-div2">
										<el-col :span="6"><div class="grid1">同行人数</div></el-col>
										<el-col :span="18"><el-input class="grid2" v-model="handleData.passengerBeanNum" readonly></el-input></el-col>
									</div>
								</el-row>
							</el-col>
						</el-row>
						<el-row>
						    <div class="grid-div">
								<el-col :span="3">事由<b style="color:red">*</b>:</el-col>
								<el-col :span="21"><el-input class="grid2" type="textarea" :autosize="{ minRows: 2, maxRows: 3}" placeholder="请输入事由" v-model="detialData.remark"></el-input></el-col>
							</div>
						</el-row>
						<p class="title-p">入账信息</p>
						<el-row :gutter="20">
							<el-col :span="12">
							    <el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">记账部门<b>*</b>:</div></el-col>
										<el-col :span="18">
										    <el-select v-model="detialData.tallyDepartId"  @change="tallyDepartIdChange" placeholder="请选择记账部门" class="grid2">
												<el-option v-for="item in pageInfo.departList" :key="item.id" :label="item.name" :value="item.id" ></el-option>
											</el-select>
										</el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">记账项目<b v-if="detialData.approvalType==2">*</b>:</div></el-col>
									<el-col :span="18">
									    <el-select v-model="detialData.tallyProjectId == 0 ? null:detialData.tallyProjectId" @change="tallyProjectIdChange"  placeholder="请选择记账项目" class="grid2">
											<el-option v-for="item in pageInfo.projectList" :key="item.id" :label="item.projectName" :value="item.id"></el-option>
										</el-select>
									</el-col>
								</div>
							</el-col>
						</el-row>
						<p style="text-align:right;margin:10px"><el-button type="text" @click="addTrip">新增行程</el-button></p>
						<div class="route-box" v-for="(item,index) in detialData.travelBookbeans">
							<el-row :gutter="20">
								<div class="route-div">
									<el-col :span="2"><div class="grid-content bg-purple">行程{{index+1}}</div></el-col>
									<el-col :span="5">
									    <div class="grid-left">出发日期:<b>*</b></div>
									    <div class="grid-left">出发城市:<b>*</b></div>
									    <div class="grid-left">出行方式</div>
									</el-col>
									<el-col :span="5">
									    <el-date-picker class="grid-right"  v-model="item.startTime" type="date"  placeholder="选择日期" ></el-date-picker>
										<el-select v-model="item.startCity" filterable remote @visible-change="visibles" :remote-method="remoteMethod"
                                        :loading="loading"  placeholder="请选择出发城市" class="inline-input grid-right">
											<el-option-group
											key="0"
											label="热门城市">
											<el-option
												v-for="items in cityListSearch"
												:key="items.code"
												:label="items.name"
												:value="items.name">
											</el-option>
											</el-option-group>
										</el-select>
										<el-select v-model="item.tbType" placeholder="请选择出行方式" >
											<el-option v-for="values in myTravelBookbeans" :key="values.value" :label="values.label" :value="values.value"></el-option>
										</el-select>										
									</el-col>
									<el-col :span="2">
									    <div class="tc"><img src="../../assets/xingcheng.png"></div>
									</el-col>
									<el-col :span="5">
									    <div class="grid-left">到达日期:<b>*</b></div>
									    <div class="grid-left">到达城市:<b>*</b></div>	
									</el-col>
									<el-col :span="5">
										<el-date-picker class="grid-right"  v-model="item.endTime" type="date"  placeholder="选择日期" ></el-date-picker>
										<el-select v-model="item.toCity" filterable remote @visible-change="visibles" :remote-method="remoteMethod"
                                        :loading="loading" placeholder="请选择到达城市" class="inline-input grid-right">
											<el-option-group
											key="0"
											label="热门城市">
											<el-option
												v-for="items in cityListSearch"
												:key="items.code"
												:label="items.name"
												:value="items.name">
											</el-option>
											</el-option-group>
										</el-select>
									</el-col>
								</div>
							</el-row>
						 	<div class="needHotel">是否需要住宿：
							    <el-switch   v-model="item.hotelBooking" on-text="是" off-text="否" ></el-switch>
							</div>
							<div class="deleteTrip" v-if="index != 0" @click="deleteTrip(index)">
							    <i class="el-icon-close"></i>
							</div>
							<el-row>
								<div class="grid-div">
									<el-col :span="3">备注<b style="color:red">*</b>:</el-col>
									<el-col :span="21"><el-input class="grid2 borderBottom" v-model="item.remark"></el-input></el-col>
								</div>
							</el-row>
						</div>
						
						<p class="title-p">出差申请费用预算<el-button style="float:right" @click="addBudget" type="text">新增预算</el-button></p>
						<div  v-for="(item1,index2) in detialData.formatCostBudgets">
						<el-row :gutter="20"  v-for="(values,index) in item1.budgetTypes" :key="values.id">
							<el-col :span="12">
							     <el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">费用项目<b>*</b>：</div></el-col>
										<el-col :span="18">
										   <el-select v-model="values.costBudgetId" @change="costBudChange($event,index,index2)" placeholder="请选择费用项目" class="grid2">
												<el-option v-for="items in pageInfo.costProjectList" :key="items.id" :label="items.name" :value="items.id"></el-option>
											</el-select>
										</el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">金额<b>*</b>:</div></el-col>
									<el-col :span="18">
									    <el-input class="" type="number" v-model="values.amount" style="width:80px"  @blur="advanceUpdate" placeholder="请输入金额"></el-input>
									    <el-select v-model="values.currencyName" placeholder="请选择币种" class="" @change="currencyChange($event,index,index2)">
											<el-option v-for="items in currencyList" :key="items.id" :label="items.code" :value="items.code"></el-option>
										</el-select>
										<i v-if="index !=0" @click="deleteBudget(index)" class="el-icon-close"></i>
									</el-col>
									
								</div>
							</el-col>
					    </el-row>
						</div>
						<p v-if="detialData.ifAdvance" class="title-p">现金预支<el-checkbox style="float:right" v-model="detialData.ifAll">全额预支</el-checkbox></p>
					    <el-row :gutter="20" v-if="detialData.ifAdvance">
							<el-col :span="12">
							     <el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">支付方式：</div></el-col>
										<el-col :span="18">
										   <el-select v-model="detialData.payType" placeholder="请选择支付方式" class="grid2" >
												<el-option v-for="item in pageInfo.paymentTypeList" :key="item.encode" :label="item.name" :value="item.encode"></el-option>
											</el-select>
										</el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">最终收款人<b>*</b>：</div></el-col>
										<el-col :span="18"><el-input class="grid2" v-model="detialData.receiver" ></el-input></el-col>
									</div>
								</el-row>
								<el-row :gutter="20" v-if="detialData.payType == 'PT03'">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">银行卡信息<b>*</b>：</div></el-col>
										<el-col :span="18">
										      <el-input class="grid2" placeholder="请选择银行卡" icon="search" readonly v-model="bankNoAndName" :on-icon-click="bankChoose"></el-input>
										</el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">结算币种</div></el-col>
									<el-col :span="18">
									    <el-select v-model="detialData.currencySettleType" placeholder="请选择结算币种" class="">
											<el-option v-for="item in currencySettleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
									</el-col>
								</div>
							</el-col>
					    </el-row>
						<ul class="yuzhiUl" v-if="detialData.ifAdvance">
						    <li><span>序号</span><span>币种</span><span>金额</span><span>汇率</span><span>折合本币</span></li>
							<li v-for="(item,index) in detialData.advances">
							   <span>{{index+1}}</span>
							   <span>{{item.currency}}</span>
							   <span><el-input class="grid2" v-model="item.amount" v-if="detialData.ifAll" readonly></el-input><el-input class="grid2" v-model="item.amount" v-if="!detialData.ifAll" ></el-input></span>
							   <span>{{item.exchangeRate}}</span>
							   <span>{{item.domesticCurrencyAmount}}</span>
							</li>
						</ul>
						<p class="title-p">审批人</p>
					    <ul class="approveUl">
						    <li v-for="item in detialData.applyUsers">
							   <img v-bind:src="item.avatarSmall">
							   <p v-bind:id="item.id" class="approveDelete"></p>
							   <p class="approveName">{{item.nickname}}</p>
							</li>
						</ul>
					    <p @click="applyChoose" class="addApprove" id="addApprove"><img src="../../assets/addPerson.png"></p>
						<p style="clear:both"></p>
					</div>
					<div style="float:right;margin-bottom:20px" class="clears">
					    <el-button type="primary" @click="save(1)">保存并提交</el-button>
						<el-button @click="save(0)">仅保存</el-button>
						<el-button>删除</el-button>
					</div>
			</div>
			 <bank-card></bank-card>
			 <person></person>
		</div>
		    
	
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
import bankCard from '@/components/common/bankCard.vue'
import person from '@/components/common/person.vue'
export default {
	name: 'creatBusinessApply',
	components:{bankCard,person},
	data () {
		return {
		  personList:[],
		  hotCityList:[],
		  cityListSearch:[],
		  loading: false,
		  billId:0,
		  bankNoAndName:'',
		  detialData:{
			  amount:0,
			  id:"",
			  advances:[],
			  proposer:util.userInfo.nickname,
			  applyDepartName:util.userInfo.department,
			  applyDepartId:util.userInfo.departmentId,
			  approvalType:null,
			  remark:'',
			  tallyDepartId:null,
			  tallyDepartName:'',
			  tallyProjectId:null,
			  tallyProjectName:'',
			  ifAdvance:false,
			  ifAll:true,
			  payType:"PT01",
              receiver:util.userInfo.nickname,
			  currencySettleType:0,
			  bankName:'',
			  bankNo:'',
			  orderNo:'',
			  formatCostBudgets:[
				  {
					code:'CNY',
					rate:'1.0',
					budgetTypes:[
						{
							costBudgetName:'',
							currencyId:3,
							currencyName:'CNY',
							rate:'1.0',
							yyzamount:0,
							amount:null,
							costBudgetId:null
						}
					],
				    amount:null
				  }
			  ],
			  travelBookbeans:[
				  {
					startTime:'',
					endTime:'',
					hotelBooking:false,
					remark:'',
					startCity:'',
					toCity:'',
					tbTypeName:'请选择出行方式',
					tbType:0,
					toCityCode:'',
					startCityCode:''
				  }
			  ],
			  applyUsers:[]
		  },
		  handleData:{
			 passengerBeanNum:0,
			 passengerBean:[]   //选择的同行人id
		  },
		  applyStyle:[
			  {value: 1,label: '部门审批'},
			  {value: 2,label: '项目审批'},
		  ],
		  pageInfo:{
			  costProjectList:[],
			  departList:[],
			  org:{},
			  paymentTypeList:[],
			  projectList:[],
			  user:{}
		  },
		  currencyList:[],
		  userInfo:{},
		  //预算模板
		costBudgets:{
				costBudgetName:'',
				currencyId:3,
				currencyName:'CNY',
				rate:'1.0',
				yyzamount:0,
				amount:null,
				costBudgetId:null
		   },
		  //行程模板
		  travelTplBookbeans:{
            startTime:'',
			endTime:'',
			hotelBooking:false,
			remark:'',
			startCity:'',
			toCity:'',
			tbTypeName:'请选择出行方式',
			tbType:0,
			toCityCode:'',
			startCityCode:''
		  },
		  myTravelBookbeans:[
		    {value: 0,label: '请选择出行方式'},
			{value: 1,label: '火车'},
			{value: 2,label: '飞机'},
		  ],
		  currencySettleTypeList:[
			{value: 0,label: '折合本币结算'},
			{value: 1,label: '单据币种结算'}
		  ]
		}
	},
	computed:{
        bankInfoHand(){
			return this.$store.getters.bank.chooseInfo;
		},
		choosePersonHand(){
			return this.$store.getters.person.exportList;
		}
	},
	watch:{
		bankInfoHand(info){
            this.detialData.bankNo = info.bankNo;
			this.detialData.bankName = info.bankName;
			this.bankNoAndName = info.bankName+info.bankNo;
		},
		choosePersonHand(data){
			this.detialData.applyUsers=data
		}
	},
    methods: {
	    getDetial(){
		    var _this=this;
			util.post('business/editBill',{uuId:_this.billId,type:0},function(res){
				_this.detialData = res.data.billInfo;
				_this.userInfo = res.data.billInfo.user;
				var arr = [];
				for (var item of res.data.billInfo.passengerBean) {
					arr.push(item.userId)
				}
				_this.handleData.passengerBean=arr;
			})
		},
		bankChoose(ev){
			//选择银行卡弹框
			this.$store.commit('showBank',true)
		},
		applyChoose(){
           //选择审批人
		   this.$store.commit('showPerson',true);
		   this.$store.commit('getimportList',this.detialData.applyUsers)
		},
		initList(){
			//默认执行
			var _this=this;
            util.post('bills/staticData',{},function(res){
				 _this.pageInfo = res.data;
			})
			util.post('webconfig/currency/list',{},function(res){
				_this.currencyList = res.data
			})
			util.post('chatgroups/chatUserInfo',{ifAll:1},function(res){
				_this.personList = res.data.data
			})
			util.post('cities/findCityHot',{},function(res){
				_this.hotCityList = res.data;
				_this.cityListSearch = res.data;
			})
			util.post('userBank/findUserBankDft',{},function(res){
				 _this.bankNoAndName = res.data.bankName+res.data.bankNo
			})
		},
		visibles(v){
		    this.cityListSearch =this.hotCityList;
		},
		remoteMethod(query){ 
			var re = /[^\u4e00-\u9fa5]/;  
			var option={};
            if(re.test(query)){
				option={letter:query}
			} else{
				option={chineseCharacters:query}
			}
            if (query !== '') {
				var _this=this;
				_this.loading = true;
				util.post('cities/findCity',option,function(res){
					_this.loading = false;
                    _this.cityListSearch = res.data;
				})
			} else {
				this.loading = false;
                this.cityListSearch = this.hotCityList;
			}
		},
		addTrip(){
			//新增行程
			let obj=JSON.stringify(this.travelTplBookbeans);
            this.detialData.travelBookbeans.push(JSON.parse(obj));
		},
		deleteTrip(index){
			//删除行程
			this.detialData.travelBookbeans.splice(index,1)
		},
		addBudget(){
			//新增预算
			let obj = JSON.stringify(this.costBudgets);
			this.detialData.formatCostBudgets[0].budgetTypes.push(JSON.parse(obj));
		},
		deleteBudget(index){
            //删除预算
			this.detialData.formatCostBudgets[0].budgetTypes.splice(index,1)
		},
		
		currencyChange(val,index,index2){ 
			//币种选择val:选择的币种，index:budgetTypes的索引，index2:formatCostBudgets的索引
			var _this = this;
			let list = _this.currencyList;
			list.find(function(x){
				if(x.code==val){
					let thisData = _this.detialData.formatCostBudgets[index2].budgetTypes[index];
					thisData.currencyId = x.id;
					thisData.rate = x.rate;
					_this.detialData.formatCostBudgets[index2].code = x;
					_this.detialData.formatCostBudgets[index2].rate = x.rate
				}
			})
			_this.advanceUpdate();
		},
		costBudChange(val,index,index2){
          //费用项目选择选择 val:选择的币种，index:budgetTypes的索引，index2:formatCostBudgets的索引
		    var _this = this;
			let list = _this.pageInfo.costProjectList;
			list.find(function(x){
				if(x.id==val){
					let thisData = _this.detialData.formatCostBudgets[index2].budgetTypes[index];
					thisData.costBudgetName = x.name;
				}
			})
		},
		tallyDepartIdChange(v){
			//记账部门选择
			var _this = this;
			let list = _this.pageInfo.departList;
			list.find(function(x){
				if(x.id==v){
					_this.detialData.tallyDepartName=x.name
				}
			})
		},
		tallyProjectIdChange(v){
             //记账项目选择
			var _this = this;
			let list = _this.pageInfo.projectList;
			list.find(function(x){
				if(x.id==v){
					_this.detialData.tallyProjectName=x.projectName
				}
			})
		},
		personChange(v){
				this.handleData.passengerBeanNum = this.handleData.passengerBean.length
		},
		advanceUpdate(){
            //预支信息更新同步
            var list = this.detialData.formatCostBudgets;
			var arr = [];
			var map={};
			var arr2=[];
			for(let value of list){
				for(let item of value.budgetTypes){
                    arr.push({
						amount:item.amount,
						exchangeRate:item.rate,
						currency:item.currencyName,
						currencyId:item.currencyId,
						domesticCurrencyAmount:item.amount*item.rate
					})	
				}
			}

			for(let item of arr){
				if(item.currency in map){
					  map[item.currency].amount = Number(map[item.currency].amount)+Number(item.amount)
				}else{
                    map[item.currency]={
						amount:item.amount,
						exchangeRate:item.exchangeRate,
						currency:item.currency,
						currencyId:item.currencyId,
						domesticCurrencyAmount:item.amount*item.exchangeRate
					}
				}      
			}
			for(let key in map){     
				arr2.push(map[key])   
			}  
			this.detialData.advances = arr2
		},
		//保存
		save(status){//0仅保存，1保存并提交
		    if(this.register()){
				var arramountAdvances=[];
				var arrapplicationCostCudgets=[];
				var arrtravelBooks=[];
				var arrapplyUserIds = [];
				for (var item of this.detialData.advances) {
					arramountAdvances.push(item.currencyId+'-'+item.currency+'-'+item.amount)
				}
				for(var item of this.detialData.formatCostBudgets){
					for (var item2 of item.budgetTypes){
					arrapplicationCostCudgets.push(item2.costBudgetId+'-'+item2.costBudgetName+'-'+item2.amount+'-'+item2.currencyId+'-'+item2.currencyName)
					}
				}
				for(var item of this.detialData.travelBookbeans){
					arrtravelBooks.push({
						endTime:util.getDefaultTime(item.endTime).substring(0,10),
						hotelBooking:item.hotelBooking,
						remark:item.remark,
						startCity:item.startCity,
						startCityCode:'',
						startTime:util.getDefaultTime(item.startTime).substring(0,10),
						tbType:item.tbType,
						toCity:item.toCity,
						toCityCode:''
					})
				}
				for(var item of this.detialData.applyUsers){
					arrapplyUserIds.push(item.id)
				}
				var bodys = {
					amount:this.detialData.amount,
					amountAdvances:arramountAdvances.join(','),
					applicationCostCudgets:arrapplicationCostCudgets.join(','),
					applyDepartId:this.detialData.applyDepartId,
					applyUserIds:arrapplyUserIds.join(','),
					approvalType:this.detialData.approvalType,
					bankName:this.detialData.bankName,
					bankNo:this.detialData.bankNo,
					billIds:'',//关联的开支流水
					businessTripBillId:'',
					cashAdvanceBillId:'',//关联的现金预支单
					cashAdvanceIds:'',
					cashPenseMoneys:'',
					currencySettleType:this.detialData.currencySettleType,
					dailyExpenseBillId:'',
					id:this.detialData.id,
					ifAdvance:this.detialData.ifAdvance,
					ifAll:this.detialData.ifAll,
					opentype:3,
					orderNo:this.detialData.orderNo,
					passengerUserIds:this.handleData.passengerBean.join(','),
					payType:this.detialData.payType,
					planDate:util.getDefaultTime(),
					receiver:this.detialData.receiver,
					remark:this.detialData.remark,
					status:status,
					tallyDepartId:this.detialData.tallyDepartId,
					tallyDepartName:this.detialData.tallyDepartName,
					tallyProjectId:this.detialData.tallyProjectId,
					tallyProjectName:this.detialData.tallyProjectName,
					travelbookIds:'',
					travelBooks:arrtravelBooks,
					type:0
				}
				var _this = this;
				util.post('business/newSaveBusinessTripWeb',bodys,function(res){
				    _this.$message({
						message: '操作成功',
						type: 'success'
					});
					_this.$router.push('/travel/businessApply')
				})
            }
		},
		//验证
		register(){
           if(this.detialData.approvalType == null){
			    this.$message({message: '请选择审批方式',type: 'error'});
				return false
		   }
		   if(util.trim(this.detialData.remark) == ''){
			    this.$message({message: '请输入事由',type: 'error'});
				return false
		   }
		   if(this.detialData.tallyDepartId == null){
			    this.$message({message: '请选择记账部门',type: 'error'});
				return false
		   }
		   if(this.detialData.approvalType ==2 && this.detialData.approvalType.tallyProjectId == null ){
			    this.$message({message: '请选择记账项目',type: 'error'});
				return false
		   }
		   if(this.detialData.tallyDepartId == null){
			    this.$message({message: '请选择记账部门',type: 'error'});
				return false
		   }
		   for(var item  of this.detialData.travelBookbeans){
			   if(item.startTime == ''){
                  this.$message({message: '请选择出发日期',type: 'error'});
				  return false
			   }
			   if(item.endTime == ''){
                   this.$message({message: '请选择到达日期',type: 'error'});
				   return false
			   }
			   if(item.startCity == ''){
                   this.$message({message: '请选择出发城市',type: 'error'});
				   return false
			   }
			   if(item.toCity == ''){
                   this.$message({message: '请选择到达城市',type: 'error'});
				   return false
			   }
			   if(item.remark == ''){
                   this.$message({message: '请输入行程备注',type: 'error'});
				   return false
			   }
		   }
	
		   for(var item of this.detialData.formatCostBudgets){
			   for (var item2 of item.budgetTypes){
                    if(item2.costBudgetId == null){
						this.$message({message: '请选择费用项目',type: 'error'});
						return false
					}
					if(item2.amount == '' || item2.amount == null || item2.amount <=0){
						this.$message({message: '请输入大于0的费用项目金额',type: 'error'});
						return false
					}
			   }
		   }
		   if(this.detialData.ifAdvance){
			   if(this.detialData.receiver == ''){
				   this.$message({message: '最终收款人不能为空',type: 'error'});
				   return false
			   }
			   if(this.detialData.payType == 'PT03' && this.bankNoAndName == ''){
				   this.$message({message: '银行卡信息不能为空',type: 'error'});
				   return false
			   }
		   }
		   if(this.detialData.applyUsers.length == 0){
			   this.$message({message: '请选择审批人',type: 'error'});
			   return false
		   }
		   return true
		}
		
	},
	created(){
	  this.billId = this.$route.params.id;
	  if(this.billId){
         this.getDetial();
	  }
      this.initList();
	},
	filters: {
		getStatus(status){
			var text='';
            switch(status){
				case 1:
				case 2:	    	
					text = '审核中';
					break;
				case 3:
					text = '审核通过';
					break;
				case 4:
					text = '被驳回';
					break;
				case 5:
					text = '待财务签收';
					break;
				case 7:
					text = '财务审核终止';
					break;
				case 6:
				case 8:
					text = '待财务结算';
					break;
				case 10:
					text = '财务结算终止';
					break;
				case 9:
				case 11:
					text = '待财务支付';
					break;
				case 12:
					text = '财务已支付';
					break;
				case 13:
					text = '财务已收款';
					break;
			}	
			return text;
		},
		gettogterName(arr,type){
			if(arr){
				var name=[];
                for(var value of arr){
					console.log(value);
					name.push(value.passengerName)
				}
				if(type == 1){
                   return name.join(',')
				}else{
					return arr.length
				}
				
			}
		},
		
	}
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.creatBusinessApply{
	text-align:left
}
.grid-div,.grid-div2{
    height:35px;
   line-height:35px;
   margin-bottom:10px
}
.grid-div2{
	padding-left:15%
}
.title-p{
	color:#277BCF;
	height:30px;
	margin:10px 0 15px 0;
	border-bottom:1px solid #277BCF;
	font-size:16px
}
.grid2{
	border-bottom:1px solid #ddd;
	height:35px;
}
.grid1 b,.grid-left b{color:red}
.route-box{
    border-radius: 8px 8px 0 0;
	position:relative
}
.route-div{
    background: linear-gradient(to left, #3FB0F6, #37C1F7, #29DEF7);
    padding: 12px 15px;
    border-radius: 8px 8px 0 0;
    position: relative;
	height:150px;
	color:#fff;
	padding-top:40px;
}
.tc{
	text-align:center;
	margin-top:30px
}
.grid-left,.grid-right,.grid-type{
	height:30px;
	line-height:30px;
	margin-bottom:15px
}
.grid-left{
	width:100%
}
.grid-right{
   border-bottom:1px solid #fff;
   margin-bottom:15px;
   width:100%
}
.grid-type{
   background:#fff;
   color:#333;
   border-radius:4px;
   text-indent:10px
}
.needHotel{
	position:absolute;
	bottom:70px;
	right:8%;
	color:#fff;
}
.grid-right input{
  background:none;
  border:0
}
.addApprove {
    cursor: pointer;
    width: 48px;
    height: 48px;
    float: left;
    padding-top: 20px;
}
.approveUl {
    padding-top: 20px 0;
    float: left;
}
.approveUl li {
    width: 48px;
    height: 48px;
    float: left;
    padding-right: 10px;
    position: relative;
    border-radius: 50%;
}
.approveUl li img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.approveUl li .approveDelete {
    position: absolute;
    top: 0px;
    right: 10px;
    width: 12px;
    height: 12px;
    background: url(../../assets/delete.png);
    cursor: pointer;
}
.approveName {
    font-size: 12px;
    text-align: center;
}
.yuzhiUl{
	border:1px solid #ddd;
	border-bottom:none;
	text-align:center
}
.yuzhiUl li{
   border-bottom:1px solid #ddd;
   height:30px;
   line-height:30px;
}
.yuzhiUl li span{
   display:inline-block;
   width:19%;
   border-right:1px solid #ddd;
}
.yuzhiUl li span:last-child{
	border-right:none
}
.deleteTrip{
	position:absolute;
	top:10px;
	right:10px;
	cursor:pointer
}
.borderBottom{
	margin-top:5px
}
</style>



