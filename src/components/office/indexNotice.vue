<template>
  <div class="notice">
        <div class="leftTwoNav">
		    <el-menu mode="vertical" :default-active="active" class="el-menu-vertical-demo" @select="handleSelect">
				<el-menu-item index="3"><i class="el-icon-message"></i>全部</el-menu-item>
				<el-menu-item index="0"><i class="el-icon-message"></i>未读</el-menu-item>
				<el-menu-item index="1"><i class="el-icon-message"></i>我发布的</el-menu-item>
				<el-menu-item index="2"><i class="el-icon-message"></i>草稿箱</el-menu-item>
			</el-menu>
		</div>
	    <div class="rightBox2">
		    <div style="padding:20px">
			    <p style="line-height:40px;border-bottom:1px solid #ddd;text-align:left;margin-bottom:10px">{{title}}</p>
				<el-row>
					<el-col :span="24">
					   <div class="msg"  v-for="item in listData.content">
						   <el-row :gutter="20">
								<el-col :span="16">
								  <p class="ptxt1" @click="detail(item.id)">{{item.title}}--{{item.username}}--{{item.createDate}}<br/>{{item.content}}</p>
								</el-col>
								<el-col :span="8" v-if="noticeType !=2">
								   <p class="ptxt2" @click="readPerson(item.id)">{{item.count}}人未读</p>
								</el-col>
							</el-row>
					   </div>
					   <div class="noData" v-if="listData.count==0">当前没有数据~</div>
					</el-col>
				</el-row>
			</div>
		    <div style="padding:20px">
				<el-pagination  v-if="listData.count>0"
				  @size-change="handleSizeChange"
				  @current-change="handleCurrentChange"
				  :current-page.sync="currentPage"
				  :page-size="10"
				  layout="prev, pager, next, jumper"
				  :total="listData.count">
				</el-pagination>
			</div>
		</div>
		<!--查看人员详情-->
		<el-dialog title="查看详细" :visible.sync="dialogVisible" size="large">
		    <p class="p1">未读</p>
			<ul class="detial clears">
			    <li v-for="item in readPersonList" v-if="item.status==0"><img :src="item.avatarSmall"><p>{{item.nickname}}</p></li>
			</ul>
			<p class="p1">已读</p>
			<ul class="detial clears">
			    <li v-for="item in readPersonList" v-if="item.status==1"><img :src="item.avatarSmall"><p>{{item.nickname}}</p></li>
			</ul>
		</el-dialog>
		<!--查看公告详情-->
		<el-dialog :title="reportDetailContent.title" :visible.sync="dialogVisible2" size="large">
		    <p class="p1">{{reportDetailContent.username}}&nbsp;{{reportDetailContent.createDate}}</p>
			<p class="p1">{{reportDetailContent.content}}</p>
		</el-dialog>
		<!--编辑公告-->
		<el-dialog title="公告编辑" :visible.sync="dialogVisible3" size="large">
		    <div style="text-align:left">
			    <p class="p2">发送给：</p>
				<el-select v-model="selectPerson" multiple filterable  placeholder="请选择" style="width:100%">
					<el-option
					  v-for="item in reportDetailResult.users"
					  :key="item.id"
					  :label="item.nickname"
					  :value="item.id">
					</el-option>
				</el-select>
				<p class="p2">公告标题：</p>
				<el-input v-model="reportDetailContent.title" placeholder="请输入内容"></el-input>
				<p class="p2">公告正文：</p>
				<vue-editor v-model="reportDetailContent.content"></vue-editor>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible3 = false">取 消</el-button>
				<el-button type="primary" @click="saveReport(1)">保 存</el-button>
				<el-button type="primary" @click="saveReport(2)">发 布</el-button>
			</span>
		</el-dialog>
  </div>
</template>

<script>
import util from '@/util/util.js'
import { VueEditor } from 'vue2-editor'
import axios from 'axios'
export default {
  name: 'Notice',
  components: {
      VueEditor
  },
  data () {
    return {
	  listData:{},
      currentPage: 1,
	  active:'3',
	  noticeType:'3',
	  title:'全部公告',
	  dialogVisible: false,
	  dialogVisible2:false,
	  dialogVisible3:false,
	  readPersonList:[],
	  reportDetailContent:{},
	  reportDetailResult:{},
	  selectPerson:[], //选择的发送范围
    }
  },
  methods:{
     list(){
	     var option = {
		   page:this.currentPage,
		   pageSize:10,
		   type:this.noticeType
		 }
		 var _this = this;
	     util.post('users/notices/queryList',option,function(res){
			_this.listData = res.data;
		 })
	 },
	handleSelect(key, keyPath){
		 this.noticeType=key;
		 this.list();
		 switch(key){
		    case '0':
				this.title = '未读公告';
				break;
			case '1':
			    this.title='我发布的';
				break;
			case '2':
			    this.title='草稿箱';
				break;
			case '3':
			    this.title='全部公告';
				break;
		 }
	},
	handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
		this.currentPage=val
		this.list();
    },
	
	readPerson(noticeId){
	    var _this=this;
	    util.post('users/notices/findUnreadColleague',{noticeId:noticeId},function(res){
		    _this.dialogVisible = true;
			_this.readPersonList=res.data;
		})
		
	},
	detail(noticeId){
	    var _this=this;
	    util.post('users/notices/findNoticeDetails',{noticeId:noticeId},function(res){
		    if(_this.noticeType == '2'){
			    _this.dialogVisible3=true;
			}else{
			    _this.dialogVisible2=true;
			}
			_this.reportDetailContent=res.data.content[0];
			_this.reportDetailResult = res.data.result[0];
		   
		   
		})
	},
	saveReport(type){//1保存，2发布
	   var pdata ={
	        id:741,
			status:0,
			department_id:865,
			content:this.reportDetailContent.content,
			title:this.reportDetailContent.title,
			files:''
	   }
	   if(type == 1){
	      var _this = this;
	      util.post('users/notices/addNotice',pdata,function(res){
		     _this.dialogVisible3 =false
		  })
	   }
	   
	},
	sendReport(){
	   this.dialogVisible3=true;
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
	color:#0088CC;
	cursor:pointer
  }
  .detial{
     width:100%
  }
  .detial li{
    float:left;
	margin-bottom:16px;
	margin-right:16px;
  }
  .detial li img{
     width:50px;
	 height:50px;
	 border-radius:50%
  }
  .p1{
     text-align:left
  }
  .p2{
     line-height:35px
  }
 
  
</style>
