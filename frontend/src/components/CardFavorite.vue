<script setup>
    import { useUserStore } from '@/stores/user.js'
    import { storeToRefs  } from 'pinia'
    
    const userStore = useUserStore()
    const { username } = storeToRefs(userStore)
    const props = defineProps({ data: { type: Object } })
    const { characterId, name, image, status, origin, gender, species } = props.data

    const textClassByStatus = {
        'Dead': 'text-danger',
        'Alive': 'text-success',
        'unknown': 'text'
    }

    const statusClass = textClassByStatus[status] ?? ''
    const characterOrigin = origin.name == 'unknown' ? 'desconocido' : origin.name

    const characterData = {
      id: characterId,
      name,
      image,
      status,
      origin,
      gender,
      species
    }

</script>

<template>
    <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2" :class="[statusClass]">{{status}}</strong>
          <h3 class="mb-0">{{name}}</h3>
          <div class="mb-1 text-muted">{{gender}}</div>
          <p class="card-text mb-auto">El origen de este personaje es {{characterOrigin}}</p>
          <p class="card-text mb-auto">Pertenece a la especie: {{species}}</p>
        <div class="d-flex justify-content-between align-items-center">
            <div  v-if="username" class="btn-group">
                <button @click="$emit('clickFavorite', characterData)" type="button" class="btn btn-sm btn-outline-warning"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>
                </button>
            </div>
        </div>
        </div>
        <div class="col-auto d-none d-lg-block">
            <img class="bd-placeholder-img card-img-top" width="100%" height="225" :src="image" >
        </div>
      </div>
    </div>
</template>