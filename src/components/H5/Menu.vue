<template>
  <div class="demo-section">
    <div class="option line" @click="goSearch">搜索产品</div>
  </div>
</template>
<script>
import Bus from '@/bus'
export default { 
  methods: {
    goSearch(){
      //開啟搜尋
      this.$parent.$parent.$children[0].isSearch = false
      this.$parent.$parent.$parent.$parent.close()
    }
  }  
}
</script>
<style lang="sass" scoped>
.demo-section
  padding: 10px 20px
  font-family: PingFangSC-Regular
  font-size: 16px
  color: #000000
  letter-spacing: 1px
.option
  padding: 15px 0  
.line
  border-bottom: 3px solid #D8D8D8
</style>