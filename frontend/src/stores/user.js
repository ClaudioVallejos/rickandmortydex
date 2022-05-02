import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    username: false,
    favorites: {
      ids: [],
      collection: []
    },
  }),
  actions: {
    login(payload) {
      const { username } = payload
      this.username = username
    },
    setFavorites(payload) {
      const favoritesIds = payload.map(favorite => favorite.characterId)
      this.favorites.ids = favoritesIds
      this.favorites.collection = payload
    },
    logout() {
      this.username = false
    }
  }
})