/**
 * JSON转序
 */

// 主函数
module.exports = (original, rule) => {
  if (!rule || getType(rule) !== '[object Object]') {
    return original
  }
  let keys = Object.keys(rule)
  if (!keys || !keys.length) {
    return original
  }
  keys.forEach(key => {
    let val = rule[key]
    if (!val) {
      return
    }

    let type = getType(val)

    if ( type === '[object Function]') {

      // 函数
      try {
        rule[key] = rule[key](original)
      } catch (e) {
        console.log(e)
      }
    } else if (type === '[object Object]') {

      // 对象 {rel, format}
      let transRule = null
      if (val.hasOwnProperty('format') && val.format) {
        transRule = val.format
      } else if (val.hasOwnProperty('rel') && val.rel) {

        // format为空
        transRule = val.rel
      }
      if (transRule) {
        readRules(transRule, original)
      }
      rule[key] = transRule
    } else if (type === '[object String]') {

      // 简写
      rule[key] = getDeepKey(val, original)
    }
  })
  return rule
}

// 类型判断
function getType (val) {
  return Object.prototype.toString.call(val)
}

// 深度查找对象键值
function getDeepKey (val, obj) {
  let ks = val.split('.')
  let findArr = obj
  ks.some(k => {
    if (findArr && findArr.hasOwnProperty(k)) {
      findArr = findArr[k]
      return false
    }
    findArr = null
    return true
  })
  return findArr
}

// 递归重写规则
function readRules (rule, obj) {
  var ruleType = getType(rule)
  var res = rule
  if (ruleType === '[object Object]') {
    res = rewriteObj(rule, obj)
  } else if (ruleType === '[object Array]') {
    res = rule.map(tr => {
      return rewriteObj(tr, obj)
    })
  }
  return res
}

// 重写对象
function rewriteObj (rule, obj) {
  let ks = Object.keys(rule)
  let res = rule
  ks.forEach(k => {
    let type = getType(rule[k])
    if (type === '[object String]') {
      res[k] = getDeepKey(rule[k], obj)
    } else {
      res[k] = readRules(rule[k], obj)
    }
  })
  return res
}