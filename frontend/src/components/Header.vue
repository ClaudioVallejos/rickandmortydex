<script setup>
  import { RouterLink, useRouter } from "vue-router"
  import { storeToRefs  } from 'pinia'
  import SearchBar from '@/components/searchBar.vue'
  import { useUserStore } from '@/stores/user.js'
  import { useRickAndMortyStore } from '@/stores/rickandmorty.js'
  import { logout } from '@/api.js'

  const userStore = useUserStore()
  const rickAndMortyStore = useRickAndMortyStore()
  const router = useRouter()

  const { username } = storeToRefs(userStore)

  async function handleLogout(){
    const wantToLogout = confirm('¿Estás seguro que quieres cerrar sesión?');
    if(wantToLogout){
      userStore.logout()
      logout()
      router.push('/')
    }
  }

  const handlerTextChange = (e) => {
    rickAndMortyStore.setSearch(e.searchText)
  }

</script>

<template>
  <header>
    <div class="navbar navbar-dark bg-dark shadow-sm fixed-top">
      <div class="container">
        <RouterLink v-if="username" to="/favorites" class="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          width="48" height="48"
          viewBox="0 0 48 48"
          style=" fill:#000000;"><path fill="#6d4c41" d="M24,3c11.046,0,20,8.954,20,20s-8.954,20-20,20S4,34.046,4,23c0-6,3-8,3-8C9,6,15.787,3,24,3z"></path><path fill="#ffd391" d="M38.5 28A4.5 4.5 0 1 0 38.5 37 4.5 4.5 0 1 0 38.5 28zM9.5 28A4.5 4.5 0 1 0 9.5 37 4.5 4.5 0 1 0 9.5 28z"></path><path fill="#ffd391" d="M24 12A17 17 0 1 0 24 46A17 17 0 1 0 24 12Z"></path><path fill="#bf360c" d="M27.935,40.426C27.623,39.293,25.987,38,24,38s-3.623,1.293-3.935,2.426 C20.026,40.544,20,40.669,20,40.8c0,0.663,0.537,1.2,1.2,1.2c0.8,0,1.2-1,2.8-1s2,1,2.8,1c0.663,0,1.2-0.537,1.2-1.2 C28,40.669,27.974,40.544,27.935,40.426z"></path><path fill="#fcf5ea" d="M25.41,35.41C25.02,35.8,24.51,36,24,36s-1.02-0.2-1.41-0.59l-1.5-1.5l2.82-2.82l1.5,1.5 C26.2,33.37,26.2,34.63,25.41,35.41z"></path><g><path fill="#fafafa" d="M32 22A6 6 0 1 0 32 34 6 6 0 1 0 32 22zM16 22A6 6 0 1 0 16 34 6 6 0 1 0 16 22z"></path></g><g><path fill="#212121" d="M32 28A1 1 0 1 0 32 30 1 1 0 1 0 32 28zM16 28A1 1 0 1 0 16 30 1 1 0 1 0 16 28z"></path></g>
        </svg>
           <span>Favoritos</span>
        </RouterLink >
        
        <RouterLink v-else to="/" class="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          width="48" height="48"
          viewBox="0 0 48 48"
          style=" fill:#000000;"><path fill="#6d4c41" d="M24,3c11.046,0,20,8.954,20,20s-8.954,20-20,20S4,34.046,4,23c0-6,3-8,3-8C9,6,15.787,3,24,3z"></path><path fill="#ffd391" d="M38.5 28A4.5 4.5 0 1 0 38.5 37 4.5 4.5 0 1 0 38.5 28zM9.5 28A4.5 4.5 0 1 0 9.5 37 4.5 4.5 0 1 0 9.5 28z"></path><path fill="#ffd391" d="M24 12A17 17 0 1 0 24 46A17 17 0 1 0 24 12Z"></path><path fill="#bf360c" d="M27.935,40.426C27.623,39.293,25.987,38,24,38s-3.623,1.293-3.935,2.426 C20.026,40.544,20,40.669,20,40.8c0,0.663,0.537,1.2,1.2,1.2c0.8,0,1.2-1,2.8-1s2,1,2.8,1c0.663,0,1.2-0.537,1.2-1.2 C28,40.669,27.974,40.544,27.935,40.426z"></path><path fill="#fcf5ea" d="M25.41,35.41C25.02,35.8,24.51,36,24,36s-1.02-0.2-1.41-0.59l-1.5-1.5l2.82-2.82l1.5,1.5 C26.2,33.37,26.2,34.63,25.41,35.41z"></path><g><path fill="#fafafa" d="M32 22A6 6 0 1 0 32 34 6 6 0 1 0 32 22zM16 22A6 6 0 1 0 16 34 6 6 0 1 0 16 22z"></path></g><g><path fill="#212121" d="M32 28A1 1 0 1 0 32 30 1 1 0 1 0 32 28zM16 28A1 1 0 1 0 16 30 1 1 0 1 0 16 28z"></path></g>
        </svg>
           <span>Galeria</span>
        </RouterLink>

        <SearchBar @textChange="handlerTextChange"/>

        <!-- if user-->
        <div v-if="username" class="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="48" height="48"
            viewBox="0 0 48 48"
            style=" fill:#000000;"><path fill="#81d4fa" d="M47,19l-1.5,0c-0.2,0-0.4,0-0.6,0c-2.8,0-4.5-0.5-5.6-0.8c0.5-1.7,1.9-4.9,3.8-7.4l1-1.3l-1.6-0.3 C41.5,9.1,40.6,9,39.6,9c-2.3,0-4.6,0.2-5.9,0.6C33.6,8.3,33,5.8,33,3V2h-1c-2.5,0-6.3,2.8-7.9,4c-1.7-1.6-5.6-5.1-8-5.1L16,1l-1,0 v1c0,3.1-0.5,5.7-0.8,7c-1.5-0.1-4.5,0-7.8-0.7L5,8l0.2,1.4c0.7,4.3,2.2,7.4,3.2,9c-1.6,0.5-3.6,1.7-6.4,3.8L1,23.1l1.1,0.8 c1.6,1.1,2.7,1.9,3.6,2.5c1,0.6,1,1,1.8,1.7c-2.2,2-4,3.1-4.1,3.1L2.1,32l1.4,0.9L8,35.5c-0.1,0.6-0.4,1.6-0.7,3.9L7,41c0,0,6-1,9-3 h16c0.9,0.4,4,3,6.8,3H40l-0.3-1.2c-0.4-1.7-0.6-2.7-0.7-3.3c1.4-0.9,5.4-3.4,6.4-5.5L46,30l-1.1-0.3c-1.1-0.3-2.6-1-3.4-1.6 c1.4-1.3,3.6-4.1,5-7.6L47,19z"></path><path fill="#bcaaa4" d="M35 28A4 4 0 1 0 35 36 4 4 0 1 0 35 28zM13 28A4 4 0 1 0 13 36 4 4 0 1 0 13 28z"></path><path fill="#d7ccc8" d="M24,11c-6.1,0-11,5.4-11,13.2v9.5C13,41.6,17.9,47,24,47s11-5.4,11-13.2v-9.5C35,16.4,30.1,11,24,11z"></path><path fill="#43a047" d="M25.1,37h-5.3H19v0.9c0,1.2,0.5,2.5,1.6,2.7c0.1,1.2,0.7,2.4,1.9,2.4c1.2,0,1.8-1.2,2-2.4 c0.7-0.2,1.5-0.9,1.5-2.7V37H25.1z"></path><path fill="#8d6e63" d="M17,39c-0.4,0-0.8-0.3-0.9-0.7c-0.2-0.5,0.1-1.1,0.6-1.3c0.1,0,3.2-1.1,7.3-1.1c4.1,0,7.2,1,7.3,1.1 c0.5,0.2,0.8,0.7,0.6,1.3c-0.2,0.5-0.7,0.8-1.3,0.6c0,0-2.9-0.9-6.7-0.9c-3.8,0-6.7,0.9-6.7,0.9C17.2,39,17.1,39,17,39z"></path><path fill="#efebe9" d="M22,26v4.5c0,1.1,0.1,4.5,2,4.5s2-3.4,2-4.5V26H22z"></path><path fill="#fafafa" d="M28.5 21A4.5 4.5 0 1 0 28.5 30A4.5 4.5 0 1 0 28.5 21Z"></path><path fill="#fafafa" d="M19.5 21A4.5 4.5 0 1 0 19.5 30A4.5 4.5 0 1 0 19.5 21Z"></path><g><path fill="#212121" d="M29 24A1 1 0 1 0 29 26 1 1 0 1 0 29 24zM19 25A1 1 0 1 0 19 27 1 1 0 1 0 19 25z"></path></g><g><path fill="#64b5f6" d="M24,22c-1.4,0-2.6-0.3-3.7-0.6c-0.5-0.1-1.1-0.3-1.5-0.3c-1.6-0.2-2.6,0-2.6,0 c-0.5,0.1-1.1-0.2-1.2-0.7c-0.1-0.5,0.2-1,0.7-1.2c0.1,0,1.4-0.3,3.4,0c0.5,0.1,1.1,0.2,1.7,0.4c1,0.3,2,0.5,3.1,0.5 s2.1-0.3,3.1-0.5c0.6-0.2,1.2-0.3,1.7-0.4c2-0.3,3.3,0,3.4,0c0.5,0.1,0.9,0.6,0.7,1.2c-0.1,0.5-0.7,0.8-1.2,0.7c0,0-1-0.2-2.6,0 c-0.4,0.1-0.9,0.2-1.5,0.3C26.6,21.7,25.4,22,24,22z"></path></g>
          </svg>
          <label class="m-3">{{username}}</label> 
          
          <button v-on:click="handleLogout" type="button" class="btn btn-sm btn-outline-secondary"> 
            cerrar sesion  
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
          </button>

        </div>
        <!-- else user -->
        <RouterLink v-else to="/login" class="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="48" height="48"
            viewBox="0 0 48 48"
            style=" fill:#000000;"><path fill="#81d4fa" d="M47,19l-1.5,0c-0.2,0-0.4,0-0.6,0c-2.8,0-4.5-0.5-5.6-0.8c0.5-1.7,1.9-4.9,3.8-7.4l1-1.3l-1.6-0.3 C41.5,9.1,40.6,9,39.6,9c-2.3,0-4.6,0.2-5.9,0.6C33.6,8.3,33,5.8,33,3V2h-1c-2.5,0-6.3,2.8-7.9,4c-1.7-1.6-5.6-5.1-8-5.1L16,1l-1,0 v1c0,3.1-0.5,5.7-0.8,7c-1.5-0.1-4.5,0-7.8-0.7L5,8l0.2,1.4c0.7,4.3,2.2,7.4,3.2,9c-1.6,0.5-3.6,1.7-6.4,3.8L1,23.1l1.1,0.8 c1.6,1.1,2.7,1.9,3.6,2.5c1,0.6,1,1,1.8,1.7c-2.2,2-4,3.1-4.1,3.1L2.1,32l1.4,0.9L8,35.5c-0.1,0.6-0.4,1.6-0.7,3.9L7,41c0,0,6-1,9-3 h16c0.9,0.4,4,3,6.8,3H40l-0.3-1.2c-0.4-1.7-0.6-2.7-0.7-3.3c1.4-0.9,5.4-3.4,6.4-5.5L46,30l-1.1-0.3c-1.1-0.3-2.6-1-3.4-1.6 c1.4-1.3,3.6-4.1,5-7.6L47,19z"></path><path fill="#bcaaa4" d="M35 28A4 4 0 1 0 35 36 4 4 0 1 0 35 28zM13 28A4 4 0 1 0 13 36 4 4 0 1 0 13 28z"></path><path fill="#d7ccc8" d="M24,11c-6.1,0-11,5.4-11,13.2v9.5C13,41.6,17.9,47,24,47s11-5.4,11-13.2v-9.5C35,16.4,30.1,11,24,11z"></path><path fill="#43a047" d="M25.1,37h-5.3H19v0.9c0,1.2,0.5,2.5,1.6,2.7c0.1,1.2,0.7,2.4,1.9,2.4c1.2,0,1.8-1.2,2-2.4 c0.7-0.2,1.5-0.9,1.5-2.7V37H25.1z"></path><path fill="#8d6e63" d="M17,39c-0.4,0-0.8-0.3-0.9-0.7c-0.2-0.5,0.1-1.1,0.6-1.3c0.1,0,3.2-1.1,7.3-1.1c4.1,0,7.2,1,7.3,1.1 c0.5,0.2,0.8,0.7,0.6,1.3c-0.2,0.5-0.7,0.8-1.3,0.6c0,0-2.9-0.9-6.7-0.9c-3.8,0-6.7,0.9-6.7,0.9C17.2,39,17.1,39,17,39z"></path><path fill="#efebe9" d="M22,26v4.5c0,1.1,0.1,4.5,2,4.5s2-3.4,2-4.5V26H22z"></path><path fill="#fafafa" d="M28.5 21A4.5 4.5 0 1 0 28.5 30A4.5 4.5 0 1 0 28.5 21Z"></path><path fill="#fafafa" d="M19.5 21A4.5 4.5 0 1 0 19.5 30A4.5 4.5 0 1 0 19.5 21Z"></path><g><path fill="#212121" d="M29 24A1 1 0 1 0 29 26 1 1 0 1 0 29 24zM19 25A1 1 0 1 0 19 27 1 1 0 1 0 19 25z"></path></g><g><path fill="#64b5f6" d="M24,22c-1.4,0-2.6-0.3-3.7-0.6c-0.5-0.1-1.1-0.3-1.5-0.3c-1.6-0.2-2.6,0-2.6,0 c-0.5,0.1-1.1-0.2-1.2-0.7c-0.1-0.5,0.2-1,0.7-1.2c0.1,0,1.4-0.3,3.4,0c0.5,0.1,1.1,0.2,1.7,0.4c1,0.3,2,0.5,3.1,0.5 s2.1-0.3,3.1-0.5c0.6-0.2,1.2-0.3,1.7-0.4c2-0.3,3.3,0,3.4,0c0.5,0.1,0.9,0.6,0.7,1.2c-0.1,0.5-0.7,0.8-1.2,0.7c0,0-1-0.2-2.6,0 c-0.4,0.1-0.9,0.2-1.5,0.3C26.6,21.7,25.4,22,24,22z"></path></g>
          </svg>
          <span  class="m-3">Ingresa</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>