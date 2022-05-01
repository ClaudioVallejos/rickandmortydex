<script setup>
  import Card from "@/components/Card.vue"
  import { onMounted, reactive } from 'vue'
  import { storeToRefs  } from 'pinia'
  import { getUser, getCharacters } from '@/api.js'
  import { useUserStore } from '@/stores/user.js'
  import { useRickAndMortyStore } from '@/stores/rickandmorty.js'

  const userStore = useUserStore()
  const rickAndMortyStore = useRickAndMortyStore()

  onMounted(async () => {
    const resUser = await getUser()
    if(resUser.status == 200){
      const user = resUser.content
      userStore.login({username: user.name})
    }
    const resCharacters = await getCharacters()
    if(resCharacters.results){
      const characters = resCharacters.results
      rickAndMortyStore.setState(characters)
    }
  })

  const { characters } = storeToRefs(rickAndMortyStore)

</script>

<template> 
    <div class="album py-5 bg-light">
        <div class="container">
            <div class="row g-lg-5">
                <Card v-for="char in characters" v-bind:key="char.id" :data="char" class="col"/>
            </div>
        </div>
    </div>
</template>