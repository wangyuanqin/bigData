/* eslint-disable no-undef */
// 设置基础字体大小
// export default function fontSizeInit () {
//   let html = document.documentElement
//   let hWidth = html.clientWidth
//   // let hHeight = html.clientHeight
//   // if (hWidth <= hHeight) {
//   // 竖屏
//   if (hWidth > 768) {
//     hWidth = 414
//   }
//   html.style.fontSize = (hWidth / 375) * 100 + 'px'
//   // } else {
//   // 横屏
//   // if (hHeight > hWidth) {
//   //   hHeight = 375
//   // }
//   // if (hHeight > 375) {
//   //   hHeight = 375
//   // }
//   // if (hHeight > hWidth) {
//   //   hHeight = 320
//   // }
//   // if (hHeight > 750) {
//   //   hHeight = 750
//   // }
//   // html.style.fontSize = hHeight / 7.5 + 'px'
//   // html.style.fontSize = (hWidth / 667) * 100 + 'px'
//   // html.style.fontSize = (hWidth / 375) * 100 + 'px'
//   // }
// }
// window.onready = fontSizeInit()
// window.onresize = function () {
//   fontSizeInit()
// }
export const defaultFontSize = () => {
  var d = window.document.createElement('div')
  d.style.width = '1rem'
  d.style.display = 'none'
  var head = window.document.getElementsByTagName('head')[0]
  head.appendChild(d)
  var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'))
  if (getBrowserInfo() === 'IE') {
    d.removeNode(true)
  } else {
    d.remove()
  }
  return defaultFontSize
}

export const adoptdevice = (designWidth, rem2px, defaultFontSize) => {
  var scroll = 4 // 滚动条宽度
  var head = window.document.getElementsByTagName('head')[0]
  var x = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 - rem2px + defaultFontSize - scroll + '%'
  if (window.innerWidth >= 1200 - scroll) {
    document.documentElement.style.fontSize = x
  } else {
    document.documentElement.style.fontSize = '356.43%'
  }
  var st = document.createElement('style')
  st.type = 'text/css'
  st.id = 'add-style-id'
  var portrait = '@media screen and (min-width: ' + window.innerWidth + 'px) {html{font-size:' + x + '}}'
  // var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
  st.innerHTML = portrait
  if (document.getElementById('add-style-id')) document.getElementById('add-style-id').remove()
  head.appendChild(st)
}
export const DX = function (n) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    return '数据非法'
  }
  let unit = '千百拾亿千百拾万千百拾元角分'
  let str = ''
  n += '00'
  let p = n.indexOf('.')
  if (p >= 0) {
    n = n.substring(0, p) + n.substr(p + 1, 2)
  }
  unit = unit.substr(unit.length - n.length)
  for (let i = 0; i < n.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
  }
  return str.replace(/零(千|百|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/元$/g, '元整')
}

// 阿拉伯数字转中文数字
export const DXnum = function (section) { // 12
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(section)) {
    return '数据非法'
  }
  let chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  // let chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
  let chnUnitChar = ['', '十', '百', '千']
  let strIns = ''
  let chnStr = ''
  let unitPos = 0
  let zero = true
  if (section > 9 && section < 20) {
    let v = section % 10
    if (v === 0) {
      chnStr = '十'
    } else {
      chnStr = '十' + chnNumChar[v]
    }
  } else {
    while (section > 0) {
      let v = section % 10
      if (v === 0) { // 能被十整除
        if (!zero) {
          zero = true
          chnStr = chnNumChar[v] + chnStr
        }
      } else { // 不能被十整除
        zero = false
        strIns = chnNumChar[v]
        strIns += chnUnitChar[unitPos]
        chnStr = strIns + chnStr
      }
      unitPos++
      section = Math.floor(section / 10)
    }
  }
  return chnStr
}
// }
/*eslint-disable */
Date.prototype.format = function (fmt) { // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// 随机数+时间戳
export const getRandom = () => {
  let timestamp = new Date().getTime()
  let randomNum = parseInt(10000 * Math.random())
  return timestamp + '' + randomNum
}
// 时间戳
export const timestamp = () => {
  return new Date().getTime()
}
// 判断浏览器的类型
export const getBrowserInfo = () => {
  // 取得浏览器的userAgent字符串
  var userAgent = navigator.userAgent
  var isIE =
    window.ActiveXObject !== undefined && userAgent.indexOf('MSIE') > -1
  var isFirefox = userAgent.indexOf('Firefox') > -1
  var isOpera = window.opr !== undefined
  var isChrome = userAgent.indexOf('Chrome') && window.chrome
  var isSafari =
    userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Version') > -1
  if (isIE) {
    return 'IE'
  } else if (isFirefox) {
    return 'Firefox'
  } else if (isOpera) {
    return 'Opera'
  } else if (isChrome) {
    return 'Chrome'
  } else if (isSafari) {
    return 'Safari'
  } else {
    return 'Unkown'
  }
}

// 登录信息
export const loginInfo = () => {
  try {
    let loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
    // console.log(loginInfo)
    // loginInfo.operatorId = loginInfo.operatorId ? loginInfo.operatorId : loginInfo.localUserCode ? loginInfo.localUserCode : loginInfo.userCode
    loginInfo.clientCategory = config.clientCategory
    loginInfo.universityId = config.universityId
    // delete loginInfo.localUserCode
    return loginInfo
  } catch (error) {
    // console.log(error)
    return {}
  }
}
