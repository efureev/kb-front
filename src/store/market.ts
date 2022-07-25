import { defineStore } from 'pinia'
import type { IFruitItem } from '@/api/market'
import { getFruitList } from '@/api/market'

export interface IMarketState {
  fruitList: IFruitItem[]
}

export const useMarket = defineStore('market', {
  state(): IMarketState {
    return {
      fruitList: [],
    }
  },
  actions: {
    async getList() {
      try {
        const data = await getFruitList()
        this.fruitList = data
      }
      catch (error) {
        // console.log(error)
      }
    },
  },
})
