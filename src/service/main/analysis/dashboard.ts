// 商品统计页面请求相关
import lxRequest from "@/service"
import type { IDataType } from "service/types"

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale',
}

// 获取不同分类的商品个数
export function getCategoryGoodsCount<T>() {
  return lxRequest.get<IDataType<T>>({
    url: DashboardAPI.categoryGoodsCount,
  })
}

// 不同分类的商品销量
export function getCategoryGoodsSale<T>() {
  return lxRequest.get<IDataType<T>>({
    url: DashboardAPI.categoryGoodsSale,
  })
}

// 不同分类的商品收藏
export function getCategoryGoodsFavor<T>() {
  return lxRequest.get<IDataType<T>>({
    url: DashboardAPI.categoryGoodsFavor,
  })
}

// 不同城市的商品销量
export function getAddressGoodsSale<T>() {
  return lxRequest.get<IDataType<T>>({
    url: DashboardAPI.addressGoodsSale,
  })
}

