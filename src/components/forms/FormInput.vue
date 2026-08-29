<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import {FormField} from '@primevue/forms'

interface Props {
  name: string
  label: string
  id?: string
  type?: string
  autocomplete?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
})
</script>

<template>
  <FormField
      v-slot="$field"
      :name="name"
  >
      <div class="field">
        <FloatLabel variant="on">
          <label :for="id ?? name">
            {{ label }}
          </label>
          <InputText
              :id="id ?? name"
              :autocomplete="autocomplete"
              :invalid="$field.invalid"
              :name="name"
              :type="type"
              fluid
          />

      </FloatLabel>
      <Message
          v-if="$field.invalid"
          severity="error"
          size="small"
          variant="simple"
      >
        {{ $field.error?.message }}
      </Message>
    </div>
  </FormField>
</template>
<style scoped>

</style>