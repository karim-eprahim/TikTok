import { useUserStore } from "~/components/stores/user";
import { useProfileStore } from "~/components/stores/profile";
import { useGeneralStore } from "~/components/stores/general";

export default defineNuxtPlugin((NuxtApp)=>{
    return {
        provide:{
            userStore: useUserStore(),
            profileStore: useProfileStore(),
            generalStore: useGeneralStore()
        }
    }
})

