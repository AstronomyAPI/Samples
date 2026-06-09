<template>
  <router-link to="/">Back to main page</router-link>
</template>

<script>
import mixins from "../mixins.js";

export default {
  mixins: [mixins],
  mounted() {
    this.checkAuth();
    this.resetCodeView();
  },
};
</script>
