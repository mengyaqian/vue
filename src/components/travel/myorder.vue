<template>
  <div class="myOrder">
	    <div class="rightBox">
        <div class="examinationApprova-top">
            <p>我的订单</p>
        </div>
		    <div style="padding:20px;text-align:left">
				   <!-- 顶部pic -->
            <div class="travelBook-right-establish" >                                            
              <a href="" target="_blank" class="xiecdidan">
                  <img class="imag2" border="0" src="../../assets/xiechengdingdan.png" alt="" />
              </a>
            </div> 
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <!--机票订单-->
              <el-tab-pane label="机票订单" name="2">
                    <div class="ruleDiv">
                      <span>订单号 ：<el-input class="inputW" v-model="plant.orderNo" placeholder="PTDEMO201601060001"></el-input></span>
                      <span>出行日期： <el-date-picker v-model="plant.rangDate" type="daterange"  placeholder="选择出行日期"></el-date-picker></span>
                      <span>订单状态：<el-select class="inputW"  v-model="plant.status" placeholder="请选择">
                        <el-option
                          v-for="item in listStatus"
                          :key="item.status"
                          :label="item.name"
                          :value="item.status">
                        </el-option>
                      </el-select>
                      </span>
                      <span>到达城市：
                          <el-select v-model="plant.toCity" filterable remote @visible-change="visibles" :remote-method="remoteMethod"
                                          :loading="loading" placeholder="请选择到达城市" class="inputW">
                            <el-option-group
                            key="0"
                            label="热门城市">
                            <el-option
                              v-for="items in cityListSearch"
                              :key="items.code"
                              :label="items.name"
                              :value="items.name">
                            </el-option>
                            </el-option-group>
                          </el-select>
                      </span>
                      <span>支付方式：<el-select class="inputW"  v-model="plant.payType" placeholder="请选择">
                        <el-option
                          v-for="item in payTypeList"
                          :key="item.status"
                          :label="item.name"
                          :value="item.status">
                        </el-option>
                      </el-select>
                      </span>
                    </div>
                    <div class="ruleDiv" style="margin:16px 0;float:right">
                        <span><el-button type="primary" @click="listPlant">查询</el-button></span>
                        <span><el-button type="primary" @click="resetPlant">重置</el-button></span>
                        <span><el-button type="primary" @click="listPlant">报销</el-button></span>
                    </div>
                    <p style="clear:both"></p>
                    <!--机票订单列表-->
                    <div style="width:100%;">
                          <el-table ref="multipleTable" :data="plant.listdata" tooltip-effect="dark"  style="width: 100%"  @selection-change="handleSelectionChange">
                              <el-table-column  type="selection"  width="55"> </el-table-column>
                              <el-table-column prop="orderId" label="订单号"  width="120"></el-table-column>
                              <el-table-column prop="amount" label="订单金额" width="120"></el-table-column>
                              <el-table-column prop="city" label="出发城市" show-overflow-tooltip> </el-table-column>
                              <el-table-column prop="toCity" label="到达城市" show-overflow-tooltip> </el-table-column>
                              <el-table-column prop="orderName" label="航空公司" ></el-table-column>
                              <el-table-column prop="startDate" :formatter="formatterTime"  label="出行日期" ></el-table-column>
                              <el-table-column prop="payType" :formatter="orderSwitchPayType" label="支付方式" ></el-table-column>
                              <el-table-column prop="status" :formatter="orderSwitchStatus" label="订单状态" ></el-table-column>
                          </el-table>
                    
                    </div>
              </el-tab-pane>
              <!--酒店订单-->
              <el-tab-pane label="酒店订单" name="3">
                      <div class="ruleDiv">
                      <span>订单号 ：<el-input class="inputW" v-model="hotel.orderNo" placeholder="PTDEMO201601060001"></el-input></span>
                      <span>出行日期： <el-date-picker v-model="hotel.rangDate" type="daterange"  placeholder="选择出行日期"></el-date-picker></span>
                      <span>订单状态：<el-select class="inputW"  v-model="hotel.status" placeholder="请选择">
                        <el-option
                          v-for="item in listStatus2"
                          :key="item.status"
                          :label="item.name"
                          :value="item.status">
                        </el-option>
                      </el-select>
                      </span>
                      <span>出差城市：
                          <el-select v-model="hotel.toCity" filterable remote @visible-change="visibles" :remote-method="remoteMethod"
                                          :loading="loading" placeholder="请选择出差城市" class="inputW">
                            <el-option-group
                            key="0"
                            label="热门城市">
                            <el-option
                              v-for="items in cityListSearch"
                              :key="items.code"
                              :label="items.name"
                              :value="items.name">
                            </el-option>
                            </el-option-group>
                          </el-select>
                      </span>
                      <span>支付方式：<el-select class="inputW"  v-model="hotel.payType" placeholder="请选择">
                        <el-option
                          v-for="item in payTypeList"
                          :key="item.status"
                          :label="item.name"
                          :value="item.status">
                        </el-option>
                      </el-select>
                      </span>
                    </div>
                    <div class="ruleDiv" style="margin:16px 0;float:right">
                        <span><el-button type="primary" @click="listHotel">查询</el-button></span>
                        <span><el-button type="primary" @click="resetHotel">重置</el-button></span>
                        <span><el-button type="primary" @click="listHotel">报销</el-button></span>
                    </div>
                    <p style="clear:both"></p>
                      <!--酒店订单列表-->
                    <div style="width:100%;">
                          <el-table ref="multipleTable" :data="hotel.listdata" tooltip-effect="dark"  style="width: 100%"  @selection-change="handleSelectionChange">
                              <el-table-column  type="selection"  width="55"> </el-table-column>
                              <el-table-column prop="orderId" label="订单号"  width="120"></el-table-column>
                              <el-table-column prop="amount" label="订单金额" width="120"></el-table-column>
                              <el-table-column prop="cityName" label="出差城市" show-overflow-tooltip> </el-table-column>
                              <el-table-column prop="orderName" label="酒店名称" show-overflow-tooltip> </el-table-column>
                              <el-table-column prop="startDate" :formatter="formatterTime"  label="入住日期" ></el-table-column>
                              <el-table-column prop="payType" :formatter="orderSwitchPayType" label="支付方式" ></el-table-column>
                              <el-table-column prop="status" :formatter="orderSwitchStatus" label="订单状态" ></el-table-column>
                          </el-table>
                    
                    </div>
              </el-tab-pane>
              <!--火车票订单-->
              <el-tab-pane label="火车票订单" name="1">
                  <div class="ruleDiv">
                      <span>订单号 ：<el-input class="inputW" v-model="train.orderNo" placeholder="PTDEMO201601060001"></el-input></span>
                      <span>出行日期： <el-date-picker v-model="train.rangDate" type="daterange"  placeholder="选择出行日期"></el-date-picker></span>
                      <span>订单状态：<el-select class="inputW"  v-model="train.status" placeholder="请选择">
                        <el-option
                          v-for="item in listStatus"
                          :key="item.status"
                          :label="item.name"
                          :value="item.status">
                        </el-option>
                      </el-select>
                      </span>
                      <span>到达城市：
                          <el-select v-model="train.toCity" filterable remote @visible-change="visibles" :remote-method="remoteMethod"
                                          :loading="loading" placeholder="请选择到达城市" class="inputW">
                            <el-option-group
                            key="0"
                            label="热门城市">
                            <el-option
                              v-for="items in cityListSearch"
                              :key="items.code"
                              :label="items.name"
                              :value="items.name">
                            </el-option>
                            </el-option-group>
                          </el-select>
                      </span>
                      <span>支付方式：<el-select class="inputW"  v-model="train.payType" placeholder="请选择">
                        <el-option
                          v-for="item in payTypeList"
                          :key="item.status"
                          :label="item.name"
                          :value="item.status">
                        </el-option>
                      </el-select>
                      </span>
                    </div>
                    <div class="ruleDiv" style="margin:16px 0;float:right">
                        <span><el-button type="primary" @click="listPlant">查询</el-button></span>
                        <span><el-button type="primary" @click="resetPlant">重置</el-button></span>
                        <span><el-button type="primary" @click="listPlant">报销</el-button></span>
                    </div>
                    <p style="clear:both"></p>
                    <!--火车订单列表-->
                    <div style="width:100%;">
                          <el-table ref="multipleTable" :data="train.listdata" tooltip-effect="dark"  style="width: 100%"  @selection-change="handleSelectionChange">
                              <el-table-column  type="selection"  width="55"> </el-table-column>
                              <el-table-column prop="orderId" label="订单号"  width="120"></el-table-column>
                              <el-table-column prop="amount" label="订单金额" width="120"></el-table-column>
                              <el-table-column prop="city" label="出发城市" show-overflow-tooltip> </el-table-column>
                              <el-table-column prop="toCity" label="到达城市" show-overflow-tooltip> </el-table-column>
                              <el-table-column prop="levelName" label="坐席" ></el-table-column>
                              <el-table-column prop="startDate" :formatter="formatterTime"  label="出行日期" ></el-table-column>
                              <el-table-column prop="payType" :formatter="orderSwitchPayType" label="支付方式" ></el-table-column>
                              <el-table-column prop="status" :formatter="orderSwitchStatus" label="订单状态" ></el-table-column>
                          </el-table>
                    
                    </div>
              </el-tab-pane>
            </el-tabs>
         
			  </div>
		</div>
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
  name: 'MyOrder',
  data () {
    return {
       IsOpen:false,
	     activeName2: '2',
       loading:false,
       plant:{
         listdata:[],
         orderNo:'',
         rangDate:[
            new Date(new Date().valueOf()- (1000*60*60*24*30)),
            new Date()
        ],
        status:1,
        toCity:'',
        payType:1
       },
       hotel:{
         listdata:[],
         orderNo:'',
         rangDate:[
            new Date(new Date().valueOf()- (1000*60*60*24*30)),
            new Date()
        ],
        status:1,
        toCity:'',
        payType:1
       },
      train:{
         listdata:[],
         orderNo:'',
         rangDate:[
            new Date(new Date().valueOf()- (1000*60*60*24*30)),
            new Date()
        ],
        status:1,
        toCity:'',
        payType:1
       },
      listStatus:[
        {name:'全部',status:-2},
        {name:'已出行',status:1},
        {name:'已支付',status:0},
        {name:'已报销',status:2}
      ],
      listStatus2:[
        {name:'全部',status:-2},
        {name:'已入住',status:1},
        {name:'已支付',status:0},
        {name:'已报销',status:2}
      ],
      payTypeList:[
        {name:'全部',status:-2},
        {name:'个人支付',status:1},
        {name:'企业支付',status:0},
      ],
      hotCityList:[],
      cityListSearch:[]

    }
  },
  methods:{
      listPlant(){
          var option = {
              tbType:this.activeName2,
              approvalNo:this.plant.orderNo,
              startTime:util.getDefaultTime(this.plant.rangDate[0]),
              endTime:util.getDefaultTime(this.plant.rangDate[1]),
              toCity:this.plant.toCity,
              status:this.plant.status,
              payType:this.plant.payType
          }
          var _this = this;
          util.get('travelBook/new/queryNewTravelBook',option,function(res){
                      var a =   {"statusCode":"200","message":[{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":0,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":0,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":2,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":3,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},]};
             
              _this.plant.listdata = a.message;
          })
      },
      listHotel(){
          var option = {
              tbType:this.activeName2,
              approvalNo:this.hotel.orderNo,
              startTime:util.getDefaultTime(this.hotel.rangDate[0]),
              endTime:util.getDefaultTime(this.hotel.rangDate[1]),
              toCity:this.hotel.toCity,
              status:this.hotel.status,
              payType:this.hotel.payType
          }
          var _this = this;
          util.get('travelBook/new/queryNewTravelBook',option,function(res){
                      var a =   {"statusCode":"200","message":[{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":0,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":0,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":2,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":3,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},]};
             
              _this.hotel.listdata = a.message;
          })
      },
       listTrain(){
          var option = {
              tbType:this.activeName2,
              approvalNo:this.train.orderNo,
              startTime:util.getDefaultTime(this.train.rangDate[0]),
              endTime:util.getDefaultTime(this.train.rangDate[1]),
              toCity:this.train.toCity,
              status:this.train.status,
              payType:this.train.payType
          }
          var _this = this;
          util.get('travelBook/new/queryNewTravelBook',option,function(res){
                      var a =   {"statusCode":"200","message":[{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":0,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":0,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":2,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"approvalNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":3,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},]};
             
              _this.train.listdata = a.message;
          })
      },
      resetPlant(){
         this.plant.orderId='';
         this.plant.rangDate=[
            new Date(new Date().valueOf()- (1000*60*60*24*30)),
            new Date()
        ];
        this.plant.status=1;
        this.plant.toCity='';
        this.plant.payType=1;
      },
      resetHotel(){
         this.hotel.orderId='';
         this.hotel.rangDate=[
            new Date(new Date().valueOf()- (1000*60*60*24*30)),
            new Date()
        ];
        this.hotel.status=1;
        this.hotel.toCity='';
        this.hotel.payType=1;
      },
      resetTrain(){
         this.train.orderId='';
         this.train.rangDate=[
            new Date(new Date().valueOf()- (1000*60*60*24*30)),
            new Date()
        ];
        this.train.status=1;
        this.train.toCity='';
        this.train.payType=1;
      },
      handleClick(tab, event) {
        //切换执行
        if(tab.name == 2){
         this.listPlant()
        }else if(tab.name == 3){
          this.listHotel()
        }else{
          this.listTrain()
        } 
      },
      remoteMethod(query){ 
        //城市搜索
        var re = /[^\u4e00-\u9fa5]/;  
        var option={};
        if(re.test(query)){
          option={letter:query}
        } else{
          option={chineseCharacters:query}
        }
        if (query != '') {
          var _this=this;
          _this.loading = true;
          util.get('book/findCity',option,function(res){
            _this.loading = false;
            _this.cityListSearch = res;
          })
        } else {
          this.loading = false;
          _this.cityListSearch = this.hotCityList;
        }
		  },
      visibles(v){
		    this.cityListSearch =this.hotCityList;
		  },
     handleSelectionChange(val) {
       //选择框改变
       console.log(val)
       // this.multipleSelection = val;
      },
      formatterTime(row){
				//列表日期处理
				return util.getDefaultTime(row.startDate.time).substring(0,10)
			},
      orderSwitchPayType(row){
        //列表支付方式处理
        return (row.payType == 0 ? '企业支付':'个人支付')
      },
      orderSwitchStatus(row){
        //列表订单状态处理
        switch(row.status){
	  		  case 0:
	  			  return "已支付";
	  			case 1:
	  			  return "已入住";
	  			case  2:
	  			   return "已报销";
	  		}
      },
      isopen(){
         //是否开通携程状态码还有问题
         var _this = this;
         util.get('ctripService/checkOrgRegist',{},function(res){
            if(res.code == '1102'){
               _this.IsOpen=false;
            }else if(res.code == '200'){
              _this.IsOpen=true;
            }
         })
      },
      init(){
        var _this=this;
        util.get('book/findCityHot',{},function(res){   
           _this.hotCityList = res;
           _this.cityListSearch = res;
        })
      }
  },
  created(){
     this.init();
     this.listPlant();
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .examinationApprova-top{
    height: 47px;
    padding: 0 24px;
    overflow: hidden;
    margin-bottom: 20px;
    border-bottom: #D2D2D2 1px solid;
    text-align:left
 }
.examinationApprova-top p {
    height: 16px;
    line-height: 16px;
    padding-left: 13px;
    margin-top: 16px;
    border-left: #277BCF 2px solid;
}
.travelBook-right-establish{
  margin-bottom:16px
}
.ruleDiv span{
  padding:0 12px
}
.inputW {
    width: 150px;
}
</style>
