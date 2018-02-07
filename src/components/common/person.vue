<template>
		<div  class="approver" v-show="dialogVisible" >
			<el-dialog title="人员列表" :visible.sync="dialogVisible" @close="closed" size="tiny" >
				<ul class="ul1 clears" style="height:auto">
					<li v-for="item in personList">
					    <span v-for="items in item.users" v-if="items.checked">
							<img :src="items.avatarSmall">
							<p class="delete" @click="personChoose(items,0)"></p>
						</span>
					</li>
				</ul>
				<el-input placeholder="搜索" icon="search" v-model="searchKey" @change="serachStart"> </el-input>
				<div class="div2" v-show="!ifShowSearchResult">
					<div v-for="item in personList">
						<p class="p1">{{item.name}}（{{item.users.length}}）<el-checkbox @change="departChoose(item)" style="float:right" v-model="item.checked"></el-checkbox></p>
						<ul class="ul2">
							<li v-for="items in item.users">
								<el-checkbox v-model="items.checked" @change="personChoose(items)"></el-checkbox>
								<img :src="items.avatarSmall">
								<span>{{items.nickname}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="div2" v-show="ifShowSearchResult">
					<div>
						<ul class="ul2">
							<li v-for="items in search_list">
								<el-checkbox v-model="items.checked" @change="personChoose(items)"></el-checkbox>
								<img :src="items.avatarSmall">
								<span>{{items.nickname}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div style="width:60px;margin:16px auto"><el-button @click="sure" type="primary">确定</el-button></div>
			</el-dialog>
		</div>
		    
	
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
	name: 'approver',
	data () {
		return {
		  dialogVisible:false,
          searchKey:'',
		  personList:[],
		  search_list:[],
		  ifShowSearchResult:false
		  
		}
	},
	computed:{
       isshowPerson(){
		   return this.$store.getters.person.isShow;
	   }
	},
	watch:{
		isshowPerson(val){
			this.dialogVisible=val;
			if(val){
              this.getList()
			}
		}
	},
    methods: {
		closed:function(){
			this.$store.commit('showPerson',false)
			this.searchKey='';
			this.personList=[];
			this.search_list=[];
			this.ifShowSearchResult=false
		},
		serachStart(key){
				var _this=this;
				_this.search_list=[];
				if (_this.personList.length > 0 && key !='') {
					for(let items of _this.personList){
                       for(let item of items.users){
						   if(item.nickname.indexOf(key) != -1){
                                _this.search_list.push(item)
						   }
					   }
					}
		            _this.ifShowSearchResult=true;
				}else{
					_this.search_list=[];
					_this.ifShowSearchResult=false;
				}
		},
		getList(){
			var _this = this;
			let importList=_this.$store.getters.person.importList;
			var personId=[];
			for(let value of importList){
                personId.push(value.id)
			}
			util.post('chatgroups/chatUserInfo',{ifAll:1},function(res){
			   for(let item of res.data.data){
					item.checked=false;
					for(let items of item.users){
						if(personId.indexOf(items.id)>-1){
                             items.checked=true;
						}else{
                           items.checked=false;
						}
                        
					}
				}
               _this.personList = res.data.data
			   _this.ifAllChoose()
			})
		},
		departChoose(pdata){
			//选择一个部门的人
            for(let items of pdata.users){
				items.checked=pdata.checked;
			}
		},
		personChoose(pdata,type){ 
			if(type == 0){
				pdata.checked = false
			}
			this.ifAllChoose();
		},
		ifAllChoose(){
            for(let items of this.personList){
				var yesChecked=0;
				for(let item of items.users){
                    if(item.checked == true){
                       yesChecked++
					}
				}
				if(yesChecked == items.users.length){
					items.checked=true;
				}else{
					items.checked=false;
				}
			}
		},
		sure(){
			var data = [];
			for(let items of this.personList){
				for(let item of items.users){
                    if(item.checked == true){
						data.push(item);
					}
				}
			}
			this.$store.commit('getexportList',data)
			this.closed();
		}	
	},
	
	created(){
      
	},
	filters: {
		
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
	float:left
}
.ul1 li span{
   width:32px;
   height:32px;
   position:relative;
   display:inline-block;
   margin-right:10px;
   border-radius:50%;

}
.ul1 li span img{
	border-radius:50%;
	width:32px;
	height:32px;
}
.ul1 li span .delete{
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



