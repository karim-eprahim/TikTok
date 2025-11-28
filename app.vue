<template>
   <NuxtLayout>
     <NuxtPage></NuxtPage>
     <AuthOverlay v-if="isLoginOpen"></AuthOverlay>
     <EditProfileOverlay v-if="isEditProfileOpen"></EditProfileOverlay>
   </NuxtLayout>
</template>
<script setup>
import { storeToRefs } from 'pinia';
const {$userStore, $generalStore} = useNuxtApp()
// const {isLoginOpen} = storeToRefs($generalStore);
const {isEditProfileOpen,isLoginOpen} = storeToRefs($generalStore);

onMounted(async ()=>{
  $generalStore.bodySwitch(false)
  isEditProfileOpen.value = false
  isLoginOpen.value = false
  try{
    await $generalStore.hasSessionExpired()
    if($userStore.id){
      $userStore.getUser()
    }
  }catch(error){
    console.log(error)
  }
}); 

watch(()=>isLoginOpen.value,(val)=>$generalStore.bodySwitch(val))
watch(()=>isEditProfileOpen.value,(val)=>$generalStore.bodySwitch(val))
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
}
</style>