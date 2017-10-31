<template>
    <div>
		<div  class="detial" v-show="show.yewuzhaodai">
			<el-dialog title="业务招待费" :visible.sync="show.yewuzhaodai" @close="closed" >
			   <ul class="waterUl">
			      <li><img src="../../assets/dateA2.png">日期<el-date-picker v-model="value10" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm">
    </el-date-picker></li>
			   </ul>
			   <ul class="waterUl">
			      <li></li>
			      <li></li>				  
			   </ul>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.shineijiaotong">
			<el-dialog title="市内交通" :visible.sync="show.shineijiaotong" @close="closed" size="large">
			   市内交通
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.waibujiaotong">
			<el-dialog title="外埠交通费" :visible.sync="show.waibujiaotong" @close="closed" size="large">
			   外埠交通费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.zhusu">
			<el-dialog title="住宿费" :visible.sync="show.zhusu" @close="closed" size="large">
			   住宿费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.shouji">
			<el-dialog title="手机费" :visible.sync="show.shouji" @close="closed" size="large">
			   手机费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.jiaotongbutie">
			<el-dialog title="交通补贴" :visible.sync="show.shouji" @close="closed" size="large">
			   交通补贴
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.chuchaibutie">
			<el-dialog title="出差补贴费" :visible.sync="show.shouji" @close="closed" size="large">
			   出差补贴费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.tuanduijianshe">
			<el-dialog title="团队建设" :visible.sync="show.tuanduijianshe" @close="closed" size="large">
			   团队建设
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.waibulaowu">
			<el-dialog title="外部劳务" :visible.sync="show.waibulaowu" @close="closed" size="large">
			   外部劳务
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.gongzuocanbutie">
			<el-dialog title="工作餐补贴" :visible.sync="show.gongzuocanbutie" @close="closed" size="large">
			   工作餐补贴
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.bangongyongpin">
			<el-dialog title="办公用品费" :visible.sync="show.bangongyongpin" @close="closed" size="large">
			   办公用品费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.cheliangbaoxian">
			<el-dialog title="车辆保险费" :visible.sync="show.cheliangbaoxian" @close="closed" size="large">
			   车辆保险费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.cheliangshiyong">
			<el-dialog title="车辆使用费" :visible.sync="show.cheliangshiyong" @close="closed" size="large">
			   车辆使用费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.cheliangweixiu">
			<el-dialog title="车辆维修费" :visible.sync="show.cheliangweixiu" @close="closed" size="large">
			   车辆维修费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.fangzu">
			<el-dialog title="房租费用" :visible.sync="show.fangzu" @close="closed" size="large">
			   房租费用
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.huiyi">
			<el-dialog title="会议费" :visible.sync="show.huiyi" @close="closed" size="large">
			   会议费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.lipin">
			<el-dialog title="礼品费" :visible.sync="show.lipin" @close="closed" size="large">
			   礼品费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.peixun">
			<el-dialog title="培训费" :visible.sync="show.peixun" @close="closed" size="large">
			   培训费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.qichezulin">
			<el-dialog title="汽车租赁费" :visible.sync="show.qichezulin" @close="closed" size="large">
			   汽车租赁费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.sichegongyongyou">
			<el-dialog title="私车公用油费" :visible.sync="show.sichegongyongyou" @close="closed" size="large">
			   私车公用油费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.tijian">
			<el-dialog title="体检费" :visible.sync="show.tijian" @close="closed" size="large">
			   体检费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.youkachongzhi">
			<el-dialog title="油卡充值费" :visible.sync="show.youkachongzhi" @close="closed" size="large">
			   油卡充值费
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.qita">
			<el-dialog title="其他费用" :visible.sync="show.qita" @close="closed" size="large">
			   其他费用
			</el-dialog>
		</div>
	</div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
	name: 'detial',
	data () {
		return {
		  dialogVisible:false,
		  id:0,
		  show:{
			  yewuzhaodai:false,
			  shineijiaotong:false,
			  waibujiaotong:false,
			  zhusu:false,
			  shouji:false,
			  jiaotongbutie:false,
			  chuchaibutie:false,
			  tuanduijianshe:false,
			  waibulaowu:false,
			  gongzuocanbutie:false,
			  bangongyongpin:false,
			  cheliangbaoxian:false,
			  cheliangshiyong:false,
			  cheliangweixiu:false,
			  fangzu:false,
			  huiyi:false,
			  lipin:false,
			  peixun:false,
			  qichezulin:false,
			  sichegongyongyou:false,
			  tijian:false,
			  youkachongzhi:false,
			  qita:false

		  },
		  value10:'',
		  detialData:{},
		  userInfo:{}
		}
	},
	computed:{
		isShowBill(){
			 return this.$store.getters.water.item.tempCode;
		},
		billId(){
			 return this.$store.getters.water.id;
		}
	},

    methods: {
		closed:function(){
			 this.$store.commit('waterInfo',{item:{},waterShow:false,id:0});
		},
	    getDetial(){
			console.log('查询开支流水详情')
		   /* var _this=this;
			util.get('bill/new/newGetBusinessTrip',{uuId:_this.$store.getters.travelApplicationsDetial.id},function(res){
				util.getStepStatusText(res.content[0].appover);
				_this.detialData = res.content[0];
				_this.userInfo = res.content[0].user
			})*/
		},
		handleClick(tab, event) {
			console.log(tab, event);
		}
		
	},
	watch:{
		isShowBill(val){
			switch(val){
				case 1:
				     this.show.shineijiaotong=true;
					 break;
				case 2:	 
				    this.show.waibujiaotong=true;
					break;
				case 3:	 
				    this.show.zhusu=true;
					break;
				case 4:	 
				    this.show.shouji=true;
					break;
				case 5:	 
				    this.show.yewuzhaodai=true;
					break;
				case 6:	 
				    this.show.jiaotongbutie=true;
					break;
				case 7:	 
				    this.show.chuchaibutie=true;
					break;
				case 8:	 
				    this.show.tuanduijianshe=true;
					break;
				case 9:	 
				    this.show.waibulaowu=true;
					break;
				case 10:	 
				    this.show.gongzuocanbutie=true;
					break;
				case 11:	 
				    this.show.bangongyongpin=true;
					break;
				case 12:	 
				    this.show.cheliangbaoxian=true;
					break;
				case 13:	 
				    this.show.cheliangshiyong=true;
					break;
				case 14:	 
				    this.show.cheliangweixiu=true;
					break;
				case 15:	 
				    this.show.fangzu=true;
					break;
				case 16:	 
				    this.show.huiyi=true;
					break;
				case 17:	 
				    this.show.lipin=true;
					break;
				case 18:	 
				    this.show.peixun=true;
					break;
				case 19:	 
				    this.show.qichezulin=true;
					break;
				case 20:	 
				    this.show.sichegongyongyou=true;
					break;
				case 21:	 
				    this.show.tijian=true;
					break;
				case 22:	 
				    this.show.youkachongzhi=true;
					break;
				case 23:	 
				    this.show.qita=true;
					break;
				
			}
		},
		billId(val){
			this.id=val;
			if(id != 0){
				this.getDetial();
			}
		}
	},
	filters: {
		getStatus(status){
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
		},
		
	}
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detial{
	text-align:left
}
.waterUl{
  border:1px solid #ddd
}
.waterUl li{
	border-bottom:1px dashed #ddd;
	height:44px;
	line-height:44px
}
</style>



