<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import {Form, type FormSubmitEvent} from '@primevue/forms'
import {zodResolver} from '@primevue/forms/resolvers/zod'
import {z} from 'zod'
import {useI18n} from 'vue-i18n'

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

const { t, locale } = useI18n()
const error = ref<string | null>(null)
const form = ref()

const schema = computed(() =>
    z.object({
      email: z.preprocess(
          value => value ?? '',
          z
              .string()
              .trim()
              .min(1, t('auth.errors.emailRequiredError'))
              .pipe(z.email(t('auth.errors.emailInvalidError')))
      ),

      password: z.preprocess(
          value => value ?? '',
          z
              .string()
              .min(1,  t('auth.errors.passwordRequiredError'))
              .min(12, t('auth.errors.passwordMinLengthError'))
      ),
    })
)

const resolver = computed(() => zodResolver(schema.value))

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
      error.value = t('auth.erros.invalidEmailOrPasswordError')
    } else {
      error.value = t('auth.erros.loginError')
    }
  }
}

watch(locale, async () => {
  await form.value?.validate()
})

</script>


<template>
  <div class="login-page">
    <Card class="login-card">
      <template #content>
        <div class="login-header">
          <h1>{{ t('auth.login.welcome') }}</h1>
          <p>{{ t('auth.login.sign_in') }}</p>
        </div>
        <Form
            ref="form"
            :resolver="resolver"
            class="login-form"
            @submit="onSubmit"
        >
          <FormInput
              autocomplete="email"
              :label="t('auth.email')"
              name="email"
              type="email"
          />

          <FormPassword
              autocomplete="current-password"
              :label="t('auth.password')"
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
              :label="t('auth.login.loginButton')"
              type="submit"
          />
        </Form>

        <div class="login-footer">
          <span>{{ t('auth.login.notYetRegister') }}</span>
          <span>
            <RouterLink :to="{ name: 'register' }">
              {{ t('auth.login.signUp') }}
            </RouterLink>
          </span>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.login-card {
  width: 100%;
  max-width: 480px;
  border: 1px solid var(--p-surface-200);
}

.login-header {
  margin-bottom: 2rem;
  text-align: center;
}

.login-header h1 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
}

.login-header p {
  margin: 0;
  line-height: 1.5;
}

.login-error {
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.0rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-weight: 500;
}

.login-footer {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 2rem;
}
</style>