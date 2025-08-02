<template>
  <div
    id="TopNav"
    class="fixed bg-white z-30 flex items-center w-full shadow h-[61px]"
  >
    <div
      :class="route.fullPath == '/' ? 'max-w-[1150px]' : ''"
      class="flex items-center justify-between w-full px-6 mx-auto"
    >
      <div :class="route.fullPath == '/' ? 'w-[80%]' : ''">
        <nuxt-link to="/">
          <img src="~/assets/images/tiktok-logo.png" width="115" />
        </nuxt-link>
      </div>

      <div
        class="hidden md:flex items-center bg-[#f1f1f2] p-1 rounded-full max-w-[380px] w-full"
      >
        <input
          type="text"
          class="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
          placeholder="Search accounts"
        />
        <div class="px-3 py-1 flex items-center border-l border-l-gray-300">
          <Icon name="ri:search-line" color="A1A2A7" size="22" />
        </div>
      </div>

      <div class="flex items-center">

        <div 
        class="flex items-center justify-end gap-3 min-w-[275px] max-w-[320px] w-full"
      >
        <button
          class="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100 cursor-pointer"
        >
          <Icon name="material-symbols:add" color="#00000" size="22"></Icon>
          <span class="px-2 font-medum text-[15px]">Upload</span>
        </button>
      </div>

      <div v-if="false" class="flex items-center">
        <button
          class="flex items-center text-white bg-[#f02c56] border rounded-md px-3 py-[6px] cursor-pointer"
        >
          <span class="mx-4 font-medium text-[15px]">Log in</span>
        </button>
        <Icon name="mdi:dots-vertical" color="#16724" size="25"></Icon>
      </div>


        <Icon
          class="ml-3 mr-4"
          name="iconoir:send-diagonal"
          color="#161724"
          size="30"
        ></Icon>
        <Icon
          class="mr-5"
          name="material-symbols:chat-outline"
          color="#161724"
          size="27"
        ></Icon>
        <div class="relative">
          <button class="mt-1" @click="showMenu = !showMenu">
            <img
              class="rounded-full max-w-[35px] h-[35px]"
              width="33"
              src="https://picsum.photos/200/300?grayscale"
              alt=""
            />
          </button>
          <div v-if="showMenu" class="fixed inset-0 z-50" @click.self="showMenu = false" >
            <div
              id="PopupMenu"
              class="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl top-[55px] right-3"
            >
              <nuxt-link
                @click="($event) => (showMenu = false)"
                class="flex items-center justify-start m-0 py-3 px-2 hover:bg-gray-100 cursor-pointer"
              >
                <Icon name="material-symbols:person-outline" size="20"></Icon>
                <span class="pl-2 font-semibold text-sm">profile</span>
              </nuxt-link>
              <div
                @click="($event) => (showMenu = false)"
                class="flex items-center justify-start m-0 py-3 px-2 hover:bg-gray-100 border-t cursor-pointer"
              >
                <Icon name="ic:outline-log-in" size="20"></Icon>
                <span class="pl-2 font-semibold text-sm">Log out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const route = useRoute();
  let showMenu = ref(false)

</script>
<style></style>
