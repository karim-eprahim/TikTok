<template>
  <div>
    <input
      :id="`input-${placeholder}`"
      :placeholder="placeholder"
      :type="inputType"
      v-model="inputComputed"
      autocomplete="off"
      :maxlength="max"
      class="block w-full bg-[#f1f1f2] text-gray-300 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
    />
  </div>
</template>
<script setup></script>
