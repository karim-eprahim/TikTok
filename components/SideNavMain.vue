<template>
  <div
    id="SideNavMain"
    :class="route.fullPath == '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'"
    class="fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto"
  >
    <div class="lg:w-full w-[55px] mx-auto">
      <nuxt-link to="/">
        <MenuItem
          iconString="For You"
          iconColor="#F02c56"
          sizeString="30"
        ></MenuItem>
      </nuxt-link>
      <MenuItem
        iconString="Following"
        iconColor="#000000"
        sizeString="27"
      ></MenuItem>
      <MenuItem
        iconString="LIVE"
        iconColor="#000000"
        sizeString="27"
      ></MenuItem>

      <div class="border-b lg:ml-2 mt-2 lg:mb-0 mb-2"></div>

      <div
        class="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2"
      >
        Suggested accounts
      </div>
      <div class="border-b hidden lg:ml-2 mt-2"></div>
      <div class="cursor-pointer">
        <MenuItemFollow></MenuItemFollow>
      </div>
      <button class="lg:block hidden text-[#f02c56] pt-1 pl-2 text-[13px]">
        See all
      </button>

      <div class="border-b lg:ml-2 mt-2 lg:mb-0 mb-2"></div>
      <div
        class="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2"
      >
        Following accounts
      </div>
      <div class="border-b hidden lg:ml-2 mt-2"></div>
      <div class="cursor-pointer">
        <MenuItemFollow></MenuItemFollow>
      </div>
      <button class="lg:block hidden text-[#f02c56] pt-1 pl-2 text-[13px]">
        See all
      </button>

      <div class="lg:block hidden border-b lg:ml-2 mt-2"></div>
      
      <div class="lg:block hidden text-[11px] text-gray-500">
        <div class="pt-4 px-2">About Newsroom TikTok Shop Contact Careers ByteDance.</div>
        <div class="pt-4 px-2">TikTok for Good Advertise Developers Transparency TikTok Rewards TikTok Browse TikTok Embeds</div>
        <div class="pt-4 px-2">Help Safety Terms Privacy Creator Portal Community GuideLine.</div>
        <div class="pt-4 px-2">2025 TikTok</div>
      </div>

      <div class="pb-14"></div>

    </div>
  </div>
</template>
<script setup>
const route = useRoute();
</script>
<style></style>
