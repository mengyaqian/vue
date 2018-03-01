<template>
		<div  class="leftNav" v-if="showLeftNav">
			<el-menu :default-active="defaultActive" router theme="dark" class="el-menu-vertical-demo">
				<el-menu-item v-for="item in leftMenu" :key="item.href" :index="item.href">
					<i class="el-icon-menu"></i>
					{{item.name}}
			    </el-menu-item>
			</el-menu>
		</div>
		
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
  name: 'leftNav',
  props: ['leftData'],
  data () {
    return {
	  showLeftNav:true,
	  leftMenu:this.leftData.message,
	  defaultActive:''
    }
  },
    methods: {
	    handleOpen(key, keyPath) {
		   console.log(key, keyPath);
	    },
	     handleClose(key, keyPath) {
		   console.log(key, keyPath);
	    },
	    leftrouterChange(){
		   var paths =  this.$route.path;
			if(paths == '/login' || paths == '/index'){
			   this.showLeftNav=false
			}else{
			   this.showLeftNav=true
			}
			this.defaultActive=paths;
			this.$store.commit('changeLeftActive',paths)
			//左侧菜单的数据获取
			switch(paths){
			    case '/message/message':
				    this.leftMenu =  this.leftData.message ;
                    break;
			    case '/office/indexNotice':
				case '/office/indexWork':
				case '/office/reportForms':
                case '/office/findSchedule':
                    this.leftMenu =  this.leftData.office ;
                    break;
                case '/travel/businessApply':
				case '/travel/myorder':
				case '/travel/indexDidi':
				    this.leftMenu = this.leftData.travel;
					break;
				case '/expenses/billList':
				case '/expenses/billListNot':
				case '/expenses/billListYes':
				case '/expenses/billListAdd':
				case '/expenses/dailyApply':
				case '/expenses/travelExpense':
				case '/expenses/dailyExpense':
				case '/expenses/cashAdvance':
				case '/expenses/advanceRepay':
				case '/expenses/userCost':
				     this.leftMenu = this.leftData.expenses;
					 break;
                case '/approve/businessApprove':	
				case '/approve/moneyApprove':
				case '/approve/moneyBuyApprove':
				case '/approve/voucherList':
				     this.leftMenu = this.leftData.approve;
					 break;
			}
		}
	},
	computed:{
        activeGet(){
			return this.$store.getters.leftActive;
		},
	},
	watch:{
		 //检测路由变化
		"$route": "leftrouterChange",
		activeGet(info){
           this.defaultActive = info
		}
	},
	created() {
		this.leftrouterChange();
		console.log('------------')
	},
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leftNav{
    width:160px;
	position:fixed;
	top:70px;
	left:0;
	bottom:0;
	background:#415e7a
}
.el-menu--dark {
    background-color: #415e7a;
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
    color: #20a0ff;
	background:#E6EFF7
}
 
</style>



