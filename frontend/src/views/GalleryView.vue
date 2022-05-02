<script setup>
  import "@/assets/styles.css"
  import Card from "@/components/Card.vue"
  import Footer from "@/components/Footer.vue"
  import { onMounted, reactive } from 'vue'
  import { storeToRefs  } from 'pinia'
  import { getUser, getCharacters, saveFavorite } from '@/api.js'
  import { useUserStore } from '@/stores/user.js'
  import { useRickAndMortyStore } from '@/stores/rickandmorty.js'

  const userStore = useUserStore()
  const rickAndMortyStore = useRickAndMortyStore()
  
  const refreshUserData = async () => {
    const resUser = await getUser()
    if(resUser.status == 200){
      const user = resUser.content
      userStore.setFavorites(user.favorites)
      userStore.login({username: user.name})
    }
  }

  const refreshCharactersData = async (pageNumber = 1) => {
    const resCharacters = await getCharacters(pageNumber)
    if(resCharacters.results){
      rickAndMortyStore.setState(resCharacters)
    }
  }

  onMounted(async () => {
    await refreshCharactersData();
    await refreshUserData();

  })

  const handleFavorite = async (characterData) => {
    if(!username) return false
    const resFavorite = await saveFavorite(characterData)
    if(resFavorite.status == 200){
      await refreshUserData();
    }
  }

  const handleNext = (e) => {
    const pageNumber = e.split('=')[1]
    refreshCharactersData(pageNumber)
    window.scrollTo(0, 0);
  }

  const handlePrev = (e) => {
    const pageNumber = e.split('=')[1]
    refreshCharactersData(pageNumber)
    window.scrollTo(0, 0);
  }

  const { characters, search, page } = storeToRefs(rickAndMortyStore)
  const { favorites, username } = storeToRefs(userStore)
</script>

<template>
<div>
    <div class="album py-5 mt-5">
      <div class="container">
        <div class="row g-lg-5">
          <Card
            @clickFavorite="handleFavorite"
              v-for="char in characters.filter( char => 
                char.name.toLowerCase().includes( search.toLowerCase() ) 
                || char.gender.toLowerCase() == ( search.toLowerCase() )
                || char.status.toLowerCase().includes( search.toLowerCase() )  
              )" 
            v-bind:key="char.id" :data="char" class="col"/>
        </div>
      </div>
    </div>
    <Footer :pagination="true" :pages="page" @prevPage="handlePrev" @nextPage="handleNext"/>
</div>
</template>