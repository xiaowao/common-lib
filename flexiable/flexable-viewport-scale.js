((window) => {
  var doc = window.document
  var docEl = doc.documentElement
  var meta = doc.querySelector('meta')
  var dpr = 1
  var scale = 0

  var devicePixelRatio = window.devicePixelRatio
  var isIphone = window.navigator.appVersion.match(/iphone/gi)
  
  if (isIphone) {
    if (devicePixelRatio >= 3) {
      dpr = 3
    } else if (devicePixelRatio >= 2) {
      dpr = 2
    }
  }
  scale = 1 / dpr
  docEl.setAttribute('data-dpr', dpr)

  let content = `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`
  meta.setAttribute('name', 'viewport')
  meta.setAttribute('content', content)
  document.getElementsByTagName('head')[0].appendChild(meta)
})(window)