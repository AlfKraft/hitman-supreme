/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";
// Plugins
import { registerPlugins } from '@/plugins'
import Datepicker from '@vuepic/vue-datepicker';
const app = createApp(App)
app.use(VueAxios,axios)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Datepicker', Datepicker)
import '@vuepic/vue-datepicker/dist/main.css'
app.provide('axios', app.config.globalProperties.axios)

if (localStorage.getItem("token")){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token")
}

registerPlugins(app)

app.mount('#app')

