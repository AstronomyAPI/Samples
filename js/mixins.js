import { store } from "./store.js";

export default {
  methods: {
    checkAuth() {
      console.log("checkAuth");
      if (!store.appId || !store.appSecret) {
        console.log("redirect");
        this.$router.replace({ name: "home" });
      }
    }
  }
};
