<template>
  <div class="findSchedule">
      <div class="leftTwoNav">
           <el-menu mode="vertical" :default-active="active" class="el-menu-vertical-demo" @select="handleSelect">
              <el-menu-item index="my"><i class="el-icon-message"></i>我的日程</el-menu-item>
              <el-menu-item index="wait"><i class="el-icon-message"></i>待确认日程</el-menu-item>
              <el-menu-item index="colleague"><i class="el-icon-message"></i>同事的日程</el-menu-item>
          </el-menu>
      </div>
	    <div class="rightBox2">
		    <div style="padding:20px">
				    <div v-if="show1">
               <schedule></schedule>
            </div>
            <div v-if="show2">待确认日程</div>
            <div v-if="show3">同事的日程</div>
			  </div>
		</div>
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
import schedule from '@/components/common/schedule.vue'
export default {
  name: 'FindSchedule',
  components:{schedule},
  data () {
    return {
	      active:'my',
        show1:true,
        show2:false,
        show3:false
    }
  },
  methods:{
     handleSelect(v){
       this.show1=false;
       this.show2=false;
       this.show3=false;
       if(v == 'colleague'){
          this.show3=true
       }else if(v == 'wait'){
         this.show2=true
       }else{
         this.show1 = true
       }
     }
  },
  created(){
     
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  
</style>
