<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext'
import InputPassword from 'primevue/inputpassword'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Label from 'primevue/label'
import Panel from 'primevue/panel'
import Divider from 'primevue/divider'
import {Popover} from "primevue";
import {ProgressBar} from "primevue";
import Tag from 'primevue/tag';
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Check from '@primeicons/vue/check';
import Eye from '@primeicons/vue/eye';
import EyeSlash from '@primeicons/vue/eye-slash';
import Shield from '@primeicons/vue/shield';
import Times from '@primeicons/vue/times';

import { useAuthStore } from '@/features/auth/stores/auth'
import { ApiError } from "@/services/api/errors.ts";

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const firstname = ref('')
const lastname = ref('')
const display_name = ref('')
const error = ref<string | null>(null)
const mask = ref(true);
const op = ref();

const rules = [
  { id: 'length', label: 'At least 12 characters long', test: (v: string) => v.length >= 12, weight: 20 },
  { id: 'uppercase', label: 'Contains uppercase letter', test: (v: string) => /[A-Z]/.test(v), weight: 20 },
  { id: 'lowercase', label: 'Contains lowercase letter', test: (v: string) => /[a-z]/.test(v), weight: 20 },
  { id: 'number', label: 'Contains number', test: (v: string) => /[0-9]/.test(v), weight: 20 },
  { id: 'special', label: 'Contains special character (!@#$...)', test: (v: string) => /[^a-zA-Z0-9]/.test(v), weight: 20 }
];

const score = computed(() => {
  if (!password.value) return 0;

  return rules.reduce((acc, rule) => acc + (rule.test(password.value) ? rule.weight : 0), 0);
});

const severity = computed(() => {
  if (score.value <= 20) return 'danger';
  if (score.value <= 40) return 'warn';
  if (score.value <= 60) return 'info';

  return 'success';
});

const color = computed(() => {
  switch (severity.value) {
    case 'danger':
      return 'var(--p-red-500)';
    case 'warn':
      return 'var(--p-amber-500)';
    case 'info':
      return 'var(--p-blue-500)';
    default:
      return 'var(--p-green-500)';
  }
});

const label = computed(() => {
  if (score.value === 0) return '';
  if (score.value <= 20) return 'Too Weak';
  if (score.value <= 40) return 'Weak';
  if (score.value <= 60) return 'Fair';
  if (score.value <= 80) return 'Strong';

  return 'Very Strong';
});

const onFocus = (event: any) => op.value.show(event);
const onBlur = () => op.value.hide();

async function submit() {
  error.value = null
  try {
    await auth.register({
      email: email.value,
      password: password.value,
      firstName: firstname.value,
      lastName: lastname.value,
      display_name: display_name.value
    })

    const redirect = '/'
    await router.push(redirect)
  } catch (err) {
    if (err instanceof ApiError) {
      error.value = 'Unable to register. Please try again.'
    }
  }
}

</script>

<template>
  <div class="login-page">
    <form @submit.prevent="submit">
      <Message v-if="error" severity="error">{{ error }}</Message>

      <div class="flex justify-center">
        <Panel header="Register" class="w-full max-w-sm">
          <div class="flex flex-col text-sm">
            <div class="flex justify-between">
              <FloatLabel variant="on">
                <Label for="email">Email</label>
                <InputText id="email" v-model="email" type="email" autocomplete="email" fluid />
              </FloatLabel>
            </div>
          </div>
          <div class="flex flex-col text-sm">
            <div class="flex justify-between">
              <FloatLabel variant="on">
                <Label for="firstname">Firstname</Label>
                <InputText id="firstname" v-model="firstname" type="text" autocomplete="firstname" fluid />
              </FloatLabel>
            </div>
          </div>
          <div class="flex flex-col text-sm">
            <div class="flex justify-between">
              <FloatLabel variant="on">
                <Label for="lastname">Lastname</Label>
                <InputText id="lastname" v-model="lastname" type="text" autocomplete="lastname" fluid />
              </FloatLabel>
            </div>
          </div>
          <div class="flex flex-col text-sm">
            <div class="flex justify-between">
              <FloatLabel variant="on">
                <Label for="display_name">Display Name</Label>
                <InputText id="display_name" v-model="display_name" type="text" autocomplete="display_name" fluid />
              </FloatLabel>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="flex flex-col gap-2">
              <IconField>
                <InputPassword id="password" v-model="password" :mask="mask" placeholder="Password" @focus="onFocus" @blur="onBlur" />
                <InputIcon class="cursor-pointer" @click="mask = !mask">
                  <Eye v-if="mask" />
                  <EyeSlash v-else />
                </InputIcon>
              </IconField>
              <Popover ref="op">
                <div class="flex flex-col gap-3 w-72">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <Shield style="width: 1.25rem; height: 1.25rem" />
                      <span class="font-semibold text-sm">Password Strength</span>
                    </div>
                    <Tag :severity="severity" :value="label || '—'" :style="{ visibility: label ? 'visible' : 'hidden' }" />
                  </div>
                  <ProgressBar :value="score" :show-value="false" :pt="{ value: { style: { backgroundColor: color } } }" style="height: 6px" />
                  <ul class="flex flex-col gap-2 list-none m-0 p-0">
                    <li v-for="rule in rules" :key="rule.id" class="flex items-center gap-2 text-xs">
                      <Check v-if="rule.test(password)" class="text-green-500" />
                      <Times v-else class="text-red-400" />
                      <span :class="rule.test(password) ? 'text-surface-500' : 'text-surface-700'">{{ rule.label }}</span>
                    </li>
                  </ul>
                </div>
              </Popover>
            </div>
          </div>
          <Divider />
          <div class="flex justify-between">
            <Button type="submit" label="Sign In" :loading="auth.loading"/>
          </div>
        </Panel>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>