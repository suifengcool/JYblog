import moment from 'moment'

/**
 * 格式化过滤器
 * @param r 行
 * @param c 列
 * @param val 值
 */
// 日期格式化
export const dateFilter = (r, c, val) =>
  val ? moment(val).format('YYYY-MM-DD') : '无'
  export const datenFilter = (r, c, val) =>
  val ? moment(val).format('YYYY年MM月DD日') : '无'
export const TimeFilter = (r, c,val)=>
  val ? moment(val).format('YYYY.MM.DD') : '无'

// 时间格式化
export const timeFilter = (val, format = 'MM-DD') =>
  val ? moment(val).format(format) : '无'
 // 时间格式化
 export const TimesFilter = (r, c,val)=>
  val ? moment(val).format('HH:mm') : '无'
// 时间格式化
export const dateTimeFilter = (r, c, val) =>
  val ? moment(val).format('YYYY-MM-DD HH:mm') : '无'
  // 时间格式化
export const datenTimeFilter = (r, c, val) =>
val ? moment(val).format('YYYY年MM月DD日 HH:mm') : '无'
// 时间格式化 年月日 时分秒
export const detailTimeFilter = (r, c, val) => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '无'

export const hourTimeFilter = (val) => val ? moment(val).format('HH:mm') : '无'

export const mydetailTimeFilter = (val) => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '无'
// 时间间隔天数 date 日期时间   val相隔天数
export const intervalDayFilter = (date , val) =>  moment(date).add(val,'days').format('YYYY-MM-DD HH:mm:ss')
// 时间间隔格式化
export const diffFilter = (val, type = 'days') => {
  const diff = val ? moment(val).diff(Date.now(), type) : 0
  return diff > 0 ? diff : 0
}
// 课时计算
export const hourFilter = ({ startTime, endTime }) =>
  moment(endTime).diff(moment(startTime), 'hours') || 0
// 默认显示 ‘无’
export const defValFilter01 = (r, c, val) => val || '无'
// 默认值显示 ‘未知’
export const defValFilter02 = (r, c, val) => val || '未知'
// 默认值显示 0
export const defValFilter03 = (r, c, val) => val || 0
// 审核状态
export const statusFilter01 = (r, c, val) =>
  ['未知', '待审核', '通过', '拒绝'][val] || '未知'
export const statusFilter02 = (r, c, val) =>
  ['审核中', '打款中', '已打款', '已拒绝'][val] || '未知'
  // 教龄
  export const teachyear = (r, c, val) =>
  ['','一至三年', '三至五年', '五至十年', '十至十五年'][val] || '未知'
// 货币显示格式化
export const currencyFilter = (r, c, val) =>
  val * 1 ? (val * 1).toFixed(2) : '0.00'
// 身份状态
export const defValFilter04 = (r, c, val) => ['未知', '学生', '老师'][val]
//性别
export const genderFilter = (r, c, val) => ['未知', '男', '女'][val]
// 课程计价方式
export const courseTypeFilter = (r, c, val) => ['小时', '天', '一周', '月'][val]
// 广告类型
export const bannerTypeFilter = (r, c, val) =>
  ['APP首页广告', '引导页广告'][val] || '未知'
// 公告类型
export const noticeTypeFilter = (r, c, val) => ['公告', '推送'][val]
// 是否被预约
export const subscribeFilter = (r, c, val) =>
  ['未预约', '已预约'][val] || '未预约'
// 角色状态
export const roleFilter = (r, c, val) => ['企业', '个人'][val] || '无'
// 认证状态
export const applyFilter = (r, c, val) => ['去认证', '认证审核中', '已认证', '认证失败'][val] || '去认证'
// 退款状态
export const refundFilter = (r, c, val) =>
  ['待处理', '已同意', '已拒绝'][val] || '已同意'
// 审核状态
export const auditFilter = (r, c, val) => ['待审核', '审核中', '已通过', '已拒绝'][val] || '未知'

export const auditFilter2 = (r, c, val) => ['未知', '审核中', '审核成功', '审核失败', '打款中'][val] || '未知'

// 付款状态
export const payStateFilter = (r, c, val) => ['待付款', '已付款', '已取消', '已退款'][val] || '未知'

//订单结算状态
export const settlementStatusFilter = (val) =>['待结算', '结算中', '已结算'][val] || '未知'
//服务商
export const fuWuFilter = (r, c, val) => ['机构发展服务商', '宣传推广服务商', '教师资源服务商', '课程资源服务商','城市服务商','其他资源服务商'][val-1] || '未知'

// 提现状态
export const cashFilter = (r, c, val) =>
  ['未知', '待审核', '审核成功', '审核失败'][val] || '未知'
// 支付方式
export const courseFilter = (r, c, val) =>
  ['等待审核', '发布成功', '发布失败'][val] || '发布失败'
// 课程类型,0 : 线下课程 1：直播课程 2：视频课程
export const courseTypeFilter02 = (r, c, val) =>
  ['线下课程', '直播课程', '视频课程'][val] || '未知'
// 课程服务群体,教学科目
let eduItemMap
export const courseGradeFilter = (r, c, val) => {
  if (!eduItemMap) {
    eduItemMap = {}
    getEduItemApi().then(list =>
      list.forEach(({ id, itemName }) => {
        eduItemMap[id] = itemName
      })
    )
  }
  return eduItemMap[val] || '未知'
}
// 支付方式
export const payTypeFilter = (r, c, val) =>
  ['其他', '微信', '支付宝', '余额支付', '银行', '其他'][val] || '其他'

  export const payTypeFilter1 = (r, c, val) =>
  ['','微信', '支付宝', '余额支付'][val] || '其他'
// 状态计算,0:未开始，1:进行中，2：已结束
export const statusFilter = (starttime, endtime) =>
  Date.now() < starttime
    ? 0
    : starttime <= Date.now() && Date.now() <= endtime
      ? 1
      : 2
// 预约课程状态
export const subStatusFilter = (r, c, val) =>
  [
    '待支付',
    '已支付',
    '支付失败',
    '取消预约',
    '已完成',
    '退款中',
    '已退款',
    '拒绝退款',
    '上课中',
    '已评价'
  ][val] || '未知'
// 电话号码打***
export const poneFilter = (r, c, val) =>
  val.substr(0, 3) + '****' + val.substr(7)

// 银行卡号打***
export const cardFilter = (r, c, val) => '**** **** ****' + val.substr(-4, 4)
// 类型筛选 0 达人号 1 公众号
export const weixinType = (r, c, val) => ['达人号', '公众号'][val] || '未知'
// 万以上数量格式化
export const thousandnumberFilter = (r, c, val) => {
  return String(val).length >= 5 ? (val / 100000000).toFixed(2) + '亿' : val
}
// 银行卡图标
// ['工商','农行','中行','建行']

export const bankIconFilter = (val) =>
  [
    'icon-gongshangyinhang-',
    'icon-nongyeyinhang-',
    'icon-zhongguoyinhang-',
    'icon-zhongguojiansheyinhang'
  ][val]

export const bankNameFilter = (val) => ['中国工商银行','中国农业银行','中国银行','中国建设银行'][val]
// 各银行电话
export const bankTelFilter = (r, c, val) => ['95588', '95599', '95566', '95533'][val]
const bank ={
  '中国工商银行':{
    'icon':'icon-gongshangyinhang-',
    'tel':95588
  },
  '中国农业银行':{
    'icon':'icon-nongyeyinhang-',
    'tel':95599
  },
  '中国银行':{
    'icon':'icon-zhongguoyinhang-',
    'tel':95566
  },
  '中国建设银行':{
    'icon':'icon-zhongguojiansheyinhang',
    'tel':95533
  }
}
export const bankval = (val) => bank[val]
//console.log( bankval('中国工商银行').icon)
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


// 地区和兴趣爱好转化
export const industrystring = (r, c, val) => val.split('+').join(' ')
// 广告状态
export const advstate = (r, c, val) =>
  ['审核中', '待投放', '已拒绝', '投放中', '暂停中', '已完成'][val]

// 数字num格式化
// export const numFilter = ( val) => {
//   if ( val < 10000) {
//     return Number(val).toFixed(2)
//   }
//   if (val < 1000000 && val > 10000) {
//     return Number(val / 10000).toFixed(2) + '万'
//   }
//   if (val < 100000000 && val > 1000000) {
//     return Number(val / 1000000).toFixed(2) + '百万'
//   }
//   if (val > 100000000) {
//     return Number(val / 100000000).toFixed(2) + '亿'
//   }
// }
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
