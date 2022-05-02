<script setup>
  import '@/assets/signin.css'
  import '@/assets/styles.css'
  import { reactive } from 'vue'
  import { useRouter, RouterLink } from 'vue-router'
  import { login } from '@/api.js'
  import { useUserStore } from '@/stores/user.js'

  const userStore = useUserStore()
  const router = useRouter();

  const data = reactive({
    email:'',
    password:''
  })
  const submit = async () => {
    const response = await login(data)
    if (response.status === 200) {
      const username = response.content.name
      userStore.login({username})
      router.push('/')
    }
  }
</script>

<template>
  <main class="form-signin pt-5 mt-5">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Inicia Sesión!</h1>
      <div class="form-floating">
        <input v-model="data.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Correo Electrónico</label>
      </div>
      <div class="form-floating">
        <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
        <label for="floatingPassword">Contraseña</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Recuerdame
        </label>
      </div>
      <div class="mb-3">
        <label>
          ¿Aún no tienes una cuenta? <RouterLink to="/register">Registrate</RouterLink>
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Iniciar Sesión</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
    </form>
  </main>
</template>