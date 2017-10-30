<template>
  <div class="billList">
	    <div class="rightBox">
		    <div style="padding:20px; text-align:left;">
				开支随手记内容
        <!---->
        <el-tree :data="data" :props="defaultProps" default-expand-all="true" @node-click="handleNodeClick"></el-tree>


        <!---->
			</div>
		</div>
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
  name: 'BillList',
  data () {
    return {
	     data: [{
          label: '2017-10-10一级 1',
          children: [{
            label: '2017-10-12 二级 1-1',
            children: [{
              label: '2017-10-13 三级 1-1-1'
            }]
          }]
        }, {
          label: '2017-10-14 一级 2',
          children: [{
            label: '2017-10-15 二级 2-1',
            children: [{
              label: '2017-10-16 三级 2-1-1'
            }]
          }, {
            label: '2017-10-17 二级 2-2',
            children: [{
              label: '2017-10-18 三级 2-2-1'
            }]
          }]
        }, {
          label: '2017-10-19 一级 3',
          children: [{
            label: '2017-10-20 二级 3-1',
            children: [{
              label: '2017-10-21 三级 3-1-1'
            }]
          }, {
            label: '2017-10-12 二级 3-2',
            children: [{
              label: '2017-10-23 三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      
    }
  },
  methods:{
    handleNodeClick(data) {
        console.log(data);
    }
  },
  created(){
     
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
  
</style>
