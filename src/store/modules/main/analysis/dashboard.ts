// 商品统计模块
import type { Module } from 'vuex'
import type { IRootState } from "@/store/types"
import type { IDashboardState } from "@/store/modules/main/analysis/types"
import type { IGoodsCount, IGoodsCountry, IGoodsFavor } from "service/main/analysis/types"
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale,
} from "service/main/analysis/dashboard"

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,

  state: () => ({
    categoryGoodsCount: [], // 不同分类的商品个数
    categoryGoodsSale: [], // 不同分类的商品销量
    categoryGoodsFavor: [], // 不同分类的商品收藏
    addressGoodsSale: [], // 不同城市的商品销量
  }),

  mutations: {
    setCategoryGoodsCount(state, categoryGoodsCount: IGoodsCount[]) {
      state.categoryGoodsCount = categoryGoodsCount
    },

    setCategoryGoodsSale(state, categoryGoodsSale: IGoodsCount[]) {
      state.categoryGoodsSale = categoryGoodsSale
    },

    setCategoryGoodsFavor(state, categoryGoodsFavor: IGoodsFavor[]) {
      state.categoryGoodsFavor = categoryGoodsFavor
    },

    setAddressGoodsSale(state, addressGoodsSale: IGoodsCountry[]) {
      state.addressGoodsSale = addressGoodsSale
    },
  },

  actions: {
    // 获取商品统计页面的数据
    async getDashboardDataAction({commit}) {
      const categoryGoodsCount = (await getCategoryGoodsCount<IGoodsCount>()).data
      const categoryGoodsSale = (await getCategoryGoodsSale<IGoodsCount>()).data
      const categoryGoodsFavor = (await getCategoryGoodsFavor<IGoodsFavor>()).data
      const addressGoodsSale = (await getAddressGoodsSale<IGoodsCountry>()).data

      commit('setCategoryGoodsCount', categoryGoodsCount)
      commit('setCategoryGoodsSale', categoryGoodsSale)
      commit('setCategoryGoodsFavor', categoryGoodsFavor)
      commit('setAddressGoodsSale', addressGoodsSale)
    },
  },
}

export default dashboardModule