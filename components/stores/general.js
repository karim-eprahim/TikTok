import { defineStore } from "pinia";
import axios from "~/plugins/axios";
import { useUserStore } from "./user";
const $axios = axios().provide.axios

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
    bodySwitch(val){
      if(val){
        document.body.style.overflow = 'hidden'
        return
      }
      document.body.style.overflow = 'visible'
    },

    allLowerCaseCaps(str){
      return str.split(' ').join("").toLowerCase()
    },

    async hasSessionExpired(){
      await $axios.interceptors.response.use((response)=>{
        return response
      }),(error)=>{
        switch(error.response.status){
          case 401: // Not logged in 
          case 419: // Session expired
          case 503: // Down for maintenance
            // bounce the user to the login screen with a redirect back
            useUserStore().resetUser()
            window.location.href = '/';
            break;
          case 500:
            alert('Oops, something went wrong! The team has been notified.')
            break
          default:
            return Promise.reject(error);
        }
      }
    },

    updateSideMenuImage(array,user){
      for(let i = 0 ; i < array.length ; i++){
        const res = array[i]
        if(res.id == user.id){
          res.image = user.image
        }
      }
    }
  },
  persist:true
});
