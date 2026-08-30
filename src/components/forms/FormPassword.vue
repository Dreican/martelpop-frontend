<script lang="ts" setup>
import InputPassword from 'primevue/inputpassword'
import Message from 'primevue/message'
import FormField from '@primevue/forms'
import FloatLabel from "primevue/floatlabel";

interface Props {
  name: string
  label: string
  id?: string
  autocomplete?: string
  feedback?: boolean
}

withDefaults(defineProps<Props>(), {
  feedback: false,
})
</script>

<template>
  <FormField
      v-slot="$field"
      :name="name"
  >
<!--    <div class="field">-->
      <FloatLabel variant="on">
        <label :for="id ?? name">
          {{ label }}
        </label>

        <InputPassword
            :id="id ?? name"
            :autocomplete="autocomplete"
            :feedback="feedback"
            :invalid="$field.invalid"
            :name="name"
            fluid
            toggle-mask
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
<!--    </div>-->
  </FormField>
</template>
<style scoped>

</style>