import { reactive } from "vue";

export const store = reactive({
  apiEndpoint: "https://api.astronomyapi.com",
  appId: null,
  appSecret: null
});
