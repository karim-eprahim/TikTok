<template>
  <div id="PostMain" class="flex border-b py-6">
    <div class="cursor-pointer">
      <img
        src="https://picsum.photos/300?grayscale"
        alt=""
        class="rounded-full max-h-[60px]"
      />
    </div>
    <div class="pl-3 w-full px-4">
      <div class="flex items-center justify-between pb-0 5">
        <button>
          <span class="font-bold hover:underline cursor-pointer"
            >User name</span
          >
          <span class="text-[13px] text-light text-gray-500 pl-1 cursor-pointer"
            >User name</span
          >
        </button>
        <button
          class="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md"
        >
          Follow
        </button>
      </div>

      <div
        class="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]"
      >
        This is some text
      </div>

      <div class="text-[14px] text-gray-500 pb-0.5">
        #fun #cool #SuperAwesome
      </div>

      <div class="text-[14px] pb-0.5 flex items-center font-semibold">
        <Icon name="solar:music-note-bold" size="17px" />
        <div class="px-1">original sound - AWESOME</div>
        <Icon name="ic:round-favorite" size="20px" />
      </div>

      <div class="mt-2.5 flex">
        <div
          class="relative min-h-[480px] max-h-[580px] max-w-[280px] flex items-center bg-black rounded-xl cursor-pointer"
        >
          <video
            ref="video"
            loop
            muted
            class="rounded-xl object-cover mx-auto"
            src="/first.mp4"
          ></video>
          <img
            src="~/assets/images/tiktok-logo-white.png"
            width="90"
            class="absolute right-2 bottom-14"
            alt=""
          />
        </div>
        <div class="relative mr-[75px]">
            <button class="absolute bottom-0 pl-2">
                <Icon name="ic:round-favorite" size="25"/>
            </button>
            <span class="text-x"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
let video = ref(null);
onMounted(() => video.value.play());
</script>
<style></style>
