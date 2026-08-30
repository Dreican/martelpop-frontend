<script lang="ts" setup>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import {Form, type FormSubmitEvent} from '@primevue/forms'
import {zodResolver} from '@primevue/forms/resolvers/zod'
import {z} from 'zod'

import Button from "primevue/button";

import FormInput from '@/components/forms/FormInput.vue'
import FormPassword from '@/components/forms/FormPassword.vue'

import {useAuthStore} from '@/features/auth/stores/auth'
import {ApiError} from "@/services/api/errors.ts";
import Message from "primevue/message";
import Card from "primevue/card";

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const error = ref<string | null>(null)

const resolver = zodResolver(
    z.object({
      email: z.preprocess(
          value => value ?? '',
          z
              .string()
              .trim()
              .min(1, 'Email is required')
              .pipe(z.email('Please enter a valid email'))
      ),

      password: z.preprocess(
          value => value ?? '',
          z
              .string()
              .min(1, 'Password is required')
              .min(10, 'Password must be at least 10 characters')
      ),
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
    <Card class="login-card">
      <template #content>
        <div class="login-header">
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>
        </div>
        <Form
            :resolver="resolver"
            class="login-form"
            @submit="onSubmit"
        >
          <FormInput
              autocomplete="email"
              label="Email"
              name="email"
              type="email"
          />

          <FormPassword
              autocomplete="current-password"
              label="Password"
              name="password"
          />

          <Message
              v-if="error"
              severity="error"
              size="large"
              variant="simple"
          >
            {{ error }}
          </Message>

          <Button
              fluid
              label="Sign in"
              type="submit"
          />
        </Form>

        <div class="register-footer">
          <span>Not yet register ?</span>
          <span>
            <RouterLink :to="{ name: 'register' }">
              Sign on
            </RouterLink>
          </span>
        </div>
      </template>
    </Card>
  </div>
</template>