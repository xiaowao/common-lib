var moveToX = 0
var moveToY = 0
var disX = 0
var disY = 0

function init(query) {
  var dragElms = null
  dragElms = document.querySelectorAll(query)
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
  var target = event.currentTarget || event.srcElement
  console.log('鼠标按下')
  disX = event.clientX - target.offsetLeft
  disY = event.clientY - target.offsetTop
  target.onmousemove = mouseMove
  target.onmouseup = mouseUp
}

function mouseMove(e) {
  var event = e || window.event
  var target = event.currentTarget || event.srcElement 
  moveToX = event.clientX - disX
  moveToY = event.clientY - disY
  target.style.left = `${moveToX}px`
  target.style.top = `${moveToY}px`
}

function mouseUp(e) {
  var event = e || window.event
  var target = event.currentTarget || event.srcElement 
  var res = confirm('确定移动到该位置？')
  target.style.left = 0
  target.style.top = 0
  moveToX = 0
  moveToY = 0
  disX = 0
  disY = 0
  target.onmousemove = null
  target.onmouseup = null
  
  if (!res) {
    return
  }

  let parentNode = target.parentNode
  let waitPool = document.getElementById('pool_wait')
  let classifyPool = document.getElementById('pool_classify')
  let poolType = target.dataset.from
  console.log(parentNode, waitPool)

  if (poolType === 'poolWait') {
    waitPool.removeChild(parentNode)
    classifyPool.appendChild(parentNode)
    target.dataset.from = 'poolClassify'
  } else {
    classifyPool.removeChild(parentNode)
    waitPool.appendChild(parentNode)
    target.dataset.from = 'poolWait'
  }
  waitPool = null
  classifyPool = null
}