<script setup>
  import CardFavorite from "@/components/CardFavorite.vue"
  import Footer from "@/components/Footer.vue"
  import { useRouter } from 'vue-router'
  import { onMounted, reactive } from 'vue'
  import { storeToRefs  } from 'pinia'
  import { getUser, getCharacters, saveFavorite } from '@/api.js'
  import { useUserStore } from '@/stores/user.js'
  import { useRickAndMortyStore } from '@/stores/rickandmorty.js'

  const userStore = useUserStore()
  const rickAndMortyStore = useRickAndMortyStore()
  const router = useRouter()

  const refreshUserData = async () => {
    const resUser = await getUser()
    if(resUser.status == 200){
      const user = resUser.content
      userStore.setFavorites(user.favorites)
      userStore.login({username: user.name})
    }

  }

  onMounted(async () => {
    await refreshUserData();
    const resCharacters = await getCharacters()
    if(resCharacters.results){
      const characters = resCharacters.results
      rickAndMortyStore.setState(characters)
    }
  })

  const handleFavorite = async (characterData) => {
    if(!username) return false
    const resFavorite = await saveFavorite(characterData)
    if(resFavorite.status == 200){
      await refreshUserData();
    }
  }

  const { characters, search } = storeToRefs(rickAndMortyStore)
  const { favorites, username } = storeToRefs(userStore)

  if(!username.value) router.push('/')

</script>

<template>
  <div>
    <div class="album py-5 bg-light">
        <div class="container">
            <div v-if="favorites.collection.length > 0"  class="row g-lg-5">
              <CardFavorite
                @clickFavorite="handleFavorite"
                v-for="char in favorites.collection.filter( char => 
                  char.name.toLowerCase().includes( search.toLowerCase() ) 
                  || char.gender.toLowerCase() == ( search.toLowerCase() )
                  || char.status.toLowerCase().includes( search.toLowerCase() )  
                )" :key="char.characterId" :data="char" class="col"
              />
            </div>
            <div v-else class="row mt-5 pt-5">
              <div class="col-12">
                <h1 class="text-center">No hay favoritos aún</h1>
              </div>
            </div>
        </div>
    </div>
    <Footer :pagination="false" />
  </div>
</template>