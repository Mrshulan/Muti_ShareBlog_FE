// 设置Cookie 100ms 作为视为永久
export function setCookie(cName, cValue, expireTime) {
  if(expireTime > 0 && expireTime !== '100') {
    let preDate = new Date()
    preDate.setDate(preDate.getDate() + expireTime)
    document.cookie = cName + '=' + escape(cValue) + (expireTime === null ? '' : ';expires=' + preDate.toGMTString())
  }

  if(expireTime === '100') {
    let preDate = new Date('2099-01-01 00:00:00');
		document.cookie = cName + '=' + escape(cValue) + (expireTime == null ? '' : ';expires=' + preDate.toGMTString());
  }
}

// 获取指定Cookie
export function getCookie(cName) {
  if(document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + '=')
    if(cStart > 0) {
      cStart = cStart + cName.length + 1
      let cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) cEnd = document.cookie.length
      return unescape(document.cookie.substring(cStart, cEnd))
    }
  }

  return  ''
}

// 删除指定cookie中的值
export function delCookie(cName) {
  let preDate = new Date()
  preDate.setTime(preDate.getDate() - 1)
  let cValue = getCookie(cName)
  if (cValue !== '') {
    document.cookie = cName + '=' + cValue + ';expires=' + preDate.toGMTString();
  }
}
// 清除cookie
export function clearCookie(cName) {
  setCookie(cName, '', -1);
}

// 获取QueryString数组
export function getQueryString() {
  let result = window.location.search.match(new RegExp('[?&][^?&]=[^?&]+', 'g'))
  if (result === null) {
    return ''
  }
  for(let i = 0,iL = result.length; i < iL; i++) {
    result[i] = result[i].substring(1)
  }
  return result
}
// 获取指定 QueryString 参数值
export function getQueryStringByName(name) {
  let result = window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'))
  if (result === null) {
    return ''
  }
  for(let i = 0,iL = result.length; i < iL;i++) {
    result[i] = result[i].substring(1)
  }
  return result
}

//获取页面顶部被卷起来的高度
export function getScrollTop() {
  return Math.max(
    // chrome
		document.body.scrollTop,
		// firefox/IE
		document.documentElement.scrollTop,
    );
}
// 获取页面文档的总高度
export function getDocumentHeight() {
	// 现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}   
// 根据渲染方式得出浏览器视口的高度
export function getWindowHeight() {
  return document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight
}

// 格式化时间戳 2019-02-05 00:00:00
export function timestampToTime(timestamp, dayMinSecFlag) {
	const date = new Date(timestamp);
	const Y = date.getFullYear() + '-';
	const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
	const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
	const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
	const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	if (!dayMinSecFlag) {
		return Y + M + D;
	}
	return Y + M + D + h + m + s;
}