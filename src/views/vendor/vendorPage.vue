<template>
  <div class="container">
    <el-row>
      <el-col :span="24" :sm="18" class="main-content">
        <el-breadcrumb class="breadcrumb" separator="/">
          <el-breadcrumb-item :to="{ path: '/', query: {tg: qTg, logoid: logoid}}">首頁</el-breadcrumb-item>
          <el-breadcrumb-item><a>{{title}}</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="banner-block">
          <img v-if="isBanner" class="page-img" :src="banner" alt="">
          <div class="banner-btm" :class="{'position-unset': !isBanner}">
            <img class="banner-logo" :src="bannerLogo" alt="">
            <div>
              <p class="banner-title">{{title}}</p>
              <div class="btn-block">
                <div v-if="isMobile" class="btn-chat-style mr--10" @click="openContact">
                  <div class="icon-chat"></div>
                  諮詢
                </div>
                <el-dropdown v-else trigger="click">
                  <div class="btn-chat-style mr--10" @click.stop>
                    <div class="icon-chat"></div>
                    <span>立即諮詢</span>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="bubble-btn" @click.native="goToLink('tg://resolve?domain='+checkTg())">Telegram</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <v-share :title="title" :isMobile="isMobile"></v-share>
              </div>
            </div>
          </div>
        </div>
        <div class="display-block">
          <p class="description-text">{{description}}</p>
          <a class="detail-btn" :class="{'display-active': displayType == 'A', 'radius--6': displayType == 'A' && deposit == false}" href="" @click.prevent="displayType = 'A'">詳情介紹</a>
          <a v-if="deposit" class="deposit-btn" :class="{'display-active': displayType == 'B'}" href="" @click.prevent="displayType = 'B'">詳情介紹</a>
        </div>
        <div class="mobile-block" v-if="isMobile && serviceList != ''">
          <div v-if="serviceList != ''">
            <p class="title">服務類別</p>
            <div class="type-block">
              <div class="type-btn" v-for="(item, i) in serviceList" :key="i">{{item}}</div>
            </div>
          </div>
          <div v-if="lagList != ''">
            <p class="title">支持語言</p>
            <div class="type-block">
              <div class="type-btn" v-for="(item, i) in lagList" :key="i">{{item}}</div>
            </div>
          </div>
          <div v-if="moneyList != ''">
            <p class="title">支持貨幣</p>
            <div class="type-block">
              <div class="type-btn" v-for="(item, i) in moneyList" :key="i">{{item}}</div>
            </div>
          </div>
          <div v-if="areaList != ''">
            <p class="title">限制地區</p>
            <div class="type-block">
              <div class="type-btn" v-for="(item, i) in areaList" :key="i">{{item}}</div>
            </div>
          </div>
        </div>        
        <div class="page-content">
          <div v-show="displayType == 'A'" id="msg-content"></div>
          <div v-show="displayType == 'B'" id="deposit-content"></div>
        </div>
      </el-col>
      <el-col :span="24" :sm="6" class="right-content">
        <div v-if="!isMobile">
          <div v-if="serviceList != ''">
            <p class="title">服務類別</p>
            <div class="type-block">
              <div class="type-btn" v-for="(item, i) in serviceList" :key="i">{{item}}</div>
            </div>
          </div>
          <div v-if="lagList != ''">
            <p class="title">支持語言</p>
            <div class="type-block">
              <div class="type-btn" v-for="(item, i) in lagList" :key="i">{{item}}</div>
            </div>
          </div>
          <div v-if="moneyList != ''">
            <p class="title">支持貨幣</p>
            <div class="type-block">
              <div class="type-btn" v-for="(item, i) in moneyList" :key="i">{{item}}</div>
            </div>
          </div>
          <div v-if="areaList != ''">
            <p class="title">限制地區</p>
            <div class="type-block">
              <div class="type-btn" v-for="(item, i) in areaList" :key="i">{{item}}</div>
            </div>
          </div>
        </div>
        <div v-if="hotList != ''">
          <p class="title">推薦</p>
          <div class="hot-list" v-for="(item, i) in hotList" :key="i" @click="$router.push({path:'/vendorPage', query: {id: item.id, tg: qTg, logoid: logoid}})">
            <div class="hot-list-top">
              <div class="hot-list-block">
                <img class="hot-logo" v-lazy="item.logo" alt="">
              </div>
              <div>
                <p class="hot-list-title">{{item.title}}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="newsList != ''">
          <p class="title">相關文章</p>
          <a :href="'https://www.google.com.tw/'+item.id+'.html'" target="_blank" class="news-list" v-for="(item, i) in newsList" :key="i">
            <p class="news-list-title">{{item.title}}</p>
            <p class="news-list-date">{{item.date}}</p>
          </a>
        </div>
      </el-col>
    </el-row>
    <v-contact></v-contact>
    <swipeable-bottom-sheet :openY="openY" :halfY="halfY" ref="swipeableBottomSheet">
      <v-demo v-if="isDemo" :id="demoId" :index="demoIndex" :qTg="qTg"></v-demo>
      <v-mshare v-if="isMshare" :title="title"></v-mshare>
      <v-contact-tools v-if="isContactTools"></v-contact-tools>
    </swipeable-bottom-sheet>
  </div>
</template>
<script>
import {vendor} from '@/api/api'
import Contact from '../../components/Contact'
import Demo from '../../components/H5/Demo'
import Share from '../../components/Share'
import Mshare from '../../components/H5/Mshare'
import ContactTools from '../../components/H5/ContactTools'
import {device} from '@/common/tools.js'
import { SwipeableBottomSheet } from "@/thirdPartyTool/vue-swipeable-bottom-sheet";
export default {
  components: {
    'v-contact': Contact,
    SwipeableBottomSheet,
    'v-demo': Demo,
    'v-share': Share,
    'v-mshare': Mshare,
    'v-contact-tools': ContactTools
  },
  data(){
    return{
      serviceList: [],
      lagList: [],
      moneyList: [],
      areaList: [],
      title: '',
      banner: '',
      isBanner: '',
      description: '',
      bannerLogo: '',
      hotList: [],
      newsList: [],
      qTg: this.$route.query.tg,
      logoid: this.$route.query.logoid,
      isMobile: false,
      isDemo: false,
      isMshare: false,
      isContactTools: false,
      demoId: '',
      demoIndex: '',
      openY: 0,
      halfY: 1,
      seoTitle: this.getSeoTitle(),
      seoKeyword: '',
      seoDescription: '',
      deposit: false,
      displayType: 'A'
    }
  },
  metaInfo () {
    return {
      title: this.seoTitle,
      meta: [
        { property: 'og:keywords', content: this.seoKeyword},
        { property: 'og:description', content: this.seoDescription}
      ]
    }
  },
  watch: {
    "$route.query"(){
      this.getSupplierinfo()
    }
  },
  mounted(){
    this.close()
    this.checkMobile()
    this.getSupplierinfo() 
  },  
  methods: {
    getSupplierinfo(){
      let id = this.$route.query.id
      vendor.getSupplierinfo(id).then(res=>{
        this.title = res.data.data.title
        this.banner = res.data.data.banner
        this.isBanner = this.banner != '' ? true : false
        this.description = res.data.data.description
        res.data.data.deposit_content != null && res.data.data.deposit_content != "" ? this.deposit = true : this.deposit = false
        document.getElementById('msg-content').innerHTML = res.data.data.content
        document.getElementById('deposit-content').innerHTML = res.data.data.deposit_content
        var arr = Object.keys(res.data.data.customize)
        if(arr != ''){
          this.serviceList = res.data.data.customize.服務類別.split(',')
          this.lagList = res.data.data.customize.支持語言.split(',')
          this.moneyList = res.data.data.customize.支持貨幣.split(',')
          this.areaList = res.data.data.customize.限制地區.split(',')
        }
        this.hotList = res.data.data.hot
        this.newsList = res.data.data.related_news
        this.bannerLogo = res.data.data.logo
      })
    },
    copyText(id){
      if(this.qTg == undefined){
        return location.origin + '/#/vendorPage?id=' + id
      }else{
        return location.origin + '/#/vendorPage?id=' + id + '&tg=' + this.qTg
      }
    },
    //複製鏈結
    copyLink(id, i){
      let Url = document.getElementById(id + i);
      Url.select()
      document.execCommand("copy")
      alert("複製成功!")
    },  
    checkMobile(){
      if (device() == 'Mobile') {
        this.isMobile = true
      }
    },
    close(){
      this.$refs.swipeableBottomSheet.setState("half")
    },
    openDemo(id, i){
      this.demoId = id
      this.demoIndex = i
      this.isDemo = true
      this.openY = 0.7
      this.$refs.swipeableBottomSheet.setState("open")
    },
    openContact(){
      this.isMshare = false
      this.isContactTools = true
      this.openY = 0.7
      this.$refs.swipeableBottomSheet.setState("open")
    },
    goToLink(val){
      window.location.href = val
    },
    checkTg(){
      if(this.$route.query.tg == undefined){
        return 'eason_13'
      }else{
        return this.$route.query.tg
      }
    },
    async getSeoTitle() {
      let id = this.$route.query.id
      vendor.getSupplierinfo(id).then(res=>{
        this.seoTitle = res.data.data.title + ',Eason Shoes'
        this.seoKeyword = this.seoTitle + ',Eason Shoes'
        this.seoDescription = this.seoTitle + ',Eason Shoes'
      })    
    }
  }
}
</script>
<style lang="sass" scoped>
.main-content
  background: #FFFFFF
  .breadcrumb
    padding: 20px
  .banner-block
    position: relative
  .page-img
    width: 100%
  .banner-btm
    position: absolute
    bottom: 7px
    padding: 20px
    background-color: rgba(0, 0, 0, .15)
    width: 100%
    height: 140px
    display: flex
    align-items: center
    .banner-logo
      width: 100px
      height: 100px
      margin-right: 20px
    .banner-title
      font-family: PingFangSC-Medium
      font-size: 24px
      color: #FFFFFF
      letter-spacing: 1.5px
      margin-bottom: 18px 
    .btn-block
      display: flex
      align-items: center      
    .btn-chat-style
      background: #FFFFFF
      border: 1px solid #D8D8D8
      border-radius: 3px
      font-size: 16px
      color: #6C6C6C
      text-align: center
      width: 25vw
      max-width: 140px
      padding: 5px 0
      display: flex
      align-items: center
      justify-content: center
      .icon-chat
        width: 16px
        height: 15px
        background-image: url("../../assets/images/icon/chat_gray.svg")
        margin-right: 5px
      &:hover
        background: #FFEFEF
        color: #E41229
        .icon-chat
          background-image: url("../../assets/images/icon/chat_red.svg")
  .page-content
    padding: 40px 20px 20px
    color: #646464
  .position-unset
    position: unset
.right-content
  padding-left: 20px
  .title
    font-size: 16px
    font-weight: bold
    margin-bottom: 15px
  .type-block
    display: flex
    flex-wrap: wrap  
  .type-btn
    padding: 5px
    font-size: 16px
    color: #6C6C6C
    background: #FFFFFF
    border-radius: 3px
    margin-bottom: 15px
    margin-right: 15px
  .hot-list
    cursor: pointer
    background: #FFFFFF
    position: relative
    padding: 20px
    margin-bottom: 20px
    &:hover
      .icon-menu-block
        display: block
    .hot-list-top
      display: flex
      align-items: center
      .hot-list-block
        width: 60px
        height: 60px
        background-color: #F7F7F7
        margin-right: 10px
        border-radius: 6px
      .hot-logo
        width: 60px
        height: 60px
        border-radius: 6px
      .hot-list-title
        font-size: 16px
        color: #000000
  .news-list
    cursor: pointer
    display: block
    text-decoration: none
    background: #FFFFFF
    color: #000000
    padding: 10px 20px
    margin-bottom: 20px
    .news-list-title
      font-size: 18px
      margin-bottom: 10px
    .news-list-date
      color: #626262
.icon-menu
  cursor: pointer
  position: absolute
  top: 10%
  right: 3%
  .icon-menu-block
    text-align: center
    padding-top: 3px
    display: none 
.copy-text
  opacity: 0
  position: absolute
  left: 0
  cursor: default
.mr--10
  margin-right: 10px
//內容顯示區塊
.display-block
  padding: 0 20px
  margin-top: 30px
  text-align: center
  .description-text
    color: #646464
    margin-bottom: 20px
  .detail-btn, .deposit-btn
    text-decoration: none
    padding: 5px 20px
    color: #E41229
    background: #FFFFFF
    border: 1px solid #E41229
  .detail-btn
    border-top-left-radius:  6px
    border-bottom-left-radius:  6px
  .deposit-btn
    border-top-right-radius:  6px
    border-bottom-right-radius:  6px
  .display-active
    background: #E41229
    color: #FFFFFF
  .radius--6
    border-radius: 6px
//Mobile顯示區塊
.mobile-block
  padding: 20px
  margin-top: 20px
  border-top: 1px solid #D8D8D8
  border-bottom: 1px solid #D8D8D8
  .title
    font-size: 18px
    font-weight: bold
    margin-bottom: 15px
  .type-block
    display: flex
    flex-wrap: wrap  
  .type-btn
    padding: 5px
    font-size: 14px
    color: #6C6C6C
    background: #F2F2F2
    border-radius: 3px
    margin-bottom: 15px
    margin-right: 15px    
@media screen and (max-width: 1200px)
  .container
    width: 95vw
    .page-content
      p
        font-size: 14px !important
        span 
          font-size: 14px !important
  .right-content
    font-size: 16px
    .title
      font-size: 16px
    .hot-list
      .hot-list-top
        .hot-list-title
          font-size: 14px
    .news-list
      .news-list-title
        font-size: 16px
      .news-list-date
        font-size: 12px
@media screen and (max-width: 767px)
  .main-content
    .banner-btm
      position: unset
      padding: 5px
      justify-content: center
      margin-top: -8px
  .right-content
    padding-left: 0
    margin-top: 20px
</style>