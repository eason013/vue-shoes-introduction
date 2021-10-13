const routers = [
  {
    path: '/',
    component: () => import('@/components/Layout/VendorLayout.vue'),
    children: [{
      path: '',
      component: () => import('@/views/vendor/vendor'),
    }]
  },
  {
    path: '/vendorPage',
    component: () => import('@/components/Layout/VendorLayout.vue'),
    children: [{
      path: '',
      component: () => import('@/views/vendor/vendorPage'),
    }]
  },  
]
export default routers
