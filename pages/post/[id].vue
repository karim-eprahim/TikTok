<template>
  <div
    id="PostPage"
    class="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto"
  >
    <div class="lg:w-[calc(100%-540px)] h-full relative">
      <NuxtLink
        class="absolute cursor-pointer flex z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
      >
        <Icon name="material-symbols:close" class="text-white" size="27"></Icon>
      </NuxtLink>

      <div v-if="true">
        <button
          :disabled="!isLoading"
          @click="loopThroughPostsUp()"
          class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-up" size="30" class="text-white" />
        </button>
        <button
          :disabled="!isLoading"
          @click="loopThroughPostsDown()"
          class="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-down" size="30" class="text-white" />
        </button>
      </div>

      <img
        class="absolute top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
        width="45"
        src="~/assets/images/tiktok-logo-small.png"
      />

      <video
        v-if="true"
        class="absolute object-cover w-full my-auto z-[-1] h-screen"
        src="/first.mp4"
      />

      <div
        v-if="true"
        class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[480px]"
      >
        <Icon
          class="animate-spin ml-1 text-white"
          name="mingcute:loading-line"
          size="100"
        ></Icon>
      </div>
    </div>

    <div
      id="InfoSection"
      v-if="true"
      class="lg:max-w-[550px] relative w-full h-full bg-white"
    >
      <div class="py-7"></div>
      <div class="flex items-center justify-between px-8">
        <div class="flex items-center">
          <nuxt-link href="">
            <img
              src="~/assets/images/test/test.jpeg"
              class="rounded-full lg:mx-0 mx-auto"
              width="40"
              alt=""
            />
          </nuxt-link>
          <div class="ml-3 pt-0.5">
            <div class="text-[17px] font-semibold">User Name</div>
            <div class="text-[13px] font-light">
              User Name
              <span class="relative -top-[2px] font-bold pr-0.5">.</span>
              <span class="font-medium">Date here</span>
            </div>
          </div>
        </div>

        <Icon
          v-if="true"
          @click="deletePost"
          class="cursor-pointer text-black"
          size="25"
          name="material-symbols:delete-outline-sharp"
        />
      </div>

      <div class="px-8 mt-4 text-sm">This is the post text</div>

      <div class="flex items-center px-8 mt-4 text-sm font-bold">
        <Icon name="solar:music-note-bold" size="17"></Icon>
        <span class="pl-1">original sound - User name</span>
      </div>

      <div class="flex items-center px-8 mt-8">
        <div class="pb-4 text-center flex items-center">
          <button class="flex rounded-full bg-gray-200 p-2 cursor-pointer">
            <Icon name="material-symbols:favorite" size="25" />
          </button>
          <span class="text-sm pl-2 pr-4 text-gray-800 font-semibold">123</span>
        </div>
        <div class="pb-4 text-center flex items-center">
          <div class="flex rounded-full bg-gray-200 p-2 cursor-pointer">
            <Icon name="bx:bxs-message-rounded-dots" size="25" />
          </div>
          <span class="text-sm pl-2 pr-4 text-gray-800 font-semibold">34</span>
        </div>
      </div>

      <div
        id="Comments"
        class="bg-[#f8f8f8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
      >
        <div class="pt-2" />

        <div v-if="false" class="text-center mt-6 text-xl text-gray-500">
          No comments...
        </div>

        <div v-else class="flex items-center justify-between px-8 mt-4">
          <div class="flex items-center relative w-full">
            <nuxt-link to="/">
              <img
                class="absolute top-0 rounded-full lg:mx-0 mx-auto"
                width="40"
                src="~/assets/images/test/test.jpeg"
              />
            </nuxt-link>
            <div class="ml-14 pt-0 5 w-full">
              <div
                class="text-[18px] font-semibold flex flex-center justify-between"
              >
                <span>User Name</span>
                <Icon
                  v-if="true"
                  @click="deleteComment()"
                  class="cursor-pointer"
                  name="material-symbols:delete-outline-sharp"
                  size="25"
                />
              </div>
              <div class="text-[15px] font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                blanditiis porro cum rem quasi eius modi, consequuntur unde
                incidunt accusantium officiis dolore doloribus iusto dolores
                harum magnam, minima et iste?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped></style>
