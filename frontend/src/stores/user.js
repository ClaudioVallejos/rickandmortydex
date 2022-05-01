import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    username: false,
  }),
  actions: {
    login(payload) {
      const { username } = payload
      this.username = username
    },
    logout() {
      this.username = false
    }
  }
})