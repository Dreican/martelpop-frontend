<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'


import { useAuthStore } from '@/features/auth/stores/auth'
import { ApiError } from "@/services/api/errors.ts";

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)

async function submit() {
  error.value = null
  try {
    await auth.login({
      email: email.value,
      password: password.value
    })

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.push(redirect)
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      error.value = 'Invalid email or password'
    } else {
      error.value = 'Unable to sign in. Please try again.'
    }
  }
}

</script>

<template>
  <div class="login-page">
    <form @submit.prevent="submit">
      <h1>Login</h1>

      <div v-if="error" class="error">{{ error }}</div>

      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit" :disabled="auth.loading">{{ auth.loading ? 'Signing in...' : 'Sign In' }}</button>

    </form>
  </div>
</template>

<style scoped>

</style>