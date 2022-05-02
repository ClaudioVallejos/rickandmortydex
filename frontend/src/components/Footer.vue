<template>
    <footer class="py-3 bg-light">
        <ul v-if="pagination" class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item col-md-2"> <button @click="$emit('prevPage', pages.prev)" :disabled="!pages.prev ?? true" type="button" class="btn btn-outline-secondary">Anterior</button></li>
        <li class="nav-item"> <button @click="$emit('nextPage', pages.next)" :disabled="!pages.next ?? true" type="button" class="btn btn-outline-secondary">Siguiente</button></li>
        </ul>
        <p class="text-center text-muted">© 2022 CTR, Inc</p>
    </footer>
</template>
<script setup>   
    const props = defineProps({
        pagination: {
            type: Boolean,
            default: false
        },
        pages: {
            type: Object
        }
    })
    const { pagination, pages } = props
</script>