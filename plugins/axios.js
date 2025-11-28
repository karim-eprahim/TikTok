import axios from "axios"

export default defineNuxtPlugin((NuxtApp)=>{
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:8000'
    
    // send axios interceptor with each CSRF-token
    axios.interceptors.request.use(
        (config) => {
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];
            
            if (csrfToken) {
                config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
            }
            
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    
    return {
        provide:{
            axios:axios
        }
    }
})

