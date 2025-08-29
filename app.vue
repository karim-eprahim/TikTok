<template>
   <NuxtLayout>
     <NuxtPage></NuxtPage>
   </NuxtLayout>
</template>
<script setup>
</script>
<style>
body{
  overflow: hidden;
}
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