<script lang="ts" setup>
import {computed} from 'vue'
import Avatar from 'primevue/avatar'

interface Props {
  displayName: string
  avatarUrl?: string | null
  size?: `normal` | `large` | `xlarge`
  shape?: `circle` | `square`
}

const props = withDefaults(defineProps<Props>(), {
  avatarUrl: null,
  size: `large`,
  shape: `circle`,
})

const initials = computed(() => {
  const parts = props.displayName.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]
  if (!first) return ''
  if (parts.length === 1) return first.slice(0, 2).toUpperCase()
  const last = parts[parts.length - 1] ?? ''
  return (first.charAt(0) + last.charAt(0)).toUpperCase()
})

</script>

<template>
  <Avatar
      :image="avatarUrl ?? undefined"
      :label="initials"
      :shape="shape"
      :size="size"/>
</template>

<style scoped>

</style>