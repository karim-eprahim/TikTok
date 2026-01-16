<template>
  <UploadError v-if="errorType" :errorType="errorType" />

  <div
    v-if="isUploading"
    class="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black z-50 bg-opacity-50"
  >
    <Icon
      class="animate-spin ml-1"
      name="mingcute:loading-line"
      size="100"
      color="#ffffff"
    ></Icon>
  </div>
  <div
    class="w-full mt-[80px] mb-[40px] bg-white dark:bg-gray-800 shadow-lg rounded-md px-4 py-6 md:px-10"
  >
    <div>
      <div class="text-[23px] font-semibold">Upload Video</div>
      <div class="text-gray-400 mt-1">Post a video to your account</div>
    </div>
    <div class="mt-8 md:flex gap-6">
      <label
        v-if="!fileDisplay"
        for="fileInput"
        @drop.prevent="onDrop"
        @dragover.prevent=""
        class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      >
        <Icon
          name="majesticons:cloud-upload"
          size="40"
          class="text-[#b3b3b1]"
        ></Icon>
        <div class="mt-4 text-[17px]">Select video to upload</div>
        <div class="mt-1.5 text-gray-500 text-[13px]">
          Or drag and drop a file
        </div>
        <div class="mt-12 text-gray-500 text-sm">MP4</div>
        <div class="mt-2 text-gray-500 text-[13px]">Up to 30 minutes</div>
        <div class="mt-2 text-gray-500 text-[13px]">Less than 2 GB</div>
        <div
          class="px-2 py-1.5 mt-8 text-white text-[14px] w-[80%] bg-[#f02C56] rounded-sm"
        >
          Select file
        </div>
        <input
          @input="onChange"
          ref="file"
          type="file"
          id="fileInput"
          hidden
          accept=".mp4"
        />
      </label>

      <div
        v-else
        class="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative"
      >
        <div class="bg-black w-full h-full">
          <img
            src="~\assets\images\mobile-case.png"
            alt=""
            class="absolute z-20 pointer-events-none inset-0"
          />
          <img
            src="~\assets\images\reelo-light.png"
            width="90"
            class="absolute right-4 bottom-6 z-20 block dark:hidden"
          />
          <img
            src="~\assets\images\reelo-dark.png"
            width="90"
            class="absolute right-4 bottom-6 z-20 hidden dark:block"
          />
          <video
            autoplay
            loop
            muted
            class="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full inset-0"
            :src="fileDisplay"
          ></video>
          <div
            class="absolute -bottom-12 right-0 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300"
          >
            <div class="flex items-center truncate">
              <Icon
                name="material-symbols:check-circle-outline-rounded"
                size="16"
                class="min-w-[16px]"
              ></Icon>
              <div class="text-[11px] pl-1 truncate text-ellipsis">
                {{ fileData.name }}
              </div>
            </div>
            <button @click="clearVideo" class="text-[11px] ml-2 font-semibold">
              Change
            </button>
          </div>
        </div>
      </div>

      <div class="mt-4 mb-6">
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center bg-[#f8f8f8] dark:bg-gray-700 py-4 px-6 rounded-xl"
        >
          <div>
            <Icon
              name="fluent:edit-off-24-filled"
              size="20"
              class="mr-4"
            ></Icon>
          </div>
          <div>
            <div class="text-semibold text-[15px] mb-1.5">
              Divide videos and edit
            </div>
            <div class="text-semibold text-[15px] text-gray-400">
              you can quickly divide videos into multiple parts, remove
              redundant parts and turn landscape videos into portrait videos
            </div>
          </div>
          <div
            class="flex justify-end max-w-[130px] w-full text-center my-auto"
          >
            <CustomButton
              name="Edit"
              size="mm"
              class="mt-2 sm:mt-0"
              style="width: 100%;"
            />
          </div>
        </div>

        <div class="mt-5">
          <div class="flex items-center justify-between">
            <div class="mb-1 text-[15px]">Caption</div>
            <div class="text-gray-400 text-[12px]">
              {{ caption?.length }} /150
            </div>
          </div>
          <input
            v-model="caption"
            maxlength="150"
            type="text"
            class="w-full border p-2.5 rounded-md focus:outline-none dark:bg-gray-700"
          />
        </div>

        <div class="flex gap-3 mt-4">
          <CustomButton
            @click="discard()"
            type="secondary"
            name="Discard"
            size="md"
            class="min-w-[120px]"
          />
          <CustomButton
            @click="createPost()"
            name="Post"
            size="md"
            class="min-w-[120px]"
          />
        </div>
        <div v-if="errors" class="mt-4">
          <div class="text-red-600" v-if="errors && errors.video">
            {{ errors.video[0] }}
          </div>
          <div class="text-red-600" v-if="errors && errors.text">
            {{ errors.text[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { $userStore } = useNuxtApp();
const router = useRouter();

definePageMeta({
  layout: "upload",
  middleware: "auth",
});
let file = ref(null);
let fileDisplay = ref(null);
let errorType = ref(null);
let caption = ref("");
let fileData = ref(null);
let errors = ref(null);
let isUploading = ref(false);

watch(
  () => caption.value,
  (caption) => {
    if (caption.length >= 150) {
      errorType.value = "caption";
      return;
    }
    errorType.value = null;
  }
);

const onChange = () => {
  fileDisplay.value = URL.createObjectURL(file.value.files[0]);
  fileData.value = file.value.files[0];
};

const onDrop = (e) => {
  errorType.value = "";
  file.value = e.dataTransfer.files[0];
  fileData.value = e.dataTransfer.files[0];
  let extention = file.value.name.substring(
    file.value.name.lastIndexOf(".") + 1
  );
  if (extention !== "mp4") {
    errorType.value = "file";
    return;
  }
  fileDisplay.value = URL.createObjectURL(e.dataTransfer.files[0]);
};

const discard = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
  caption.value = "";
  router.go(-1);
};

const createPost = async () => {
  errors.value = null;
  let data = new FormData();

  data.append("video", fileData.value || "");
  data.append("text", caption.value || "");

  if (fileData.value && caption.value) {
    isUploading.value = true;
  }

  try {
    let res = await $userStore.createPost(data);
    if (res.status === 200) {
      setTimeout(() => {
        router.push("/profile/" + $userStore.id);
        isUploading.value = false;
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
    isUploading.value = false;
  }
};

const clearVideo = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
};
</script>
<style scoped></style>
