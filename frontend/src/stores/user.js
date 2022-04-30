import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    name: false,
  }),
  actions: {
    login(payload) {
      const { name } = payload
      this.name = name
    },
    logout() {
      this.name = false
    }
  }
})