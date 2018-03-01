<template>
  <div class="businessApprove">
	    <div class="rightBox">
		    <div class="examinationApprova-top">
				<p>审批</p>
			</div>
			<div style="padding:10px 20px">
				<el-tabs v-model="actives" type="card" @tab-click="handleClick">
				    <div class="ruleDiv">
					   <span>单据编号：<el-input class="inputW" v-model="orderNo" placeholder="请输入单据编号："></el-input></span>
					   <span><el-select v-model="type" placeholder="请选择">
							<el-option
							  v-for="item in listStatus"
							  :key="item.type"
							  :label="item.name"
							  :value="item.type">
							</el-option>
						</el-select>
						</span>
						<span>申请人：<el-input class="inputW" v-model="userName" placeholder="请输入申请人"></el-input></span>
						<span>审批到达时间： <el-date-picker v-model="rangDate" type="daterange"  placeholder="选择创建时间"></el-date-picker></span>
						<span><el-button type="primary" @click="getList">搜索</el-button></span>
					</div>
					 <el-tab-pane label="待审批" name="0"></el-tab-pane>
					 <el-tab-pane label="已审批" name="1"></el-tab-pane>
					 <el-tab-pane label="知会我的" name="2"></el-tab-pane>
				</el-tabs>
				<!--table start-->
				<el-table :data="listData" border style="width: 100%;font-size:12px;margin-bottom:20px;text-align:center">
					<el-table-column prop="orderNo" label="单据编号">
					   <template scope="scope">
						  <el-button @click="detials(scope.row)" type="text" size="small">{{scope.row.orderNo}}</el-button>
					  </template>
					</el-table-column>
					<el-table-column prop="typeName" label="单据类型" ></el-table-column>
					<el-table-column prop="proposer" label="申请人" ></el-table-column>
					<el-table-column prop="remark" label="事由" ></el-table-column>
					<el-table-column prop="money" label="金额" ></el-table-column>
					<el-table-column prop="updateOn"  :formatter="formatterTime" label="审批到达时间" ></el-table-column>
					<el-table-column prop="billApprovalStatus" label="审批状态" :formatter="formatterStatus"></el-table-column>
				</el-table>     
			    <!--table end-->
			</div>
		</div>
		<chuchaishenqing-detial></chuchaishenqing-detial>
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
import chuchaishenqingDetial from '@/components/common/chuchaishenqingDetial.vue'
export default {
  name: 'BusinessApprove',
  components:{chuchaishenqingDetial},
  data () {
    return {
	   actives:'0',
	   orderNo:'',
	   rangDate:[
		  new Date(new Date().valueOf()- (1000*60*60*24*30)),
		  new Date()
	  ],
	  type:'-1',
	  userName:'',
	  listStatus:[
	    {name:'全部',type:'-1'},
		{name:'出差申请单',type:'0'},
		{name:'现金预支单',type:'1'},
		{name:'出差费用报销单',type:'3'},
		{name:'日常费用报销单',type:'4'},
		{name:'日常开支申请单',type:'5'}
	  ],
	  listData:[],
    }
  },
  methods:{
    handleClick(tab, event) {
	     this.orderNo='';
		 this.userName = '';
		 this.type = '-1';
		 this.rangDate = [
			  new Date(new Date().valueOf()- (1000*60*60*24*30)),
			  new Date()
		  ], 
	    this.getList();
     },
	formatterTime(row){
		//列表日期处理
		return util.getDefaultTime(row.updateOn.time).substring(0,10)
	},
	formatterStatus(row){
		//列表审批状态处理
		var status = row.billApprovalStatus;
		var text = '';
		switch(status){			
			case -1:
				text = '已删除';
				break;
			case 0:
				text='未提交';
				break;
			case 1:
			case 2:
				text='审批中';
				break;
			case 3:
				text='审批通过';
				break;
			case 4:
				text='审批拒绝';
				break;
			case 5:
				text='待财务签收';
				break;
			case 7:
				text='财务审核终止';
				break;
			case 6:
			case 8:
			case 10:
				text='财务结算终止';
				break;
			case 9:
			case 11:
				text='待财务支付';
				break;
			case 12:
				text='财务已支付';
				break;
			case 13:
				text='财务已收款';
				break;
		}	
		return text;
	},
	getMoney(id,list){
	  console.log(id);
	  console.log(list)
	  var text = '';
	  list.forEach(function(v){
	     if(v.uuid == id){
		    text += v.code+':'+v.amount+' ';
		 }
	  })
	  return text;
	},
	 getList(){
	   var that = this;
	   var options = {
	      createTime:util.getDefaultTime(that.rangDate[0]),
          endTime:util.getDefaultTime(that.rangDate[1]),
          orderNo:that.orderNo,
          page:1,
          status:parseInt(that.actives),
          type:that.type,
          userName:''
	   };
	   util.post('flow/businessBill/listAll',options,function(result){
	       if(result.statusCode == 200){
		      var r = result.data.pageModel.all;
			  var list = [];
			  r.forEach(function(v,i){
			      list.push({
				     orderNo:v[3],
					 billApprovalStatus:v[12],
					 typeName:v[2],
					 remark:v[8],
					 proposer:v[11],
					 money:that.getMoney(v[0],result.data.amountCurrency),
					 updateOn:v[9],
					 type:v[1],
					 uuid:v[0]
				  })
			  }) 
			  that.listData = Object.assign([],list);
			  console.log(that.listData)
		   }
	   })
	 },
	 detials(info){
	    if(info.type == 0){//出差申请单
	       this.$store.commit('detialBusinessapplyId',info.uuid);
		   this.$store.commit('detialBusinessapplyShow',true);
	    }
	    
	 }
	 
  },
  created(){
     this.getList();
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .examinationApprova-top{
    height: 47px;
    padding: 0 24px;
    overflow: hidden;
    margin-bottom: 20px;
    border-bottom: #D2D2D2 1px solid;
    text-align:left
 }
.examinationApprova-top p {
    height: 16px;
    line-height: 16px;
    padding-left: 13px;
    margin-top: 16px;
    border-left: #277BCF 2px solid;
}
.ruleDiv{
     margin-bottom:20px;
	 text-align:left
  }
  .ruleDiv span{
     padding:0 12px
  }
  .inputW{
     width:120px
  }
  
</style>
