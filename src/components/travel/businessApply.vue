<template>
  <div class="businessApply">
	    <div class="rightBox">
		    <div style="padding:20px">
			    <div class="ruleDiv">
				   <span>单据编号：<el-input class="inputW" v-model="orderNo" placeholder="请输入单据编号："></el-input></span>
				   <span>创建时间： <el-date-picker v-model="rangDate" type="daterange"  placeholder="选择创建时间"></el-date-picker></span>
				   <span><el-select v-model="status" placeholder="请选择">
						<el-option
						  v-for="item in listStatus"
						  :key="item.status"
						  :label="item.name"
						  :value="item.status">
						</el-option>
					</el-select>
					</span>
					<span><el-button type="primary" @click="list">搜索</el-button></span>
					<span><el-button type="primary">新增出差申请单</el-button></span>
				</div>
				<el-table :data="listDataMessage.all" border style="width: 100%;font-size:12px;margin-bottom:20px">
					<el-table-column prop="orderNo" label="单据编号">
					   <template scope="scope">
						  <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.orderNo}}</el-button>
					  </template>
					</el-table-column>
					<el-table-column prop="typeName" label="单据类型" ></el-table-column>
					<el-table-column prop="tallyDepartName" label="记账部门" ></el-table-column>
					<el-table-column prop="tallProductName" label="记账项目" ></el-table-column>
					<el-table-column prop="remark" label="事由" ></el-table-column>
					<el-table-column prop="createOn"  :formatter="formatterTime" label="提交时间" ></el-table-column>
					<el-table-column prop="billApprovalStatus" label="审核状态" :formatter="formatterStatus"></el-table-column>
				</el-table>
				<el-pagination  v-if="countNum!=0"
				  @size-change="handleSizeChange"
				  @current-change="handleCurrentChange"
				  :current-page.sync="currentPage"
				  :page-size="10"
				  layout="prev, pager, next, jumper"
				  :total="countNum">
				</el-pagination>
			</div>
		</div>
        
		 <mychuchaishenqingDetial  v-model="showDetial" :businessapply="thisuuid"></mychuchaishenqingDetial>
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
import chuchaishenqingDetial from '@/components/common/chuchaishenqingDetial.vue'

export default {
  name: 'BusinessApply',
  components:{
     mychuchaishenqingDetial:chuchaishenqingDetial
  },
  data () {
    return {
	  listDataMessage:{},
      currentPage: 1,
	  rangDate:[
		  new Date(new Date().valueOf()- (1000*60*60*24*30)),
		  new Date()
	  ],
	  orderNo:'',
	  status:'-2',
	  createTime:'',
	  endTime:'',
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
	  countNum:0,
	  showDetial:false,
	  thisuuid:''
    }
  },
  methods:{
     list(){
	     var option = {
		    type:0,
			status:this.status,
			page:this.currentPage,
			orderNo:this.orderNo,
			createTime:this.getDefaultTime(this.rangDate[0]),
			endTime:this.getDefaultTime(this.rangDate[1])
		 }
		 var _this = this;
	     util.post('bill/tripbill/listAll',option,function(res){
			_this.listDataMessage = res.message;
			_this.countNum = res.message.count
		 },{format:true})
	 },
	 handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
		this.currentPage=val
		this.list();
    },
	getDefaultTime(time){
		var t = time ? new Date(time) : new Date();
		var Mon = t.getMonth()+1;
		var Day = t.getDate();
		if(t.getMonth()+1<10){
			Mon = '0'+Mon;
		}
		if(t.getDate()<10){
			Day = '0'+Day;
		}
		return t.getFullYear()+'-'+ Mon+ '-' + Day+ ' '+ t.getHours()+':'+ t.getMinutes()+':'+ t.getSeconds();
	},
	handleClick(info){
	  //查看详情
	  this.showDetial=true;
	  
	  this.thisuuid = info.uuid
	},
	formatterTime(row){
	  //列表日期处理
	  return this.getDefaultTime(row.createOn.time).substring(0,10)
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
	}
  },
  created(){
     this.list()
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .msg{
     margin-bottom: 20px;
	 height:70px;
	 padding:6px;
	 border:1px dashed #ddd;
	 border-radius: 4px;
  }
  .ptxt1{
    text-align:left;
	line-height:35px
  }
  .ptxt2{
    text-align:right;
	line-height:70px;
	color:#666
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
  .el-table th>.cell{
     text-align:center;
  }
  .pointer{
    color:red
  }
  
</style>
