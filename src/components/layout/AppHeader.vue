<script setup lang="ts">
import {Menubar} from "primevue";

const items = [
  {
    label: "Event",
    route: "/events"
  }
]

</script>

<template>
  <header class="app-header">
    <Menubar :model="items">
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
    </Menubar>
  </header>
</template>

<style scoped>
.app-header {
  grid-column: 1 / -1;
  width: 100%;
}

.app-header .p-menubar {
  width: 100%;
  box-sizing: border-box;
}
</style>