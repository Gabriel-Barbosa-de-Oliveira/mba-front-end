<template>
  <div>
    <h1>Album Photos</h1>
    <loader v-if="isLoading" />
    <div
      class="div-album"
      v-for="(item, index) in list"
      :key="index"
      @click="selectAlbum(item.id)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import { getAlbum, getPhotos } from "../service/album-service.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Loader from "./Loader";

export default {
  components: {
    Loader,
  },
  setup() {
    const list = ref([]);
    const router = useRouter();
    const isLoading = ref(false);

    onMounted(() => {
      isLoading.value = true;
      getAlbum(1)
        .then((resp) => {
          list.value = resp;
        })
        .finally(() => {
          isLoading.value = false;
        });
    });

    const selectAlbum = (id) =>
      router.push({ name: "album", params: { id } });

    return { list, isLoading, getAlbum, getPhotos, selectAlbum };
  },
};
</script>

<style scoped>
.div-album {
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 0.2rem;
  margin: 0.5rem;
  padding: 16px;
  cursor: pointer;
}
</style>
