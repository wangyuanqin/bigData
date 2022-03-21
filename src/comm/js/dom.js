export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function getData (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
// 测试 mixins
export const toggle = {
  methods: {
    sayHello: function () {
      console.log('hello from mixin!')
    }
  },
  mounted () {
    this.sayHello()
  }
}
/**
 * 根据属性，获取元素的样式值
 * @param el  元素
 * @param attr 属性
 * @param pseudoClass 元素伪类
 * @returns {*}
 */
export function getStyle (el, attr, pseudoClass = null) {
  return window.getComputedStyle(el, pseudoClass)[attr]
}

/**
 * 获取属性，并且属性值是数字，而不是字符串
 * @param el 元素
 * @param attr 属性
 * @param pseudoClass 元素伪类
 * @returns {Number}
 */
export function getStyleNumber (el, attr, pseudoClass = null) {
  try {
    const val = getStyle(el, attr, pseudoClass)
    return parseFloat(val)
  } catch (e) {
    console.error(e)
  }
}
