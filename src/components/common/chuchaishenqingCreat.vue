<template>
		<div  class="creatBusinessApply" v-show="dialogVisible">
			<el-dialog title="出差申请单" :visible.sync="dialogVisible" @close="closed" size="large">
					<div>
					    <p class="title-p">申请信息</p>
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
										    <el-input class="grid2" placeholder="请选择同行人" icon="search" readonly v-model="handleData.passengerBeanName" :on-icon-click="handleIconClick"></el-input>
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
								<el-col :span="3">事由</el-col>
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
										    <el-select v-model="detialData.tallyDepartId" placeholder="请选择记账部门" class="grid2">
												<el-option v-for="item in pageInfo.departList" :key="item.id" :label="item.name" :value="item.id"></el-option>
											</el-select>
										</el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">记账项目<b>*</b>:</div></el-col>
									<el-col :span="18">
									    <el-select v-model="detialData.tallyProjectId" placeholder="请选择记账项目" class="grid2">
											<el-option v-for="item in pageInfo.projectList" :key="item.id" :label="item.projectName" :value="item.id"></el-option>
										</el-select>
									</el-col>
								</div>
							</el-col>
						</el-row>
						<p style="text-align:right;margin:10px"><el-button type="text">新增行程</el-button></p>
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
										<el-autocomplete 
											class="inline-input grid-right"
											v-model="item.startCity"
											:fetch-suggestions="querySearch"
											placeholder="请输入内容"
											@select="handleSelect"
										></el-autocomplete>
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
										<el-autocomplete
											class="inline-input"
											v-model="item.toCity"
											:fetch-suggestions="querySearch"
											placeholder="请输入内容"
											@select="handleSelect"
										></el-autocomplete>
									</el-col>
								</div>
							</el-row>
						 	<div class="needHotel">是否需要住宿：
							    <el-switch   v-model="item.hotelBooking" on-text="是" off-text="否" ></el-switch>
							</div>
							<el-row>
								<div class="grid-div">
									<el-col :span="3">备注</el-col>
									<el-col :span="21"><div class="grid2">{{item.remark}}</div></el-col>
								</div>
							</el-row>
						</div>
						
						<p class="title-p">出差申请费用预算<el-button style="float:right" type="text">新增预算</el-button></p>
						<div  v-for="item1 in detialData.formatCostBudgets">
						<el-row :gutter="20"  v-for="values in item1.budgetTypes">
							<el-col :span="12">
							     <el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">费用项目<b>*</b>：</div></el-col>
										<el-col :span="18">
										   <el-select v-model="values.costBudgetId" placeholder="请选择费用项目" class="grid2">
												<el-option v-for="item in pageInfo.costProjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
											</el-select>
										</el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">金额</div></el-col>
									<el-col :span="18">
									    <el-input class="" v-model="values.amount" style="width:80px"  placeholder="请输入金额"></el-input>
									    <el-select v-model="values.currencyId" placeholder="请选择币种" class="">
											<el-option v-for="item in currencyList" :key="item.id" :label="item.code" :value="item.id"></el-option>
										</el-select>
									</el-col>
								</div>
							</el-col>
					    </el-row>
						</div>
					    <p class="title-p">审批人</p>
					    <ul class="approveUl">
						    <li v-for="item in detialData.applyUsers">
							   <img v-bind:src="item.avatarSmall">
							   <p v-bind:id="item.id" class="approveDelete"></p>
							   <p class="approveName">{{item.nickname}}</p>
							</li>
						</ul>
					    <p class="addApprove" id="addApprove"><img src="../../assets/addPerson.png"></p>
						<p style="clear:both"></p>
					</div>
					<div style="float:right;margin-bottom:20px" class="clears">
					    <el-button type="primary">保存并提交</el-button>
						<el-button>仅保存</el-button>
						<el-button>删除</el-button>
					</div>
					
				
			</el-dialog>
		</div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
	name: 'creatBusinessApply',
	props: {
	businessapply:String,
	value:Boolean
	},
	
	data () {
		return {
		  dialogVisible:this.value,
		  detialData:{
			  proposer:'张三',
			  applyDepartName:'技术部2',
			  applyDepartId:'865',
			  approvalType:null,
			  remark:'',
			  tallyDepartId:null,
			  tallyDepartName:'',
			  tallyProjectId:null,
			  tallyProjectName:'',
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
					tbType:0
				  }
			  ],
			  applyUsers:[]
		  },
		  handleData:{
             passengerBeanName:'',
			 passengerBeanId:'',
			 passengerBeanNum:0
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
		  //出差申请费用预算模板
		  costBudgets:{
			  amount:null,
			  costBudgetId:null,
			  costBudgetName:'',
			  currencyId:3,
			  currencyName:'CNY',
			  rate:'1.0',
			  yyzamount:0
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
			tbType:0
		  },
		  myTravelBookbeans:[
		    {value: 0,label: '请选择出行方式'},
			{value: 1,label: '火车'},
			{value: 2,label: '飞机'},
		  ]
		}
	},
    methods: {
		closed:function(){
			this.$emit('input',false)
		},
	    getDetial(){
		    var _this=this;
			if(_this.businessapply){
				if(_this.businessapply != '0'){//编辑
                    util.post('bill/bussiness/edit',{uuid:_this.businessapply,type:0},function(res){
						_this.detialData = res.content[0];
						_this.userInfo = res.content[0].user
				    },{format:true})
				}else{ //新增

				}
				
			}
			
		},
		handleIconClick(ev){
            console.log(ev)
		},
		initList(){
			//默认执行
			var _this=this;
            util.get('bill/staticdata',{},function(res){
				 _this.pageInfo = res.data;
			})
			util.post('fnconfig/currency/list',{},function(res){
				_this.currencyList = res.message
				console.log(res.message)
			})
		},
		querySearch(queryString, cb) {
			var restaurants = this.restaurants;
			var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
			// 调用 callback 返回建议列表的数据
			cb(results);
		},
		handleSelect(item) {
			console.log(item);
		}
		
	},
	watch:{
		value:function(val){
		    console.log(val)
			this.dialogVisible=val;
		},
		businessapply:function(val){
		    console.log(val);
			this.getDetial();
		}
	},
	created(){
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
	color:#fff
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
.grid-right{
   border-bottom:1px solid #fff;
   margin-bottom:15px
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
</style>



