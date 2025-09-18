import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    id:'',
    name:'',
    bio:'',
    image:'',
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
