import md5 from 'js-md5';
/**
 * api 加密
 */
export const makeEncryption = (domain)=>{
  let time = Date.parse(new Date())
  let sign = md5(`${domain}&time=${time}&key=9d9a2100dfdc857152748f30636b2d0f`)
  let query = `?${domain}&time=${time}&sign=${sign}`
  return query
}
//
export const device = ()=>{
  const clientWidth = document.body.clientWidth
  let val = (function() {
    switch (false) {
      case !(clientWidth > 1199):
        return (val = 'Desktop')        
      case !(clientWidth >= 992):
        return (val = 'ipadPro')
      case !(clientWidth >= 768):
        return (val = 'Tablet')
      case !(clientWidth < 501):
        return (val = 'Mobile')
      default:
        return (val = 'Desktop')
    }
  })()
  return val 
}