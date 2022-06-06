<template>
  <global-component></global-component>
  <local-component :title="title"></local-component>
</template>

<script>
import LocalComponent from "./components/LocalComponent.vue";

export default {
  data() {
    return {
      title: "Component Title"
    }
  },
  methods: {},
  components: {
    LocalComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
