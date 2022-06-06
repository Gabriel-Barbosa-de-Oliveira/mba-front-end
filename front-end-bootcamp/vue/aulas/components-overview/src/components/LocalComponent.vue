<template>
  <h1>Local Component</h1>
  <h2>{{title}}</h2>
</template>
<script>
export default {
  // props: ["title"]
  props: {
    title: String
  }
};
</script>
