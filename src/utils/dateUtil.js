/*
  格式化日期
*/
export const formatDate = () => {
  let date = new Date(Date.now())
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}