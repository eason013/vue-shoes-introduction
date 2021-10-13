import axios from 'axios'
import Interceptors from './interceptors'
import {makeEncryption} from '@/common/tools.js'
const fhApi = axios.create({
  baseURL: '/api'
})
//API攔截
Interceptors(fhApi)

//產品 相關的 api
export const vendor = {
  /**
    * 取得產品分類
  */
  getSuppliercat () {
    return fhApi(makeEncryption(`controller=supplier&action=suppliercat`), {
      method: 'GET'
    })
  },
  /**
    * 取得產品列表
  */
  getSupplierlist (category_id, search, page, is_stockout) {
    return fhApi(makeEncryption(`controller=supplier&action=supplierlist&category_id=${category_id}&search=${encodeURI(search)}&page=${page}&is_stockout=${is_stockout}`), {
      method: 'GET'
    })
  },
  /**
    * 取得產品詳情頁
  */
  getSupplierinfo (id) {
    return fhApi(makeEncryption(`controller=supplier&action=supplierinfo&id=${id}`), {
      method: 'GET'
    })
  },
  /**
    * 取得產品logo
  */
  getSupplierheader (id) {
    return fhApi(makeEncryption(`controller=supplier&action=supplierheader&id=${id}`), {
      method: 'GET'
    })
  }
}