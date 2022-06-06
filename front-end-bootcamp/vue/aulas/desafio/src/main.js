import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue'
import AlbumList from "./components/AlbumList";
import AlbumDetail from "./components/AlbumDetail";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: AlbumList },
    { path: "/album/:id", name: "album", component: AlbumDetail }
  ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');