<template>
    <div>
		<div  class="detial" v-show="show.yewuzhaodai">
			<el-dialog title="业务招待费" :visible.sync="show.yewuzhaodai" @close="closed" >
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/dateA2.png">
						<span>日期</span>
						<el-date-picker class="inputs" v-model="beDate" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/AllPeo.png">
						<span>总人数<b class="error">*</b></span>
						<el-input  class="inputs"  type="number"  v-model="bePersons" placeholder="请输入总人数"></el-input>
				    </li>
			        <li>
						<img src="../../assets/whohave2.png">
						<span>参加人员</span>
						<el-input  class="inputs" v-model="beJoinPersons" ></el-input>
				    </li>	
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>业务招待费标准</span>
						<el-input  class="inputs" v-model="standardUnit" ></el-input>
				    </li>				  
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/Allmoney.png">
						<span>总金额<b class="error">*</b></span>
						<el-input  class="inputs" type="number" v-model="amount" @blur="ifExceedStandard" placeholder="请输入总金额"></el-input>
						<el-select class="inputs-small" v-model="currency" placeholder="请选择" @change="currencySelect($event)">
							<el-option v-for="item in currencyList" :key="item.id" :label="item.code" :value="item.id"></el-option>
						</el-select>
						 <el-alert v-if="ifBeyondStandard" title="输入的金额已经超出您的标准"  type="warning" show-icon :closable="closable"></el-alert>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li class="clears">
						<img src="../../assets/enclosure.png">
						<span>附件</span>
						<el-upload
							class="upload-demo updates"
							action="https://feikongbaotest.oss-cn-shanghai.aliyuncs.com/"
							:before-upload="initUpload"
							:headers="uploadInfo.uploadHeaders"
							:data="uploadInfo.uploadData"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:file-list="fileList2"
							list-type="picture">
							<el-button type="text">添加附件</el-button>
						</el-upload>
				    </li>
			        <li>
						<img src="../../assets/remarks.png">
						<span>备注</span>
						<el-input  class="inputs"  type="textarea" :rows="4" placeholder="请输入备注内容(此处可以输入200字)" :maxlength="maxlength" v-model="remark" ></el-input>
				    </li>	
				</ul>
				<div style="float:right;margin-bottom:20px">
				    <el-button type="primary" @click="saveYewuzhaodai(2)">报销</el-button>
					<el-button type="primary" @click="saveYewuzhaodai(1)">保存再记</el-button>
					<el-button type="primary" @click="saveYewuzhaodai(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.shineijiaotong">
			<el-dialog title="市内交通" :visible.sync="show.shineijiaotong" @close="closed">
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime2.png">
						<span>开始时间</span>
						<el-date-picker class="inputs" v-model="startDate" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>结束时间</span>
						<el-date-picker class="inputs" v-model="abortDate" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/start2.png">
						<span>起点</span>
						<el-input  class="inputs"   v-model="tpStartAddressId" placeholder="请输入起点"></el-input>
				    </li>
			        <li>
						<img src="../../assets/end-place2.png">
						<span>终点</span>
						<el-input  class="inputs" v-model="tpDestinationAddressId" placeholder="请输入终点"></el-input>
				    </li>	
					<li>
						<img src="../../assets/carorother.png">
						<span>交通工具<b class="error">*</b></span>
						<el-select class="inputs" v-model="tpTransportType" placeholder="请选择">
							<el-option v-for="item in travelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
				    </li>		
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>交通费标准</span>
						<el-input  class="inputs" v-model="standardUnit" ></el-input>
				    </li>				  
			   </ul>
			     <ul class="waterUl">
			        <li>
						<img src="../../assets/Allmoney.png">
						<span>总金额<b class="error">*</b></span>
						<el-input  class="inputs" type="number" v-model="amount" @blur="ifExceedStandard" placeholder="请输入总金额"></el-input>
						<el-select class="inputs-small" v-model="currency" placeholder="请选择" @change="currencySelect($event)">
							<el-option v-for="item in currencyList" :key="item.id" :label="item.code" :value="item.id"></el-option>
						</el-select>
						 <el-alert v-if="ifBeyondStandard" title="输入的金额已经超出您的标准"  type="warning" show-icon :closable="closable"></el-alert>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li class="clears">
						<img src="../../assets/enclosure.png">
						<span>附件</span>
						<el-upload
							class="upload-demo updates"
							action="https://feikongbaotest.oss-cn-shanghai.aliyuncs.com/"
							:before-upload="initUpload"
							:headers="uploadInfo.uploadHeaders"
							:data="uploadInfo.uploadData"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:file-list="fileList2"
							list-type="picture">
							<el-button type="text">添加附件</el-button>
						</el-upload>
				    </li>
			        <li>
						<img src="../../assets/remarks.png">
						<span>备注</span>
						<el-input  class="inputs"  type="textarea" :rows="4" placeholder="请输入备注内容(此处可以输入200字)" :maxlength="maxlength" v-model="remark" ></el-input>
				    </li>	
				</ul>
				<div style="float:right;margin-bottom:20px">
				    <el-button type="primary" @click="saveShineiAndWaibujiaotong(2)">报销</el-button>
					<el-button type="primary" @click="saveShineiAndWaibujiaotong(1)">保存再记</el-button>
					<el-button type="primary" @click="saveShineiAndWaibujiaotong(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.waibujiaotong">
			<el-dialog title="外埠交通费" :visible.sync="show.waibujiaotong" @close="closed">
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime2.png">
						<span>开始时间</span>
						<el-date-picker class="inputs" v-model="startDate" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>结束时间</span>
						<el-date-picker class="inputs" v-model="abortDate" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/start2.png">
						<span>起点</span>
						<el-input  class="inputs"   v-model="tpStartAddressId" placeholder="请输入起点"></el-input>
				    </li>
			        <li>
						<img src="../../assets/end-place2.png">
						<span>终点</span>
						<el-input  class="inputs" v-model="tpDestinationAddressId" placeholder="请输入终点"></el-input>
				    </li>	
					<li>
						<img src="../../assets/carorother.png">
						<span>交通工具<b class="error">*</b></span>
						<el-select class="inputs" v-model="tpTransportType" placeholder="请选择">
							<el-option v-for="item in travelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
				    </li>		
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>外埠交通费标准</span>
						<el-input  class="inputs" v-model="standardUnit" ></el-input>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/Allmoney.png">
						<span>总金额<b class="error">*</b></span>
						<el-input  class="inputs" type="number" v-model="amount" @blur="ifExceedStandard" placeholder="请输入总金额"></el-input>
						<el-select class="inputs-small" v-model="currency" placeholder="请选择" @change="currencySelect($event)">
							<el-option v-for="item in currencyList" :key="item.id" :label="item.code" :value="item.id"></el-option>
						</el-select>
						 <el-alert v-if="ifBeyondStandard" title="输入的金额已经超出您的标准"  type="warning" show-icon :closable="closable"></el-alert>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li class="clears">
						<img src="../../assets/enclosure.png">
						<span>附件</span>
						<el-upload
							class="upload-demo updates"
							action="https://feikongbaotest.oss-cn-shanghai.aliyuncs.com/"
							:before-upload="initUpload"
							:headers="uploadInfo.uploadHeaders"
							:data="uploadInfo.uploadData"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:file-list="fileList2"
							list-type="picture">
							<el-button type="text">添加附件</el-button>
						</el-upload>
				    </li>
			        <li>
						<img src="../../assets/remarks.png">
						<span>备注</span>
						<el-input  class="inputs"  type="textarea" :rows="4" placeholder="请输入备注内容(此处可以输入200字)" :maxlength="maxlength" v-model="remark" ></el-input>
				    </li>	
				</ul>
				<div style="float:right;margin-bottom:20px">
				    <el-button type="primary" @click="saveShineiAndWaibujiaotong(2)">报销</el-button>
					<el-button type="primary" @click="saveShineiAndWaibujiaotong(1)">保存再记</el-button>
					<el-button type="primary" @click="saveShineiAndWaibujiaotong(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.zhusu">
			<el-dialog title="住宿费" :visible.sync="show.zhusu" @close="closed">
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/buiCity.png">
						<span>出差城市<b class="error">*</b></span>
						<el-select v-model="htBusinessAddressCode" filterable remote @change="visibles" :remote-method="remoteMethod"
						:loading="loading" placeholder="请选择出差城市" class="inputs">
							<el-option-group key="0" label="热门城市">
							<el-option
								v-for="items in cityListSearch"
								:key="items.code"
								:label="items.name"
								:value="items.code">
							</el-option>
							</el-option-group>
						</el-select>
				    </li>
			        <li>
						<img src="../../assets/hotel-name2.png">
						<span>酒店名称</span>
						<el-input  class="inputs" v-model="htHotelName" ></el-input>
				    </li>	
				</ul>
				 <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime.png">
						<span>入住时间<b class="error">*</b></span>
						<el-date-picker class="inputs" v-model="startDate" type="datetime" placeholder="入住时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime.png">
						<span>退房时间<b class="error">*</b></span>
						<el-date-picker class="inputs" v-model="abortDate" type="datetime" placeholder="退房时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/comenyPeo2.png">
						<span>是否是公司员工<b class="error">*</b></span>
						<el-select class="inputs" v-model="htEmployee" placeholder="请选择">
							<el-option v-for="item in htEmployeeList" :key="item.val" :label="item.name" :value="item.val"></el-option>
						</el-select>
				    </li>
			        <li>
						<img src="../../assets/dayNum.png">
						<span>住宿天数<b class="error">*</b></span>
						<el-input  class="inputs" type="number" v-model="htDays" placeholder="请输入住宿天数"></el-input>
				    </li>	
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>住宿费标准</span>
						<el-input  class="inputs" v-model="standardUnit" ></el-input>
				    </li>				  
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/Allmoney.png">
						<span>总金额<b class="error">*</b></span>
						<el-input  class="inputs" type="number" v-model="amount" @blur="ifExceedStandard" placeholder="请输入总金额"></el-input>
						<el-select class="inputs-small" v-model="currency" placeholder="请选择" @change="currencySelect($event)">
							<el-option v-for="item in currencyList" :key="item.id" :label="item.code" :value="item.id"></el-option>
						</el-select>
						 <el-alert v-if="ifBeyondStandard" title="输入的金额已经超出您的标准"  type="warning" show-icon :closable="closable"></el-alert>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li class="clears">
						<img src="../../assets/enclosure.png">
						<span>附件</span>
						<el-upload
							class="upload-demo updates"
							action="https://feikongbaotest.oss-cn-shanghai.aliyuncs.com/"
							:before-upload="initUpload"
							:headers="uploadInfo.uploadHeaders"
							:data="uploadInfo.uploadData"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:file-list="fileList2"
							list-type="picture">
							<el-button type="text">添加附件</el-button>
						</el-upload>
				    </li>
			        <li>
						<img src="../../assets/remarks.png">
						<span>备注</span>
						<el-input  class="inputs"  type="textarea" :rows="4" placeholder="请输入备注内容(此处可以输入200字)" :maxlength="maxlength" v-model="remark" ></el-input>
				    </li>	
				</ul>
				<div style="float:right;margin-bottom:20px">
				    <el-button type="primary" @click="savezhusu(2)">报销</el-button>
					<el-button type="primary" @click="savezhusu(1)">保存再记</el-button>
					<el-button type="primary" @click="savezhusu(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.shouji">
			<el-dialog title="手机费" :visible.sync="show.shouji" @close="closed">
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime.png">
						<span>起始日期<b class="error">*</b></span>
						<el-date-picker class="inputs" v-model="startDate" type="date" placeholder="起始日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime.png">
						<span>截止日期<b class="error">*</b></span>
						<el-date-picker class="inputs" v-model="abortDate" type="date" placeholder="截止日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
			   </ul>
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/phoneNum.png">
						<span>手机号码<b class="error">*</b></span>
						<el-input  class="inputs"  type="number" v-model="mbMobile" placeholder="请输入手机号码"></el-input>
				    </li>
			        <li>
						<img src="../../assets/whoHave.png">
						<span>持有人<b class="error">*</b></span>
						<el-input  class="inputs" v-model="mbOwner" placeholder="请输入持有人"></el-input>
				    </li>	
					 <li>
						<img src="../../assets/dayNum.png">
						<span>报销月数<b class="error">*</b></span>
						<el-input  class="inputs"  type="number" v-model="mbMonths" placeholder="请输入报销月数"></el-input>
				    </li>		
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>手机费标准</span>
						<el-input  class="inputs" v-model="standardUnit" ></el-input>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/Allmoney.png">
						<span>总金额<b class="error">*</b></span>
						<el-input  class="inputs" type="number" v-model="amount" @blur="ifExceedStandard" placeholder="请输入总金额"></el-input>
						<el-select class="inputs-small" v-model="currency" placeholder="请选择" @change="currencySelect($event)">
							<el-option v-for="item in currencyList" :key="item.id" :label="item.code" :value="item.id"></el-option>
						</el-select>
						 <el-alert v-if="ifBeyondStandard" title="输入的金额已经超出您的标准"  type="warning" show-icon :closable="closable"></el-alert>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li class="clears">
						<img src="../../assets/enclosure.png">
						<span>附件</span>
						<el-upload
							class="upload-demo updates"
							action="https://feikongbaotest.oss-cn-shanghai.aliyuncs.com/"
							:before-upload="initUpload"
							:headers="uploadInfo.uploadHeaders"
							:data="uploadInfo.uploadData"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:file-list="fileList2"
							list-type="picture">
							<el-button type="text">添加附件</el-button>
						</el-upload>
				    </li>
			        <li>
						<img src="../../assets/remarks.png">
						<span>备注</span>
						<el-input  class="inputs"  type="textarea" :rows="4" placeholder="请输入备注内容(此处可以输入200字)" :maxlength="maxlength" v-model="remark" ></el-input>
				    </li>	
				</ul>
				<div style="float:right;margin-bottom:20px">
				    <el-button type="primary" @click="shouji(2)">报销</el-button>
					<el-button type="primary" @click="shouji(1)">保存再记</el-button>
					<el-button type="primary" @click="shouji(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.jiaotongbutie">
			<el-dialog title="交通补贴" :visible.sync="show.jiaotongbutie" @close="closed">
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime.png">
						<span>起始日期<b class="error">*</b></span>
						<el-date-picker class="inputs" v-model="startDate" type="date" placeholder="起始日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime.png">
						<span>截止日期<b class="error">*</b></span>
						<el-date-picker class="inputs" v-model="abortDate" type="date" placeholder="截止日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
			   </ul>
			    <ul class="waterUl">
					 <li>
						<img src="../../assets/dayNum.png">
						<span>补贴月数<b class="error">*</b></span>
						<el-input  class="inputs"  type="number" v-model="mbMonths" placeholder="请输入报销月数"></el-input>
				    </li>		
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>交通补贴标准</span>
						<el-input  class="inputs" v-model="standardUnit" ></el-input>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/Allmoney.png">
						<span>总金额<b class="error">*</b></span>
						<el-input  class="inputs" type="number" v-model="amount" @blur="ifExceedStandard" placeholder="请输入总金额"></el-input>
						<el-select class="inputs-small" v-model="currency" placeholder="请选择" @change="currencySelect($event)">
							<el-option v-for="item in currencyList" :key="item.id" :label="item.code" :value="item.id"></el-option>
						</el-select>
						 <el-alert v-if="ifBeyondStandard" title="输入的金额已经超出您的标准"  type="warning" show-icon :closable="closable"></el-alert>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li class="clears">
						<img src="../../assets/enclosure.png">
						<span>附件</span>
						<el-upload
							class="upload-demo updates"
							action="https://feikongbaotest.oss-cn-shanghai.aliyuncs.com/"
							:before-upload="initUpload"
							:headers="uploadInfo.uploadHeaders"
							:data="uploadInfo.uploadData"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:file-list="fileList2"
							list-type="picture">
							<el-button type="text">添加附件</el-button>
						</el-upload>
				    </li>
			        <li>
						<img src="../../assets/remarks.png">
						<span>备注</span>
						<el-input  class="inputs"  type="textarea" :rows="4" placeholder="请输入备注内容(此处可以输入200字)" :maxlength="maxlength" v-model="remark" ></el-input>
				    </li>	
				</ul>
				<div style="float:right;margin-bottom:20px">
				    <el-button type="primary" @click="jiaotongbutie(2)">报销</el-button>
					<el-button type="primary" @click="jiaotongbutie(1)">保存再记</el-button>
					<el-button type="primary" @click="jiaotongbutie(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.chuchaibutie">
			<el-dialog title="出差补贴费" :visible.sync="show.chuchaibutie" @close="closed" size="large">
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
		<el-dialog title="请选择报销类型" :visible.sync="ifShowReimburse"  size="tiny">
			<div class="reimburse" style="border:1px solid #64bfab;color:#64bfab;"><img src="../../assets/chio-rav-icon.png"><p>出差费用报销单</p></div>
			<div class="reimburse" style="border:1px solid #5f99ed;color:#5f99ed"><img src="../../assets/chio-day-icon.png"><p>日常费用报销单</p></div>			
		</el-dialog>
	</div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
import co from 'co'
import OSS from 'ali-oss'

export default {
	name: 'detial',
	data () {
		return {
			dialogVisible:false,
			ifShowReimburse:false,
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
			maxlength:200,
			uploadInfo:{
				client:null,
                uploadHeaders:{
				   'x-yodoo': 'yodoo'
				},
				fileInfo:{},//上传文件之前获取 的文件信息
				uploadData:{},
				authorizationInfo:{} , //授权信息
			},
			closable:false,
		//	fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
			fileList2:[],
			ifStandard:false,//是否有标准
			beDate:'',//日期
			bePersons:'',//总人数
			beJoinPersons:'',//参加人员
			amount:'',//金额
			costProjectName:'',//费用项目名称
			currency:3,//币种id
			currencyCode:'CNY',//币种code
			dealDate:"",
			files:[],//附件
			ifBeyondStandard:false,//是否超出标准
			remark:'',//备注
			supplierId:0,
			tempType:0,//模板id
			standardAmount:null,//费用标准金额
			standardUnit:"无",//费用标准单位
			currencyList:[],//币种列表
			travelList:[],//交通工具列表
			cityList:[],//城市列表
			cityListSearch:[],//检索出来的城市列表
			loading:false,
			htEmployeeList:[
				{name:'是',val:true},
				{name:'否',val:false}
			],
 
			abortDate:'',//结束时间
			startDate:'',//开始时间
			tpStartAddressId:'',//起点
			tpDestinationAddressId:'',//终点
			tpTransportType:null,//交通工具
            
			htEmployee:null,//是否是公司员工
			htBusinessAddressCode:null, //出差城市信息
			htDays:'',//入住天数
			htHotelName:'',//酒店名称

			mbMobile:util.userInfo.mobile,//手机号
			mbOwner:util.userInfo.nickname,//持有人
			mbMonths:''//报销月数

		}
	},
	computed:{
		isShowBill(){
			 return this.$store.getters.water.item.tempCode;
		},
		billId(){
			 return this.$store.getters.water.id;
		},
		getbookStandard(){
            return this.$store.getters.water.item
		}
	},

    methods: {
		closed:function(){
			 this.$store.commit('waterInfo',{item:{},waterShow:false,id:0});
		},
		init(){
            //默认执行
			var _this = this;
			util.get('book/currency',{},function(res){
				//获取币种列表
                _this.currencyList = res
			})
			util.get('book/findLocalTravel',{},function(res){
				//交通工具列表
				_this.travelList=res
			})
			util.get('book/findCityHot',{},function(res){
				//城市列表
				_this.cityList = res;
				_this.cityListSearch =res;
			})
		},
		standardChange(item){
            var _this=this;
			_this.costProjectName = item.tempName;
			_this.tempType =item.tempCode
			if(item.billStandards.length>0){
				for(let v of item.billStandards){
						if(v.currency == _this.currencyCode){
							_this.ifStandard=true;
							_this.standardAmount = v.amount;
							_this.standardUnit = v.currency + v.amount+item.unitName;
							return false;
						}else{
							_this.ifStandard=false;
							_this.standardAmount=null;
							_this.standardUnit = '无';
						}
				}
			}else{
				_this.ifStandard=false;
				_this.standardAmount=null;
				_this.standardUnit = '无';
			}
		},
		currencySelect(val){
            console.log(val)
			var _this = this;
		    let list = _this.currencyList
			list.find(function(x){
				if(x.id==val){
					_this.currencyCode = x.code
				}
			})
			var data = this.$store.getters.water.item
			this.standardChange(data)
			
		},
		initUpload(file){
			var _this = this;
			_this.uploadInfo.fileInfo = file
			console.log(file)
			//获取授权信息
			var pdata={
				bizCode:"pay",
				fileName:_this.uploadInfo.fileInfo.name,
                orgId:util.userInfo.orgId,
				size:_this.uploadInfo.fileInfo.size,
                userId:util.userInfo.id
			}
			util.post('oss/policy',pdata,function(res){
				console.log(res)
				_this.uploadInfo.authorizationInfo=res.data;
                var client = new OSS({
					region: 'oss-cn-shanghai',
					accessKeyId: _this.uploadInfo.authorizationInfo.accessKeyId,
					accessKeySecret: _this.uploadInfo.authorizationInfo.accessKeySecret
				});
				_this.uploadInfo.client=client
				//return client;
				_this.uploadFile()
			})
            
		},
		uploadFile(){
			var _this=this;
           co(function* () {
				_this.uploadInfo.client.useBucket('my-bucket');//Your bucket name
				var result = yield _this.uploadInfo.client.put('a.jpg', 'local file');//'object-key', 'local file'
				console.log(result);
			}).catch(function (err) {
			    console.log(err);
			});
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
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
		},
		ifExceedStandard(val){
           let values = val.target._value;
		   if(this.standardAmount != null  && values > this.standardAmount){
			   this.ifBeyondStandard = true;
		   }else{
			   this.ifBeyondStandard = false;
		   }
		},
		visibles(v){
		    this.cityListSearch =this.cityList;
		},
		remoteMethod(query){ 
			var re = /[^\u4e00-\u9fa5]/;  
			var option={};
            if(re.test(query)){
				option={letter:query}
			} else{
				option={chineseCharacters:query}
			}
            if (query !== '') {
				var _this=this;
				_this.loading = true;
				util.get('book/findCity',option,function(res){
					_this.loading = false;
                    _this.cityListSearch = res;
				})
			} else {
				this.loading = false;
                this.cityListSearch = this.cityList;
			}
		},
		saveYewuzhaodai(type){
			//保存业务招待费
			var _this=this;
			if(_this.bePersons == ''){
				this.$message({message: '请输入总人数',type: 'error'});
				return false
			}
			if(Number(_this.bePersons)<0){
                this.$message({message: '总人数必须大于0',type: 'error'});
				return false
			}
			if(_this.amount == ''){
				this.$message({message: '请输入总金额',type: 'error'});
				return false
			}
			if(Number(_this.amount)<0){
                this.$message({message: '总金额必须大于0',type: 'error'});
				return false
			}
			var options={
				amount:_this.amount,
				beDate:_this.beDate,
				beJoinPersons:_this.beJoinPersons,
				bePersons:_this.bePersons,
				costProjectName:_this.costProjectName,
				currency:_this.currency,
				currencyCode:_this.currencyCode,
				dealDate:_this.dealDate,
				files:_this.files,
				ifBeyondStandard:_this.ifBeyondStandard,
				remark:_this.remark,
				standardAmount:_this.standardAmount,
				standardUnit:_this.standardUnit,
				supplierId:_this.supplierId,
				tempType:_this.tempType
			}
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.yewuzhaodai=false;
				}else if(type == 2){//报销
				     _this.closed();
                     _this.show.yewuzhaodai=false;
					 _this.ifShowReimburse=true;
				}
				
			})
		},
		saveShineiAndWaibujiaotong(type){
			//保存市内交通费和外埠交通费
			var _this=this;
			if(_this.startDate != '' && _this.abortDate != '' && _this.startDate>=_this.abortDate){
				this.$message({message: '结束时间必须大于开始时间',type: 'error'});
				return false
			}
			if(_this.tpTransportType == null){
                this.$message({message: '请选择交通工具',type: 'error'});
				return false
			}
			if(_this.amount == ''){
				this.$message({message: '请输入总金额',type: 'error'});
				return false
			}
			if(Number(_this.amount)<0){
                this.$message({message: '总金额必须大于0',type: 'error'});
				return false
			}
			var options={
				abortDate:_this.abortDate,
				amount:_this.amount,
				costProjectName:_this.costProjectName,
				currency:_this.currency,
				currencyCode:_this.currencyCode,
				dealDate:_this.dealDate,
				files:_this.files,
				ifBeyondStandard:_this.ifBeyondStandard,
				remark:_this.remark,
				standardAmount:_this.standardAmount,
				standardUnit:_this.standardUnit,
				startDate:_this.startDate,
				supplierId:_this.supplierId,
				tempType:_this.tempType,
				tpDestinationAddressId:_this.tpDestinationAddressId,
				tpStartAddressId:_this.tpStartAddressId,
				tpTransportType:_this.tpTransportType
			}
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.shineijiaotong=false;
                      _this.show.waibujiaotong=false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.shineijiaotong=false;
					_this.show.waibujiaotong=false;
					 _this.ifShowReimburse=true;
				}
				
			})
		},
		savezhusu(type){
            //保存住宿费
			var _this=this;
			if(_this.htBusinessAddressCode == null){
				this.$message({message: '请选择出差城市',type: 'error'});
				return false
			}
			if(_this.startDate == ''){
				this.$message({message: '请选择入住时间',type: 'error'});
				return false
			}
			if(_this.abortDate == ''){
				this.$message({message: '请选择退房时间',type: 'error'});
				return false
			}
			if(_this.startDate>=_this.abortDate){
				this.$message({message: '退房时间必须大于入住时间',type: 'error'});
				return false
			}
			if(_this.htEmployee == null){
                this.$message({message: '请选择是否是公司员工',type: 'error'});
				return false
			}
			if(_this.htDays == ''){
				 this.$message({message: '请输入入住天数',type: 'error'});
				 return false
			}
			var days = _this.abortDate- _this.startDate;
			if(parseInt(days / (1000 * 60 * 60 * 24))<_this.htDays){
                 this.$message({message: '住宿天数超过时间范围，请核对后输入',type: 'error'});
				 return false
			}
			if(_this.amount == ''){
				this.$message({message: '请输入总金额',type: 'error'});
				return false
			}
			if(Number(_this.amount)<0){
                this.$message({message: '总金额必须大于0',type: 'error'});
				return false
			}
			var options={
				amount:_this.amount,
				costProjectName:_this.costProjectName,
				currency:_this.currency,
				currencyCode:_this.currencyCode,
				dealDate:_this.dealDate,
				files:_this.files,
				htBusinessAddressCode:_this.htBusinessAddressCode,
				htCheckInTime:_this.startDate,
				htCheckOutTime:_this.abortDate,
				htDays:_this.htDays,
				htEmployee:_this.htEmployee,
				htHotelName:_this.htHotelName,
				ifBeyondStandard:_this.ifBeyondStandard,
				remark:_this.remark,
				standardAmount:_this.standardAmount,
				standardUnit:_this.standardUnit,
				supplierId:_this.supplierId,
				tempType:_this.tempType
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.zhusu=false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.zhusu =false;
					 _this.ifShowReimburse=true;
				}
				
			})
		},
		shouji(type){
              //保存手机费
			var _this=this;
			if(_this.startDate == ''){
				this.$message({message: '请选择起始日期',type: 'error'});
				return false
			}
			if(_this.abortDate == ''){
				this.$message({message: '请选择截止日期',type: 'error'});
				return false
			}
			if(_this.startDate>=_this.abortDate){
				this.$message({message: '截止日期必须大于起始日期',type: 'error'});
				return false
			}
			if(_this.mbMobile == ''){
                this.$message({message: '请输入手机号',type: 'error'});
				return false
			}
			if(!util.testPhone(_this.mbMobile)){
                this.$message({message: '请输入正确的手机号',type: 'error'});
				return false
			}
			if(util.trim(_this.mbOwner)== ''){
                this.$message({message: '请输入持有人',type: 'error'});
				return false
			}
			if(_this.mbMonths == ''){
				 this.$message({message: '请输入报销月数',type: 'error'});
				 return false
			}
			var days = _this.abortDate- _this.startDate;
			if(Math.ceil(days / (1000 * 60 * 60 * 24*30)) < _this.mbMonths){
                 this.$message({message: '报销月数超过时间范围，请核对后输入',type: 'error'});
				 return false
			}
			if(_this.amount == ''){
				this.$message({message: '请输入总金额',type: 'error'});
				return false
			}
			if(Number(_this.amount)<0){
                this.$message({message: '总金额必须大于0',type: 'error'});
				return false
			}
			var options={
				abortDate:_this.abortDate,
				amount:_this.amount,
				costProjectName:_this.costProjectName,
				currency:_this.currency,
				currencyCode:_this.currencyCode,
				dealDate:_this.dealDate,
				files:_this.files,
			    ifBeyondStandard:_this.ifBeyondStandard,
				mbMobile:_this.mbMobile,
				mbMonths:_this.mbMonths,
	            mbOwner:_this.mbOwner,
				remark:_this.remark,
				standardAmount:_this.standardAmount,
				standardUnit:_this.standardUnit,
				supplierId:_this.supplierId,
				startDate:_this.startDate,
				tempType:_this.tempType
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.shouji=false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.shouji =false;
					 _this.ifShowReimburse=true;
				}
				
			})
		},
		jiaotongbutie(type){
             //保存交通补贴
			var _this=this;
			if(_this.startDate == ''){
				this.$message({message: '请选择起始日期',type: 'error'});
				return false
			}
			if(_this.abortDate == ''){
				this.$message({message: '请选择截止日期',type: 'error'});
				return false
			}
			if(_this.startDate>=_this.abortDate){
				this.$message({message: '截止日期必须大于起始日期',type: 'error'});
				return false
			}
		
			if(_this.mbMonths == ''){
				 this.$message({message: '请输入补贴月数',type: 'error'});
				 return false
			}
			var days = _this.abortDate- _this.startDate;
			if(Math.ceil(days / (1000 * 60 * 60 * 24*30)) < _this.mbMonths){
                 this.$message({message: '补贴月数超过时间范围，请核对后输入',type: 'error'});
				 return false
			}
			if(_this.amount == ''){
				this.$message({message: '请输入总金额',type: 'error'});
				return false
			}
			if(Number(_this.amount)<0){
                this.$message({message: '总金额必须大于0',type: 'error'});
				return false
			}
			var options={
				abortDate:_this.abortDate,
				amount:_this.amount,
				costProjectName:_this.costProjectName,
				currency:_this.currency,
				currencyCode:_this.currencyCode,
				dealDate:_this.dealDate,
				files:_this.files,
			    ifBeyondStandard:_this.ifBeyondStandard,
				tsMonths:_this.mbMonths,
				remark:_this.remark,
				standardAmount:_this.standardAmount,
				standardUnit:_this.standardUnit,
				supplierId:_this.supplierId,
				startDate:_this.startDate,
				tempType:_this.tempType
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.jiaotongbutie=false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.jiaotongbutie =false;
					 _this.ifShowReimburse=true;
				}
				
			})
		},
		dataInit(){
			//数据初始化
			this.closable=false;
			this.ifStandard=false;
            this.beDate='';
			this.bePersons='';
			this.beJoinPersons='';
			this.amount='';
			this.costProjectName='';
			this.currency=3;
			this.currencyCode='CNY',
			this.dealDate="";
			this.files=[];
			this.ifBeyondStandard=false;
			this.remark='';
			this.supplierId=0;
			this.tempType=0;
			this.standardAmount=null;
			this.standardUnit="无";
			this.abortDate='';
			this.startDate='';
			this.tpStartAddressId='';
			this.tpDestinationAddressId='';
			this.tpTransportType=null;
			this.htEmployee=null;
			this.htBusinessAddressCode=null;
			this.htDays='';
			this.htHotelName='';
			this.mbMobile=util.userInfo.mobile;
			this.mbOwner=util.userInfo.nickname;
			this.mbMonths='';
		}
		
	},
	created(){
        this.init()
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
		},
		getbookStandard(item){
			if(item.billStandards){
			     this.standardChange(item)
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
@import '../../assets/css/expenseWater.css';
.detial{
	text-align:left
}
.waterUl{
  border:1px solid #ddd
}
.waterUl li{
	border-bottom:1px dashed #ddd;
	min-height:44px;
	line-height:44px;
	padding-left:30px
}
.waterUl li img{
	 vertical-align:middle;
	 margin:0 16px
}
.waterUl li span{
	display:inline-block;
	width:20%;
}
.waterUl li .inputs{
	margin:0 16px;
	width:40%
}
.waterUl li .inputs-small{
	width:16%
}
.error{
	color:red
}
.reimburse{
   display:inline-block;
   width:112px;
   height:80px;
   padding-top:12px;
   border-radius:6px;
   margin-right:18px;
   cursor:pointer
}
</style>



