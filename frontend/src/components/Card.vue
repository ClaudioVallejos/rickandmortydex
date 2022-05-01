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
            <!-- <button type="button" class="btn btn-sm btn-outline-secondary">Ver</button> -->
                <button type="button" class="btn btn-sm btn-outline-secondary"> btn </button>
            </div>
        </div>
        </div>
        <div class="col-auto d-none d-lg-block">
            <img class="bd-placeholder-img card-img-top" width="100%" height="225" :src="image" >
        </div>
      </div>
    </div>
</template>

<script setup>
    import { useUserStore } from '@/stores/user.js'
    import { storeToRefs  } from 'pinia'
    
    const userStore = useUserStore()
    const { username } = storeToRefs(userStore)
    const props = defineProps({ data: { type: Object } })
    const { name, image, status, origin, gender, species, episode } = props.data

    const textClass = {
        'Dead': 'text-danger',
        'Alive': 'text-success',
        'unknown': 'text'
    }

    const statusClass = textClass[status] ?? ''
    const characterOrigin = origin.name == 'unknown' ? 'desconocido' : origin.name

</script>
