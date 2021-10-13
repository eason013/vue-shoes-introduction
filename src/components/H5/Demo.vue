<template>
  <div class="demo-section">
    <div class="option line" @click="goDemo(id, qTg)">Demo体验</div>
    <div class="option" @click="copyLink('copy', index)">分享</div>
    <input :id="'copy' + index" class="copy-text" type="text" :value="copyText(id)" readonly>
  </div>
</template>
<script>
export default {
  props: ['id','index','qTg',],
  methods: {
    goDemo(val, qTg){
      this.$router.push({path:'/vendorPage', query: {id: val, tg: qTg}})
      this.$parent.$parent.$refs.swipeableBottomSheet.setState("half")
    },
    copyText(id){
      if(this.qTg == undefined){
        return location.origin + '/#/vendorPage?id=' + id
      }else{
        return location.origin + '/#/vendorPage?id=' + id + '&tg=' + this.qTg
      }
    },
    //复制链结
    copyLink(id, i){
      let Url = document.getElementById(id + i);
      Url.select()
      document.execCommand("copy")
      alert("复制成功!")
      this.$parent.$parent.$refs.swipeableBottomSheet.setState("half")
    },
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
.copy-text
  opacity: 0
  position: absolute
  left: 0
</style>