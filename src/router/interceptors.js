export default function (router) {
  // 未登入攔截
  router.beforeEach((to, from, next) => {
    next()
  })
}