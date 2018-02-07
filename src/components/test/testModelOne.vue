<template>
  <div class="home">
	    <div style="margin:90px 20px 10px">
		   <p>子组件{{val}}</p>
		  
		</div>
  </div>
</template>

<script>
import util from '@/util/util.js'
import axios from 'axios'
export default {
  name: 'tt',
  props: ['va','childObject'],
  data () {
    return {
	  val:'-2',
    }
  },
  watch:{
    /*childObject(curval,oldval){
	  console.log(curval);
       console.log(oldval);
	   this.val = curval;
    }*/
  },
  methods:{

	 chilFn (msg) {
　　　　     console.log(msg)
　　      }
     
  },
  created(){
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
