<script lang="ts" setup>
import InputPassword from 'primevue/inputpassword'
import Message from 'primevue/message'
import {FormField} from '@primevue/forms'
import FloatLabel from "primevue/floatlabel";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";

interface Props {
  name: string
  label: string
  id?: string
  autocomplete?: string
  feedback?: boolean
  size?: string
}

withDefaults(defineProps<Props>(), {
  feedback: false,
  size: 'normal'
})
</script>

<template>
  <FormField
      v-slot="$field"
      :name="name"
  >
<!--    <div class="field">-->
      <FloatLabel variant="on">
        <IconField v-if="$slots.icon" icon-position="left">
          <InputIcon>
            <slot name="icon" />
          </InputIcon>

          <InputPassword
              :id="id ?? name"
              :autocomplete="autocomplete"
              :feedback="feedback"
              :invalid="$field.invalid"
              :name="name"
              :size="size"
              fluid
              toggle-mask
          />
        </IconField>

        <InputPassword
            v-else
            :id="id ?? name"
            :autocomplete="autocomplete"
            :feedback="feedback"
            :invalid="$field.invalid"
            :name="name"
            :size="size"
            fluid
            toggle-mask
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
<!--    </div>-->
  </FormField>
</template>
<style scoped>

</style>