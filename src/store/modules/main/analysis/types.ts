import type { IGoodsCount, IGoodsCountry, IGoodsFavor } from "service/main/analysis/types"

export interface IDashboardState {
  categoryGoodsCount: IGoodsCount[], // 不同分类的商品个数
  categoryGoodsSale: IGoodsCount[], // 不同分类的商品销量
  categoryGoodsFavor: IGoodsFavor[], // 不同分类的商品收藏
  addressGoodsSale: IGoodsCountry[] // 不同城市的商品销量
}