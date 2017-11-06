<template>
    <div class="billList">
        <div class="leftTwoNav">
            <el-button class="addBill" type="primary">记一笔</el-button>
            <el-menu mode="vertical" :default-active="$route.path" router class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item  key="/billList" index="/billList"><i class="el-icon-message"></i>开支流水汇总</el-menu-item>
                <el-menu-item key="/billListNot" index="/billListNot"><i class="el-icon-message"></i>未报销</el-menu-item>
                <el-menu-item key="/billListYes" index="/billListYes"><i class="el-icon-message"></i>已报销</el-menu-item>
            </el-menu>
        </div>
        <div class="rightBox2">
            <div style="padding:20px; text-align:left;">
                    <ul class="billListUl">
                    <li v-for="(item,index) in listdata" @click="open(item)">
                        <div class="icon"><img :src="imgfun(item.tempCode)"><p>{{item.tempName}}</p></div>
                    </li>
                    </ul>
            
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
    name: 'BillListAdd',
    components:{expenseWater},
    data () {
        return {
            listdata:[],
            otherList:[]
        }
    },
    methods:{
        handleSelect(key, keyPath){
            console.log(key)
        },
        getList(){
            var _this = this; 
            var other = [];
            var list = []
            var flg = 0;;
                util.get('book/bookStandard',{},function(res){
                    for(let item of res){
                       if(item.tempCode !=23){
                           list.push(item);
                       }else{
                           other.push(item)
                           flg=1;
                       }
                    }
                    if(flg == 1){
                       list.push({tempCode:23,tempName:'其他'})
                    }
                    _this.listdata=list
                    _this.$store.commit('otherInfo',other);
                              
                })
        },
        imgfun(type){
           return  billPublic.billListImg2(type)
        },
        open(item){
            this.$store.commit('waterInfo',{item:item,waterShow:true,id:0});
        }
    },
  created(){
     this.getList()
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .addBill{
    margin-top:16px;
}
.addBill a{
  color:#fff
}
.billListUl{

}
.billListUl li{
    text-align: center;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
}
.icon{
    width: 100px;
    height: 85px;
    padding-top: 20px;
    cursor:pointer

}
.billListUl li:hover .icon{
    background:#dedede
}
</style>
