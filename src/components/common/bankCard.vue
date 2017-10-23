<template>
		<div  class="bankCard" v-show="dialogVisible">
			<el-dialog title="银行卡信息维护" :visible.sync="dialogVisible" @close="closed" >
					<div class="bankBox">
					    <div class="div1">
							<el-row :gutter="20">
								<el-col :span="6"><div class="grid1">请输入开户行</div></el-col>
								<el-col :span="18"><el-input class="grid2" v-model="bankName" placeholder="请输入开户行"></el-input></el-col>
							</el-row>
						</div>
						<div class="div1">
							<el-row :gutter="20">
								<el-col :span="6"><div class="grid1">请输入银行卡号</div></el-col>
								<el-col :span="18"><el-input class="grid2" v-model="bankNo" placeholder="请输入银行卡号"></el-input></el-col>
							</el-row>
						</div>
						<p class="p1">请确保输入带有储蓄功能的银行卡信息，否则不能进行转账</p>
						<div>
							    <span style="padding-right:20px">设为默认银行卡</span>
								<el-switch   v-model="ifDefaultAccountNo" on-text="是" off-text="否" ></el-switch>
								<el-button style="float:right"  size="small" type="primary" @click="add">新增</el-button>
						</div>
                         <div class="banList">
						    <p class="p2">
								<el-row>
									<el-col :span="24"><el-button style="margin-left:16px" type="text">我的银行卡</el-button></el-col>
								</el-row>
							</p>
							<p class="p2" v-for="(item,index) of bankList">
								<el-row>
									<el-col :span="6"><div class="grid-con bg-purple"><el-button @click="chooseCard(item)" type="text">{{item.bankName}}</el-button></div></el-col>
									<el-col :span="12"><div class="grid-con bg-purple-light">{{item.bankNo}}</div></el-col>
									<el-col :span="6">
									     <el-button v-if="item.ifDefaultAccountNo == 1" type="text">默认银行卡</el-button>
										 <el-button v-if="item.ifDefaultAccountNo == 0" @click="setDefault(item.id)" size="mini">设为默认银行卡</el-button>
										 <i class="el-icon-delete" @click="deleteBank(item.id)"></i>
									</el-col>
								</el-row>
							</p>
						 </div>
					</div>
				
			</el-dialog>
		</div>
		    
	
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
	name: 'bankCard',
	props: {
	  value:Boolean
	},
	data () {
		return {
		  dialogVisible:this.value,
          bankName:'',
		  bankNo:'',
		  ifDefaultAccountNo:true,
		  bankList:[]
		  
		}
	},
    methods: {
		closed:function(){
			this.$emit('input',false)
		},
		add(){
			var _this=this;
			var pdata = {
				bankName:_this.bankName,
				bankNo:_this.bankNo,
				ifDefaultAccountNo:(_this.ifDefaultAccountNo ? 1:0)
			}
           util.post('userBankAccount/addUserBank',pdata,function(res){
                _this.$message({
					message: '新增成功',
					type: 'success'
				});
				_this.getList();
				_this.bankName = '';
				_this.bankNo=''
		   })
		},
		deleteBank(cardid){
			this.$confirm('是否要删除该银行卡？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					var _this = this;
					util.post('userBankAccount/deleteUserBank',{id:cardid},function(res){
						 _this.getList();
						_this.$message({
							type: 'success',
							message: '删除成功'
						});
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
			    });
		},
		setDefault(cardid){
			var _this = this;
		   util.post('userBankAccount/updateUserBankDefault',{id:cardid,ifDefaultAccountNo:1},function(res){
                _this.$message({
					message: '设置成功',
					type: 'success'
				});
				_this.getList();
		   })
		},
		chooseCard(data){
             this.closed();
			 this.$emit('bankInfo',data);
		},
		getList(){
			var _this = this;
			util.get('userBankAccount/findUserBanks',{},function(res){
				_this.bankList = res.result
			})
		}
	},
	watch:{
		value:function(val){
			this.dialogVisible=val;
			if(val){
              this.getList()
			}
			
		}
	}
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bankCard{
	text-align:left
}
.bankBox{
	width:80%;
	margin:20px auto
}
.div1{
	margin-bottom:10px
}
.p1{
	color:#666;
	font-size:12px;
	line-height:30px
}
.grid-con{
	text-indent:16px

}
.banList{
	margin:10px 0
}
.p2{
	margin-bottom:16px;
	height:30px;
	line-height:30px;
	border:1px solid #ddd;
}
.tit{
	color:#277BCF
}
</style>



