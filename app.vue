<template>
  <div class="bg-white text-black dark:bg-black dark:text-white">
    Hello {{ isDark ? "Dark" : "Light" }} Mode 🌙
  </div>
  <div
    class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
  >
    <NuxtLayout>
      <NuxtPage></NuxtPage>
      <AuthOverlay v-if="isLoginOpen"></AuthOverlay>
      <EditProfileOverlay v-if="isEditProfileOpen"></EditProfileOverlay>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
const { $userStore, $generalStore } = useNuxtApp();
// const {isLoginOpen} = storeToRefs($generalStore);
const { isEditProfileOpen, isLoginOpen } = storeToRefs($generalStore);
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

onMounted(async () => {
  $generalStore.bodySwitch(false);
  isEditProfileOpen.value = false;
  isLoginOpen.value = false;
  try {
    await $generalStore.hasSessionExpired();
    await $generalStore.getRandomUsers("suggested");
    await $generalStore.getRandomUsers("following");
    if ($userStore.id) {
      $userStore.getUser();
    }
  } catch (error) {
    console.log(error);
  }
});

watch(
  () => isLoginOpen.value,
  (val) => $generalStore.bodySwitch(val)
);
watch(
  () => isEditProfileOpen.value,
  (val) => $generalStore.bodySwitch(val)
);
// const { $toast } = useNuxtApp()
// const showToast = () => {
//   $toast.success("This is a success toast!")
// }
</script>
<style>
button {
  cursor: pointer;
}
@layer base {
  .border,
  .border-t,
  .border-b,
  .border-l,
  .border-r,
  .border-x,
  .border-y,
  /* Match classes like border-t-2, border-b-4, etc. */
  [class*="border-t-"],
  [class*="border-b-"],
  [class*="border-l-"],
  [class*="border-r-"],
  [class*="border-x-"],
  [class*="border-y-"] {
    border-color: rgb(229 231 235);
  }

  .dark .border,
  .dark .border-t,
  .dark .border-b,
  .dark .border-l,
  .dark .border-r,
  .dark .border-x,
  .dark .border-y,
  .dark [class*="border-t-"],
  .dark [class*="border-b-"],
  .dark [class*="border-l-"],
  .dark [class*="border-r-"],
  .dark [class*="border-x-"],
  .dark [class*="border-y-"] {
    border-color: rgb(55 65 81);
  }
}
</style>
