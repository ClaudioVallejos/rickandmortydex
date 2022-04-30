<template> 
    <div class="album py-5 bg-light">
        <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    </div>
</template>

<script setup>
  import Card from "@/components/Card.vue"
  import { onMounted } from 'vue'
  import { getUser } from '../api.js'
  import { useUserStore } from '@/stores/user.js'

  const userStore = useUserStore()

  onMounted(async () => {
    const res = await getUser();
    const user = await res.content;

    if(res.status === 200){
      userStore.login({name: user.name})
    }
  })


</script>