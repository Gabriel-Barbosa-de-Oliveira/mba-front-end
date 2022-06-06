<template>
  <div>
    <button @click="back" class="btn-voltar">Voltar</button>
    <loader v-if="isLoading" />
    <div v-if="info">
      <div class="div-row">
        <h1>FOTOS</h1>
          
      </div>
      <div class="div-images">
        <div v-for="(value, key, index) in info" :key="index">
          <img :src="value.thumbnailUrl" />
          <h1>{{value.title}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getAlbum, getPhotos } from "../service/album-service.js";
import Loader from "./Loader";

export default {
  components: {
    Loader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const info = ref(null);
    const isLoading = ref(false);

    onMounted(() => {
      isLoading.value = true;
      getPhotos(route.params.id)
        .then((resp) => {
          info.value = resp;
          console.log(resp);
        })
        .finally(() => {
          isLoading.value = false;
        });
    });

    const back = () => router.replace("/");

    const image = "";
    // const image = computed(() => getPokemonImageUrl(info.value.id));

    return { info, isLoading, image, back };
  },
};
</script>

<style scoped>
.div-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.btn-voltar {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 27px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
}
.div-images {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
