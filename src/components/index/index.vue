<template>
  <div class="home">
	   
	    <div style="margin:90px 20px 10px">
			<el-row :gutter="20">
				<el-col :span="6">
				  <div class="grid-content bg-purple">最新消息</div>
				  <div style="height:500px;border:1px solid #ddd"></div>
				</el-col>
				<el-col :span="12">
				   <div class="grid-content bg-purple">业务消息</div>
				</el-col>
				<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
			</el-row>
		</div>
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'

export default {
  name: 'Home',
  
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
   background: #E6EFF7;
   border:1px solid #ddd
  }
  .bg-purple-light {
    border:1px solid #ddd
  }
  .grid-content {
    border-radius: 4px;
    height: 45px;
	line-height:45px;
	text-align:left;
	text-indent:20px
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
