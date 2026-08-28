<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import InputText from 'primevue/inputtext'
import InputPassword from 'primevue/inputpassword'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Label from 'primevue/label'
import Envelope from '@primeicons/vue/envelope';
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'


import { useAuthStore } from '@/features/auth/stores/auth'
import { ApiError } from "@/services/api/errors.ts";

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const error = ref<string | null>(null)

const resolver = zodResolver(
    z.object({
        email: z.email('Please enter a valid email'),
        password: z.string().min(12, 'Password must be at least 12 characters'),
    })
)

async function onSubmit(event: FormSubmitEvent): Promise<void> {
  error.value = null

  if (!event.valid) {
    return
  }

  try {
    await auth.login({
      email: event.values.email,
      password: event.values.password
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
    <div class="login-card">
      <div class="login-header">
        <h1>Login</h1>
      </div>
      <Message v-if="error" severity="error">{{ error }}</Message>

      <Form :resolver="resolver" @submit="onSubmit" class="login-form">
        <FormField v-slot="$field" name="email" class="login-field">
          <Label for="email">
            <Envelope />
            <span>Email</span>
          </Label>
          <InputText id="email" type="email" autocomplete="email" fluid />
          <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>
        <FormField v-slot="$field" name="password" class="login-field">
          <Label for="password">Password</Label>
          <InputPassword id="password" v-model="$field.value" autocomplete="current-password" :feedback="false" toggle-mask fluid />

          <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
          <Button type="submit" label="Sign In" :loading="auth.loading"/>
        </FormField>

      </Form>
      <div class="login-footer">
        <RouterLink :to="{ name: 'register' }">
          Create an account
        </RouterLink>
      </div>
    </div>
  </div>
</template>