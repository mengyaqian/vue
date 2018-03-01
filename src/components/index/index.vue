<template>
  <div class="home">
	    <div style="margin:90px 20px 10px;">
			<el-row :gutter="20">
				<el-col :span="6">
				  <div class="grid-content bg-purple">最新消息</div>
				  <div class="border" v-bind:style="{height:boxHeight,overflow:'auto'}" >
              <ul class="msgUl">
                  <li v-for="item in newMessageList">
                    <router-link to="/indexNotice"> 
                         <p class="ptitle">{{item.title}}</p>
                         <p class="pcreate">{{item.username}}<span>{{item.createDate}}</span></p>
                    </router-link>
                  </li>
              </ul>
              <p v-if="size == 0" style="color:#277BCF;padding:30px 0;">暂无数据~</p>
          </div>
				</el-col>
				<el-col :span="12">
				  <div class="grid-content bg-purple">业务消息</div>
          <div class="border" v-bind:style="{height:boxHeight}">
              <ul class="businessMsgUl">
                  <li>
                    <router-link to="/message"> 
                     <img src="../../assets/toDoBusiness.png">
                     <div class="div1">
                        <p class="p1">待办<span v-if="msgOne" style="float:right;color:#666">{{msgOne.createdOn | getTime}}</span></p>
                        <p style="color:#666"  v-if="msgOne">{{msgOne.content}}</p>
                        <p style="color:#666" v-else>暂无消息</p>
                     </div>
                    </router-link>
                  </li>
                    
                 <li>
                     <router-link to="/remind"> 
                     <img src="../../assets/approveResult.png">
                     <div class="div1">
                        <p class="p1">提醒<span  v-if="msgTwo"  style="float:right;color:#666">{{msgTwo.createdOn | getTime}}</span></p>
                        <p style="color:#666"  v-if="msgTwo">{{msgTwo.content}}</p>
                        <p style="color:#666" v-else>暂无消息</p>
                     </div>
                      </router-link>
                  </li>
                  <li>
                      <router-link to="/waring"> 
                     <img src="../../assets/early-warning.png">
                     <div class="div1">
                        <p class="p1">预警<span  v-if="msgThree" style="float:right;color:#666">{{msgThree.createdOn | getTime}}</span></p>
                        <p style="color:#666"  v-if="msgThree">{{msgThree.content}}</p>
                        <p style="color:#666" v-else>暂无消息</p>
                     </div>
                      </router-link>
                  </li>
              </ul>
              <div class="scheduleBox">
                 <p class="p2">日程</p>  
                 <schedule></schedule>
             </div>
          </div>
				</el-col>
				<el-col :span="6">
            <div class="pr" v-bind:style="{height:boxHeight}">
                <div class="border surface">
                    <div class="div2">
                      <p class="p1">{{now.time}}</p>
                      <p class="p2">{{now.date}} {{now.week}}</p>
                    </div>
                    <div class="div3 clears">
                      <img src="../../assets/xxxlll.png">
                      <p class="p3">签到统计</p>
                    </div>
                </div>
                <div class="border waters">
                    <div>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                          <el-tab-pane label="我的开支流水分部" name="first">
                              <div>
                                 统计时间：<el-date-picker v-model="rangDate" type="daterange" @change="findBillByDate" ></el-date-picker>
                              </div>
                              <div id="main" style="width: 100%;height:240px;"></div>
                              <ul class="watersUl">
                                 <li v-for="item in billData"><span class="watericon" v-bind:style="{background:item.color}"></span><p>{{item.tempName}}</p></li>
                              </ul>
                          </el-tab-pane>
                          <el-tab-pane label="我的开支流水曲线" name="second">
                              <div>
                                  统计时间：<el-date-picker v-model="waterMonth" type="month" @change="findBillByDate"></el-date-picker>
                                  <div id="main2" style="width: 100%;height:380px;"></div>
                              </div>
                          </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>   
        </el-col>
			</el-row>
		</div>
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
import echarts from 'echarts'
import schedule from '@/components/common/schedule.vue'
export default {
  name: 'Home',
  components:{schedule},
  data () {
    return {
      boxHeight:(util.wHeight-160)+'px',
      newMessageList:[],
      msgOne:{
        createdOn:{time:''}
      },
      msgTwo:{
        createdOn:{time:''}
      },
      msgThree:{
        createdOn:{time:''}
      },
      billData:[],
      size:0,
      activeName:'first',
      rangDate:[
        new Date(new Date().valueOf()- (1000*60*60*24*30)),
        new Date()
      ],
      waterMonth:new Date(),
      now:{
        date:util.getDefaultTime().substring(0,10),
        week:'星期' + '日一二三四五六'.charAt(new Date().getDay()),
        time:''
      }
    }
  },
  methods:{
      newMessage(){
         var _this = this;
         util.post('users/notices/noticeList',{type:0},function(res){
             _this.newMessageList = res.data;
             _this.size = res.data.length;
         })
      },
      businessMsg(){
        var _this = this;
         util.post('messages/home',{},function(res){
            _this.msgOne = res.data.msgOne
            _this.msgTwo = res.data.msgTwo
            _this.msgThree = res.data.msgThree
         })
      },
      handleClick(tab, event){
          console.log(tab, event);
          this.findBillByDate()
      },
      findBillByDate(){
        var _this = this;
        var backcolor = ['#f7bb3e','#f3b0e2','#33d396','#24c3cd','#f48a4a','#38b9e9'];//开支类型背景色
        var pdata = {};
        if(_this.activeName == 'first'){
            pdata = {
              startDate:util.getDefaultTime(_this.rangDate[0]),
              endDate:util.getDefaultTime(_this.rangDate[1])
            }
        }else{
             pdata = {
              startDate:util.getDefaultTime(_this.waterMonth),
              endDate:0
            }
        }
        
        util.post('bills/findBillBook',pdata,function(res){
           _this.billData = res.data;
           var arrdata = [];
           if(_this.activeName == 'first'){//饼图
              for(var i=0; i<res.data.length;i++){
                 arrdata[i] = {"value":res.data[i].amount,"name":res.data[i].tempName};
                 var num = i<backcolor.length?i:i%backcolor.length;
                 _this.billData[i].color = backcolor[num]
              }
              _this.doBillChart(arrdata,backcolor)
           }else{//折线图
              var bm = res.data;
              var arrdata = [];//折线图数据
              var dateNum = [];//日期数据
              for(var i=1; i<=31; i++){
                if(typeof(bm[i+''])!="undefined"){
                  arrdata.push((bm[i+'']/1000).toFixed(2));
                  dateNum.push(i);
                }
              }
              _this.dochartTwo(dateNum,arrdata);
           }
        })
      },
      doBillChart(data,color){
          let myChart = echarts.init(document.getElementById('main'));
          var option = {
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)",
              x:'center'
          },
          series : [
              {
                  name:'开支类型',
                  type: 'pie',
                  radius : ['20%','60%'],
                  center: ['50%', '50%'],
                  color: color,
                  data:data,
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
                }
            ]
        };				
				myChart.setOption(option);
      },
      dochartTwo(date, data){
				var myChart = echarts.init(document.getElementById('main2'));
        var option = {
          title : {
              subtext: '折合本币(千元)',
              subtextStyle:{
                color:'#333333'
              },
          },
          tooltip : {
              trigger: 'axis'
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : date
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  axisLabel : {
                      formatter: '{value}'
                  }
              }
          ],
          series :[{
                  name:'本日开支',
                  type:'line',
                  data:data,
                  itemStyle : {  
                    normal : { 
                          color:'#277BCF',//折点颜色
                        lineStyle:{  
                            color:'#277BCF'  //折线颜色
                        }  
                    }  
                  },  
          }]
        };			
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},
      getNow(){
        var times = new Date();
        var hour=this.checkTime(times.getHours());   //获取时  
        var minite=this.checkTime(times.getMinutes());  //获取分  
        var second=this.checkTime(times.getSeconds());  //获取秒  
        this.now.time = hour+':'+minite+':'+second
      },
      checkTime(i){  
          if(i<10) return "0"+i;  
          return i;  
      }  

  },
  created(){
     this.newMessage();
     this.businessMsg();
     this.findBillByDate();
     setInterval(this.getNow,1000);
  },
  filters: {
    getTime(time){
		   return util.getDefaultTime(time);
		},
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
  .border{
    border:1px solid #ddd;
    border-radius:3px
  }
  .msgUl{
    padding:16px
  }
  .msgUl li{
    line-height:1.5;
    padding:12px 0;
    text-align:left;
    border-bottom:1px dashed #ddd
  }
  .msgUl li .ptitle{
    color:#333
  }
   .msgUl li .pcreate{
    color:#666
  }
  .businessMsgUl{
     padding:0 20px;
     height:300px;
     border-bottom:1px solid #ddd;
     margin-bottom:20px
  }
  .businessMsgUl li{
    height:50px;
    padding:10px 0;
    position:relative;
    border-bottom:1px solid #ddd;
    text-align:left;
    overflow:hidden;
  }
  .businessMsgUl li img{
    width:50px;
    height:50px
  }
  .businessMsgUl li .div1{
    position:absolute;
    left:60px;
    top:10px;
    right:10px
  }
  .div1 .p1{
    margin-bottom:8px;
    color:#333
  }
  .businessMsgUl li a{
    display:block;
  }
  .scheduleBox{

  }
  .scheduleBox .p2{
    height:45px;
    line-height:45px;
    text-align:left;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
    background:#E6EFF7;
    padding-left:20px
  }
  .pr{
    position:relative
  }
  .surface{
    height:105px;
  }
  .surface .div2{
     width:50%;
     height:100%;
     float:left;
     text-align:center
  }
  .surface .div3{
    width:40%;
    height:100%;
    background:#277BCF;
    color:#fff;
    float:right;
    text-align:center;
  }
  .surface .div2 .p1{
    font-weight:500;
    font-size:32px;
    line-height:70px
  }
  .surface .div2 .p2{
    line-height:28px
  }
  .surface .div3 img{
    width:45px;
    height:45px;
    margin: 20px auto 0
  }
  .surface .div3 .p3{
     line-height:20px;
     text-indent:0
   }
   .waters{
     position:absolute;
     top:130px;
     bottom:0;
     left:0;
     right:0
   }
   .watersUl{
     padding:0 20px;
   }
   .watersUl li{
      height:12px;
      line-height:12px;
      margin-bottom:18px;
      text-align:left;
      text-indent:10px
   }
   .watericon{
     width:12px;
     height:12px;
     float:left;
   }
</style>
