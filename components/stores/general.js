import { defineStore } from "pinia";
export const useGeneralStore = defineStore("general", {
  state: () => ({
    isLoginOpen:false,
    isEditProfileOpen:false,
    selectedPost:null,
    ids:null,
    isBackUrl:"/",
    posts:null,
    suggested:null,
    following:null,
  }),
  getters: {
  },
  actions: {
    // increment() {
    //   this.count++;
    // },
  },
  persist:true
});
