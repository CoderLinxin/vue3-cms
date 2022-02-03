// 一般请求返回的数据类型
export interface IDataType<T = any> {
  code: number,
  data: T
}