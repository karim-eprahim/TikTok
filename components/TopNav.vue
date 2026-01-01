<template>
  <div
    id="TopNav"
    class="fixed bg-white dark:bg-[#121212] z-30 flex items-center w-full shadow h-[61px]"
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
          v-if="true"
          class="flex items-center justify-end gap-3 mr-2 lg:min-w-[275px] max-w-[95px] sm:max-w-[320px] w-full"
        >
          <button
            @click="isDark = !isDark"
            class="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Icon
              :name="
                isDark
                  ? 'material-symbols:nightlight-outline-rounded'
                  : 'material-symbols:wb-sunny-outline-rounded'
              "
              :class="isDark ? 'text-[#FE2C55]' : 'text-[#161724]'"
              size="25"
            />
          </button>
          <CustomButton
            iconName="teenyicons:add-small-solid"
            type="secondary"
            size="mm"
            name="Upload"
            class="max-w-[95px] sm:max-w-full"
            @click="isLoggedIn()"
          />
        </div>

        <div
          v-if="!$userStore.id"
          class="flex items-center justify-end md:justify-center min-w-[116px] sm:min-w-[126px]"
        >
          <CustomButton name="Log in" size="mm" @click="isLoginOpen = true" />
          <Icon name="mdi:dots-vertical" color="#16724" size="25"></Icon>
        </div>

        <div v-else class="flex items-center">
          <div class="hidden md:flex items-center">
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
          </div>
          <div class="relative">
            <button class="mt-1" @click="showMenu = !showMenu">
              <img
                class="rounded-full max-w-[35px] h-[35px]"
                width="35"
                :src="$userStore.image"
                alt=""
              />
            </button>
            <!-- <div
            > -->
            <div
              v-if="showMenu"
              @click.self="showMenu = false"
              id="PopupMenu"
              class="absolute bg-white rounded-lg py-1.5 md:w-[200px] w-[130px] shadow-xl top-[55px] left-[-75px] md:left-[-150px]"
            >
              <nuxt-link
                :to="`/profile/${$userStore.id}`"
                @click="($event) => (showMenu = false)"
                class="flex items-center justify-start m-0 py-3 px-2 hover:bg-gray-100 cursor-pointer"
              >
                <Icon name="material-symbols:person-outline" size="20"></Icon>
                <span class="pl-2 font-semibold text-sm">profile</span>
              </nuxt-link>
              <div
                @click="logout()"
                class="flex items-center justify-start m-0 py-3 px-2 text-red-600 hover:bg-gray-100 border-t cursor-pointer"
              >
                <Icon
                  class="text-danger"
                  name="ic:outline-log-in"
                  size="20"
                ></Icon>
                <span class="pl-2 font-semibold text-sm">Log out</span>
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { $userStore, $generalStore } = useNuxtApp();
const colorMode = useColorMode();
const route = useRoute();
const router = useRouter();
const { isLoginOpen } = storeToRefs($generalStore);
let showMenu = ref(false);

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.preference = value ? "dark" : "light";
  },
});

onMounted(() => {
  const onDocMouseUp = function (e) {
    const popupMenu = document.getElementById("PopupMenu");
    const target = e && e.target ? e.target : null;
    if (
      !popupMenu ||
      !(target instanceof Node) ||
      !popupMenu.contains(target)
    ) {
      showMenu.value = false;
    }
  };
  document.addEventListener("mouseup", onDocMouseUp);

  onUnmounted(() => {
    document.removeEventListener("mouseup", onDocMouseUp);
  });
});

const isLoggedIn = () => {
  if ($userStore.id) {
    router.push("/upload");
  } else {
    $generalStore.isLoginOpen = true;
  }
};
const logout = () => {
  try {
    $userStore.logout();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
<style></style>
