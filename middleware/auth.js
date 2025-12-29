import { useUserStore } from "~/components/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  if(to != '/' && !userStore.id){
    return navigateTo('/')
  }
});