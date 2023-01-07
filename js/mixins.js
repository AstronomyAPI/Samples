import { store } from "./store.js";

export default {
  methods: {
    checkAuth() {
      console.log("checkAuth");
      if (!store.credentialsValid) {
        console.log("redirect");
        this.$router.replace({ name: "home" });
      }
    }
  }
};
