import { coordinateData } from './coordinate-data'

// 将数据转化为 echarts 支持的城市地图数据（主要是为了在 echarts 中注册的地图中根据经纬度位置进行定位）
export const convertData = function (data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name] // 获取城市的经纬度数据
    if (geoCoord) {
      res.push({
        name: data[i].name, // 城市名称
        value: geoCoord.concat(data[i].value) // [城市经度，城市维度，需要展示的城市数据]
      })
    }
  }
  return res
}
