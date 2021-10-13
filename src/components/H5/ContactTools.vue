<template>
  <div class="contact-section">
    <div class="option line" @click="goToLink('tg://resolve?domain='+checkTg())">Telegram</div>
  </div>
</template>
<script>
export default {
  methods: {
    goToLink(val){
      window.location.href = val
      this.$parent.$parent.$refs.swipeableBottomSheet.setState("half")
    },
    checkTg(){
      if(this.$route.query.tg == undefined){
        return 'eason_13'
      }else{
        return this.$route.query.tg
      }
    }
  }  
}
</script>
<style lang="sass" scoped>
.contact-section
  padding: 10px 20px
  font-family: PingFangSC-Regular
  font-size: 16px
  color: #000000
  letter-spacing: 1px
.option
  padding: 25px 0 15px  
.line
  border-bottom: 3px solid #D8D8D8  
</style>