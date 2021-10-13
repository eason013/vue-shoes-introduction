import Vue from 'vue';
import VueRouter from 'vue-router';
import routers from './routers'
import Interceptors from './interceptors'

Vue.use(VueRouter)

global.router = new VueRouter({
  // mode: 'history'
})
Interceptors(router)
router.addRoutes(routers)
export default router
