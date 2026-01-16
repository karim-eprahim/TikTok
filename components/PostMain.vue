<template>
  <div :id="`PostMain-${post.id}`" class="flex border-b py-6 dark:bg-gray-900">
    <div class="cursor-pointer" @click="isLoggedIn(post.user)">
      <img :src="post.user.image" alt="" class="rounded-full max-h-[60px]" />
    </div>
    <div class="pl-3 w-full px-4">
      <div class="flex items-center justify-between pb-0 5">
        <button class="flex flex-col sm:flex-row items-start sm:items-center">
          <span
            class="font-bold hover:underline cursor-pointer text-gray-900 dark:text-white"
            >{{ $generalStore.allLowerCaseCaps(post.user.name) }}</span
          >
          <span
            class="text-[13px] text-light text-gray-500 dark:text-gray-400 pl-1 cursor-pointer"
            >{{ post.user.name }}</span
          >
        </button>
        <button
          @click="isLoggedIn(post.user)"
          class="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] dark:hover:bg-[#4a1520] font-semibold rounded-md"
        >
          Follow
        </button>
      </div>

      <div
        class="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px] text-gray-900 dark:text-gray-100"
      >
        {{ post.text }}
      </div>

      <div class="text-[14px] text-gray-500 dark:text-gray-400 pb-0.5">
        #fun #cool #SuperAwesome
      </div>

      <div
        class="text-[14px] pb-0.5 flex items-center font-semibold text-gray-900 dark:text-gray-100"
      >
        <Icon name="solar:music-note-bold" size="17px" />
        <div class="px-1">original sound - AWESOME</div>
        <Icon name="material-symbols:favorite" size="20px" />
      </div>

      <div class="mt-2.5 flex">
        <div
          @click="displayPost(post)"
          class="relative min-h-[480px] max-h-[580px] max-w-[280px] flex items-center bg-black rounded-xl cursor-pointer"
        >
          <video
            v-if="post.video"
            ref="video"
            loop
            muted
            class="rounded-xl object-cover mx-auto"
            :src="post.video"
          ></video>
          <img
            src="~/assets/images/reelo-light.png"
            width="90"
            class="absolute right-2 bottom-14"
            alt=""
          />
        </div>
        <div class="relative mr-[0px] sm:mr-[75px]">
          <div class="absolute bottom-0 pl-2 right-2 sm:right-auto">
            <div class="pb-4 text-center">
              <button
                @click="isLiked ? unLikePost(post) : likePost(post)"
                class="rounded-full bg-gray-200 dark:bg-gray-700 p-2 flex cursor-pointer"
              >
                <Icon
                  name="material-symbols:favorite"
                  size="25"
                  :class="isLiked ? 'text-[#F02C56]' : 'dark:text-gray-300'"
                />
              </button>
              <span
                class="text-xs text-gray-800 dark:text-gray-200 font-semibold"
                >{{ post.likes.length }}</span
              >
            </div>

            <div class="pb-4 text-center">
              <button
                class="rounded-full bg-gray-200 dark:bg-gray-700 p-2 flex cursor-pointer"
                @click="displayPost(post)"
              >
                <Icon
                  name="bx:bxs-message-rounded-dots"
                  size="25"
                  class="dark:text-gray-300"
                />
              </button>
              <span
                class="text-xs text-gray-800 dark:text-gray-200 font-semibold"
                >{{ post.comments.length }}</span
              >
            </div>

            <div class="pb-4 text-center">
              <button
                class="rounded-full bg-gray-200 dark:bg-gray-700 p-2 flex cursor-pointer"
              >
                <Icon
                  name="mingcute:share-forward-fill"
                  size="25"
                  class="dark:text-gray-300"
                />
              </button>
              <span
                class="text-xs text-gray-800 dark:text-gray-200 font-semibold"
                >4</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { $generalStore, $userStore } = useNuxtApp();
const props = defineProps(["post"]);
const { post } = toRefs(props);
const router = useRouter();
let video = ref(null);

const isLoggedIn = (user) => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }
  setTimeout(() => router.push(`/profile/${user.id}`), 200);
};

const displayPost = (post) => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }
  $generalStore.setBackUrl("/");
  $generalStore.selectedPost = null;
  setTimeout(() => {
    router.push(`/post/${post.id}`);
  }, 200);
};

// onBeforeMount(()=>{
//   video.value.pause()
//   video.value.currentTime = 0
//   video.value.src = ''
// })

const isLiked = computed(() => {
  let res = post.value.likes.find((like) => like.user_id === $userStore.id);
  if (res) {
    return true;
  } else {
    return false;
  }
});

const likePost = async (post) => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }
  try {
    await $userStore.likePost(post);
  } catch (error) {
    console.log(error);
  }
};

const unLikePost = async (post) => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }
  try {
    await $userStore.unLikePost(post);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  let observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) {
        console.log("Element is playing" + post.value.id);
        if (video.value) {
          video.value.play().catch((err) => {
            if (err.name !== "AbortError") console.error(err);
          });
        }
      } else {
        console.log("Element is paused" + post.value.id);
        if (video.value) {
          video.value.pause();
        }
      }
    },
    { threshold: [0.6] }
  );

  observer.observe(document.getElementById(`PostMain-${post.value.id}`));
});
</script>
<style></style>
