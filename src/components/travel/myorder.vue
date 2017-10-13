<template>
  <div class="message">
	    <div class="rightBox">
		    <div style="padding:20px">
				<el-row>
				    <el-col :span="24">
				       <div class="msg"  v-for="item in listData.message">
					       <el-row :gutter="20">
							    <el-col :span="16">
								  <p class="ptxt1">{{item.createNickname}}<br/>{{item.content}}</p>
								</el-col>
							    <el-col :span="8">
								   <p class="ptxt2">2016-02-02 12：25</p>
								</el-col>
							</el-row>
					   </div>
					   <div class="noData" v-if="listData.pageCount==0">当前没有数据~</div>
				    </el-col>
				</el-row>
				<el-pagination  v-if="listData.pageCount!=0"
				  @size-change="handleSizeChange"
				  @current-change="handleCurrentChange"
				  :current-page.sync="currentPage"
				  :page-size="10"
				  layout="prev, pager, next, jumper"
				  :total="listData.pageCount">
				</el-pagination>
			</div>
		</div>
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
  name: 'Message',
  data () {
    return {
	  listData:[],
      currentPage: 1
    }
  },
  methods:{
     list(){
	     var option = {
		   page:this.currentPage,
		   pageSize:10,
		   params:{
		     type:'1'
		   }
		 }
		 var _this = this;
	     util.post('group/work-message',option,function(res){
		    console.log(res)
			_this.listData = res;
		 })
	 },
	 handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
		this.currentPage=val
		this.list();
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
  
</style>
