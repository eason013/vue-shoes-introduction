<template>
  <el-container>
    <el-main>
      <v-header v-if="isShow"></v-header>
      <router-view/>
      <swipeable-bottom-sheet :openY="openY" :halfY="halfY" ref="swipeableBottomSheet">
        <v-menu v-if="isMenu"></v-menu>
      </swipeable-bottom-sheet>      
    </el-main>
  </el-container>
</template>
<script>
import Header from '../../components/Header'
import { SwipeableBottomSheet } from "@/thirdPartyTool/vue-swipeable-bottom-sheet";
import menu from '../H5/Menu'
export default {
  components: {
    'v-header': Header,
    'v-menu': menu,
    SwipeableBottomSheet,  
  },
  data(){
    return{
      isShow: Boolean,
      isMenu: false,
      openY: 0,
      halfY: 1,
    }
  },  
  mounted(){
    if(this.$route.query.header == 'false'){
      this.isShow = false
    }else{
      this.isShow = true
    }
    this.close()
  },
  methods: {
    close(){
      this.$refs.swipeableBottomSheet.setState("half")
    }  
  }
}
</script>
<style scoped>
  .el-container{
    display: block;
    background: #F2F2F2;
  }
  .el-header {
    background-color: #000;
    color: #333;
    line-height: 60px;
  }
  .el-main {
    background-color: #F2F2F2;
    color: #333;
    padding: 0 0 100px;
  }
</style>
