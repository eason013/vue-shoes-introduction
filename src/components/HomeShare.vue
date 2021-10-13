<template>
  <div>
    <input type="text" class="copy-text" id="copy-local" :value="localHref" readonly>
    <el-dialog
      title="分享"
      :visible.sync="dialogVisible"
      width="50%"
      :top="'20vh'"
      :append-to-body="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @closed="closeDialog"
      @opened="initSkypeShare"
      center
    >
      <p class="share-title">{{title}}</p>
      <div class="icon-block">
        <div class="icon-btn" @click="copyLocal">
          <img src="@/assets/images/share/link.png" alt="">
          <p>复制链接</p>
        </div>
        <div class="icon-btn" @click="qrcodeDialog">
          <p>二维码</p>
        </div>
        <div class="icon-btn" @click="shareLink(`https://t.me/share/url?url=${encodeURIComponent(localHref)}&text=${encodeURIComponent(title)}`)">
          <img src="@/assets/images/share/telegram.png" alt="">
          <p>Telegram</p>
        </div>
        <div class="icon-btn" @click="shareLink(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(localHref)}&text=${encodeURIComponent(title)}`)">
          <img src="@/assets/images/share/line.png" alt="">
          <p>Line</p>
        </div>
        <div class="icon-btn skype-share" :data-href="localHref" :data-text="title">
          <img src="@/assets/images/share/skype.png" alt="">
          <p>Skype</p>
        </div>
        <div class="icon-btn" @click="shareLink(`https://www.facebook.com/sharer.php?t=shoes&u=${encodeURIComponent(localHref)}`)">
          <img src="@/assets/images/share/facebook.png" alt="">
          <p>Facebook</p>
        </div>                   
      </div>
    </el-dialog>
    <!-- qrcode dialog -->
    <el-dialog
      title="二维码"
      :visible.sync="isQrcode"
      width="30%"
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
  props: ['dialogVisible', 'id', 'title', 'localHref'],  
  data(){
    return {
      isQrcode: false
    }
  },
  methods: {
    copyLocal(){
      this.dialogVisible = false
      let Url = document.getElementById('copy-local')
      Url.select()
      document.execCommand("copy")
      alert("复制成功！");
    },
    shareLink(val){
      console.log(val)
      window.open (val)
    },
    qrcodeDialog(){
      this.dialogVisible = false
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
    },
    closeDialog(){
      this.$parent.dialogVisible = false
    }
  }
}
</script>
<style lang="sass" scoped>
.share-title
  font-family: PingFangSC-Regular
  font-size: 20px
  color: #000000
  text-align: center
.icon-block
  padding: 20px 0
  border-top: 1px solid #D8D8D8
  display: flex
  align-items: center
  justify-content: space-around
.icon-btn
  cursor: pointer
  text-align: center
  &:hover
    color: #E41229
.copy-text
  opacity: 0
  position: absolute
  left: 0
  cursor: default
.qrcode
  text-align: center
  img 
    width: 100%
    max-width: 250px
</style>
