<template>
  <div>
    <div class="content">
      <div v-if="isOpen" class="contact">
        <a :href="'tg://resolve?domain='+checkTg()" class="tg">
        </a>
      </div>
      <img src="@/assets/images/chat.png" @click="isOpen = !isOpen" :class="{'open': isOpen}" alt="">
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
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
  img
    cursor: pointer
    width: 60px
    height: 60px
  .content
    position: fixed
    right: 40vw
    bottom: 10vw
  .contact
    .tg
      display: block
      width: 30px
      height: 30px
      margin: 0 auto
      background-image: url("../assets/images/telegram.png")
      background-size: 100% 100%
      background-repeat: no-repeat
      &:hover
        background-image: url("../assets/images/telegram-R.png")
  .open
    margin-top: 8px
    opacity: 0.5
    transition: 0.15s
  @media screen and (max-width: 2000px)
    .content
      right: 37vw
  @media screen and (max-width: 1500px)
    .content
      right: 30vw
  @media screen and (max-width: 1200px)
    .content
      right: 10vw   
</style>
