<template>
  <div
    @mouseenter="isHover(true)"
    @mouseleave="isHover(false)"
    class="brightness-90 hover:brightness-[1.1] cursor-pointer"
  >
    <div
      v-if="!isLoading"
      class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black"
    >
      <Icon
        class="animate-spin ml-1 text-white"
        name="mingcute:loading-line"
        size="100"
        color="#fff"
      ></Icon>
    </div>

    <div>
      <video
        ref="video"
        class="aspect-[3/4] object-cover rounded-sm"
        muted
        loop
        src="/first.mp4"
      ></video>
    </div>

    <div class="px-1">
      <div class="text-gray-700 text-[15px] pt-1 break-words">
        This is some text
      </div>
      <div class="flex items-center text-gray-600 font-bold text-xs">
        <Icon name="gg:loadbar-sound" size="20" />
        3%
        <Icon name="tabler:alert-circle" size="20" />
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps(['post']);

const route = useRoute()
const router = useRouter()

let video = ref(null)
let isLoading = ref(false)


// onMounted(()=>{
//   if(video.value){
//     video.value.addEventListener('canplaythrough',(e)=>{
//       if(e.target){
//         setTimeout(()=>{
//           isLoading.value = true
//         },2000)
//       }
//       isLoading.value = true
//     })
//   }
// })

onMounted(() => {
  if (video.value) {
    if (video.value.readyState >= 3) { 
      isLoading.value = true
    } else {
      video.value.addEventListener("canplaythrough", () => {
        isLoading.value = true
      })
    }
  }
})


onBeforeUnmount(()=>{
  video.value.pause()
  video.value.currentTime = 0
  video.value.src = ''
})

const isHover = (bool) => {
  if(bool){
    video.value.play()
  }else{
    video.value.pause()
  }
}

</script>
<style scoped></style>
