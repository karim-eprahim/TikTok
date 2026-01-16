<template>
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

</style>
