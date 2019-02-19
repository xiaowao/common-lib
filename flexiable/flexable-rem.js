((window) => {
  // 动态设置的缩放大小会影响布局视口的尺寸
  function resize() {
    var deviceWidth  = document.documentElement.clientWidth
    document.documentElement.style.fontSize = (deviceWidth / 10) +'px'
  }
  resize();
  window.onresize = resize
})(window)