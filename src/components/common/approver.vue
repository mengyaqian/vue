<template>
		<div  class="approver" v-show="dialogVisible" >
			<el-dialog title="银行卡信息维护" :visible.sync="dialogVisible" @close="closed" size="tiny" >
				<ul class="ul1 clears">
					<li>
						<img src="http://7xp2os.com1.z0.glb.clouddn.com/201610131532037307348.png">
						<p class="delete"></p>
					</li>
				</ul>
				<el-input placeholder="搜索" icon="search" v-model="searchKey" @change="serachStart"> </el-input>
				<div class="div2">
					<div v-for="item in personList">
						<p class="p1">{{item.name}}（{{item.users.length}}）<el-checkbox @change="personChoose(item,1)" style="float:right" v-model="item.checked"></el-checkbox></p>
						<ul class="ul2">
							<li v-for="items in item.users">
								<el-checkbox v-model="items.checked" @change="personChoose(item,0)"></el-checkbox>
								<img :src="items.avatarSmall">
								<span>{{items.nickname}}</span>
							</li>
						</ul>
					</div>
				</div>
			</el-dialog>
		</div>
		    
	
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
	name: 'approver',
	props: {
	  value:Boolean
	},
	data () {
		return {
		  dialogVisible:this.value,
          searchKey:'',
		  personList:[],
		  search_list:[]
		  
		}
	},
    methods: {
		closed:function(){
			this.$emit('input',false)
		},
		serachStart(key){
				var _this=this;
				console.log( _this.personList)
				if (key != _this.searchKey && _this.personList.length > 0) {
					_this.searchKey = key;
					for(let items of _this.personList){
                       for(let item of items.users){
						   if(item.nickname.indexOf(key) != -1){
                                _this.search_list.push(item)
						   }
					   }
					}
				}
				console.log(_this.search_list)
		},
		getList(){
			var _this = this;
			util.post('web/actionChatUser',{ifAll:1},function(res){
			   for(let item of res.content){
					item.checked=false;
					for(let items of item.users){
                        items.checked=false;
					}
				}
               _this.personList = res.content
			},{format:true})
		},
		personChoose(pdata,type){ 
			//type 0 单选，1全选一个组
			var i=0;
			if(type == 1){
				for(let items of pdata.users){
					items.checked=pdata.checked;
				}
			}else{
				for(let items of pdata.users){
					if(items.checked){
						i++
					}
				}
				if(i == pdata.users.length){
					pdata.checked=true
				}else{
					pdata.checked=false
				}
			}
		}
	},
	watch:{
		value:function(val){
			this.dialogVisible=val;
			if(val){
              this.getList()
			}
			
		}
	},
	created(){
      
	},
	filters: {
		/*getStatus(status){
			var text='';
            switch(status){
				case 1:
				case 2:	    	
					text = '审核中';
					break;
				case 3:
					text = '审核通过';
					break;
				case 4:
					text = '被驳回';
					break;
				case 5:
					text = '待财务签收';
					break;
				case 7:
					text = '财务审核终止';
					break;
				case 6:
				case 8:
					text = '待财务结算';
					break;
				case 10:
					text = '财务结算终止';
					break;
				case 9:
				case 11:
					text = '待财务支付';
					break;
				case 12:
					text = '财务已支付';
					break;
				case 13:
					text = '财务已收款';
					break;
			}	
			return text;
		},
		gettogterName(arr,type){
			if(arr){
				var name=[];
                for(var value of arr){
					console.log(value);
					name.push(value.passengerName)
				}
				if(type == 1){
                   return name.join(',')
				}else{
					return arr.length
				}
				
			}
		}*/
		
	}
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.approver{
	text-align:left
}
.bankBox{
	width:80%;
	margin:20px auto
}
.ul1{
	margin-bottom:10px
}
.ul1 li{
	float:left;
	position:relative;
	width:32px;
	height:32px;
	margin-right:10px;
	border-radius:50%;
}
.ul1 li img{
	border-radius:50%;
	width:32px;
	height:32px;
}
.ul1 li .delete{
	position:absolute;
	top:2px;
	right:-3px;
	width:12px;
	height:12px;
	background:url(../../assets/delete.png)
}
.ul2{

}
.ul2 li{
	height:50px;
	line-height:50px;
	vertical-align:middle;
	margin-bottom:10px
}
.ul2 li img{
	width:50px;
	height:50px;
	border-radius:50%;
	vertical-align:middle;
	margin:0 8px
}
.p1{
	line-height:32px;
	background:#F2F2F2;
	padding-top:10px
}
.div2{
	max-height:500px;
	overflow-y:scroll
}
</style>



