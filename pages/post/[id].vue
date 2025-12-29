<template>
  <div
    id="PostPage"
    class="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto"
  >
    <div
      v-if="$generalStore.selectedPost"
      class="lg:w-[calc(100%-540px)] h-full relative"
    >
      <NuxtLink
        :to="$generalStore.isBackUrl"
        class="absolute cursor-pointer flex z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
      >
        <Icon name="material-symbols:close" class="text-white" size="27"></Icon>
      </NuxtLink>

      <div v-if="$generalStore.ids.length > 1">
        <button
          :disabled="!isLoaded"
          @click="loopThroughPostsUp()"
          class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-up" size="30" class="text-white" />
        </button>
        <button
          :disabled="!isLoaded"
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

      <!-- <video
        muted
        playsinline
        v-if="$generalStore.selectedPost?.video"
        class="absolute object-cover w-full my-auto z-[-1] h-screen"
        :src="$generalStore.selectedPost.video"
      /> -->

      <div
        v-if="!isLoaded"
        class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[480px]"
      >
        <Icon
          class="animate-spin ml-1 text-white"
          name="mingcute:loading-line"
          size="100"
        ></Icon>
      </div>
      <div
        class="bg-black bg-opacity-70 lg:min-w-[480px] relative"
        @click="toggleVideo"
      >
        <video
          v-if="$generalStore.selectedPost?.video"
          :key="$generalStore.selectedPost.id"
          ref="video"
          loop
          :muted="isMuted"
          class="h-screen mx-auto"
          :src="$generalStore.selectedPost.video"
          @loadeddata="videoLoaded"
          @play="isPlaying = true"
          @pause="isPlaying = false"
        ></video>

        <div
          v-if="!isPlaying"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <Icon name="mdi:play" size="100" class="text-white opacity-80" />
        </div>

        <div
          class="absolute bottom-8 right-8 cursor-pointer"
          @click.stop="toggleMute"
        >
          <Icon
            :name="!isMuted ? 'mdi:volume-high' : 'mdi:volume-off'"
            size="30"
            class="text-white opacity-80"
          />
        </div>
      </div>
    </div>

    <div
      id="InfoSection"
      v-if="$generalStore.selectedPost"
      class="lg:max-w-[550px] relative w-full h-full bg-white"
    >
      <div class="py-7"></div>
      <div class="flex items-center justify-between px-8">
        <div class="flex items-center">
          <nuxt-link :to="`/profile/${$generalStore.selectedPost.user.id}`">
            <img
              :src="$generalStore.selectedPost.user.image"
              class="rounded-full lg:mx-0 mx-auto"
              width="40"
              alt=""
            />
          </nuxt-link>
          <div class="ml-3 pt-0.5">
            <div class="text-[17px] font-semibold">
              {{
                $generalStore.allLowerCaseCaps(
                  $generalStore.selectedPost.user.name
                )
              }}
            </div>
            <div class="text-[13px] font-light">
              {{ $generalStore.selectedPost.user.name }}
              <span class="relative -top-[2px] font-bold pr-0.5">.</span>
              <span class="font-medium">{{
                $generalStore.selectedPost.created_at
              }}</span>
            </div>
          </div>
        </div>

        <Icon
          v-if="$generalStore.selectedPost.user.id == $userStore.id"
          @click="deletePost"
          class="cursor-pointer text-black"
          size="25"
          name="material-symbols:delete-outline-sharp"
        />
      </div>

      <div class="px-8 mt-4 text-sm">{{ $generalStore.selectedPost.text }}</div>

      <div class="flex items-center px-8 mt-4 text-sm font-bold">
        <Icon name="solar:music-note-bold" size="17"></Icon>
        <span class="pl-1"
          >original sound -
          {{
            $generalStore.allLowerCaseCaps($generalStore.selectedPost.user.name)
          }}</span
        >
      </div>

      <div class="flex items-center px-8 mt-8">
        <div class="pb-4 text-center flex items-center">
          <button
            @click="isLiked ? unLikePost() : likePost()"
            class="flex rounded-full bg-gray-200 p-2 cursor-pointer"
          >
            <Icon
              :class="isLiked ? 'text-[#F02C56]' : ''"
              name="material-symbols:favorite"
              size="25"
            />
          </button>
          <span class="text-sm pl-2 pr-4 text-gray-800 font-semibold">{{
            $generalStore.selectedPost.likes.length
          }}</span>
        </div>
        <div class="pb-4 text-center flex items-center">
          <div class="flex rounded-full bg-gray-200 p-2 cursor-pointer">
            <Icon name="bx:bxs-message-rounded-dots" size="25" />
          </div>
          <span class="text-sm pl-2 pr-4 text-gray-800 font-semibold">{{ $generalStore.selectedPost.comments.length }}</span>
        </div>
      </div>

      <div
        id="Comments"
        class="bg-[#f8f8f8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
      >
        <div class="pt-2" />

        <div
          v-if="!$generalStore.selectedPost.comments.length"
          class="text-center mt-6 text-xl text-gray-500"
        >
          No comments...
        </div>

        <div
          v-else
          v-for="comment in $generalStore.selectedPost.comments"
          :key="comment.id"
          class="flex items-center justify-between px-8 mt-4"
        >
          <div class="flex items-center relative w-full">
            <nuxt-link :to="`/profile/${comment.user.id}`">
              <img
                class="absolute top-0 rounded-full lg:mx-0 mx-auto"
                width="40"
                :src="comment.user.image"
              />
            </nuxt-link>
            <div class="ml-14 pt-0 5 w-full">
              <div
                class="text-[18px] font-semibold flex flex-center justify-between"
              >
                <span>{{ comment.user.name }}</span>
                <Icon
                  v-if="comment.user.id == $userStore.id"
                  @click="deleteComment($generalStore.selectedPost, comment.id)"
                  class="cursor-pointer"
                  name="material-symbols:delete-outline-sharp"
                  size="25"
                />
              </div>
              <div class="text-[15px] font-light">
                {{ comment.text }}
              </div>
            </div>
          </div>
        </div>

        <div class="mb-28" />
      </div>

      <div
        v-if="$userStore.id"
        id="CreateComment"
        class="absolute flex justify-between bottom-0 bg-white h-[85px] lg-max-w-[550px] w-full py-5 px-8 border-t-2"
      >
        <div
          :class="
            inputFocused
              ? 'border-2 border-gray-400'
              : 'border-2 border-[#f1f1f2]'
          "
          class="bg-[#f1f1f2] flex items-center rounded-lg w-full lg:max-w-[420px]"
        >
          <input
            type="text"
            v-model="comment"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            class="bg-[#f1f1f2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
            placeholder="Add Comment"
          />
        </div>
        <button
          @click="addComment()"
          :disabled="!comment"
          :class="comment ? 'text-[#f02c56]' : 'text-gray-400'"
          class="font-semibold text-sm ml-5 pr-1"
        >
          Post
        </button>
      </div>
    </div>

    <div
      v-if="showDeleteConfirm"
      class="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-[#00000066] z-[60]"
    >
      <div
        class="relative bg-white w-full max-w-[300px] sm:max-w-md mx-6 rounded-lg p-6 text-center"
      >
        <Icon
          name="mingcute:warning-line"
          size="50"
          class="mb-4 text-red-500"
        />
        <div class="text-[20px] font-bold mb-2">Delete Post</div>
        <div class="text-[15px] text-gray-600 mb-6">
          Are you sure you want to delete this post?
        </div>
        <div class="flex gap-4 justify-center">
          <CustomButton
            @click="showDeleteConfirm = false"
            type="secondary"
            name="Cancel"
          >
          </CustomButton>
          <CustomButton
            @click="confirmDelete"
            type="primary"
            name="Delete"
            :loading="loading"
          >
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { $generalStore, $userStore, $profileStore } = useNuxtApp();
const route = useRoute();
const router = useRouter();
definePageMeta({
  middleware: 'auth'
})

let video = ref(null);
let isLoaded = ref(false);
let comment = ref(null);
let inputFocused = ref(false);
let isPlaying = ref(true);
let loading = ref(false);

let isMuted = ref(false);
let showDeleteConfirm = ref(false);

const toggleVideo = () => {
  if (video.value) {
    if (isPlaying.value) {
      video.value.pause();
      isPlaying.value = false;
    } else {
      video.value.play();
      isPlaying.value = true;
    }
  }
};

const toggleMute = () => {
  if (video.value) {
    video.value.muted = !video.value.muted;
    isMuted.value = video.value.muted;
  }
};

const videoLoaded = () => {
  isLoaded.value = true;
  playVideo();
};

const playVideo = async () => {
  if (video.value) {
    try {
      await video.value.play();
      isPlaying.value = true;
    } catch (error) {
      console.log("Autoplay failed, trying muted:", error);
      isMuted.value = true;
      video.value.muted = true;
      try {
        await video.value.play();
        isPlaying.value = true;
      } catch (e) {
        console.error("Muted autoplay also failed:", e);
        isPlaying.value = false;
      }
    }
  }
};

const loadPost = async (id) => {
  $generalStore.selectedPost = null;
  isLoaded.value = false;
  try {
    await $generalStore.getPostById(id);
  } catch (error) {
    console.log(error);
    if (error && error.response.status === 400) {
      router.push("/");
    }
  }
};

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await loadPost(newId);
    }
  }
);

onMounted(async () => {
  await loadPost(route.params.id);
});

onBeforeUnmount(() => {
  if (video.value) {
    video.value.pause();
    video.value.currentTime = 0;
    video.value.src = "";
  }
});

const loopThroughPostsDown = () => {
  setTimeout(() => {
    let idArrayReversed = $generalStore.ids.reverse();
    let isBreak = false;
    for (let i = 0; i < idArrayReversed.length; i++) {
      const id = idArrayReversed[i];
      if (id < route.params.id) {
        router.push(`/post/${id}`);
        isBreak = true;
        if (!isPlaying.value) {
          isPlaying.value = true;
        }
        return;
      }
    }
    if (!isBreak) {
      router.push(`/post/${idArrayReversed[0]}`);
    }
  }, 300);
};

const loopThroughPostsUp = () => {
  setTimeout(() => {
    let isBreak = false;
    for (let i = 0; i < $generalStore.ids.length; i++) {
      const id = $generalStore.ids[i];
      if (id > route.params.id) {
        router.push(`/post/${id}`);
        isBreak = true;
        if (!isPlaying.value) {
          isPlaying.value = true;
        }
        return;
      }
    }
    if (!isBreak) {
      router.push(`/post/${$generalStore.ids[0]}`);
    }
  }, 300);
};

const isLiked = computed(() => {
  let res = $generalStore.selectedPost.likes.find(
    (like) => like.user_id === $userStore.id
  );
  if (res) {
    return true;
  } else {
    return false;
  }
});

const likePost = async () => {
  try {
    await $userStore.likePost($generalStore.selectedPost, true);
  } catch (error) {
    console.log(error);
  }
};

const unLikePost = async () => {
  try {
    await $userStore.unLikePost($generalStore.selectedPost, true);
  } catch (error) {
    console.log(error);
  }
};

const deletePost = () => {
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  loading.value = true;
  try {
    await $userStore.deletePost($generalStore.selectedPost);
    await $profileStore.getProfile($userStore.id);
    router.push(`/profile/${$userStore.id}`);
    showDeleteConfirm.value = false;
    loading.value = false;
  } catch (error) {
    console.log(error);
    showDeleteConfirm.value = false;
    loading.value = false;
  }
};

const addComment = async () => {
  try {
    await $userStore.addComment($generalStore.selectedPost, comment.value);
    comment.value = null;
    document.getElementById("Comments").scroll({
      behavior: "smooth",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (post, commentId) => {
  try {
    await $userStore.deleteComment(post, commentId);
  } catch (error) {
    console.log(error);
  }
};
</script>
<style scoped></style>
