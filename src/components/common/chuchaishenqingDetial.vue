<template>
		<div  class="detial" v-show="dialogVisible">
			<el-dialog title="出差申请单" :visible.sync="dialogVisible" @close="closed" size="large">
				<p>aaaa</p>
			</el-dialog>
		</div>
		
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
	name: 'detial',
	props: {
	businessapply:String,
	value:Boolean
	},
	
	data () {
		return {
		  dialogVisible:this.value
		}
	},
    methods: {
	closed:function(){
		this.$emit('input',false)
	},
	    getDetial(){
		    var _this=this;
			if(this.businessapply){
			util.get('bill/new/newGetBusinessTrip',{uuId:_this.businessapply},function(res){
				console.log(res)
		
			})
			}
			
		}
	},
	watch:{
		value:function(val){
		console.log(val)
			this.dialogVisible=val;
		},
		businessapply:function(val){
		console.log(val);
			this.getDetial();
		}
	},
	
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>



