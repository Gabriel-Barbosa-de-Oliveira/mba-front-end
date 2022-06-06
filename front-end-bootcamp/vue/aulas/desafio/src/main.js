import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue'
import AlbumList from "./components/AlbumList";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: AlbumList },
    // { path: "/pokemon/:id", name: "pokemon", component: PokemonDetail }
  ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');