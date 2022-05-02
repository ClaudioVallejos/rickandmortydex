import { defineStore } from 'pinia'

export const useRickAndMortyStore = defineStore('rickAndMortyStore', {
  state: () => ({
    characters: [],
    search: '',
    page: {
      next: null,
      prev: null
    }
  }),
  actions: {
    setState(payload) {
      this.characters = payload.results
      this.page.next = payload.info.next
      this.page.prev = payload.info.prev
    },
    setSearch(text) {
      this.search = text
    }
  }
})