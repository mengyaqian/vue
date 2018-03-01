<template>
    <div class="billListNot">
        <div class="leftTwoNav">
              <el-button class="addBill" type="primary"><router-link to="/billListAdd">记一笔</router-link></el-button>
            <el-menu mode="vertical" :default-active="$route.path" router class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item  key="/billList" index="/billList"><i class="el-icon-message"></i>开支流水汇总</el-menu-item>
                <el-menu-item key="/billListNot" index="/billListNot"><i class="el-icon-message"></i>未报销</el-menu-item>
                <el-menu-item key="/billListYes" index="/billListYes"><i class="el-icon-message"></i>已报销</el-menu-item>
            </el-menu>
        </div>
            <div class="rightBox2">
                <div style="padding:20px; text-align:left;">
                    <div class="expenditure-water-totel" style="display: block;">
                        <div class="expenditure-water-top">
                            <img src="../../assets/not-pay.png" style="width:20px;height:20px">
                            <el-date-picker @change="selectChange" class="left10" v-model="month" type="month" placeholder="选择月"></el-date-picker>
                            <el-select v-model="currencyId" placeholder="请选择币种"   class="left10" @change="selectChange">
                               <el-option v-for="item in currencyData" :key="item.id" :label="item.code" :value="item.id"></el-option>
                            </el-select>
                             <el-button style="margin-left:10px" type="primary">报销</el-button>
                        </div>
                        <div style="height:12px"></div>
                        <ul id="billall">
                            <li v-for="item in listdata">
                                <div  class="have-pay"  @click.stop="seeBill(item.id,item.tempType)">
                                    <div class="TreeLineR"></div>
                                    <p class="branch-icon"><img src="../../assets/not-icon.png"></p>
                                    <p class="branch-line"></p>
                                    <p class="branch-kind"><img :src="imgfun(item.tempType)"></p>
                                    
                                    <div class="hover-background-right">
                                        <span class="branch-kind-text">{{item.createdOn | getTime}}<br>{{item.tempName}}</span>
                                        <span class="branch-kind-money">{{item.amount}} {{item.currencyCode}}</span>
                                    </div>
                                </div>
                                <el-checkbox class="checks" v-model="item.check" @change="checkboxHand($event,item)"></el-checkbox>
                            </li>
                        </ul>
      
                        <el-button  @click="nextPage" type="text">下一页>></el-button>
                    </div>
                     <!--饼图-->
                     <div style="width:45%;min-height:500px;float:right;margin:30px auto;overflow:auto">
                         <div class="canvanpic" id="myChart"></div>
                     </div>
                </div>
                 <expenseWater></expenseWater>
            </div>
    </div>
</template>

<script>
import util from '@/util/util.js'
import billPublic from '@/util/billPublic.js'
import axios from 'axios'
import echarts from 'echarts'
import expenseWater from '@/components/common/expenseWater.vue'
export default {
    name: 'billListNot',
    components:{expenseWater},
    data () {
        return {
            listdata:[],
            page:1,
            load:true,
            month:'',
            currencyData:[],
            currencyId:-1,
            checked:false
        }
    },
     computed:{
		isRefresh(){
			 return this.$store.getters.billListRefresh;
		},
    },
    watch:{
		isRefresh(data){
           if(data == true){
                if(this.$route.path == '/billListNot')
                this.page=1;
                this.listdata=[];
                this.getList();
                this.$store.commit('billListActive',false);
           }
		},
    },
    methods:{
        handleSelect(key, keyPath){
            console.log(key)
        },
        selectChange(){
           this.listdata=[];
           this.page=1;
           this.getList()
        },
        getList(){
            var _this = this; 
            var option={
                date:_this.month == ''?'':util.getDefaultTime(_this.month).substring(0,7),
                currency:_this.currencyId,
                status:0,
                page:_this.page,
            }
            if(_this.load == true){
                _this.load=false;
                util.post('bills/listAllBillBook',option,function(res){
                   for(let v of res.data.billBooks){
                      v.check=false
                   }
                    _this.listdata.push(...res.data.billBooks);
                    if(_this.page == 1){
                        _this.pieData(res.data.billBooks);
                    }
                    _this.page +=1;
                    _this.load=true;
                    
                },{format:true})
            }  
        },
        pieData(result){
              //饼图数据处理
              var arrList = result;
              var listJson = {}; //单币种统计数据
              var currJson = {}; //多币种统计数据
              var rateJson={};
              var legendData=[];
              for(var i = 0; i < arrList.length; i++){
                var _item = arrList[i];
                //生成单币种统计数据
                if(listJson[_item.tempName]){
                  listJson[_item.tempName] += _item.amount;
                }else{
                  listJson[_item.tempName] = _item.amount;
                }
                //生成多币种统计数据
                if(currJson[_item.currencyCode]){
                  currJson[_item.currencyCode] += _item.amount;
                }else{
                  currJson[_item.currencyCode] = _item.amount;
                }
                rateJson[_item.currencyCode] = _item.rate;
              }
              var data = [];
              if(this.currencyId == -1){//多币种
                  for(var key in currJson){
                    var _amount = currJson[key];
                    var binAmount = (_amount * rateJson[key]).toFixed(2);
                    data.push({
                      name:key+' '+_amount.toFixed(2),
                      value:binAmount,
                      binAmount:_amount,
                    });
                    legendData.push(key+' '+_amount.toFixed(2));
                  }
              }else{
                 for(var key in listJson){
                  var _amount = listJson[key];            
                  data.push({
                    name:key+' '+_amount.toFixed(2),
                    value:(_amount*_item.rate).toFixed(2)
                  });	
                   legendData.push(key+' '+_amount.toFixed(2));
                }	
              }
              this.doChart('myChart',data,legendData)
             
        },
        currencyList(){
           let _this=this;
           util.post('webconfig/currency',{},function(res){
                var add=[{id:-1,code:'全部'}]
                _this.currencyData = add;
                _this.currencyData.push(...res.data)
           })
        },
        imgfun(type){
            return billPublic.billListImg(type)
        },
        doChart(id,data,legendData){
             let myChart = echarts.init(document.getElementById(id));
             let colors = [ '#f7bb3e', '#f3b0e2', '#33d396', '#24c3cd','#f48a4a', '#38b9e9', '#f7bb3e', '#f3b0e2', '#33d396', '#24c3cd','#f48a4a', '#38b9e9', '#f7bb3e', '#f3b0e2', '#33d396', '#24c3cd','#f48a4a', '#38b9e9', '#f7bb3e', '#f3b0e2', '#33d396', '#24c3cd','#f48a4a', '#38b9e9'];
              var option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)",
                        formatter : "{b} ({d}%)<br>折合人民币:{c}"
                    },
                    legend: {
                        x: 'left',
                        orient: 'vertical',
                       // bottom: 'bottom', 
                        width: 150,
                        top: 30,
                        data: legendData
                    },
                    series : [
                        {
                            name: '币种',
                            type: 'pie',
                            radius : '55%',
                            radius : [ '30%', '70%' ],
                            center : [ '50%', '60%' ],
                            color:colors,
                            data:data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            center:[400,'50%']
                        }
                    ]
              };
              myChart.setOption(option);
        },
        nextPage(){
             this.getList();
        },
         seeBill(id,tempType){
            //查看开支流水详情 
            var _this= this;
            util.post('basebills/bookStandard',{},function(res){
                var item = {};
                for(let v of res.data){
                    if(v.tempCode == tempType){
                        item = v;
                    }
                }
                _this.$store.commit('waterInfo',{item:item,waterShow:true,id:id});         
            })
        },
        checkboxHand(val,item){
            console.log(val.target.checked)
            console.log(item)
        }
    },
  created(){
     this.getList();
     this.currencyList();

  },
   filters: {
    getTime(time){
		   return util.getDefaultTime(time).substring(0,10);
		},
  },
 /* mounted(){
        let _this = this;  
       window.addEventListener('scroll',function(){   
            if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                _this.getList();
            }
       })
      
  }*/
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .expenditure-water-totel {
    margin: 45px auto 45px 10px;
    width: 400px;
    position: relative;
    text-align:left;
    float:left
}
.expenditure-water-top {

    margin-left: 28px;
    border-radius: 4px;
}
.not-top {
    float: left;
    width: 200px;
    height: 100%;
    background: #00ABEC;
    text-align: center;
    line-height:30px;
    cursor:pointer;
    
}
.not-top a{
  color:#fff
}
.have-top {
    float: left;
    width: 200px;
    height: 100%;
    text-align: center;
     line-height:30px;
    cursor:pointer;
  
}
.have-top a{
    color:#00ABEC
}
.expenditure-water-totel ul li {
    position: relative;
    display: block;
    width: 100%;
    height: 94px;
}

.have-pay {
    width: 363px;
    height: 100%;
    float: right;
    position: relative;
}
.not-pay {
    width: 361px;
    height: 100%;
    float: left;
    position: relative;
    border-left: none;
}
.TreeLineR {
    position: absolute;
    width: 1px;
    height: 86px;
    left: 0px;
    top: -40px;
    background: #979797;
}
.TreeLineL {
    position: absolute;
    width: 1px;
    height: 86px;
    right: -2px;
    top: -40px;
    background: #979797;
}
.have-pay p, .have-pay span, .not-pay p, .not-pay span{
    display: block;
    position: absolute;

}
.branch-icon {
    top: 50%;
    margin-top: -10px;
    left: -10px;
    width: 20px;
    height: 20px;
}
.branch-icon-1 {
    top: 50%;
    margin-top: -10px;
    right: -11px;
    width: 20px;
    height: 20px;
}
.branch-line {
    width: 62px;
    height: 1px;
    background: #979797;
    left: 9px;
    top: 50%;
    margin-top: -0.5px;
}
.branch-line-1 {
    width: 62px;
    height: 1px;
    background: #979797;
    right: 9px;
    top: 50%;
    margin-top: -0.5px;
}
.branch-kind {
    width: 35px;
    height: 35px;
    top: 50%;
    margin-top: -17.5px;
    left: 71px;
}
.branch-kind-1 {
    width: 35px;
    height: 35px;
    top: 50%;
    margin-top: -17.5px;
    right: 71px;
}
.branch-kind-text {
    text-align: left;
    height: 40px;
    left: 10px;
    top: 50%;
    margin-top: -20px;
    font-size:12px;
    line-height:20px
}
.branch-kind-text-1 {
    height: 40px;
    text-align: left;
    right: 16px;
    top: 50%;
    margin-top: -20px;
    font-size:12px;
    line-height:20px
}
.branch-kind-money {
    height: 20px;
    left: 190px;
    top: 50%;
    margin-top: -10px;
    color: #333333;
    line-height: 20px;
    font-size:12px
}
.branch-kind-money-1 {
    height: 20px;
    right: 30px;
    top: 50%;
    margin-top: -10px;
    color: #000000;
    width: 200px;
    line-height: 20px;
        font-size:12px
}
.hover-background-right{
    width: 270px;
    height: 57px;
    position: absolute;
    left: 116px;
    top: 50%;
    margin-top: -28px;
    border-radius: 4px;
    cursor: pointer;
   border:1px solid #ddd

}
.hover-background-left {
    width: 270px;
    height: 57px;
    position: absolute;
    left: -25px;
    top: 50%;
    margin-top: -28px;
    border-radius: 4px;
    cursor: pointer;
    border:1px solid #ddd


}
.hover-background-right:hover,.hover-background-left:hover{
  background:#dedede
}
.edit-and-delete{
  position:absolute;
  top:0px;
  left:10px;
  display:none
}
.hover-background-left:hover .edit-and-delete{
    display:block
}
.left10{
  margin-left:10px;
  width:110px
}
.checks{position:absolute;right:-50px;top:40px}
.canvanpic{width:600px;height:400px;margin-top:30px;overflow:auto}
.addBill{
    margin-top:16px;
}
.addBill a{
  color:#fff
}
</style>
