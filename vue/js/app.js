import Routes from "./routes.js";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";

const router = createRouter({
  history: createWebHistory(),
  routes: Routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");
