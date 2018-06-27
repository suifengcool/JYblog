import moment from 'moment'

/**
 * 格式化过滤器
 * @param r 行
 * @param c 列
 * @param val 值
 */
// 日期格式化
export const dateFilter = (r, c, val) => val ? moment(val).format('YYYY-MM-DD') : '无';
export const datenFilter = (r, c, val) => val ? moment(val).format('YYYY年MM月DD日') : '无';
export const TimeFilter = (r, c,val)=> val ? moment(val).format('YYYY.MM.DD') : '无';

// 时间格式化
export const timeFilter = (val, format = 'MM-DD') => val ? moment(val).format(format) : '无';
export const TimesFilter = (r, c,val)=> val ? moment(val).format('HH:mm') : '无';
export const dateTimeFilter = (r, c, val) => val ? moment(val).format('YYYY-MM-DD HH:mm') : '无';
export const datenTimeFilter = (r, c, val) => val ? moment(val).format('YYYY年MM月DD日 HH:mm') : '无';
export const detailTimeFilter = (r, c, val) => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '无';
export const hourTimeFilter = (val) => val ? moment(val).format('HH:mm') : '无';
export const mydetailTimeFilter = (val) => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '无';

// 时间间隔天数 date 日期时间   val相隔天数
export const intervalDayFilter = (date , val) =>  moment(date).add(val,'days').format('YYYY-MM-DD HH:mm:ss')

// 时间间隔格式化
export const diffFilter = (val, type = 'days') => {
  const diff = val ? moment(val).diff(Date.now(), type) : 0
  return diff > 0 ? diff : 0
}

// 默认显示 ‘无’
export const defValFilter01 = (r, c, val) => val || '无';
// 默认值显示 ‘未知’
export const defValFilter02 = (r, c, val) => val || '未知';
// 默认值显示 0
export const defValFilter03 = (r, c, val) => val || 0;

// 货币显示格式化
export const currencyFilter = (r, c, val) => val * 1 ? (val * 1).toFixed(2) : '0.00'

// 角色状态
export const roleFilter = (r, c, val) => ['企业', '个人'][val] || '无'


export const auditFilter2 = (r, c, val) => ['未知', '审核中', '审核成功', '审核失败', '打款中'][val] || '未知'

// 付款状态
export const payStateFilter = (r, c, val) => ['待付款', '已付款', '已取消', '已退款'][val] || '未知'

// 支付方式
export const payTypeFilter = (r, c, val) => ['其他', '微信', '支付宝', '余额支付', '银行', '其他'][val] || '其他'

export const payTypeFilter1 = (r, c, val) => ['','微信', '支付宝', '余额支付'][val] || '其他'

// 电话号码打***
export const poneFilter = (r, c, val) => val.substr(0, 3) + '****' + val.substr(7)

// 银行卡号打***
export const cardFilter = (r, c, val) => '**** **** ****' + val.substr(-4, 4)

// 万以上数量格式化
export const thousandnumberFilter = (r, c, val) => {
  return String(val).length >= 5 ? (val / 100000000).toFixed(2) + '亿' : val
}

// 时间戳
// ['今天', '昨天', '最近7天', '最近30天'，'最近一年'][id]
let currtDate = Date.parse(new Date()) // 此时的时间戳
let today = [Date.parse(new Date(new Date().setHours(0, 0, 0, 0))), currtDate]
let yesterday = [
  Date.parse(new Date(new Date().setHours(0, 0, 0, 0))) - 3600000 * 24 * 1,
  Date.parse(new Date(new Date().setHours(0, 0, 0, 0)))
]
let sevenday = [currtDate - 3600000 * 24 * 7, currtDate]
let thirtyday = [currtDate - 3600000 * 24 * 30, currtDate]
// 判断平年/闰年
let y = new Date().getFullYear()
const isLeap = (y % 4 === 0 && y % 100 === 0) || y % 400 === 0
const days = isLeap ? 366 : 365
let oneyear = [currtDate - 3600000 * 24 * days, currtDate]
export const timestampFilter = (r, c, val) =>
  [today, yesterday, sevenday, thirtyday, oneyear][val]

export const dataTime = val =>{
  const dataTime = new Date(val)
  var year = dataTime.getFullYear();
  var month = dataTime.getMonth()+1;
  var day = dataTime.getDate();
  return year+"年"+month+"月"+day+"日"
}

// 数字num格式化
export const numFilter = val => {
  if (val > 0 && val < 100) {
    return Number(val).toFixed(2)
  } else if (val < 1000) {
    return Number(val / 100).toFixed(2) + '百'
  } else if (val < 10000) {
    return Number(val / 1000).toFixed(2) + '千'
  } else if (val < 100000) {
    return Number(val / 10000).toFixed(2) + '万'
  } else if (val < 1000000) {
    return Number(val / 100000).toFixed(2) + '十万'
  } else if (val < 10000000) {
    return Number(val / 1000000).toFixed(2) + '百万'
  } else if (val < 100000000) {
    return Number(val / 10000000).toFixed(2) + '千万'
  } else {
    return Number(val / 100000000).toFixed(2) + '亿'
  }
}

export  const pictureType= (r,c,val) => ['标题图','banner图','首页图'][val]