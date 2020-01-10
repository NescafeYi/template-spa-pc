import { HasOwnProperty } from './data-utils';

export const GetParam = function (name) {
    // 路由页面需要从hash值获取参数
    var search = document.location.search || document.location.hash;
    var pattern = new RegExp('[?&]' + name + '=([^&]+)', 'g');
    var matcher = pattern.exec(search);
    var items = null;
    if (matcher != null) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
};

export const GetArrMap = (arr = [], valueAttr = 'label', valueKey = 'value') => {
    var data = {};
    arr.forEach((item) => data[valueKey ? item[valueKey] : item.value] = valueAttr ? item[valueAttr] : item);
    return data;
};

// 锚点跳转
export const ScrollToAnchor = (anchorName) => {
    if (anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) {
            anchorElement.scrollIntoView();
        }
    }
};

/** 
 * 时间戳转换成标准时间格式
 * @param {int} time 要格式化的时间 默认为当前时间 
 * 例：
 * GetDateByTime(1563760632856);//2019-07-22 09:57:12
 */
export const GetDateByTime = (time = +new Date()) => {
    time = Number(time);
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ');
};

/*
    * 转换数字格式
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */
export const NumberFormat = (number, decimals = 2, dec_point = '.', thousands_sep = ',') => {
    let dec = String(number).split('.')[1];
    if (!Number(dec)) decimals = 0; //如果小数都是0，则不显示小数
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number;
    let s = '';
    let toFixedFix = function (n, decimals) {
        var k = Math.pow(10, decimals);
        return '' + Math.ceil(n * k) / k;
    };
    s = (decimals ? toFixedFix(n, decimals) : '' + Math.round(n)).split('.');
    let reg = /(-?\d+)(\d{3})/;
    while (reg.test(s[0])) {
        s[0] = s[0].replace(reg, '$1' + thousands_sep + '$2');
    }
    if ((s[1] || '').length < decimals) {
        s[1] = s[1] || '';
        s[1] += new Array(decimals - s[1].length + 1).join('0');
    }
    return s.join(dec_point);
};

// 拼接 url 参数对象
export const GetUrlWithParams = (url, params) => {
    if (url && params) {
        for (let key in params) {
            if (HasOwnProperty(params, key) && params[key]) {
                url += (url.indexOf('?') > -1) ? '&' : '?';
                url += `${key}=${params[key]}`;
            }
        }
    }
    return url;
};

// 判断是否是微信浏览器
export const isWeChat = () => {
    let ua = navigator.userAgent.toLowerCase();
    let isWinxin = ua.indexOf('micromessenger') != -1;
    return isWinxin ? true : false;
};

// 通过iframe下载文件流 
export const DownloadFileByIframe = (url) => {
    let oldIframe = document.getElementById('downloadIframe');
    if (oldIframe) {
        document.body.removeChild(oldIframe);
    }
    let iframe = document.createElement('iframe');
    iframe.id = 'downloadIframe';
    iframe.src = url;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
};

// 通过创建a标签下载文件 
export const DownloadFileByLink = (url) => {
    let link = document.createElement('a');
    link.href = url;
    link.style.display = 'none';
    link.click();
};