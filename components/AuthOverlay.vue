<template>
  <div
    id="AuthOverlay"
    class="fixed flex justify-center z-50 top-0 left-0 w-full h-full bg-black/50"
  >
    <div
      :class="!isRegister?'min-h-[400px]':'min-h-[550px]'"
      class=" m-auto bg-white dark:bg-gray-900 w-full max-w-[470px] h-[70%] p-4 rounded-lg overflow-y-auto"
    >
      <div class="relative h-full" :class="isRegister?'min-h-[500px]':'min-h-[393px]'">
        <div class="w-full flex justify-end">
          <button @click="$generalStore.isLoginOpen = false" class="flex p-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
            <Icon
              name="mdi:close"
              size="26"
            ></Icon>
          </button>
        </div>

        <div class="flex flex-col justify-between h-[calc(100%-38px)]">
          <Login v-if="!isRegister" />
          <Register v-else />

          <div
            class="flex items-center justify-center py-5 border-t w-full"
          >
            <span class="text-[14px] text-gray-600 dark:text-gray-400">Don't have an account?</span>
            <button
              @click="isRegister = !isRegister"
              class="text-[14px] text-[#f02c56] font-semibold pl-1"
            >
              <span v-if="!isRegister">Sign up</span>
              <span v-else>Log in</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
const { $generalStore } = useNuxtApp();
let isRegister = ref(false);
</script>
<style scoped></style>
