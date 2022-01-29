// 管理缓存相关

class LocalCache {
  // 设置缓存
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取缓存
  getCache(key: string) {
    const cache = window.localStorage.getItem(key)
    if (cache) {
      return JSON.parse(cache)
    }
  }

  // 删除缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  // 清空缓存
  clearCache() {
    window.localStorage.clear()
  }
}

const localCache = new LocalCache()

export default localCache

