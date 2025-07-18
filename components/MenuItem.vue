<template>
  <div class="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-sm">
    <div class="flex items center lg:mx-0 mx-auto">
      <Icon :name="icon" :class="`text-[${iconColor}]`"  :size="sizeString"></Icon>
      <span
        :class="`text-[${iconColor}]`"
        class="lg:block hidden  pl-[9px] mt-0.5 font-semibold text-[17px]"
      >
      {{ iconString }}
    </span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['iconString','iconColor','sizeString'])
const {iconString, iconColor, sizeString} = toRefs(props)
let icon = ref('')
if(iconString.value=='For You') icon.value='ic:baseline-home'
if(iconString.value=='Following') icon.value='majesticons:users-line'
if(iconString.value=='LIVE') icon.value='ri:live-line'
</script>
<style></style>
