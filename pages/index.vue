<template>
  <div
    class="pt-[80px] w-[calc(100%-90px)] lg:w-[calc(100%-325px)] max-w-[690px]:"
  >
  <div v-for="post in $generalStore.posts" :key="post">
    <PostMain v-if="post" :post="post"/>
  </div>
  </div>
</template>
<script setup>
  const {$generalStore} = useNuxtApp()
  onMounted(async ()=>{
    try{
      await $generalStore.getAllUsersAndPosts()
    }catch(error){
      console.log(error)
    }
  })
</script>
<style></style>
