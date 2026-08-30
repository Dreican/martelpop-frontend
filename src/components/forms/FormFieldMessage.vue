<script lang="ts" setup>
import Message from 'primevue/message'

defineProps<{
  invalid?: boolean
  error?: string
}>()

</script>

<template>
  <Message
      v-if="invalid"
      severity="error"
      size="small"
      variant="simple"
  >
    {{ error }}
  </Message>
</template>

<style scoped>

</style>