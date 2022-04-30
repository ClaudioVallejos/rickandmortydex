<template>
<main class="form-signin">
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Registro</h1>

    <div class="form-floating mb-2">
      <input v-model="data.name" type="text" class="form-control" id="floatingInput" placeholder="Nombre" required>
      <label for="floatingInput">Nombre y Apellido</label>
    </div>
    <div class="form-floating mb-2">
      <input v-model="data.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" require>
      <label for="floatingInput">Correo Electrónico</label>
    </div>
    <div class="form-floating">
      <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Contraseña" require>
      <label for="floatingPassword">Contraseña</label>
    </div>
    <div class="form-floating">
      <input v-model="data.isConfirmedPass" type="password" class="form-control" id="floatingPassword" placeholder="Contraseña" require>
      <label for="floatingPassword">Confirma tu contraseña</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Recuerdame
      </label>
    </div>
        <div class="mb-3">
      <label>
        ¿Ya tienes una cuenta? <RouterLink to="/login">Inicia sesión</RouterLink>
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Registrar</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form>
</main>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { register } from '../api.js'
  import '../assets/signin.css'

  const router = useRouter();

  const data = reactive({
    name:'',
    email:'',
    password:'',
    isConfirmedPass:''
  })

  const submit = async () => {
    const response = await register(data)
    if (response.status === 201) {
      router.push('/login')
    }
  }
</script>