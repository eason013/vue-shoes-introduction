<template>
  <div class="share-section">
    <input type="text" class="copy-text" id="copy-local" :value="localHref" readonly>
    <p>分享</p>
    <p class="share-title">{{title}}</p>
    <div class="icon-block">
      <div class="icon-btn" @click="copyLocal">
        <img src="@/assets/images/share/link.png" alt="">
        <p>复制链接</p>
      </div>
      <div class="icon-btn" @click="qrcodeDialog">
        <p>二维码</p>
      </div>
      <div class="icon-btn" @click="shareLink('https://t.me/share/url?url='+documentHref+'&text='+title)">
        <img src="@/assets/images/share/telegram.png" alt="">
        <p>Telegram</p>
      </div>
      <div class="icon-btn" @click="shareLink(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(documentHref)}&text=${encodeURIComponent(title)}`)">
        <img src="@/assets/images/share/line.png" alt="">
        <p>Line</p>
      </div>
      <div class="icon-btn skype-share">
        <img src="@/assets/images/share/skype.png" alt="">
        <p>Skype</p>
      </div>
      <div class="icon-btn" @click="shareLink(`https://www.facebook.com/sharer.php?t=shoes&u=`+documentHref)">
        <img src="@/assets/images/share/facebook.png" alt="">
        <p>Facebook</p>
      </div>                   
    </div>
    <!-- qrcode dialog -->
    <el-dialog
      title="二维码"
      :visible.sync="isQrcode"
      width="50%"
      :append-to-body="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
    >
    <div class="qrcode">
      <vue-qrcode :value="localHref" />
    </div>
    </el-dialog>    
  </div>
</template>
<script>
import VueQrcode from 'vue-qrcode'
export default {
  components: {
    VueQrcode,
  },  
  props: ['title', 'isMobile'],
  data(){
    return {
      isQrcode: false,
      localHref: window.location.href,
      documentHref: document.location.href,
    }
  },
  mounted(){
    this.initSkypeShare()
  },
  methods: {
    copyLocal(){
      let Url = document.getElementById('copy-local')
      Url.select()
      document.execCommand("copy")
      alert("复制成功！");
      this.$parent.$parent.$refs.swipeableBottomSheet.setState("half")
    },
    shareLink(val){
      window.location.href = val
    },    
    qrcodeDialog(){
      this.$parent.$parent.$refs.swipeableBottomSheet.setState("half")
      this.isQrcode = true
    },
    initSkypeShare(){
      var r = window
      var d = document
      var s = 'script'
      r.loadSkypeWebSdkAsync = r.loadSkypeWebSdkAsync || function(p) {
        var js, sjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(p.id)) { return; }
        js = d.createElement(s);
        js.id = p.id;
        js.src = p.scriptToLoad;
        js.onload = p.callback
        sjs.parentNode.insertBefore(js, sjs);
      };
      var p = {
        scriptToLoad: 'https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js',
        id: 'skype_web_sdk'
      };
      r.loadSkypeWebSdkAsync(p);
    }    
  }
}
</script>
<style lang="sass" scoped>
.share-section
  padding: 35px 20px 20px
  text-align: center
  font-family: PingFangSC-Regular
  color: #7C7C7C
  letter-spacing: 1px
  .share-title
    font-family: PingFangSC-Regular
    font-size: 18px
    color: #000000
    text-align: center
    margin-bottom: 10px
.icon-block
  border-top: 3px solid #D8D8D8
  display: flex
  align-items: center
  flex-wrap: wrap
  padding: 20px 0
  .icon-btn
    max-width: 33.33%
    flex-basis: 33.33%
    margin-bottom: 10px
.copy-text
  opacity: 0
  position: absolute
  left: 0
.qrcode
  text-align: center
  img 
    width: 100%
    max-width: 250px
</style>