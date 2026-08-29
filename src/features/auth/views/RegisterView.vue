<script lang="ts" setup>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import {useAuthStore} from '@/features/auth/stores/auth'
import {ApiError} from "@/services/api/errors.ts";
import {Form, type FormSubmitEvent} from '@primevue/forms'
import {zodResolver} from '@primevue/forms/resolvers/zod'
import {z} from 'zod'

import Card from 'primevue/card'
import Button from 'primevue/button'
import Message from 'primevue/message'
import FormInput from '@/components/forms/FormInput.vue'
import FormPassword from '@/components/forms/FormPassword.vue'

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

      firstname: z.preprocess(
          value => value ?? '',
          z
              .string()
              .trim()
              .min(1, 'First name is required')
              .max(100, 'First name must be at most 100 characters')
      ),

      lastname: z.preprocess(
          value => value ?? '',
          z
              .string()
              .trim()
              .min(1, 'Last name is required')
              .max(100, 'Last name must be at most 100 characters')
      ),

      display_name: z.preprocess(
          value => value ?? '',
          z
              .string()
              .trim()
              .min(1, 'Display name is required')
              .max(100, 'Display name must be at most 100 characters')
      ),

      password: z.preprocess(
          value => value ?? '',
          z
              .string()
              .min(1, 'Password is required')
              .min(12, 'Password must be at least 12 characters')
              .max(255, 'Password must be at most 255 characters')
      ),

      password_confirmation: z.preprocess(
          value => value ?? '',
          z.string().min(1, 'Please confirm your password')
      ),
    }).refine(
        data => data.password === data.password_confirmation,
        {
          path: ['password_confirmation'],
          message: 'Passwords do not match',
        }
    )
)

async function onSubmit(event: FormSubmitEvent): Promise<void> {
  error.value = null

  if (!event.valid) return

  try {
    await auth.register({
      email: event.values.email as string,
      password: event.values.password as string,
      firstName: event.values.firstname as string,
      lastName: event.values.lastname as string,
      display_name: event.values.display_name as string
    })

    const redirect =
        typeof route.query.redirect === 'string'
            ? route.query.redirect
            : '/'
    await router.push(redirect)
  } catch (err) {
    if (err instanceof ApiError && err.status === 409) {
      error.value = 'An account with this email already exists.'
    } else {
      error.value = 'Unable to create your account. Please try again.'
    }
  }
}

</script>

<template>
  <div></div>
  <main class="register-page">

    <Card>
      <template #content>

        <div class="register-header">
          <h1>Create your account</h1>
<!--          <p>Join MartelPop</p>-->
        </div>
        <Message v-if="error" severity="error">{{ error }}</Message>

        <Form :resolver="resolver" @submit="onSubmit">
          <FormInput
              autocomplete="email"
              label="Email"
              name="email"
              type="email"
          />

          <div class="name-fields">
            <FormInput
                autocomplete="given-name"
                label="First name"
                name="firstname"
            />

            <FormInput
                autocomplete="family-name"
                label="Last name"
                name="lastname"
            />
          </div>
          <FormInput
              autocomplete="nickname"
              label="Display name"
              name="display_name"
          />

          <FormPassword
              :feedback="true"
              autocomplete="new-password"
              label="Password"
              name="password"
          />

          <FormPassword
              autocomplete="new-password"
              label="Confirm password"
              name="password_confirmation"
          />

          <Message
              v-if="error"
              severity="error"
              size="large"
              variant="simple"
          >
            {{ error }}
          </Message>
          <br />
          <Button
              fluid
              label="Create account"
              type="submit"
          />
        </Form>

        <div class="register-footer">
          <span>Already have an account ?</span>
          <span>
                <RouterLink :to="{ name: 'login' }">
                  Sign in
                </RouterLink>
              </span>
        </div>
      </template>
    </Card>
  </main>
</template>