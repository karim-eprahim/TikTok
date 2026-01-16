<template>
  <div>
    <div class="text-center text-[28px] mb-4 font-semibold">Log in</div>
    <div class="px-6 pb-1.5 text-[15px]">Email address</div>
    <div class="px-6 pb-2">
      <TextInput
        placeholder="Email address"
        v-model:input="email"
        inputType="email"
        :autoFocus="true"
        :error="errors && errors.email ? errors.email[0] : ''"
      />
    </div>
    <div class="px-6 pb-2">
      <TextInput
        placeholder="Password"
        v-model:input="password"
        inputType="password"
      />
    </div>
    <div class="px-6 text-[12px] text-gray-600 dark:text-gray-400">Forget password</div>
    <div class="px-6 pb-2 mt-6">
      <CustomButton
        @click="Login()"
        :disabled="!email || !password"
        :loading="loading"
        size="lg"
        name="Log in"
        class="w-full max-w-full font-semibold"
      ></CustomButton>
    </div>
  </div>
</template>
<script setup>
const { $userStore, $generalStore } = useNuxtApp();

let email = ref("karim@gmail.com");
let password = ref("123123123");
let errors = ref(null);
let loading = ref(false);

const Login = async () => {
  errors.value = null;
  loading.value = true;
  try {
    await $userStore.getTokens();
    await $userStore.login(email.value, password.value);
    await $userStore.getUser();
    await $generalStore.getRandomUsers("suggested");
    await $generalStore.getRandomUsers("following");

    $generalStore.isLoginOpen = false;
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  } finally {
    loading.value = false;
  }
};
</script>
