<template>
    <div class="header" v-if="showHeader">
	   <div style="margin:0 30px">
			<el-row :gutter="20">
				<el-col :span="5">
				  <div class="grid-content bg-purple">
				     <img src="../../assets/u191.png" style="float:left;padding-top:15px">
					 <span style="float:left;padding:0 16px">|</span>
					 <span style="float:left">小伙伴</span>
				  </div>
				</el-col>
				<el-col :span="14">
				   <div class="grid-content bg-purple">
				   <el-menu theme="dark"  :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
					  <el-menu-item index="/index">首页</el-menu-item>
					  <el-menu-item index="/message">消息</el-menu-item>
					  <el-menu-item index="/findSchedule">协同办公</el-menu-item>
					  <el-menu-item index="/businessApply">差旅管理</el-menu-item>
					  <el-menu-item index="/billList">费用报销</el-menu-item>
					  <el-menu-item index="/businessApprove">审批</el-menu-item>
					  <el-menu-item index="7">系统管理</el-menu-item>
				   </el-menu>
				   </div>
				</el-col>
				<el-col :span="5"><div class="grid-content bg-purple">info</div></el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default{
        data () {
			return {
			  activeIndex:'/index',
			  showHeader:true
			}
		},
		methods:{
			handleSelect(key, keyPath) {
			   console.log(key, keyPath);
		    },
			routerChange(){
			   var path =  this.$route.path;
			    if(path == '/login'){
			       this.showHeader=false
			    }else{
				   this.showHeader=true
				}
				if(path == '/index'){
				  this.activeIndex='/index';
				}else if(path == '/message' || path == '/remind' || path=='waring'){
				  this.activeIndex='/message';
				}else if(path == '/findSchedule' || path == '/indexNotice' || path == '/indexWork' || path == '/reportForms'){
				  this.activeIndex ='/findSchedule'
				}else if(path == '/businessApply' || path=='/myorder' || path == '/indexDidi'){
				  this.activeIndex ='/businessApply'
				}else if(path == '/billList' || path == '/dailyApply' || path == '/travelExpense' || path == '/dailyExpense' || path == '/cashAdvance' || path == '/advanceRepay' || path == '/userCost'){
					this.activeIndex ='/billList'
				}else if(path == '/businessApprove' ||  path == '/moneyApprove' ||  path == '/moneyBuyApprove' ||  path == '/voucherList'){
					this.activeIndex ='/businessApprove'
				}
			}
		},
		watch:{
		     //检测路由变化
		    "$route": "routerChange"
		},
		created() {
		    this.routerChange();
		}
	}

</script>

<style scoped>
.header{
    height: 70px;
    line-height: 70px;
    text-align: center;
    background: #277BCF;
    position: fixed;
    top: 0px;
	left:0;
	right:0;
    z-index: 8;
}
.bg-purple{
  color:#fff
}
.el-menu{
  background-color:none
}
.el-menu--dark{
  background:none
}
.el-menu--horizontal .el-menu-item{
  height:70px;
  line-height:70px
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
  color:#fff;
  background:#2d8fd7
}
.el-menu--horizontal .el-menu-item{
   border-bottom:0;
}
.el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title{
   color:#fff
}
.el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
   background:#2d8fd7
}
</style>
