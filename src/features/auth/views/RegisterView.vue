<script lang="ts" setup>
import {computed, ref} from 'vue'
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
import {useI18n} from "vue-i18n";

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const {t} = useI18n()
const error = ref<string | null>(null)

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

      firstname: z.preprocess(
          value => value ?? '',
          z
              .string()
              .trim()
              .min(1, t('auth.errors.firstNameRequiredError'))
              .max(100, t('auth.errors.firstNameMaxLengthError'))
      ),

      lastname: z.preprocess(
          value => value ?? '',
          z
              .string()
              .trim()
              .min(1, t('auth.errors.lastNameRequiredError'))
              .max(100, t('auth.errors.lastNameMaxLengthError'))
      ),

      display_name: z.preprocess(
          value => value ?? '',
          z
              .string()
              .trim()
              .min(1, t('auth.errors.displayNameRequiredError'))
              .max(100, t('auth.errors.displayNameMaxLengthError'))
      ),

      password: z.preprocess(
          value => value ?? '',
          z
              .string()
              .min(1, t('auth.errors.passwordRequiredError'))
              .min(12, t('auth.errors.passwordMinLengthError'))
              .max(255, t('auth.errors.passwordMaxLengthError'))
      ),

      password_confirmation: z.preprocess(
          value => value ?? '',
          z.string().min(1, t('auth.errors.confirmPasswordRequiredError'))
      ),
    }).refine(
        data => data.password === data.password_confirmation,
        {
          path: ['password_confirmation'],
          message: t('auth.errors.passwordNotMatchError'),
        }
    )
)

const resolver = computed(() => zodResolver(schema.value))

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
      error.value = t('auth.errors.emailAlreadyExistsError')
    } else {
      error.value = t('auth.errors.registrationError')
    }
  }
}

</script>

<template>
  <div></div>
  <main class="register-page">

    <Card class="register-card">
      <template #content>

        <div class="register-header">
          <h1>{{ t('auth.registration.header') }}</h1>
<!--          <p>Join MartelPop</p>-->
        </div>
        <Message v-if="error" severity="error">{{ error }}</Message>

        <Form :resolver="resolver" class="register-form" @submit="onSubmit">
          <FormInput
              autocomplete="email"
              :label="t('auth.email')"
              name="email"
              type="email"
          />

          <div class="name-fields">
            <FormInput
                autocomplete="given-name"
                :label="t('auth.firstname')"
                name="firstname"
            />

            <FormInput
                autocomplete="family-name"
                :label="t('auth.lastname')"
                name="lastname"
            />
          </div>
          <FormInput
              autocomplete="nickname"
              :label="t('auth.displayName')"
              name="display_name"
          />

          <FormPassword
              :feedback="true"
              autocomplete="new-password"
              :label="t('auth.password')"
              name="password"
          />

          <FormPassword
              autocomplete="new-password"
              :label="t('auth.confirmPassword')"
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
              :label="t('auth.registration.registerButton')"
              type="submit"
          />
        </Form>

        <div class="register-footer">
          <span>{{ t('auth.registration.alreadyHaveAccount') }}</span>
          <span>
                <RouterLink :to="{ name: 'login' }">
                  {{ t('auth.registration.signIn') }}
                </RouterLink>
              </span>
        </div>
      </template>
    </Card>
  </main>
</template>

<style scoped>
.register-page {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.register-card {
  width: 100%;
  max-width: 480px;
  border: 1px solid var(--p-surface-200);
}

.register-header {
  margin-bottom: 2rem;
  text-align: center;
}

.register-header h1 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
}

.register-header p {
  margin: 0;
  line-height: 1.5;
}

.register-error {
  margin-bottom: 1.5rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.name-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.register-submit {
  margin-top: 0.5rem;
}

.register-footer {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 2rem;
}

@media (max-width: 480px) {
  .name-fields {
    grid-template-columns: 1fr;
  }
}
</style>