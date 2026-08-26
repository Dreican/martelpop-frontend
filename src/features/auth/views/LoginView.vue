<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import InputText from 'primevue/inputtext'
import InputPassword from 'primevue/inputpassword'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Label from 'primevue/label'
import Envelope from '@primeicons/vue/envelope';

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

      <Message v-if="error" severity="error">{{ error }}</Message>

      <div class="flex flex-wrap justify-center">
        <div class="flex flex-col gap-2 w-full max-w-sm">
          <Label for="email">
            <Envelope />
            <span>Email</span>
            <span aria-hidden="true">*</span>
          </Label>
          <InputText id="email" v-model="email" type="email" autocomplete="email" fluid />
          <br />

          <Label for="password">Password</Label>
          <InputPassword id="password" v-model="password" autocomplete="current-password" :feedback="false" toggle-mask fluid />
          <Button type="submit" label="Sign In" :loading="auth.loading"/>
        </div>
      </div>
    </form>
    <RouterLink :to="{ name: 'register' }">
      Create an account
    </RouterLink>
  </div>
</template>

<style scoped>

</style>