import { createApp } from 'vue'
import App from './App.vue'
import GlobalComponent from "./components/GlobalComponent";

const app = createApp(App);
app.component("GlobalComponent", GlobalComponent)
app.mount('#app')
