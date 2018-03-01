<template>
    <div class="billList">
        <div class="leftTwoNav">
            <el-button class="addBill" type="primary"><router-link to="/expenses/billListAdd">记一笔</router-link></el-button>
            <el-menu mode="vertical" :default-active="$route.path" router class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item  key="/expenses/billList" index="/expenses/billList"><i class="el-icon-message"></i>开支流水汇总</el-menu-item>
                <el-menu-item key="/expenses/billListNot" index="/expenses/billListNot"><i class="el-icon-message"></i>未报销</el-menu-item>
                <el-menu-item key="/expenses/billListYes" index="/expenses/billListYes"><i class="el-icon-message"></i>已报销</el-menu-item>
            </el-menu>
        </div>
            <div class="rightBox2">
                <div style="padding:20px; text-align:left;">
                    <div class="expenditure-water-totel" style="display: block;">
                        <div class="expenditure-water-top">
                            <div class="not-top"><router-link to="/expenses/billListNot">未报销</router-link></div>
                            <div class="have-top"><router-link to="/expenses/billListYes">已报销</router-link></div>
                        </div>
                        <div style="height:38px"></div>
                        <ul id="billall">
                            <li v-for="item in listdata">
                                <div v-if="item.status == 1" class="have-pay"  @click="seeBill(item.id,item.tempType)">
                                    <div class="TreeLineR"></div>
                                    <p class="branch-icon"><img src="../../assets/have-icon.png"></p>
                                    <p class="branch-line"></p>
                                    <p class="branch-kind"><img :src="imgfun(item.tempType)"></p>
                                    
                                    <div class="hover-background-right">
                                        <span class="branch-kind-text">{{item.createdOn | getTime}}<br>{{item.tempName}}</span>
                                        <span class="branch-kind-money">{{item.amount}} {{item.currencyCode}}</span>
                                    </div>
                                </div>
                                <div class="not-pay" @click="seeBill(item.id,item.tempType)" v-else>
                                    <div class="TreeLineL"></div>
                                    <p class="branch-icon-1"><img src="../../assets/not-icon.png"></p>
                                    <p class="branch-line-1"></p>
                                    <p class="branch-kind-1"><img :src="imgfun(item.tempType)"></p>
                                    <div class="hover-background-left">
                                            <span class="branch-kind-text-1">{{item.createdOn}}<br>{{item.tempName}}</span>
                                            <span class="branch-kind-money-1">{{item.amount}} {{item.currencyCode}}</span>
                                            <div class="edit-and-delete">
                                                <!-- <i class="el-icon-edit" style="margin-right:10px"></i>-->
                                                <i class="el-icon-delete" @click.stop="deletes(item.id)"></i>
                                            </div>
                                        </div>
                                </div>
                            </li>
                        </ul>
                
                    </div>
            
                </div>
            </div>
            <expenseWater></expenseWater>
    </div>
</template>

<script>
import util from '@/util/util.js'
import billPublic from '@/util/billPublic.js'
import axios from 'axios'
import expenseWater from '@/components/common/expenseWater.vue'
export default {
    name: 'BillList',
    components:{expenseWater},
    data () {
        return {
            listdata:[],
            page:1,
            load:true
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
                if(this.$route.path == '/expenses/billList')
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
        getList(){
            var _this = this; 
            var option={
                date:0,
                currency:-1,
                status:-1,
                page:_this.page,
            }
            if(_this.load == true){
                _this.load=false;
                util.post('bills/listAllBillBook',option,function(res){
                    _this.listdata.push(...res.data.billBooks);
                    _this.page +=1;
                    _this.load=true;
                },{format:true})
            }  
        },
        imgfun(type){
           return  billPublic.billListImg(type)
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
        deletes(id){
            //删除开支流水
			var _this=this;
              this.$confirm('确定要删除该开支流水吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    util.post('bills/deleteBillBook',{bookId:id},function(data){
                        _this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        _this.page=1;
                        _this.listdata=[];
                        _this.getList();
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
     this.getList()
  },
  mounted(){
        let _this = this;  
       window.addEventListener('scroll',function(){   
            if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                _this.getList();
            }
       })
  },
  filters: {
    getTime(time){
		   return util.getDefaultTime(time).substring(0,10);
		},
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .expenditure-water-totel {
    margin: 45px auto;
    width: 725px;
    position: relative;
    text-align:left
}
.expenditure-water-top {
    width: 400px;
    height: 29px;
    margin: auto;
    border: 1px solid #00ABEC;
    border-radius: 4px;
    overflow: hidden;
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
.addBill{
    margin-top:16px;
}
.addBill a{
  color:#fff
}
</style>
