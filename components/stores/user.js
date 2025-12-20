import { defineStore } from "pinia";
import axios from "~/plugins/axios";
import { useGeneralStore } from "./general";
const $axios = axios().provide.axios

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
    async getTokens(){
      await $axios.get("/sanctum/csrf-cookie");
    },
    async login(email,password){
      await $axios.post("/login", {
        email: email,
        password: password,
      }).then(res => {
        console.log(res);
      });
    },
    async register(name,email,password,confirmPassword){
      await $axios.post("/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
    },
    async getUser(){
      let res = await $axios.get("/api/logged-in-user");
      this.$state.id = res.data[0].id
      this.$state.name = res.data[0].name
      this.$state.bio = res.data[0].bio
      this.$state.image = res.data[0].image
    },

    async updateUserImage(data){
      return await $axios.post('/api/update-user-image',data)
    },

    async updateUser(name,bio){
      return await $axios.patch('/api/update-user',{
        name:name,
        bio:bio
      })
    },

    async createPost(data){
      return await $axios.post('/api/posts',data)
    },

    async likePost(post,isPostPage){
      let res = await $axios.post('/api/likes',{
        post_id:post.id
      })
      console.log(res)
      let singlePost = null
      if(isPostPage){
        singlePost = post
      }else{
        singlePost = useGeneralStore().posts.find(p=>p.id === post.id)
      }
      console.log(singlePost)
      singlePost.likes.push(res.data.like)
    },

    async logout(){
      await $axios.post("/logout");
      this.resetUser()
    },
    resetUser(){
      this.$state.id = ''
      this.$state.name = ''
      this.$state.email = ''
      this.$state.bio = ''
      this.$state.image = ''
    }
  },
  persist:true
});
