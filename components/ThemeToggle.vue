<template>
  <button
    @click="toggleColorMode"
    class="relative p-2 rounded-lg transition-all duration-300"
  >
    <!-- Sun Icon -->
    <Icon
      v-if="!isDark"
      name="ph:sun-fill"
      class="w-5 h-5 text-yellow-500 transition-transform duration-300 hover:rotate-180"
    />

    <!-- Moon Icon -->
    <Icon
      v-else
      name="ph:moon-fill"
      class="w-5 h-5 text-blue-400 transition-transform duration-300 hover:-rotate-12"
    />
  </button>
</template>

<script setup>
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

const toggleColorMode = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>
