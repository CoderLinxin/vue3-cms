// 商品个数的数据模型
export interface IGoodsCount {
  id: number;
  name: string;
  goodsCount: number;
}

// 商品收藏的数据模型
export interface IGoodsFavor {
  id: number;
  name: string;
  goodsFavor?: number;
}

// 某一城市商品销量的数据模型
export interface IGoodsCountry {
  address: string;
  count: number;
}










