<script lang="ts" setup>
import {Menubar} from "primevue";
import Button from 'primevue/button'
import {useI18n} from 'vue-i18n'
import Select from 'primevue/select'
import {setLocale} from "@/i18n";
import {computed} from "vue";
import {storeToRefs} from 'pinia'
import {useAuthStore} from "@/features/auth/stores/auth";
import {useRouter} from "vue-router";
import UserAvatar from "@/components/users/UserAvatar.vue";

const auth = useAuthStore()
const router = useRouter()
const {locale, t} = useI18n()
const {user} = storeToRefs(auth)

async function handleLogout(): Promise<void> {
  try {
    await auth.logout()
  } catch (error) {
    // The store clears the local authentication state even when the API call fails.
    console.error('Logout request failed', error)
  } finally {
    await router.push({name: 'login'})
  }
}

const languages = [
  {label: 'Français', value: 'fr'},
  {label: 'English', value: 'en'},
]

const menuItems = computed(() => {
  const items = [
    {
      label: t('navigation.events'),
      route: '/events',
      items: [{label: t('navigation.martelpop'), route: '/events?type=martelpop'}]
    },
  ]

  if (auth.isAuthenticated) {
    items.push({
      label: t('navigation.registrations'),
      route: '/registrations',
      items: []
    })
  }

  return items
})

const selectedLanguage = locale


</script>

<template>
  <header class="app-header">
    <Menubar :model="menuItems">
      <template #start>
        <RouterLink
            class="app-logo"
            to="/"
        >
          Home
        </RouterLink>
      </template>

      <template #item="{ item, props }">
        <RouterLink
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
        >
          <a
              :href="href"
              v-bind="props.action"
              @click="navigate"
          >
            {{ item.label }}
          </a>
        </RouterLink>
      </template>
      <template #end>
        <div class="menu-end">
          <template v-if="!auth.isAuthenticated">
            <RouterLink :to="{ name: 'login' }">
              {{ t('navigation.login') }}
            </RouterLink>

            <RouterLink :to="{ name: 'register' }">
              {{ t('navigation.register') }}
            </RouterLink>
          </template>

          <RouterLink
              v-else
              :to="{ name: 'profile' }"
          >
            <UserAvatar
                v-if="user"
                :avatar-url="user.avatar_url"
                :display-name="user.display_name"
            />
          </RouterLink>

          <Button
              v-if="auth.isAuthenticated"
              :label="t('navigation.logout')"
              severity="secondary"
              text
              type="button"
              @click="handleLogout"
          />

          <Select
              v-model="selectedLanguage"
              :options="languages"
              option-label="label"
              option-value="value"
              @update:model-value="setLocale"
          />
        </div>
      </template>
    </Menubar>
  </header>
</template>

<style scoped>
.app-header {
  width: 100%;
}

.app-header .p-menubar {
  width: 100%;
  box-sizing: border-box;
}

.menu-end {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
</style>
