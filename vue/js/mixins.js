import { store } from "./store.js";
import { HTTPSnippet } from "httpsnippet";
import { buildSnippetData } from "./utils/snippet.js";

export default {
  methods: {
    checkAuth() {
      if (!store.credentialsValid) {
        this.$router.replace({ name: "home" });
      }
    },
    setSnippetData(method, url, data, headers) {
      store.snippet = buildSnippetData(method, url, data, headers);

      this.generateSnippet();
    },
    generateSnippet() {
      const snippet = new HTTPSnippet(store.snippet);
      store.request = snippet.convert(store.language);
    },
    resetCodeView() {
      store.request = "";
      store.response = "";
    },
  },
};
