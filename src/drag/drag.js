var moveToX = 0
var moveToY = 0
var disX = 0
var disY = 0
var radius = 50
var target = null

function init(parentId, query) {
  var dragElms = null
  var dragArea = document.getElementById(parentId)
  if (!dragArea) {
    return
  }
  dragElms = dragArea.querySelectorAll(query)
  if (!dragElms || !dragElms.length) {
    dragElms = null
    return
  }
  dragElms.forEach(elm => {
    elm.onmousedown = mouseDown
  })
  dragElms = null
}

function mouseDown(e) {
  var event = e || window.event
  target = event.target || event.srcElement
  disX = event.clientX - target.offsetLeft
  disY = event.clientY - target.offsetTop
  // 绑定事件到document,解决鼠标滑动过快到div外
  document.onmousemove = mouseMove
  document.onmouseup = mouseUp
  target.style.zIndex = 9999
  return false
}

function mouseMove(e) {
  var event = e || window.event
  moveToX = event.clientX - disX
  moveToY = event.clientY - disY
  target.style.left = `${moveToX}px`
  target.style.top = `${moveToY}px`
}

function mouseUp(e) {
  var parentNode = target.parentNode
  var waitPool = document.getElementById('pool_wait')
  var classifyPools = document.getElementsByClassName('pool_classify')
  var poolType = target.dataset.from
  var [tLeft, tTop] = getAbslutePos(target)
  document.onmousemove = null
  document.onmouseup = null
  target.style.left = '0px'
  target.style.top = '0px'
  moveToX = 0
  moveToY = 0
  disX = 0
  disY = 0
  target.style.zIndex = 1

  if (!classifyPools || !classifyPools.length) {
    alert('分类池未创建')
    return
  }
  let validElmPos = -1

  for(let i = 0; i < classifyPools.length; i++) {
    let [cLeft, cTop] = getAbslutePos(classifyPools[i])
    let [cWidth, cHeight] = getSize(classifyPools[i])

    let isInValidArea = judgePos(tLeft, tTop, cLeft, cTop, cWidth, cHeight, radius)
    if (isInValidArea) {
      validElmPos = i
      break
    }
  }

  if (validElmPos === -1) {
    waitPool = null
    classifyPools = null
    parentNode = null
    alert('拖拽域无效')
    return
  }

  if (poolType === 'poolWait') {
    waitPool.removeChild(parentNode)
    classifyPools[validElmPos].appendChild(parentNode)
    target.dataset.from = 'poolClassify'
    target.onmousedown = null
  } else {
    classifyPools[validElmPos].removeChild(parentNode)
    waitPool.appendChild(parentNode)
    target.dataset.from = 'poolWait'
  }
  waitPool = null
  classifyPool = null
  parentNode = null
}

function getAbslutePos(dom) {
  var curLeft = dom.offsetLeft || 0
  var curTop = dom.offsetTop || 0
  while (dom.offsetParent) {
    dom = dom.offsetParent
    curLeft += dom.offsetLeft
    curTop += dom.offsetTop
  }
  return [curLeft, curTop]
}
function getSize(dom) {
  return [dom.clientWidth || 0, dom.clientHeight | 0]
}
function judgePos(tLeft, tTop, cLeft, cTop, cWidth, cHeight, radius) {
  let x = tLeft + radius
  let y = tTop + radius

  if (x > cLeft && x < cLeft + cWidth) { // 圆心横坐标在区域内
    if (y > cTop && y < cTop + cHeight) { // 圆心纵坐标在区域内
      return true
    }
    return false
  }
  return false
}