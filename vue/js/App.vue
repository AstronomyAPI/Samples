<template>
  <router-view></router-view>
</template>

<script>
import { store } from "./store.js";
import Home from "./components/Home.vue";

export default {
  components: {
    Home: Home,
  },
  data() {
    return {
      store,
    };
  },
};
</script>
