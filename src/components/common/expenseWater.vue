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
				<div style="float:right;margin-bottom:20px"  v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('yewuzhaodai')">删除</el-button>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('shineijiaotong')">删除</el-button>
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
							<el-option v-for="item in outTravellList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
				<div style="float:right;margin-bottom:20px"  v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('waibujiaotong')">删除</el-button>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('zhusu')">删除</el-button>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('shouji')">删除</el-button>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('jiaotongbutie')">删除</el-button>
					<el-button type="primary" @click="jiaotongbutie(2)">报销</el-button>
					<el-button type="primary" @click="jiaotongbutie(1)">保存再记</el-button>
					<el-button type="primary" @click="jiaotongbutie(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.chuchaibutie">
			<el-dialog title="出差补贴费" :visible.sync="show.chuchaibutie" @close="closed">
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime.png">
						<span>出发日期<b class="error">*</b></span>
						<el-date-picker class="inputs" v-model="startDate" type="date" placeholder="出发日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime.png">
						<span>返程日期<b class="error">*</b></span>
						<el-date-picker class="inputs" v-model="abortDate" type="date" placeholder="返程日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
			   </ul>
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
						<img src="../../assets/dayNum.png">
						<span>出差天数<b class="error">*</b></span>
						<el-input  class="inputs"  type="number" v-model="htDays" placeholder="请输入出差天数"></el-input>
				    </li>		
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>出差补贴标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('chuchaibutie')">删除</el-button>
					<el-button type="primary" @click="chuchaibutie(2)">报销</el-button>
					<el-button type="primary" @click="chuchaibutie(1)">保存再记</el-button>
					<el-button type="primary" @click="chuchaibutie(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.tuanduijianshe">
			<el-dialog title="团队建设费" :visible.sync="show.tuanduijianshe" @close="closed" >
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
						<span>团队建设费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('tuanduijianshe')">删除</el-button>
				    <el-button type="primary" @click="saveTuanduijianshe(2)">报销</el-button>
					<el-button type="primary" @click="saveTuanduijianshe(1)">保存再记</el-button>
					<el-button type="primary" @click="saveTuanduijianshe(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.waibulaowu">
			<el-dialog title="外部劳务" :visible.sync="show.waibulaowu" @close="closed">
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/photo.png">
						<span>劳务提供人<b class="error">*</b></span>
						<el-input  class="inputs"  v-model="sfServiceProvidingMan" placeholder="请输入劳务提供人"></el-input>
				    </li>
			        <li>
						<img src="../../assets/haveCopany2.png">
						<span>所在单位</span>
						<el-input  class="inputs" v-model="sfServiceInCompany" ></el-input>
				    </li>	
				</ul>
				 <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime2.png">
						<span>起始时间</span>
						<el-date-picker class="inputs" v-model="startDate" type="datetime" placeholder="入住时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>截止时间</span>
						<el-date-picker class="inputs" v-model="abortDate" type="datetime" placeholder="退房时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>外部劳务标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('waibulaowu')">删除</el-button>
				    <el-button type="primary" @click="waibulaowu(2)">报销</el-button>
					<el-button type="primary" @click="waibulaowu(1)">保存再记</el-button>
					<el-button type="primary" @click="waibulaowu(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.gongzuocanbutie">
			<el-dialog title="工作餐补贴" :visible.sync="show.gongzuocanbutie" @close="closed" >
			     <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime2.png">
						<span>起始日期</span>
						<el-date-picker class="inputs" v-model="startDate" type="date" placeholder="起始日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>截止日期</span>
						<el-date-picker class="inputs" v-model="abortDate" type="date" placeholder="截止日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
			   </ul>
			    <ul class="waterUl">
					 <li>
						<img src="../../assets/dayNum.png">
						<span>餐补次数<b class="error">*</b></span>
						<el-input  class="inputs"  type="number" v-model="wmMealSubsidyNumber" placeholder="请输入餐补次数"></el-input>
				    </li>		
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>工作餐补贴标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('gongzuocanbutie')">删除</el-button>
					<el-button type="primary" @click="gongzuocanbutie(2)">报销</el-button>
					<el-button type="primary" @click="gongzuocanbutie(1)">保存再记</el-button>
					<el-button type="primary" @click="gongzuocanbutie(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.bangongyongpin">
			<el-dialog title="办公用品费" :visible.sync="show.bangongyongpin" @close="closed" >
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/dateA2.png">
						<span>购置日期</span>
						<el-date-picker class="inputs" v-model="beDate" type="date" placeholder="选择购置日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/pinName.png">
						<span>品名<b class="error">*</b></span>
						<el-input  class="inputs" v-model="osOfficeName" placeholder="请输入品名"></el-input>
				    </li>
			        <li>
						<img src="../../assets/howMuch.png">
						<span>数量<b class="error">*</b></span>
						<el-input  class="inputs"  type="number"  v-model="osNumber" placeholder="请输入数量"></el-input>
				    </li>
			        	
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>办公用品费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('bangongyongpin')">删除</el-button>
					<el-button type="primary" @click="bangongyongpin(2)">报销</el-button>
					<el-button type="primary" @click="bangongyongpin(1)">保存再记</el-button>
					<el-button type="primary" @click="bangongyongpin(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.cheliangbaoxian">
			<el-dialog title="车辆保险费" :visible.sync="show.cheliangbaoxian" @close="closed">
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/carNum.png">
						<span>车牌号<b class="error">*</b></span>
						<el-input  class="inputs" v-model="carNo" placeholder="请输入车牌号"></el-input>
				    </li>
			        <li>
						<img src="../../assets/carorother2.png">
						<span>品牌型号</span>
						<el-input  class="inputs"  v-model="carBrand" placeholder="请输入品牌型号"></el-input>
				    </li>
					<li>
						<img src="../../assets/oldyear2.png">
						<span>已使用年限</span>
						<el-input  class="inputs" type="number"  v-model="carUsedYear" placeholder="请输入已使用年限"></el-input>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
				    <li>
						<img src="../../assets/dateA2.png">
						<span>投保时间</span>
						<el-date-picker class="inputs" v-model="beDate" type="datetime" placeholder="投保时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
			        <li>
						<img src="../../assets/starttime2.png">
						<span>保单起日期</span>
						<el-date-picker class="inputs" v-model="startDate" type="date" placeholder="保单起日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>保单止日期</span>
						<el-date-picker class="inputs" v-model="abortDate" type="date" placeholder="保单止日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>车辆保险费标准</span>
						<el-input  class="inputs" v-model="standardUnit" ></el-input>
				    </li>
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/defense.png">
						<span>保险险种<b class="error">*</b></span>
						<el-input  class="inputs" v-model="ciInsuranceType" placeholder="请输入保险险种"></el-input>
				    </li>
			        <li>
						<img src="../../assets/case-blue.png">
						<span>保险公司<b class="error">*</b></span>
						<el-input  class="inputs"  v-model="ciInsuranceCompany" placeholder="请输入保险公司"></el-input>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('cheliangbaoxian')">删除</el-button>
					<el-button type="primary" @click="cheliangbaoxian(2)">报销</el-button>
					<el-button type="primary" @click="cheliangbaoxian(1)">保存再记</el-button>
					<el-button type="primary" @click="cheliangbaoxian(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.cheliangshiyong">
			<el-dialog title="车辆使用费" :visible.sync="show.cheliangshiyong" @close="closed">
			     <ul class="waterUl">
			        <li>
						<img src="../../assets/carNum.png">
						<span>车牌号<b class="error">*</b></span>
						<el-input  class="inputs" v-model="carNo" placeholder="请输入车牌号"></el-input>
				    </li>
			        <li>
						<img src="../../assets/carorother2.png">
						<span>品牌型号</span>
						<el-input  class="inputs"  v-model="carBrand" placeholder="请输入品牌型号"></el-input>
				    </li>
					<li>
						<img src="../../assets/AllPeo2.png">
						<span>使用部门/人</span>
						<el-input  class="inputs" v-model="beJoinPersons" placeholder="请输入使用部门/人"></el-input>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime2.png">
						<span>起始时间</span>
						<el-date-picker class="inputs" v-model="startDate" type="datetime" placeholder="起始时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>截止时间</span>
						<el-date-picker class="inputs" v-model="abortDate" type="datetime" placeholder="截止时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>车辆使用费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('cheliangshiyong')">删除</el-button>
					<el-button type="primary" @click="cheliangshiyong(2)">报销</el-button>
					<el-button type="primary" @click="cheliangshiyong(1)">保存再记</el-button>
					<el-button type="primary" @click="cheliangshiyong(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.cheliangweixiu">
			<el-dialog title="车辆维修费" :visible.sync="show.cheliangweixiu" @close="closed" >
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/carNum.png">
						<span>车牌号<b class="error">*</b></span>
						<el-input  class="inputs" v-model="carNo" placeholder="请输入车牌号"></el-input>
				    </li>
			        <li>
						<img src="../../assets/carorother2.png">
						<span>品牌型号</span>
						<el-input  class="inputs"  v-model="carBrand" placeholder="请输入品牌型号"></el-input>
				    </li>
					<li>
						<img src="../../assets/oldyear2.png">
						<span>已使用年限</span>
						<el-input  class="inputs" type="number"  v-model="carUsedYear" placeholder="请输入已使用年限"></el-input>
				    </li>	
					<li>
						<img src="../../assets/repair.png">
						<span>维修厂商<b class="error">*</b></span>
						<el-input  class="inputs"  v-model="csServiceCompany" placeholder="请输入维修厂商"></el-input>
				    </li>			  
			   </ul>
			    <ul class="waterUl">
				    <li>
						<img src="../../assets/dateA2.png">
						<span>维修完成日期</span>
						<el-date-picker class="inputs" v-model="beDate" type="date" placeholder="投保时间" format="yyyy-MM-dd"></el-date-picker>
				    </li>
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>车辆维修费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('cheliangweixiu')">删除</el-button>
					<el-button type="primary" @click="cheliangweixiu(2)">报销</el-button>
					<el-button type="primary" @click="cheliangweixiu(1)">保存再记</el-button>
					<el-button type="primary" @click="cheliangweixiu(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.fangzu">
			<el-dialog title="房租费用" :visible.sync="show.fangzu" @close="closed">
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/whoHave.png">
						<span>租房人<b class="error">*</b></span>
						<el-input  class="inputs"  v-model="mbOwner" placeholder="请输入租房人"></el-input>
				    </li>
			        <li>
						<img src="../../assets/comenyPeo.png">
						<span>出租单位/人</span>
						<el-input  class="inputs" v-model="beJoinPersons"></el-input>
				    </li>
					<li>
						<img src="../../assets/end-place2.png">
						<span>租房地址</span>
						<el-input  class="inputs" v-model="hlHouseAddressId" placeholder="请输入租房地址"></el-input>
				    </li>	
				</ul>
			    <ul class="waterUl">
				    <li>
						<img src="../../assets/dateA2.png">
						<span>起租日</span>
						<el-date-picker class="inputs" v-model="beDate" type="date" placeholder="起租日" format="yyyy-MM-dd"></el-date-picker>
				    </li>
					<li>
						<img src="../../assets/oldyear.png">
						<span>房屋承租期限<b class="error">*</b></span>
						<el-input  class="inputs" v-model="hlLeaseDeadLine" type="number" placeholder="请输入房屋承租期限"></el-input>
				    </li>
			        <li>
						<img src="../../assets/starttime.png">
						<span>房租起始日期<b class="error">*</b></span>
						<el-date-picker class="inputs" v-model="startDate" type="date" placeholder="房租起始日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime.png">
						<span>房租截止日期<b class="error">*</b></span>
						<el-date-picker class="inputs" v-model="abortDate" type="date" placeholder="房租截止日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>房租费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('fangzu')">删除</el-button>
					<el-button type="primary" @click="fangzu(2)">报销</el-button>
					<el-button type="primary" @click="fangzu(1)">保存再记</el-button>
					<el-button type="primary" @click="fangzu(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.huiyi">
			<el-dialog title="会议费" :visible.sync="show.huiyi" @close="closed">
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/meetMun.png">
						<span>会议项目<b class="error">*</b></span>
						<el-input  class="inputs" v-model="mcMeetingName" ></el-input>
				    </li>	
					 <li>
						<img src="../../assets/end-place2.png">
						<span>举办地点</span>
						<el-input  class="inputs" v-model="hlHouseAddressId" ></el-input>
				    </li>
					 <li>
						<img src="../../assets/AllPeo.png">
						<span>参加人员/部门<b class="error">*</b></span>
						<el-input  class="inputs" v-model="beJoinPersons" ></el-input>
				    </li>		
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime2.png">
						<span>起始时间</span>
						<el-date-picker class="inputs" v-model="startDate" type="datetime" placeholder="起始时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>截止时间</span>
						<el-date-picker class="inputs" v-model="abortDate" type="datetime" placeholder="截止时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>会议费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('huiyi')">删除</el-button>
					<el-button type="primary" @click="huiyi(2)">报销</el-button>
					<el-button type="primary" @click="huiyi(1)">保存再记</el-button>
					<el-button type="primary" @click="huiyi(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.lipin">
			<el-dialog title="礼品费" :visible.sync="show.lipin" @close="closed">
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/dateA2.png">
						<span>购置时间</span>
						<el-date-picker class="inputs" v-model="beDate" type="date" placeholder="购置时间" format="yyyy-MM-dd"></el-date-picker>
				    </li>		
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/pinName.png">
						<span>品名<b class="error">*</b></span>
						<el-input  class="inputs" v-model="gcGiftName" ></el-input>
				    </li>
					 <li>
						<img src="../../assets/howMuch.png">
						<span>数量<b class="error">*</b></span>
						<el-input  class="inputs" v-model="gcGiftNumber" type="number"></el-input>
				    </li>	
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>礼品费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('lipin')">删除</el-button>
					<el-button type="primary" @click="lipin(2)">报销</el-button>
					<el-button type="primary" @click="lipin(1)">保存再记</el-button>
					<el-button type="primary" @click="lipin(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.peixun">
			<el-dialog title="培训费" :visible.sync="show.peixun" @close="closed">
			     <ul class="waterUl">
				    <li>
						<img src="../../assets/meetMun.png">
						<span>培训项目<b class="error">*</b></span>
						<el-input  class="inputs" v-model="mcMeetingName" ></el-input>
				    </li>
					<li>
						<img src="../../assets/haveCopany2.png">
						<span>培训机构</span>
						<el-input  class="inputs" v-model="csServiceCompany" ></el-input>
				    </li>
					<li>
						<img src="../../assets/end-place2.png">
						<span>培训地点</span>
						<el-input  class="inputs" v-model="hlHouseAddressId" ></el-input>
				    </li>
					<li>
						<img src="../../assets/AllPeo.png">
						<span>参会人员/部门<b class="error">*</b></span>
						<el-input  class="inputs" v-model="beJoinPersons" ></el-input>
				    </li>	
			   </ul>
			   <ul class="waterUl">
			       <li>
						<img src="../../assets/starttime2.png">
						<span>起始时间</span>
						<el-date-picker class="inputs" v-model="startDate" type="datetime" placeholder="起始时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>截止时间</span>
						<el-date-picker class="inputs" v-model="abortDate" type="datetime" placeholder="截止时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>培训费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('peixun')">删除</el-button>
					<el-button type="primary" @click="peixun(2)">报销</el-button>
					<el-button type="primary" @click="peixun(1)">保存再记</el-button>
					<el-button type="primary" @click="peixun(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.qichezulin">
			<el-dialog title="汽车租赁费" :visible.sync="show.qichezulin" @close="closed">
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/whoHave.png">
						<span>租车人<b class="error">*</b></span>
						<el-input  class="inputs" v-model="mbOwner"></el-input>
				    </li>
			        <li>
						<img src="../../assets/carorother2.png">
						<span>品牌型号</span>
						<el-input  class="inputs"  v-model="carBrand" placeholder="请输入品牌型号"></el-input>
				    </li>
					 <li>
						<img src="../../assets/buiCity2.png">
						<span>租车城市</span>
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
						<img src="../../assets/haveCopany.png">
						<span>租车公司<b class="error">*</b></span>
						<el-input  class="inputs" v-model="ciInsuranceType" placeholder="请输入租车公司"></el-input>
				    </li>				  
			   </ul>
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime2.png">
						<span>租车时间</span>
						<el-date-picker class="inputs" v-model="startDate" type="datetime" placeholder="起始时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>还车时间</span>
						<el-date-picker class="inputs" v-model="abortDate" type="datetime" placeholder="截止时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>汽车租赁费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('qichezulin')">删除</el-button>
					<el-button type="primary" @click="qichezulin(2)">报销</el-button>
					<el-button type="primary" @click="qichezulin(1)">保存再记</el-button>
					<el-button type="primary" @click="qichezulin(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.sichegongyongyou">
			<el-dialog title="私车公用油费" :visible.sync="show.sichegongyongyou" @close="closed">
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/carNum.png">
						<span>车牌号<b class="error">*</b></span>
						<el-input  class="inputs" v-model="carNo" placeholder="请输入车牌号"></el-input>
				    </li>			  
			   </ul>
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/starttime2.png">
						<span>出发时间</span>
						<el-date-picker class="inputs" v-model="startDate" type="datetime" placeholder="出发时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>到达时间</span>
						<el-date-picker class="inputs" v-model="abortDate" type="datetime" placeholder="到达时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
			   </ul>
			   <ul class="waterUl">
			        <li>
						<img src="../../assets/start2.png">
						<span>出发地点</span>
						<el-input  class="inputs" v-model="tpStartAddressId" placeholder="请输入出发地点"></el-input>
				    </li>	
					<li>
						<img src="../../assets/end-place2.png">
						<span>到达地点</span>
						<el-input  class="inputs" v-model="tpDestinationAddressId" placeholder="请输入到达地点"></el-input>
				    </li>	
					<li>
						<img src="../../assets/flow.png">
						<span>行驶公里总数<b class="error">*</b></span>
						<el-input  class="inputs" v-model="cgDriveKM" type="number" placeholder="行驶公里总数"></el-input>
				    </li>	
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>私车公用油费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('sichegongyongyou')">删除</el-button>
					<el-button type="primary" @click="sichegongyongyou(2)">报销</el-button>
					<el-button type="primary" @click="sichegongyongyou(1)">保存再记</el-button>
					<el-button type="primary" @click="sichegongyongyou(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.tijian">
			<el-dialog title="体检费" :visible.sync="show.tijian" @close="closed">
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/dateA2.png">
						<span>体检日期</span>
						<el-date-picker class="inputs" v-model="beDate" type="date" placeholder="体检日期" format="yyyy-MM-dd"></el-date-picker>
				    </li>		
			    </ul>
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/whoHave.png">
						<span>体检人<b class="error">*</b></span>
						<el-input  class="inputs" v-model="mbOwner"></el-input>
				    </li>
			        <li>
						<img src="../../assets/add-file.png">
						<span>体检类型<b class="error">*</b></span>
						<el-select class="inputs" v-model="chCheckType" placeholder="请选择">
							<el-option v-for="item in physicalExaminationList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
				    </li>
					<li>
						<img src="../../assets/haveCopany2.png">
						<span>体检机构</span>
						<el-input  class="inputs" v-model="ciInsuranceType" placeholder="请输入体检机构"></el-input>
				    </li>	
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>体检费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('tijian')">删除</el-button>
					<el-button type="primary" @click="tijian(2)">报销</el-button>
					<el-button type="primary" @click="tijian(1)">保存再记</el-button>
					<el-button type="primary" @click="tijian(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.youkachongzhi">
			<el-dialog title="油卡充值费" :visible.sync="show.youkachongzhi" @close="closed">
			    <ul class="waterUl">
			        <li>
						<img src="../../assets/dateA2.png">
						<span>充值时间</span>
						<el-date-picker class="inputs" v-model="beDate" type="datetime" placeholder="体检日期" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>		
			    </ul>
			    <ul class="waterUl">
				    <li>
						<img src="../../assets/whoHave.png">
						<span>充值卡号<b class="error">*</b></span>
						<el-input  class="inputs" v-model="cardNo"></el-input>
				    </li>
			        <li>
						<img src="../../assets/whoHave.png">
						<span>持有人<b class="error">*</b></span>
						<el-input  class="inputs" v-model="mbOwner"></el-input>
				    </li>
					<li>
						<img src="../../assets/haveCopany2.png">
						<span>绑定车牌号</span>
						<el-input  class="inputs" v-model="carNo" placeholder="请输入体检机构"></el-input>
				    </li>	
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>油卡充值费标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('youkachongzhi')">删除</el-button>
					<el-button type="primary" @click="youkachongzhi(2)">报销</el-button>
					<el-button type="primary" @click="youkachongzhi(1)">保存再记</el-button>
					<el-button type="primary" @click="youkachongzhi(0)">保存</el-button>
				</div>
			</el-dialog>
		</div>
		<div  class="detial" v-show="show.qita">
			<el-dialog title="其他费用" :visible.sync="show.qita" @close="closed">
			    <ul class="waterUl">
				    <li>
						<img src="../../assets/whoHave.png">
						<span>费用类型<b class="error">*</b></span>
						<el-select class="inputs" v-model="tempNames" placeholder="请选择">
							<el-option v-for="item in costTypeList" :key="item.tempName" :label="item.tempName" :value="item.tempName"></el-option>
						</el-select>
				    </li>
				</ul>
				<ul class="waterUl">
			         <li>
						<img src="../../assets/starttime2.png">
						<span>起始时间</span>
						<el-date-picker class="inputs" v-model="startDate" type="datetime" placeholder="起始时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					 <li>
						<img src="../../assets/endtime2.png">
						<span>截止时间</span>
						<el-date-picker class="inputs" v-model="abortDate" type="datetime" placeholder="截止时间" format="yyyy-MM-dd HH:mm"></el-date-picker>
				    </li>
					<li v-if="ifStandard">
						<img src="../../assets/pay-bz.png">
						<span>其他费用标准</span>
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
				<div style="float:right;margin-bottom:20px" v-if="status==0">
				    <el-button v-if="id !=0" type="primary" @click="deleteBill('qita')">删除</el-button>
					<el-button type="primary" @click="qita(2)">报销</el-button>
					<el-button type="primary" @click="qita(1)">保存再记</el-button>
					<el-button type="primary" @click="qita(0)">保存</el-button>
				</div>
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
			status:0,
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
			physicalExaminationList:[],//体检类型列表
			costTypeList:[],//费用类型列表
		//	fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
			fileList2:[],
			ifStandard:false,//是否有标准
			beDate:'',//日期，购置日期，
			bePersons:'',//总人数，数量，行驶公里数
			beJoinPersons:'',//参加人员，品名，使用部门/人，出租单位/人，参与人员/部门
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
			outTravellList:[],//外部交通工具列表
			cityList:[],//城市列表
			cityListSearch:[],//检索出来的城市列表
			loading:false,
			htEmployeeList:[
				{name:'是',val:true},
				{name:'否',val:false}
			],
 
			abortDate:'',//结束时间
			startDate:'',//开始时间
			tpStartAddressId:'',//起点,出发地点
			tpDestinationAddressId:'',//终点,到达地点
			tpTransportType:null,//交通工具
            
			htEmployee:null,//是否是公司员工
			htBusinessAddressCode:null, //出差城市信息
			htDays:'',//入住天数，出差天数
			htHotelName:'',//酒店名称

			wmMealSubsidyNumber:'', //餐补次数

			mbMobile:util.userInfo.mobile,//手机号
			mbOwner:util.userInfo.nickname,//持有人,租车人
			mbMonths:'',//报销月数,补贴月数

			sfServiceProvidingMan:'',//劳务提供人
			sfServiceInCompany:'', //所在单位

			carNo:'',//车牌号,绑定车牌号
			carBrand:'',//品牌型号
			carUsedYear:'', // 已使用年限，房屋承租期限
			ciInsuranceCompany:'',//保险险种
			ciInsuranceType:'', //保险公司，租车公司，体检机构

			csServiceCompany:'',//维修厂商，培训机构

			hlHouseAddressId:'',//租房地址，举办地点，培训地点

			mcMeetingName:'',//会议项目，培训项目

			gcGiftNumber:'',//礼品费数量
			gcGiftName:'',//品名
			cardNo:'',//充值卡号

			chCheckType:null,//体检类型,费用类型
			osOfficeName:'',//办公用品品名
			osNumber:'',//办公用品 数量
			hlLeaseDeadLine:'',
			cgDriveKM:'',
			tempNames:null,


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
		},
		other(){
			return this.$store.getters.otherWater
		}
	},

    methods: {
		closed(){
			 this.$store.commit('waterInfo',{item:{},waterShow:false,id:0});
			 this.dataInit();
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
            util.get('book/findOutTravel',{},function(res){
				//交通工具列表
				_this.outTravellList=res
			})
			util.get('book/findCityHot',{},function(res){
				//城市列表
				_this.cityList = res;
				_this.cityListSearch =res;
			})
			util.get('book/physicalExamination',{},function(res){
				//体检类型
				_this.physicalExaminationList = res;
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
		    var _this=this;
			util.get('book/findBook',{bookId:_this.id},function(res){
				_this.setVal(res);
			})
		},
		setVal(pdata){
          //if(pdata.tempType == 2){//外埠交通费
		      this.status = pdata.status;
			  this.id = pdata.id;
		      this.beDate = pdata.beDate || pdata.tcConstructionDate || pdata.osDate || pdata.ciInsuranceDate || pdata.csServiceEndDate || pdata.hlStartLeaseDate || pdata.gcBuyDate || pdata.chCheckDate || pdata.gcrRechargeDate || '';
			  this.bePersons = pdata.bePersons || pdata.tcConstructionUserCount || '';
              this.beJoinPersons = pdata.beJoinPersons || pdata.tcConstructionParticipant || pdata.cuDepOrUser || pdata.hlLeasePerson || pdata.mcJoinPersonOrDeps || pdata.tcJoinPersons || '';
			  this.tpStartAddressId = pdata.tpStartAddressId || pdata.cgStartAddressId || '';
			  this.tpDestinationAddressId = pdata.tpDestinationAddressId || pdata.cgDestinationAddressId || '';
			  this.tpTransportType = pdata.tpTransportType || null;
			  this.amount = pdata.amount || '';
			  this.ifStandard = pdata.ifBeyondStandard || false;
			  this.standardUnit = pdata.standardUnit || '无';
			  this.currency = pdata.currency || null;
			  this.fileList2 = pdata.files || [];
	     	  this.remark = pdata.remark || '';
			  this.htHotelName = pdata.htHotelName || '';
			  this.htEmployee = pdata.htEmployee || null;
			  this.htDays = pdata.htDays || pdata.bsBusinessDays || '';
			  this.mbMonths = pdata.mbMonths || pdata.tsMonths || '';
			  this.mbMobile = pdata.mbMobile || '';
			  this.mbOwner = pdata.mbOwner || pdata.hlTenant || pdata.clUsername || pdata.chCheckUser || pdata.gcrCardUser  || '';
			  this.sfServiceInCompany = pdata.sfServiceInCompany || '';
			  this.sfServiceProvidingMan = pdata.sfServiceProvidingMan || '';
			  this.wmMealSubsidyNumber = pdata.wmMealSubsidyNumber || '';
			  this.osOfficeName = pdata.osOfficeName || '';
			  this.osNumber = pdata.osNumber || '';
			  this.carNo = pdata.carNo || '';
			  this.carBrand = pdata.carBrand || '';
			  this.carUsedYear = pdata.carUsedYear || '';
			  this.ciInsuranceType = pdata.ciInsuranceType || pdata.clLeaseCarCompany || pdata.chCompany || '';
			  this.ciInsuranceCompany = pdata.ciInsuranceCompany || '';
			  this.csServiceCompany=pdata.csServiceCompany || pdata.tcTrainCompany || '';
			  this.hlHouseAddressId=pdata.hlHouseAddressId || pdata.mcMeetingAddressId || pdata.tcTrainAddressId || '';
			  this.hlLeaseDeadLine = pdata.hlLeaseDeadLine || '';
			  this.mcMeetingName = pdata.mcMeetingName || pdata.tcTrainName || '';
			  this.gcGiftName =pdata.gcGiftName ||'';
			  this.gcGiftNumber =pdata.gcGiftNumber || '';
			  this.cgDriveKM = pdata.cgDriveKM ||'';
			  this.chCheckType = pdata.chCheckType || null;
			  this.cardNo = pdata.gcrCardNo || '';
			  this.tempNames = pdata.tempName || null






			  if(this.tempType == 3){//住宿费
			      this.abortDate=pdata.htCheckOutTime ? util.getDefaultTime(pdata.htCheckOutTime) : ''
			      this.startDate=pdata.htCheckInTime ? util.getDefaultTime(pdata.htCheckInTime) : ''
			  }else{
                  this.abortDate=pdata.abortDate ? util.getDefaultTime(pdata.abortDate) : ''
			      this.startDate=pdata.startDate ?  util.getDefaultTime(pdata.startDate) : ''
			  }
			  if(this.tempType == 7){//出差补贴费 bsBusinessDays
			     this.htBusinessAddressCode = (pdata.bsBusinessCity ? pdata.bsBusinessCity.code :null) || null;
			  }else if (this.tempType == 19){//汽车租赁费
                  this.htBusinessAddressCode = (pdata.clCity ? pdata.clCity.code :null) || null;
			  }else{
				this.htBusinessAddressCode = (pdata.htBusinessAddress ? pdata.htBusinessAddress.code :null) || null;
			  }

		 // }
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
			console.log(v)
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
		saveTuanduijianshe(type){
            //保存团队建设费
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
				tcConstructionDate:_this.beDate,
				tcConstructionParticipant:_this.beJoinPersons,
				tcConstructionUserCount:_this.bePersons,
				tempType:_this.tempType
			}
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
					 _this.show.tuanduijianshe=false;
				}else if(type == 2){//报销
				     _this.closed();
					 _this.show.tuanduijianshe=false;
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
		chuchaibutie(type){
            //保存出差补贴
			var _this=this;
			if(_this.startDate == ''){
				this.$message({message: '请选择出发日期',type: 'error'});
				return false
			}
			if(_this.abortDate == ''){
				this.$message({message: '请选择返程日期',type: 'error'});
				return false
			}
			if(_this.startDate>=_this.abortDate){
				this.$message({message: '返程日期必须大于出发日期',type: 'error'});
				return false
			}
		    if(_this.htBusinessAddressCode == null){
				 this.$message({message: '请选择出差城市',type: 'error'});
				 return false
			}
			if(_this.htDays == ''){
				 this.$message({message: '请输入出差天数',type: 'error'});
				 return false
			}
			var days = _this.abortDate- _this.startDate;
			if(parseInt(days / (1000 * 60 * 60 * 24))<_this.htDays){
                 this.$message({message: '出差天数超过时间范围，请核对后输入',type: 'error'});
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
				bsBusinessCityCode:_this.htBusinessAddressCode,
				bsBusinessDays:_this.htDays,
				bsDeductAmount:0,
				bsStartCityCode:'',
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
				startDate:_this.startDate,
				tempType:_this.tempType
			}
		
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.chuchaibutie=false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.chuchaibutie =false;
					 _this.ifShowReimburse=true;
				}
				
			})
		},
		waibulaowu(type){
            //保存外部劳务
			var _this=this;
			if(util.trim(_this.sfServiceProvidingMan) == ''){
				this.$message({message: '请输入劳务提供人',type: 'error'});
				return false
			}
			if(_this.startDate != '' && _this.abortDate != ''){
				if(_this.startDate>=_this.abortDate){
					this.$message({message: '截止日期必须大于起始日期',type: 'error'});
					return false
				}
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
				sfServiceInCompany:_this.sfServiceInCompany,
				sfServiceProvidingMan:_this.sfServiceProvidingMan,
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
				     _this.show.waibulaowu=false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.waibulaowu =false;
					 _this.ifShowReimburse=true;
				}
				
			})
		},
		gongzuocanbutie(type){
            //保存工作餐补贴
			var _this=this;
			if(_this.startDate != '' && _this.abortDate != ''){
				if(_this.startDate>=_this.abortDate){
					this.$message({message: '截止日期必须大于起始日期',type: 'error'});
					return false
				}
			}
			if(_this.wmMealSubsidyNumber == ''){
				this.$message({message: '请输入餐补次数',type: 'error'});
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
				supplierId:_this.supplierId,
				startDate:_this.startDate,
				tempType:_this.tempType,
				wmMealSubsidyMoney:0,
				wmMealSubsidyNumber:_this.wmMealSubsidyNumber,
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.gongzuocanbutie=false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.gongzuocanbutie =false;
					 _this.ifShowReimburse=true;
				}
				
			})
		},
		bangongyongpin(type){
			//保存办公用品
			var _this=this;
            if(util.trim(_this.osOfficeName) == ''){
				this.$message({message: '请输入品名',type: 'error'});
				return false
			}
			if(_this.osNumber == ''){
				this.$message({message: '请输入数量',type: 'error'});
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
			    ifBeyondStandard:_this.ifBeyondStandard,
				osDate:_this.beDate,
				osNumber:_this.osNumber,
				osOfficeName:_this.osOfficeName,
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
				     _this.show.bangongyongpin=false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.bangongyongpin =false;
					 _this.ifShowReimburse=true;
				}
				
			})
		},
		cheliangbaoxian(type){
            //保存车辆保险
			var _this=this;
			if(util.trim(_this.carNo) == ''){
	            this.$message({message: '请输入车牌号',type: 'error'});
				return false
			}
			if(_this.startDate != '' && _this.abortDate != ''){
				if(_this.startDate>=_this.abortDate){
					this.$message({message: '截止日期必须大于起始日期',type: 'error'});
					return false
				}
			}
			if(util.trim(_this.ciInsuranceType) == ''){
	            this.$message({message: '请输入保险险种',type: 'error'});
				return false
			}
			if(util.trim(_this.ciInsuranceCompany) == ''){
	            this.$message({message: '请输入保险公司',type: 'error'});
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
				carBrand:_this.carBrand,
				carNo:_this.carNo,
				carUsedYear:_this.carUsedYear,
				ciInsuranceCompany:_this.ciInsuranceCompany,
				ciInsuranceDate:_this.beDate,
				ciInsuranceType:_this.ciInsuranceType,
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
				tempType:_this.tempType
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.cheliangbaoxian =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.cheliangbaoxian =false;
					 _this.ifShowReimburse=true;
				}
			})
		},
		cheliangshiyong(type){
			//保存车辆使用
			var _this=this;
			if(util.trim(_this.carNo) == ''){
	            this.$message({message: '请输入车牌号',type: 'error'});
				return false
			}
			if(_this.startDate != '' && _this.abortDate != ''){
				if(_this.startDate>=_this.abortDate){
					this.$message({message: '截止日期必须大于起始日期',type: 'error'});
					return false
				}
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
				carBrand:_this.carBrand,
				carNo:_this.carNo,
				costProjectName:_this.costProjectName,
				cuDepOrUser:_this.beJoinPersons,
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
				tempType:_this.tempType
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.cheliangshiyong =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.cheliangshiyong =false;
					 _this.ifShowReimburse=true;
				}
			})
		},
		cheliangweixiu(type){
			//车辆维修保存
			var _this=this;
			if(util.trim(_this.carNo) == ''){
	            this.$message({message: '请输入车牌号',type: 'error'});
				return false
			}
			if(util.trim(_this.csServiceCompany) == ''){
	            this.$message({message: '请输入维修厂商',type: 'error'});
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
				carBrand:_this.carBrand,
				carNo:_this.carNo,
				carUsedYear:_this.carUsedYear,
				costProjectName:_this.costProjectName,
				csServiceCompany:_this.csServiceCompany,
				csServiceEndDate:_this.beDate,
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
				     _this.show.cheliangweixiu =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.cheliangweixiu =false;
					 _this.ifShowReimburse=true;
				}
			})
		},
		fangzu(type){
           //房租保存
			var _this=this;
			if(util.trim(_this.mbOwner) == ''){
	            this.$message({message: '请输入租房人',type: 'error'});
				return false
			}
			if(_this.hlLeaseDeadLine == ''){
	            this.$message({message: '请输入大于0的房屋承租期限',type: 'error'});
				return false
			}
			if(_this.startDate == ''){
				this.$message({message: '请选择房租起始日期',type: 'error'});
				return false
			}
			if(_this.abortDate == ''){
				this.$message({message: '请选择房屋截止日期',type: 'error'});
				return false
			}
			if(_this.startDate>=_this.abortDate){
				this.$message({message: '房屋截止日期必须大于房租起始日期',type: 'error'});
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
				hlHouseAddressId:_this.hlHouseAddressId,
				hlLeaseDeadLine:_this.hlLeaseDeadLine,
				hlLeasePerson:_this.beJoinPersons,
				hlStartLeaseDate:_this.beDate,
				hlTenant:_this.mbOwner,
			    ifBeyondStandard:_this.ifBeyondStandard,
				remark:_this.remark,
				standardAmount:_this.standardAmount,
				standardUnit:_this.standardUnit,
				startDate:_this.startDate,
				supplierId:_this.supplierId,
				tempType:_this.tempType
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.fangzu =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.fangzu =false;
					 _this.ifShowReimburse=true;
				}
			})
		},
		huiyi(type){
            //会议保存
			var _this=this;
			if(util.trim(_this.mcMeetingName) == ''){
	            this.$message({message: '请输入会议项目',type: 'error'});
				return false
			}
			if(_this.beJoinPersons == ''){
	            this.$message({message: '参与人员/部门',type: 'error'});
				return false
			}
			if(_this.startDate != '' && _this.abortDate != ''){
				if(_this.startDate>=_this.abortDate){
					this.$message({message: '截止时间必须大于起始时间',type: 'error'});
					return false
				}
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
				mcJoinPersonOrDeps:_this.beJoinPersons,
				mcMeetingAddressId:_this.hlHouseAddressId,
				mcMeetingName:_this.mcMeetingName,
				remark:_this.remark,
				standardAmount:_this.standardAmount,
				standardUnit:_this.standardUnit,
				startDate:_this.startDate,
				supplierId:_this.supplierId,
				tempType:_this.tempType
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.huiyi =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.huiyi =false;
					 _this.ifShowReimburse=true;
				}
			})

		},
		lipin(type){
            //礼品费保存
			var _this=this;
			if(util.trim(_this.gcGiftName) == ''){
	            this.$message({message: '请输入品名',type: 'error'});
				return false
			}
			if(_this.gcGiftNumber == ''){
	            this.$message({message: '请输入礼品数量',type: 'error'});
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
				gcBuyDate:_this.beDate,
				gcGiftName:_this.gcGiftName,
				gcGiftNumber:_this.gcGiftNumber,
				gcunit:'',
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
				     _this.show.lipin =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.lipin =false;
					 _this.ifShowReimburse=true;
				}
			})
		},
		peixun(type){
			//培训费保存
			var _this=this;
			if(util.trim(_this.mcMeetingName) == ''){
	            this.$message({message: '请输入培训项目',type: 'error'});
				return false
			}
			if(util.trim(_this.beJoinPersons) == ''){
	            this.$message({message: '请输入参会人员/部门',type: 'error'});
				return false
			}
			if(_this.startDate != '' && _this.abortDate != ''){
				if(_this.startDate>=_this.abortDate){
					this.$message({message: '截止时间必须大于起始时间',type: 'error'});
					return false
				}
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
				tcJoinPersons:_this.beJoinPersons,
				tcTrainAddressId:_this.hlHouseAddressId,
				tcTrainCompany:_this.csServiceCompany,
				tcTrainName:_this.mcMeetingName,
				tempType:_this.tempType
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.peixun =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.peixun =false;
					 _this.ifShowReimburse=true;
				}
			})
		},
		qichezulin(type){
            //汽车租赁
			var _this=this;
			if(util.trim(_this.mbOwner) == ''){
	            this.$message({message: '请输入租车人',type: 'error'});
				return false
			}
			if(util.trim(_this.ciInsuranceType) == ''){
	            this.$message({message: '请输入租车公司',type: 'error'});
				return false
			}
			if(_this.startDate != '' && _this.abortDate != ''){
				if(_this.startDate>=_this.abortDate){
					this.$message({message: '还车时间必须大于租车时间',type: 'error'});
					return false
				}
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
				carBrand:_this.carBrand,
				clCityCode:_this.htBusinessAddressCode,
				clLeaseCarCompany:_this.ciInsuranceType,
				clUsername:util.trim(_this.mbOwner),
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
				tempType:_this.tempType
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.qichezulin =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.qichezulin =false;
					 _this.ifShowReimburse=true;
				}
			})
		},
		sichegongyongyou(type){
            //私车公用油
			var _this=this;
			if(util.trim(_this.carNo) == ''){
	            this.$message({message: '请输入车牌号',type: 'error'});
				return false
			}
			if(_this.startDate != '' && _this.abortDate != ''){
				if(_this.startDate>=_this.abortDate){
					this.$message({message: '到达时间必须大于出发时间',type: 'error'});
					return false
				}
			}
			if(_this.cgDriveKM == ''){
	            this.$message({message: '请输入行驶公里总数',type: 'error'});
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
				carNo:_this.carNo,
				cgDestinationAddressId:_this.tpDestinationAddressId,
				cgDriveKM:_this.cgDriveKM,
				cgStartAddressId:_this.tpStartAddressId,
				cgkilometreSubsidy:456,//每公里补贴
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
				tempType:_this.tempType
			}
			
			util.post('book/saveBillBook',options,function(res){
				_this.dataInit();
				_this.$message({message: '已保存',type: 'success'});
				if(type==0){//保存
				     _this.closed();
				     _this.show.sichegongyongyou =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.sichegongyongyou =false;
					 _this.ifShowReimburse=true;
				}
			})
		},
		tijian(type){
             //体检费
			var _this=this;
			if(util.trim(_this.mbOwner) == ''){
	            this.$message({message: '请输入体检人',type: 'error'});
				return false
			}
			if(_this.chCheckType == null){
	            this.$message({message: '请选择体检类型',type: 'error'});
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
				chCheckDate:_this.beDate,
				chCheckType:_this.chCheckType,
				chCheckUser:_this.mbOwner,
				chCompany:_this.ciInsuranceType,
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
				     _this.show.tijian =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.tijian =false;
					 _this.ifShowReimburse=true;
				}
			})
		},
		youkachongzhi(type){
            //油卡充值保存
			var _this=this;
			if(util.trim(_this.cardNo) == ''){
	            this.$message({message: '请输入充值卡号',type: 'error'});
				return false
			}
			if(util.trim(_this.mbOwner) == ''){
	            this.$message({message: '请输入卡持有人',type: 'error'});
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
				carNo:_this.carNo,
				costProjectName:_this.costProjectName,
				currency:_this.currency,
				currencyCode:_this.currencyCode,
				dealDate:_this.dealDate,
				files:_this.files,
				gcrCardNo:_this.cardNo,
				gcrCardUser:_this.mbOwner,
				gcrRechargeDate:_this.beDate,
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
				     _this.show.youkachongzhi =false;
				}else if(type == 2){//报销
				    _this.closed();
                     _this.show.youkachongzhi =false;
					 _this.ifShowReimburse=true;
				}
			})
		},
		qita(type){
			//其他保存
           	var _this=this;
			if(_this.tempNames == null){
	            this.$message({message: '请选择费用类型',type: 'error'});
				return false
			}
		    if(_this.startDate != '' && _this.abortDate != ''){
				if(_this.startDate>=_this.abortDate){
					this.$message({message: '截止时间必须大于起始时间',type: 'error'});
					return false
				}
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
				costProjectName:'其他',
				costType:_this.tempNames,
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
				tempType:23
			}
			if(_this.id == 0){
                 util.post('book/saveBillBook',options,function(res){
					_this.dataInit();
					_this.$message({message: '已保存',type: 'success'});
					if(type==0){//保存
						_this.closed();
						_this.show.qita =false;
					}else if(type == 2){//报销
						_this.closed();
						_this.show.qita =false;
						_this.ifShowReimburse=true;
					}
				})
			}else{
				util.post('book/updateBook?bookId='+_this.id,options,function(res){
					_this.dataInit();
					_this.$message({message: '已保存',type: 'success'});
					if(type==0){//保存
						_this.closed();
						_this.show.qita =false;
					}else if(type == 2){//报销
						_this.closed();
						_this.show.qita =false;
						_this.ifShowReimburse=true;
					}
				})
			}
			
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
			this.sfServiceProvidingMan='';
			this.sfServiceInCompany='';
			this.carNo='';
			this.carBrand='';
			this.carUsedYear='';
			this.ciInsuranceCompany='';
			this.ciInsuranceType='';
			this.csServiceCompany='';
			this.hlHouseAddressId='';
			this.mcMeetingName='';
			this.gcGiftNumber='';
			this.gcGiftName='';
			this.chCheckType = null;
			this.cardNo='';
			this.wmMealSubsidyNumber = '';
			this.osNumber = '';
			this.osOfficeName = '';
			this.hlLeaseDeadLine = '';
			this.cgDriveKM = '';
			this.tempNames = null;
			this.id=0;
		},
		deleteBill(tpl){
			//删除开支流水
			var _this=this;
             this.$confirm('确定要删除该开支流水吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    util.get('book/deleteBillBook',{bookId:_this.id},function(data){
                        _this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        _this.closed();
						_this.$store.commit('billListActive',true);
						_this.show[tpl] =false;
                    })
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
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
			if(val != 0){
				this.getDetial();
			}
		},
		getbookStandard(item){
			if(item.billStandards){
			     this.standardChange(item)
			}
		},
		other(data){
			this.costTypeList=data;
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



