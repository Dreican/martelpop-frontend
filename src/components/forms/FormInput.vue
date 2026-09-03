<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import {FormField} from '@primevue/forms'
import FloatLabel from "primevue/floatlabel";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

interface Props {
  name: string
  label: string
  id?: string
  type?: string
  autocomplete?: string
  size?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'normal'
})
</script>

<template>
  <FormField
      v-slot="$field"
      :name="name"
  >
    <FloatLabel variant="on">
      <IconField v-if="$slots.icon" icon-position="left">
        <InputIcon>
          <slot name="icon"/>
        </InputIcon>

        <label :for="id ?? name">
          {{ label }}
        </label>
        <InputText
            :id="id ?? name"
            :autocomplete="autocomplete"
            :invalid="$field.invalid"
            :name="name"
            :size="size"
            :type="type"
            fluid
        />
      </IconField>

      <InputText
          v-else
          :id="id ?? name"
          :autocomplete="autocomplete"
          :invalid="$field.invalid"
          :name="name"
          :size="size"
          :type="type"
          fluid
      />

      <label :for="id ?? name">
        {{ label }}
      </label>

    </FloatLabel>
    <Message
        v-if="$field.invalid"
        severity="error"
        size="small"
        variant="simple"
    >
      {{ $field.error?.message }}
    </Message>
  </FormField>
</template>
<style scoped>

</style>