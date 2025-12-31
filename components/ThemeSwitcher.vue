<template>
  <div
    class="flex items-center gap-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
  >
    <!-- Light Mode -->
    <button
      @click="setMode('light')"
      :class="[
        'px-3 py-1.5 rounded-md transition-all duration-200 flex items-center gap-2',
        currentMode === 'light'
          ? 'bg-white dark:bg-gray-700 shadow-sm text-yellow-600 dark:text-yellow-400'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
      ]"
      :aria-label="'الوضع النهاري'"
    >
      <Icon name="ph:sun-fill" class="w-4 h-4" />
      <span class="text-sm font-medium hidden sm:inline">نهاري</span>
    </button>

    <!-- Dark Mode -->
    <button
      @click="setMode('dark')"
      :class="[
        'px-3 py-1.5 rounded-md transition-all duration-200 flex items-center gap-2',
        currentMode === 'dark'
          ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
      ]"
      :aria-label="'الوضع الليلي'"
    >
      <Icon name="ph:moon-fill" class="w-4 h-4" />
      <span class="text-sm font-medium hidden sm:inline">ليلي</span>
    </button>

    <!-- System Mode -->
    <button
      @click="setMode('system')"
      :class="[
        'px-3 py-1.5 rounded-md transition-all duration-200 flex items-center gap-2',
        currentMode === 'system'
          ? 'bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-purple-400'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
      ]"
      :aria-label="'وضع النظام'"
    >
      <Icon name="ph:desktop-fill" class="w-4 h-4" />
      <span class="text-sm font-medium hidden sm:inline">تلقائي</span>
    </button>
  </div>
</template>

<script setup>
const colorMode = useColorMode();

const currentMode = computed(() => colorMode.preference);

const setMode = (mode) => {
  colorMode.preference = mode;
};
</script>
