import { defineStore } from 'pinia'

export const useRickAndMortyStore = defineStore('rickAndMortyStore', {
  state: () => ({
    characters: [],
  }),
  actions: {
    setState(payload) {
      this.characters = payload
    }
  }
})