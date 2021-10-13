<template>
  <div class="container" ref="vendor">
    <el-row>
      <el-col :span="24" :sm="18">
        <el-tabs v-if="!isMobile" class="vendor-tabs" v-model="typeID" @tab-click="handleClick">
          <el-tab-pane :label="item.title" v-for="(item, i) in typeList" :name="item.id" :key="i"></el-tab-pane>
        </el-tabs>
        <div v-if="isMobile" class="swiper-tabs">
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide :class="{active: item.id == typeID}" v-for="(item, i) in typeList" :name="item.id" :key="i"><span @click="changeType(item.id)">{{item.title}}</span></swiper-slide>
          </swiper>
        </div>        
        <el-col class="vendor">
          <transition name="fade">
            <div class="vendor-type">
              <a class="vendor-type-btn" v-for="(item, i) in parentList" :key="i" :class="{active: parentID == i}"  @click="setParent(i,item.id)">{{item.title}}</a>
            </div>
          </transition>
          <p v-if="!show" class="check-type" @click="show = !show"><i class="el-icon-arrow-down mr-3"></i>更多</p>
          <p v-if="show" class="check-type" @click="show = !show"><i  class="el-icon-arrow-up mr-3"></i>收起</p>   
          <div class="check-list" @change="checkStockout"><el-checkbox v-model="checked">僅顯示限量鞋款</el-checkbox></div>
          <div v-if="vendorList == ''">
            <p class="no-vendor">優質鞋款更新中</p>
          </div>
          <div v-else class="vendor-content">
            <div class="vendor-list" :class="{hidden: item.id == ''}" v-for="(item, i) in vendorList" :key="i" @click="goToDetail(item.id, item.title)">
              <div class="vendor-list-block">
                <img class="vendor-logo" v-lazy="item.logo" :alt="item.title">
              </div>
              <div class="vendor-list-btm">
                <p class="vendor-list-title">{{item.title}}</p>
                <div>
                  <div class="icon-menu-block" @click.stop="showDialog(item.id, item.title)">
                    <img src="@/assets/images/share.svg" alt="">
                  </div>
                </div>
              </div>
              <el-tooltip class="vendor-list-text" effect="light" :content="item.description" placement="bottom" :visible-arrow="false">
                <el-button>{{checkTitle(item.description)}}</el-button>
              </el-tooltip>
              <p v-if="item.is_stockout == 1" class="no-stock">缺貨</p>
            </div>
          </div>
          <el-pagination v-if="vendorList != ''" class="pagination" background layout="prev, pager, next" :page-size="12" :total="listTotalCount" @current-change="pageChange">
          </el-pagination>
        </el-col>
      </el-col>
      <el-col :span="24" :sm="6" class="hot">
        <div>
          <p class="hot-title">熱門精選</p>
          <div class="hot-block">
            <div class="hot-list" v-for="(item, i) in hotList" :key="i" @click="goToDetail(item.id, item.title)">
              <div class="hot-list-block">
                <img class="hot-logo" v-lazy="item.logo" alt="">
              </div>
              <div class="hot-list-btm">
                <p class="hot-list-title">{{item.title}}</p>
                <div>
                  <div class="icon-menu-block" @click.stop="showDialog(item.id, item.title)">
                    <img src="@/assets/images/share.svg" alt="">
                  </div>
                </div>
              </div>
              <el-tooltip class="hot-list-text" effect="light" :content="item.description" placement="bottom" :visible-arrow="false">
                <el-button>{{checkTitle(item.description)}}</el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <h-share :dialogVisible="dialogVisible" :id="id" :title="title" :localHref="localHref"></h-share>
    <swipeable-bottom-sheet :openY="openY" :halfY="halfY" ref="swipeableBottomSheet">
      <v-demo v-if="isDemo" :id="demoId" :index="demoIndex" :qTg="qTg"></v-demo>
    </swipeable-bottom-sheet>
  </div>
</template>

<script>
import Bus from '@/bus'
import {vendor} from '@/api/api'
import {device} from '@/common/tools.js'
import Demo from '../../components/H5/Demo'
import HomeShare from '../../components/HomeShare'
import { SwipeableBottomSheet } from "@/thirdPartyTool/vue-swipeable-bottom-sheet";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
// import swiper, { Navigation, Pagination, Autoplay } from 'swiper'
// swiper.use([Navigation, Pagination, Autoplay])
export default {
  components: {
    SwipeableBottomSheet,
    'v-demo': Demo,
    'h-share': HomeShare
  },   
  data(){
    return{
      dataList: [],
      vendorList: [],
      hotList: [],
      listTotalCount: 0,
      typeID: '',
      parentID: 0,
      page: '1',
      qTg: this.$route.query.tg,
      logoid: this.$route.query.logoid,
      isMobile: false,
      isDemo: false,
      demoId: '',
      demoIndex: '',
      openY: 0,
      halfY: 1,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      checked: false,
      is_stockout: '',
      dialogVisible: false,
      id:'',
      title:'',
      localHref: '',
      show: false
    }
  },
  metaInfo() {
    return {
      title: 'Eason Shoes',
      meta: [
        { property: 'og:keywords', content: 'Eason Shoes'},
        { property: 'og:description', content: 'Eason Shoes'}
      ]
    }
  },  
  computed:{
    typeList(){
      let list = this.dataList.filter(function(item, index, array){
        return item.parentid == 0;
      });
      return list
    },
    parentList(){
      let vm = this
      let list = vm.dataList.filter(function(item, index, array){
        return item.parentid == vm.typeID
      });
      //二級分類設定顯示數量
      if(this.show == false){
        this.isMobile == true ? list = list.slice(0,2) : list = list.slice(0,7)
      }
      //新增全部類別
      let allType = [{id: '', parentid: '0', title: '全部'}]
      allType[0].id = vm.typeID
      list = allType.concat(list)
      return list
    },
  },
  mounted(){
    this.getAdfromGtag()
    this.close()
    this.checkMobile()
    this.getSuppliercat()
    Bus.$on('val', (data) => {
      this.vendorList = data
    })
  },
  methods: {
    getAdfromGtag(){
      //GA廣告事件
      let val = this.$route.query.adfrom
      let action = 'adfrom_'+val
      if(val != undefined){
        gtag('event', action, {
          'event_category': '',
          'event_label': val,
        });
      }
    },
    handleClick(){
      this.getSupplierlist()
    },
    changeType(id){
      this.typeID = id
      this.getSupplierlist()
    },
    setParent(i, id){
      this.parentID = i
      vendor.getSupplierlist(id, '', this.page, this.is_stockout).then(res=>{
        this.vendorList = res.data.data.list
        this.listTotalCount = res.data.data.total
      })
    },
    getSuppliercat(){
      vendor.getSuppliercat().then(res=>{
        this.dataList = res.data.data
        this.dataList.sort(function (a, b) {
          return a.sort - b.sort;
        });
        this.typeID = this.dataList[0].id
        this.getSupplierlist()
      })
    },
    getSupplierlist(){
      vendor.getSupplierlist(this.typeID, '', this.page, this.is_stockout).then(res=>{
        this.parentID = 0
        this.vendorList = res.data.data.list
        this.hotList = res.data.data.hot
        this.listTotalCount = res.data.data.total
      })
    },
    pageChange(p){
      this.page = p
      this.getSupplierlist()
    },
    goToDetail(id, title){
      this.$router.push({path:'/vendorPage', query: {id: id, tg: this.qTg, logoid: this.logoid}})
      gtag('event', title, {
        'event_category': title,
        'event_label': title,
      });      
    },
    copyText(id){
      if(this.qTg == undefined){
        return location.origin + '/#/vendorPage?id=' + id
      }else{
        return location.origin + '/#/vendorPage?id='+ id + '&tg=' + this.qTg
      }
    },
    //複製鏈結
    copyLink(id, i){
      let Url = document.getElementById(id + i);
      Url.select()
      document.execCommand("copy")
      alert("複製成功!")
    },
    checkTitle(val){
      var str = val.replace(/\s*/g,"");
      if(str.length >= 18){
        // let text = str.substr(0,19) + '...'
        let text = str.substr(0,17)
        return text
      }else{
        return str
      }
    },
    checkMobile(){
      if (device() == 'Mobile') {
        this.isMobile = true
      }
    },
    checkStockout(){
      if(this.checked == false){
        this.is_stockout = ''
        this.getSupplierlist()
      }else{
        this.is_stockout = 0
        this.getSupplierlist()
      }
    }, 
    close(){
      this.$refs.swipeableBottomSheet.setState("half")
    },
    openDemo(id, i, title){
      this.demoId = id
      this.demoIndex = i
      this.openY = 0.7
      this.isDemo = true
      this.$refs.swipeableBottomSheet.setState("open")
      gtag('event', title, {
        'event_category': title,
        'event_label': title,
      });      
    },
    showDialog(id, title){
      this.id = id
      this.title = title
      this.localHref = window.location.href + 'vendorPage?id=' + this.id
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to
  opacity: 0
.vendor
  background: #FFFFFF
  padding: 20px
  .vendor-type
    display: flex
    flex-wrap: wrap
    .vendor-type-btn
      text-decoration: none
      cursor: pointer
      padding-right: 10px
      background: #ECECEC
      color: #6C6C6C
      padding: 5px 10px
      margin: 0 15px 15px 0
      border-radius: 5px
      &.active
        background: #000
        color: #FFFFFF
      &:hover
        background: #000
        color: #FFFFFF
  .check-type
    text-align: right
    margin-right: 5px
    font-size: 14px
    color: #6C6C6C
    &:hover
      color: #000
  .check-list
    text-align: right
    margin-right: 5px
    margin-bottom: 10px        
  .vendor-content
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    margin-bottom: 20px
    position: relative
    .vendor-list
      margin: 10px
      max-width: 22%
      flex-basis: 22%
      cursor: pointer
      position: relative
      &:hover
        transition: all .3s linear
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12)
        .icon-menu-block
          display: block
    .vendor-list-block
      .vendor-logo
        width: 100%
    .vendor-list-btm
      display: flex
      align-items: center
      justify-content: space-between
      padding: 0 10px 0 10px
      .vendor-list-title
        font-size: 16px
        font-weight: bold
        color: #000000
        letter-spacing: 0.89px
    .vendor-list-text
      padding: 0 10px 10px 10px
      color: #6C6C6C
      border: 0
      background: unset
      white-space: normal
      text-align: unset
      &:hover
        color: #E41229
    .no-stock
      font-family: PingFangSC-Medium
      font-size: 12px
      color: #FFFFFF
      letter-spacing: 0.71px
      background: #B1B1B1
      border-radius: 5px
      border-radius: 5px
      text-align: center
      width: 50px
      position: absolute
      top: 2%
      right: 3%  
.hot
  padding-left: 20px
  .hot-title
    font-size: 16px
    margin-top: 6px
    margin-bottom: 20px
  .hot-list
    cursor: pointer
    position: relative
    background: #ffffff
    width: 200px
    margin: 5px 0
    &:hover
      transition: all .3s linear
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12)
      .icon-menu-block
        display: block
    .hot-list-block
      .hot-logo
        width: 100%
    .hot-list-btm
      display: flex
      align-items: center
      justify-content: space-between
      padding: 0 10px 0 10px
      .hot-list-title
        font-size: 16px
        font-weight: bold
        color: #000000
        letter-spacing: 0.89px
    .hot-list-text
      padding: 0 10px 10px 10px
      color: #6C6C6C
      border: 0
      background: unset
      white-space: normal
      text-align: unset
      &:hover
        color: #E41229
.pagination
  text-align: center
.icon-menu
  cursor: pointer
  position: absolute
  top: 10%
  right: 3%
.icon-menu-block
  text-align: center
  width: 15px
  height: 20px
  display: none
.copy-text
  opacity: 0
  cursor: default
  position: absolute
  left: 0
  top: 0
.no-vendor
  text-align: center
  margin: 150px 0
.hidden
  visibility: hidden
.mr-3
  margin-right: 3px  
.swiper-tabs
  margin-bottom: 10px
  .swiper
    position: relative
    padding-bottom: 8px
    &::after
      content: ""
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      height: 2px
      background: #D8D8D8
    .swiper-slide
      text-align: center
      font-family: PingFangSC-Regular
      font-size: 16px
      color: #505050      
    .active
      color: #e41229     
@media screen and (max-width: 1200px)
  .container
    width: 95vw
  .vendor
    .vendor-type
      .vendor-type-btn
        font-size: 14px
    .vendor-content
      .vendor-list   
        max-width: 23%
        flex-basis: 23%
        margin: 5px
        .vendor-list-block
          .vendor-logo
  .hot
    .hot-title
      font-size: 16px
    .hot-list
      padding: 10px
      max-width: 200px
      width: auto
      .hot-list-top
        .hot-list-title
          font-size: 16px
          letter-spacing: 0
@media screen and (max-width: 767px)
  .vendor
    padding: 20px 10px
    .vendor-content
      .vendor-list   
        max-width: 47%
        flex-basis: 47%
        .vendor-list-block
          .vendor-logo
        .vendor-list-btm
          margin-bottom: 5px
  .hot
    padding-left: 0
    margin-top: 20px
    .hot-block
      display: flex
      flex-wrap: wrap
      justify-content: center
      .hot-list
        max-width: 46%
        flex-basis: 46%
        margin: 5px
@media screen and (max-width: 500px)
  .vendor
    .vendor-content
      margin-top: 0px
@media screen and (max-width: 374px)
  .vendor  
    .vendor-content
      .vendor-list
        margin: 3px
</style>