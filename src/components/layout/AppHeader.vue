<script setup lang="ts">
import {Menubar} from "primevue";
import { useI18n } from 'vue-i18n'
import Select from 'primevue/select'
import {setLocale} from "@/i18n";
import {computed} from "vue";

const { locale, t } = useI18n()

const languages = [
  { label: 'Français', value: 'fr' },
  { label: 'English', value: 'en' },
]

const menuItems = computed(() => [
  {
    label: t('navigation.events'),
    route: '/events',
  },
  {
    label: t('navigation.registrations'),
    route: '/registrations',
  },
])

const selectedLanguage = locale
</script>

<template>
  <header class="app-header">
    <Menubar :model="menuItems">
      <template #start>
        <RouterLink
            to="/"
            class="app-logo"
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
        <Select
            v-model="selectedLanguage"
            :options="languages"
            option-label="label"
            option-value="value"
            @update:model-value="setLocale"
        />
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
</style>