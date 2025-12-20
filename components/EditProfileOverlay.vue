<template>
  <div
    id="EditProfileOverlay"
    class="fixed flex justify-center pt-14 z-50 top-0 left-0 w-full h-full bg-black/50"
  >
    <!-- class="fixed flex justify-center pt-14 md:pt-[105px] z-50 top-0 left-0 w-full h-full bg-black/50 overflow-auto" -->
    <div
      class="relative bg-white w-full max-h-fit min-h-[550px] max-w-[700px] mx-3 p-4 rounded-lg mb-10 overflow-auto"
    >
      <div
        class="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300"
      >
        <div class="text-[22px] font-medium">Edit profile</div>
        <button @click="$generalStore.isEditProfileOpen = false">
          <icon name="mdi:close" size="25" />
        </button>
      </div>

      <div :class="!uploadedImage ? 'mt-16' : 'mt-[58px]'">
        <!-- Profile Form Section -->
        <div class="relative" v-if="!uploadedImage">
          <!-- profile photo  -->
          <div
            id="ProfilePhotoSection"
            class="flex flex-col border-b px-1.5 py-2 w-full"
          >
            <div
              class="font-semibold text-[15px] sm:mg-0 text-gray-700 sm:w-[160px] sm:text-left text-center w-full"
            >
              Profile photo
            </div>
            <div class="flex items-center justify-center sm:mt-1 mt-4">
              <label for="image" class="relative cursor-pointer">
                <img
                  id="profileImage"
                  class="rounded-full"
                  width="95"
                  :src="userImage"
                  alt=""
                />
                <div
                  class="inline-block text-center absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 w-[32px]"
                >
                  <Icon name="mdi:pencil-outline" />
                </div>
              </label>
              <input
                type="file"
                hidden
                id="image"
                @input="getUploadedImage"
                accept="image/png,image/jpeg,image/jpg"
              />
            </div>
          </div>
          <!-- user name  -->
          <div
            id="UsernameSection"
            class="flex flex-col border-b px-1.5 py-2 mt-1.5 w-full"
          >
            <div
              class="font-semibold text-[15px] sm:mg-0 text-gray-700 sm:w-[160px] sm:text-left text-center w-full"
            >
              Username
            </div>
            <div class="flex items-center justify-center sm:mt-1 mt-4">
              <div class="sm:w-[60%] w-full max-w-md">
                <TextInput
                  placeholder="Username"
                  v-model:input="userName"
                  imputType="text"
                  max="30"
                />
                <div class="text-[11px] text-gray-500 mt-4">
                  Usernames can only contain letters,numbers,underscores,md
                  periods. Changing your username will also change your profile
                  link.
                </div>
              </div>
            </div>
          </div>
          <!-- Bio  -->
          <div id="BioSection" class="flex flex-col px-1.5 py-2 mt-2 w-full">
            <div
              class="font-semibold text-[15px] sm:mb-0 text-gray-700 sm:w-[160px] sm:text-left text-center w-full"
            >
              Bio
            </div>
            <div class="flex items-center justify-center sm:mt-6 mt-4">
              <div class="sm:w-[60%] w-full max-w-md">
                <textarea
                  cols="30"
                  rows="4"
                  v-model="userBio"
                  maxlength="80"
                  class="resize-none w-full bg-[#f1f1f2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
                ></textarea>
                <div v-if="userBio" class="text-[11px] text-gray-500">
                  {{ userBio.length }}/80
                </div>
              </div>
            </div>
          </div>
          <!-- Bio  -->
          <div
            id="BioSection"
            class="flex flex-col border-t border-t-gray-300 px-1.5 py-2 mt-2 w-full"
          >
            <div
              id="UpdateInfoButton"
              v-if="!uploadedImage"
              class="flex items-center justify-end"
            >
              <!-- <button
                @click="$generalStore.isEditProfileOpen = false"
                class="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
              >
                <span class="px-2 font-medium text-[15px]">Cancel</span>
              </button> -->
              <!-- <button
                @click="updateUser()"
                class="flex items-center bg-[#f02c56] text-white border rounded-md ml-3 px-3 py-[6px]"
              >
                <span class="px-2 font-medium text-[15px]">Apply</span>
              </button> -->
              <CustomButton @click="$generalStore.isEditProfileOpen = false" type="secondary" name="Cancel" size="mm"></CustomButton>

              <CustomButton @click="updateUser()" class="ml-3" name="Apply" :loading="loading" :disabled="!isUpdated" size="mm"></CustomButton>
            </div>
          </div>
        </div>
        <!-- Cropper Section -->
        <div
          v-if="uploadedImage"
          class="flex flex-col items-center justify-center w-full h-full"
        >
          <div class="text-[22px] font-medium mb-4">Crop your photo</div>
          <div class="w-full max-w-[400px] h-[300px] mb-4">
            <Cropper
              ref="cropper"
              class="cropper"
              :src="uploadedImage"
              :stencil-component="CircleStencil"
            />
          </div>
          <div class="flex gap-4">
            <button
              @click="cancelCrop"
              class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              @click="cropImage"
              class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
const { $generalStore, $userStore, $profileStore } = useNuxtApp();
const { name, bio, image } = storeToRefs($userStore);
const { $toast } = useNuxtApp()
const route = useRoute()

let file = ref(null);
let cropper = ref(null);
let uploadedImage = ref(null);
let userImage = ref(null);
let userName = ref(null);
let userBio = ref(null);
let isUpdated = ref(false);
let loading = ref(false);
let photoCoordinates = ref();

const getUploadedImage = (e) => {
  file.value = e.target.files[0];
  uploadedImage.value = URL.createObjectURL(file.value);
};

const updateUser = async ()=>{
  loading.value = true;
  if(file.value){
    cropAndUpdateImage()
  }
  try{
    await $userStore.updateUser(userName.value,userBio.value)
    await $userStore.getUser()
    await $profileStore.getProfile(route.params.id)
    $generalStore.updateSideMenuImage($generalStore.suggested , $userStore)
    $generalStore.updateSideMenuImage($generalStore.following , $userStore)
    userImage.value = image.value
    uploadedImage.value = null
    $toast.success("profile updated successfuly")
  }catch(error){
    $toast.error(error.response.data.error || 'Something Error ,Please Try Again')
  }finally{
    photoCoordinates.value = {}
    loading.value = false;
    $generalStore.isEditProfileOpen = false
  }
}

const cropAndUpdateImage = async()=>{
    let coordinates = photoCoordinates.value
    let data = new FormData()
    data.append('image',file.value || '')
    data.append('height',coordinates.height || '')
    data.append('width',coordinates.width || '')
    data.append('left',coordinates.left || '')
    data.append('top',coordinates.top || '')
  try{
    await $userStore.updateUserImage(data)
  }catch(error){
    console.log(error.response)
    $toast.error(error.response.data.error)
  }
}

const cropImage = () => {
  if (cropper.value) {
    const { canvas } = cropper.value.getResult();
    photoCoordinates.value = cropper.value.getResult().coordinates
    if (canvas) {
      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create new file from cropped image
            const croppedFile = new File([blob], file.value.name, {
              type: blob.type,
              lastModified: Date.now(),
            });

            // Update the file and userImage
            file.value = croppedFile;
            userImage.value = URL.createObjectURL(blob);

            // Reset uploadedImage to show the form again
            uploadedImage.value = null;

            console.log("Image cropped successfully");
          }
        },
        "image/jpeg",
        0.9
      );
    }
  }
};

const cancelCrop = () => {
  // Reset everything
  uploadedImage.value = null;
  file.value = null;

  // Clear the file input
  const fileInput = document.getElementById("image");
  if (fileInput) {
    fileInput.value = "";
  }
};

watch(()=>userName.value,()=>{
  if(!userName.value || userName.value === name.value){
    isUpdated.value = false
  }else{
    isUpdated.value = true
  }
})
watch(()=>userBio.value,()=>{
  if(!userBio.value || userBio.length < 1){
    isUpdated.value = false
  }else{
    isUpdated.value = true
  }
})

onMounted(()=>{
  userName.value = name.value
  userBio.value = bio.value
  userImage.value = image.value
});
</script>

<style scoped>
.cropper {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border-radius: 8px;
}

/* Custom styles for the cropper */
:deep(.vue-advanced-cropper__background) {
  background: #f0f0f0;
}
</style>
