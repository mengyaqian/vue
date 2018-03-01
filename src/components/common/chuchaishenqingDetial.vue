<template>
		<div  class="detial" v-show="dialogVisible">
			<el-dialog title="出差申请单" :visible.sync="dialogVisible" @close="closed" size="large" width="70%">
			    <!--单据基本信息-->
				<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					<el-tab-pane label="单据基本信息" name="first">
					    <el-row :gutter="20">
							<el-col :span="12">
								<el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">单据编号</div></el-col>
										<el-col :span="18"><div class="grid2 red">{{detialData.orderNo}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
										<el-col :span="6"><div class="grid1">提交人</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.proposer}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
										<el-col :span="6"><div class="grid1">同行人</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.passengerBean | gettogterName(1)}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
										<el-col :span="6"><div class="grid1">填制时间</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.createdOn}}</div></el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <el-row :gutter="20">
							        <div class="grid-div2">
										<el-col :span="6"><div class="grid1">当前状态</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.billApprovalStatus | getStatus}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
							        <div class="grid-div"></div>
								</el-row>
								<el-row :gutter="20">
									<div class="grid-div2">
										<el-col :span="6"><div class="grid1">同行人数</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.passengerBean | gettogterName(2)}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
									<div class="grid-div2">
										<el-col :span="6"><div class="grid1">提交时间</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.updatedOn}}</div></el-col>
									</div>
								</el-row>	
							</el-col>
						</el-row>
						<p class="title-p">申请信息</p>
						<el-row :gutter="20">
							<el-col :span="12">
							    <el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">申请人</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.proposer}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">审批方式</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.approvalType == 1 ?'部门审批':'项目审批'}}</div></el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">申请部门</div></el-col>
									<el-col :span="18"><div class="grid2">{{detialData.department}}</div></el-col>
								</div>
							</el-col>
						</el-row>
						<el-row>
						    <div class="grid-div">
								<el-col :span="3">事由</el-col>
								<el-col :span="21"><div class="grid2">{{detialData.remark}}</div></el-col>
							</div>
						</el-row>
						<p class="title-p">入账信息</p>
						<el-row :gutter="20">
							<el-col :span="12">
							     <el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">记账部门</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.tallyDepartName}}</div></el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">记账项目</div></el-col>
									<el-col :span="18"><div class="grid2">{{detialData.tallyProjectName}}</div></el-col>
								</div>
							</el-col>
					    </el-row>
					    <p class="title-p">出差路线</p>
						<div class="route-box" v-for="(item,index) in detialData.travelBookbeans">
							<el-row :gutter="20">
								<div class="route-div">
									<el-col :span="2"><div class="grid-content bg-purple">行程{{index+1}}</div></el-col>
									<el-col :span="5">
									    <div class="grid-left">出发日期</div>
									    <div class="grid-left">出发城市</div>
									    <div class="grid-left">出行方式</div>
									</el-col>
									<el-col :span="5">
									    <div class="grid-right">{{item.startTime | getTime}}</div>
									    <div class="grid-right">{{item.startCity}}</div>
									    <div class="grid-type">{{item.tbTypeName}}</div>										
									</el-col>
									<el-col :span="2">
									    <div class="tc"><img src="../../assets/xingcheng.png"></div>
									</el-col>
									<el-col :span="5">
									    <div class="grid-left">到达日期</div>
									    <div class="grid-left">到达城市</div>	
									</el-col>
									<el-col :span="5">
									    <div class="grid-right">{{item.endTime | getTime}}</div>
										<div class="grid-right">{{item.toCity}}</div>
									</el-col>
								</div>
							</el-row>
							<p class="needHotel" v-if="item.hotelBooking">需住宿</p>
							<el-row>
								<div class="grid-div">
									<el-col :span="3">备注</el-col>
									<el-col :span="21"><div class="grid2">{{item.remark}}</div></el-col>
								</div>
							</el-row>
						</div>
						<p class="title-p">出差申请费用预算</p>
						<el-row :gutter="20" v-for="item in detialData.formatCostBudgets" :key="item.id">
							<el-col :span="12">
								<el-row :gutter="20">
									<div class="grid-div">
										<el-col :span="6"><div class="grid1">费用项目</div></el-col>
										<el-col :span="18"><div class="grid2">{{item.budgetTypes[0].costBudgetName}}</div></el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
								<div class="grid-div2">
									<el-col :span="6"><div class="grid1">金额</div></el-col>
									<el-col :span="18"><div class="grid2">{{item.amount}} {{item.code}}</div></el-col>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
					<!--现金预支信息-->
					<el-tab-pane v-if="detialData.cashAdvanceBill" label="现金预支信息" name="second">
					    <el-row>
						    <div class="grid-div">
								<el-col :span="3">单据编号</el-col>
								<el-col :span="21"><div class="grid2 red">{{detialData.cashAdvanceBill.orderNo}}</div></el-col>
							</div>
						</el-row>
						<p class="title-p">预支信息</p>
						<el-row :gutter="20">
							<el-col :span="12">
							    <el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">支付方式</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.cashAdvanceBill.payType}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">最终收款人</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.cashAdvanceBill.receiver}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">开户银行</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.cashAdvanceBill.bankName}}</div></el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">结算币种</div></el-col>
									<el-col :span="18"><div class="grid2">{{detialData.cashAdvanceBill.currency}}</div></el-col>
								</div>
								 <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">银行卡号</div></el-col>
									<el-col :span="18"><div class="grid2">{{detialData.cashAdvanceBill.bankNo}}</div></el-col>
								</div>
							</el-col>
						</el-row>
						<p class="title-p">现金预支明细清单</p>
						<el-table :data="detialData.cashAdvanceInfos[detialData.cashAdvanceBillId]" border style="width: 100%">
							<el-table-column type="index" width="50"></el-table-column>
							<el-table-column prop="currency" label="币种" width="180"></el-table-column>
							<el-table-column prop="tempAmount" label="金额" width="180"></el-table-column>
							<el-table-column prop="domesticCurrencyAmount" label="可核销金额"></el-table-column>
						</el-table>
					</el-tab-pane>
					<!--财务签收信息-->
					<el-tab-pane v-if="detialData.sign" label="财务签收信息" name="third">
					     <p class="title-p">财务签收信息</p>
						 <el-row :gutter="20">
							<el-col :span="12">
							    <el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">审核人</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.sign.executor.nickname}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">支付方式</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.cashAdvanceBill.payType}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">签收审核时间</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.sign.updatedOn}}</div></el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">单据到达时间</div></el-col>
									<el-col :span="18"><div class="grid2">{{detialData.sign.createdOn}}</div></el-col>
								</div>
								<div class="grid-div2">
								    <el-col :span="6"><div class="grid1">结算币种</div></el-col>
									<el-col :span="18"><div class="grid2">{{detialData.cashAdvanceBill.currency}}</div></el-col>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<div class="grid-div">
								<el-col :span="3">审核意见</el-col>
								<el-col :span="21"><div class="grid2">{{detialData.sign.approval}}</div></el-col>
							</div>
						</el-row>
					</el-tab-pane>
					<!--财务结算信息-->
					<el-tab-pane v-if="detialData.balance" label="财务结算信息" name="fourth">
					    <p class="title-p">财务结算信息</p>
						<el-row :gutter="20">
							<el-col :span="12">
							    <el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">结算支付人</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.balance.executor.nickname}}</div></el-col>
									</div>
								</el-row>
								<el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">结算支付时间</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.balance.updatedOn}}</div></el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <div class="grid-div2">
								    <el-col :span="6"><div class="grid1">单据到达时间</div></el-col>
									<el-col :span="18"><div class="grid2">{{detialData.balance.createdOn}}</div></el-col>
								</div>
								<div class="grid-div2">
								    <el-col :span="6"><div class="grid1">结算意见</div></el-col>
									<el-col :span="18"><div class="grid2">{{detialData.balance.approval}}</div></el-col>
								</div>
							</el-col>
						</el-row>
						<p class="title-p">财务支付信息</p>
						<div class="financialSettlement-list zhifupichiinfo">
							<div class="financePay-navOne">
								<p>序号</p>
								<p>支付方式</p>
								<p>结算币种</p>
								<p>最终收款人</p>
								<p>开户银行</p>
								<p>卡号</p>
								<p>支付金额</p>
								<p>支付时间</p>
								<p>支付人</p>
								<p>支付状态</p>
							</div>
							<div class="financePay-moneyChiose batchs" v-for="item in detialData.batchs">
								<div style="line-height:30px;text-indent:20px">
									<span>支付批次号：{{item.batchId}}</span>
									<span>支付金额：{{item.currency}} {{item.amounts}}</span>
								</div>
								<div class="financePay-ulOne" style="display:block" v-for="(values,index) in item.bbs">
									<ul>
										<li>
											<p>{{index+1}}</p>
											<p>{{detialData.payType}}</p>
											<p>{{detialData.currencySettleType == 0 ? '折合本币结算':'单据币种结算'}}</p>
											<p>{{detialData.receiver}}</p>
											<p>{{detialData.cashAdvanceBill ? detialData.cashAdvanceBill.bankName : ''}}</p>
											<p>{{detialData.cashAdvanceBill ? detialData.cashAdvanceBill.bankNo : ''}}</p>
											<p>{{values.currency}} {{values.amount}}</p>
											<p>{{values.updatedOn}}</p>
											<p>{{item.user.nickname}}</p>
											<p>{{values.status == 0 ?'待财务支付':'财务已支付'}}</p>
										</li>
									</ul>
								</div>
							</div>

						</div>

					</el-tab-pane>
					<el-tab-pane label="审批流程" name="fiveth">
					    <el-row :gutter="20">
							<el-col :span="12">
								<el-row :gutter="20">
								    <div class="grid-div">
								        <el-col :span="6"><div class="grid1">单据编号</div></el-col>
										<el-col :span="18"><div class="grid2 red">{{detialData.orderNo}}</div></el-col>
									</div>
								</el-row>
							</el-col>
							<el-col :span="12">
							    <el-row :gutter="20">
							        <div class="grid-div2">
										<el-col :span="6"><div class="grid1">当前状态</div></el-col>
										<el-col :span="18"><div class="grid2">{{detialData.billApprovalStatus | getStatus}}</div></el-col>
									</div>
								</el-row>
							</el-col>
						</el-row>
						<p class="title-p">单据审批信息</p>
						<div class="documentPublic-box-approval">
						   <ul>
								<li>
									<b></b>
									<img src="../../assets/ogrin.png">
									<div>
										<img v-bind:src="userInfo.avatarSmall">
										<div>
											<div>
												{{userInfo.nickname}}
												<i></i>
											</div>
											<span>
												<em style="color: #7AD752;">发起申请</em>
												<time class="fr">{{detialData.createdOn}}</time>
											</span>
										</div>
									</div>
								</li>
								<li v-for="item in detialData.appover">
									<b></b>
									<img  v-bind:src="item.statusSetting.imgSrc">
									<div>
										<img alt="头像" v-bind:src="item.executor.avatarSmall">
										<div>
											<div>
												{{item.executor.nickname}}
												<i>{{item.executor.positionName}}</i>													
											</div>
											<span>
												<em  v-bind:style="{color: item.statusSetting.textColor}">{{item.statusSetting.text}}</em>
												<time  class="fr">{{item.updatedOn}}</time>		                                    
											</span>
									    </div>									
									</div>
								</li>
							</ul>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-dialog>
		</div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
	name: 'detial',
	data () {
		return {
		  dialogVisible:false,
		  activeName2: 'first',
		  detialData:{},
		  userInfo:{}
		}
	},
	computed:{
        getbillId(){
			return this.$store.getters.travelApplicationsDetial.id;
		},
		isShowDetial(){
			return this.$store.getters.travelApplicationsDetial.showDetial;
		}
	},

    methods: {
		closed:function(){
			this.$store.commit('detialBusinessapplyShow',false);
		},
	    getDetial(){
		    var _this=this;
			util.post('business/newQueryBusinessTrip',{uuId:_this.$store.getters.travelApplicationsDetial.id},function(res){
				util.getStepStatusText(res.data.appover);
				_this.detialData = res.data;
				_this.userInfo = res.data.user
			})
		},
		handleClick(tab, event) {
			console.log(tab, event);
		}
		
	},
	watch:{
		getbillId:function(val){
			if(val){
				this.activeName2= 'first';
                this.getDetial()
			}
		},
		isShowDetial(val){
			this.dialogVisible=val
		}
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
		getTime(time){
		   return util.getDefaultTime(time).substring(0,10);
		},
		
	}
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detial{
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
.route-box{
    border-radius: 8px 8px 0 0;
	position:relative
}
.route-div{
    background: linear-gradient(to left, #3FB0F6, #37C1F7, #29DEF7);
    padding: 12px 15px;
    border-radius: 8px 8px 0 0;
    position: relative;
	height:130px;
	color:#fff
}
.tc{
	text-align:center;
	margin-top:30px
}
.grid-left,.grid-right,.grid-type{
	height:30px;
	line-height:30px;
	margin-bottom:5px
}
.grid-right{
   border-bottom:1px solid #fff
}
.grid-type{
   background:#fff;
   color:#333;
   border-radius:4px;
   text-indent:10px
}
.needHotel{
	height: 22px;
    border-radius: 22px;
    text-align: center;
    line-height: 22px;
    background-color: rgba(255,255,255,0.5);
	position:absolute;
	bottom:60px;
	right:8%;
	color:#fff;
	padding:0 10px
}
.red{
	color:rgb(203, 17, 17)
}
.documentPublic-box-approval{
	width: 100%;
    overflow: hidden;
    margin: 40px 0;
}
.documentPublic-box-approval ul li {
    width: 354px;
    display: block;
    border: 1px solid #d8d8d8;
    border-radius: 6px;
    margin: 0 auto 12px;
    position: relative;
    height: auto;
}
.documentPublic-box-approval ul li > img {
    width: 17.5px;
    height: 17.5px;
    display: block;
    position: absolute;
    left: -40.5px;
    top: 10px;
    z-index: 90;
}
.documentPublic-box-approval ul li > span {
    width: 11px;
    height: 9px;
    display: block;
    position: absolute;
    left: -11px;
    top: 15px;
    z-index: 90;
}
.documentPublic-box-approval ul li > div {
    margin: 12px 15px;
    overflow: hidden;
}
.documentPublic-box-approval ul li > div > img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    overflow: hidden;
    display: block;
    float: left;
}
.documentPublic-box-approval ul li > div > div {
    width: 272px;
    float: right;
    overflow: hidden;
}

.documentPublic-box-approval ul li > b {
    width: 1px;
    background: #d8d8d8;
    font-size: 0;
    display: block;
    position: absolute;
    left: -32px;
    top: 27px;
    height: 100%;
}
.documentPublic-box-approval ul li:last-child b {
    display: none;
}
.documentPublic-box-approval ul li > div > div > div > i {
    margin-left: 5px;
    max-width: 72px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	line-height:48px
}
.fr{
	float:right
}
.financialSettlement-list {
    width: 100%;
    height: auto;
    overflow: hidden;
    overflow-x: scroll;
    -ms-overflow-x: scroll;
    position: relative;
    margin-bottom: 60px;
    border: 1px #D2D2D2 solid;
}
.financePay-navOne {
    height: 30px;
    border-bottom: 1px #D2D2D2 solid;
	text-align:center
}
.financePay-navOne > p, .financePay-ulOne > ul > li > p {
    height: 30px;
    display: block;
    line-height: 30px;
    font-size: 12px;
    float: left;
    border-right: 1px #D2D2D2 solid;
    overflow: hidden;
	width:9%;
	text-align:center
}
.financePay-moneyChiose {

    height: 30px;
    border-bottom: 1px #D2D2D2 solid;
}
</style>



