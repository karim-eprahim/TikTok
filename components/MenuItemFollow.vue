<template>
    <div class="flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2">
        <img src="https://picsum.photos/300?grayscale" width="35" class="rounded-full lg:mx-0 mx-auto" alt="">
        <div class="lg:pl-2 5 lg:block hidden">
            <div class="flex items-center">
                <div class="font-bold text-[14px]">
                    User name
                </div>
                <div class="ml-1 rounded-full bg-[#58D5EC] h-[14px] relative text-white">
                    <Icon class="relative -top-[5px]" name="material-symbols:fitbit-check-small"  size="15"></Icon>
                </div>
            </div>
            <div class="font-light text-[12px] text-gray-600">
                User name
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps(['user'])
</script>
<style>
    
</style>