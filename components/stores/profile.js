import { defineStore } from "pinia";
export const useProfileStore = defineStore("profile", {
  state: () => ({
    id:'',
    name:'',
    bio:'',
    image:'',
    post:null,
    posts:null,
    allLiks:0,
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
