<template>
    <button
      :disabled="isDisabled"
      :class="[
        'relative flex items-center justify-center gap-3 font-[Sora] border transition select-none',
        sizesCalButton,
        buttonTypeClasses
      ]"
    >
      <!-- Icon -->
      <icon
        v-if="iconName !== 'none' && !loading"
        :size="sizesCalIcon"
        :name="iconName"
        :class="iconColorClass"
      />
  
      <!-- Text / Loader -->
      <div class="relative flex items-center justify-center">
        <!-- Loader -->
        <Icon
          v-if="loading"
          class="absolute animate-spin"
          :size="sizesCalIcon"
          name="mingcute:loading-line"
          :color="spinnerColor"
        />
  
        <!-- Text -->
        <span :class="[textColorClass, { invisible: loading }]">
          {{ name }}
        </span>
      </div>
    </button>
  </template>
  
  <script setup name="CustomButton">
  import { computed } from 'vue'
  
  const props = defineProps({
    name: {
      type: String,
      default: 'No name'
    },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md' , 'mm' , 'lg'].includes(v)
    },
    iconName: {
      type: String,
      default: 'none'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary',
      validator: v =>
        ['primary', 'secondary', 'success', 'danger'].includes(v)
    }
  })
  
  /* =========================
     Computed
  ========================= */
  
  const isDisabled = computed(() => props.loading || props.disabled)
  
  const sizesCalButton = computed(() => {
    if (props.size === 'lg') return 'py-3 px-5 rounded-lg text-lg'
    if (props.size === 'md') return 'py-2 px-5 rounded-md text-md'
    if (props.size === 'mm') return 'py-1 px-5 rounded-md text-md'
    return 'py-1 px-4 rounded-sm text-sm'
  })
  
  const sizesCalIcon = computed(() => {
    if (props.size === 'sm') return '1.2rem'
    if (props.size === 'md') return '1.4rem'
    return '1.6rem'
  })
  
  const buttonTypeClasses = computed(() => {
    const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none'
  
    const types = {
      primary: {
        base: 'bg-[#f02c56] text-white',
        hover: 'hover:bg-[#ff6680]'
      },
      secondary: {
        base: 'bg-white text-black',
        hover: 'hover:bg-gray-100'
      },
      success: {
        base: 'bg-green-600 text-white',
        hover: 'hover:bg-green-700'
      },
      danger: {
        base: 'bg-red-600 text-white',
        hover: 'hover:bg-red-700'
      }
    }
  
    const current = types[props.type]
  
    return isDisabled.value
      ? `${current.base} ${disabledClasses}`
      : `${current.base} ${current.hover}`
  })
  
  const textColorClass = computed(() =>
    props.type === 'secondary' ? 'text-black' : 'text-white'
  )
  
  const iconColorClass = textColorClass
  
  const spinnerColor = computed(() =>
    props.type === 'secondary' ? '#000' : '#fff'
  )
  </script>
  