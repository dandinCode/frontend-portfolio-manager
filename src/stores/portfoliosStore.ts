import { defineStore } from 'pinia'
import { getMyPortfolios } from '@/services/portfolio'

export const usePortfoliosStore = defineStore('portfolio', {
  state: () => ({
    portfolios: [] as any[],
    loaded: false,
  }),

  actions: {
    loadFromSession() {
      const stored = sessionStorage.getItem('portfolios')

      if (stored) {
        this.portfolios = JSON.parse(stored)
        this.loaded = true
      }
    },

    saveToSession() {
      sessionStorage.setItem('portfolios', JSON.stringify(this.portfolios))
    },

    async fetchPortfolios() {
      if (this.loaded) return

      const { data } = await getMyPortfolios()

      this.portfolios = data

      this.loaded = true

      this.saveToSession()
    },

    setPortfolios(portfolios: any[]) {
      this.portfolios = portfolios
      this.saveToSession()
    },

    addPortfolio(portfolio: any) {
      this.portfolios.push(portfolio)
      this.saveToSession()
    },

    removePortfolio(id: number) {
      this.portfolios = this.portfolios.filter((p) => p.id !== id)

      this.saveToSession()
    },

    getPortfolio(id: number) {
      return this.portfolios.find((p) => p.id === id)
    },
  },
})
