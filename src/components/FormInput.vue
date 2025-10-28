<template>
  <div class="flex flex-col">
    <label :for="id" class="mb-1 font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue ?? ''"
      @input="onInput"
      :class="[
        'border rounded-lg p-2 w-full focus:outline-none focus:ring-2',
        hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500',
      ]"
    />
    <p v-if="hasError && errorMessage" class="text-red-500 text-sm mt-1">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | null
  label: string
  id: string
  placeholder?: string
  type?: string
  hasError?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (!target) return

  const val = target.value
  if (typeof props.modelValue === 'number') {
    const num = Number(val)
    emit('update:modelValue', isNaN(num) ? 0 : num)
  } else {
    emit('update:modelValue', val)
  }
}
</script>
