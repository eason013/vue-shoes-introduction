<template>
  <el-header :style="{ background : bgColor }">
    <el-row class="header-wrapper" :style="{ background : bgColor }">
      <el-col v-if="isMobile" :span="24" class="header-brand" :class="{'center': !isSearch}">      
        <div class="header-brand-left">
          <div v-if="isLogo" class="logo-block">
            <img v-if="isSearch" @click="fhlmLink" class="header-logo" src="@/assets/logo.png" alt="">
            <span v-if="isSearch" class="header-title">Eason's Shoes</span>
          </div>
          <div v-else class="logo-block">
            <img v-if="isSearch" @click="fhlmLink" class="header-logo" v-lazy="logo" alt="">
            <span v-if="isSearch" class="header-title">{{title}}</span>
          </div>
          <div class="header-search">
            <div v-if="!isSearch">
              <el-input class="input-search" v-model="search" @blur="cancelSearch" @input="getSearchList" placeholder="搜索產品"></el-input>
              <img class="icon-search" src="@/assets/images/search_gray.png" alt="">
            </div>
          </div>
        </div>
        <div class="header-brand-right">
          <img v-if="isSearch" @click="isSearch=!isSearch" src="@/assets/images/search.png" alt="">
        </div>
      </el-col>
      <el-col v-if="!isMobile" :span="14" class="header-brand">      
        <div class="header-brand-left">
          <div v-if="isLogo" class="logo-block">
            <img @click="fhlmLink" class="header-logo" src="@/assets/logo.png" alt="">
            <span class="header-title">Eason's Shoes</span>
          </div>
          <div v-else class="logo-block">
            <img @click="fhlmLink" class="header-logo" v-lazy="logo" alt="">
            <span class="header-title">{{title}}</span>
          </div>
        </div>
      </el-col>      
      <el-col v-if="!isMobile" :span="10" class="header-icon">
        <div class="header-search">
          <div v-if="isSearch">
            <el-input class="input-search icon-hidden" placeholder="搜索產品"></el-input>
            <img class="icon-search" @click="isSearch=!isSearch" src="@/assets/images/search.png" alt="">
          </div>
          <div v-if="!isSearch">
            <el-input class="input-search" v-model="search" @blur="cancelSearch" @input="getSearchList" placeholder="搜索產品"></el-input>
            <img class="icon-search" src="@/assets/images/search_gray.png" alt="">
          </div>
        </div>
        <img class="icon-hidden" src="@/assets/images/bell.png" alt="">
        <img class="icon-hidden" src="@/assets/images/dot.png" alt="">
      </el-col>
    </el-row>    
  </el-header>
</template>
<script>
import Bus from '@/bus'
import {vendor} from '@/api/api'
import {device} from '@/common/tools.js'
//先別刪
import { SwipeableBottomSheet } from "@/thirdPartyTool/vue-swipeable-bottom-sheet";
import menu from './H5/Menu'
export default {
  data(){
    return{   
      isMobile: false,     
      isSearch: true,
      typeID: '42',
      page: '1',
      search: '',
      vendorList: [],
      isLogo: Boolean,
      id: this.$route.query.logoid,
      logo: '',
      bgColor: '',
      title: ''
    }
  },
  mounted(){
    this.checkMobile()
    this.getSupplierheader()
  },
  methods: {
    checkMobile(){
      if (device() == 'Mobile') {
        this.isMobile = true
      }
    },    
    fhlmLink(){
      window.open('https://www.google.com/')
    },
    cancelSearch(){
      //取消搜尋
      this.isSearch = true
    },
    getSupplierheader(){
      if(this.id == undefined){
        this.isLogo = true
      }else{
        this.isLogo = false
        vendor.getSupplierheader(this.id).then(res=>{
          this.bgColor = res.data.data.color
          this.logo = res.data.data.image
          this.title = res.data.data.title
        })     
      }
    },
    getSearchList() {
      vendor.getSupplierlist(this.typeID, this.search, this.page).then(res=>{
        this.vendorList = res.data.data.list
        Bus.$emit('val', this.vendorList)
      })
    },
    //先別刪
    goMenu(){
      this.$parent.$parent.$parent.openY = 0.7
      this.$parent.$parent.$parent.isMenu = true
      this.$parent.$parent.$parent.$refs.swipeableBottomSheet.setState("open")
    } 
  }
}
</script>
<style lang="sass" scoped>
.el-header
  background-color: #E41229
  padding: 0
  margin-bottom: 25px
.header-wrapper
  max-width: 1200px
  height: 60px
  margin-right: auto
  margin-left: auto  
  background: #000
  color: #FFFFFF
  display: flex
  justify-content: space-between
  align-items: center
  .header-brand
    display: flex
    align-items: center
    justify-content: space-between
    .header-brand-left
      display: flex
      align-items: center
      .header-logo
        height: 30px
        cursor: pointer
      .header-title
        font-size: 20px
        padding-left: 20px
      .header-search
        position: relative
        .input-search
          width: 85vw
        .icon-search
          width: 26px
          position: absolute
          top: 20%
          right: 2%                
    .header-brand-right
      display: flex
      align-items: center
      img
        width: 26px             
  .header-icon
    display: flex
    align-items: center
    justify-content: space-around
    .header-search
      position: relative
      .input-search
        width: 230px
      .icon-search
        width: 26px
        position: absolute
        top: 20%
        right: 2%
    img
      width: 26px
.icon-hidden
  visibility: hidden
.center
  justify-content: center !important
.logo-block
  display: flex
  align-items: center
@media screen and (max-width: 1200px)
  .header-wrapper
    padding: 15px 20px
@media screen and (max-width: 767px)
  .header-wrapper
    .header-title
      display: none 
</style>
