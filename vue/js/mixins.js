import { store } from "./store.js";
import HTTPSnippet from 'httpsnippet';

function objectToArray(dataObject) {
  return Object.keys(dataObject).filter(key => {
    return key != 'X-Requested-With'
  })
    .map(key => {
      return {
        name: key,
        value: dataObject[key] ? dataObject[key].toString() : ''
      }
    })
}

export default {
  methods: {
    checkAuth() {
      console.log("checkAuth");
      if (!store.credentialsValid) {
        console.log("redirect");
        this.$router.replace({ name: "home" });
      }
    },
    setSnippetData(method,
      url,
      data,
      headers) {
      store.snippet = {
        method,
        url,
        queryString: method == 'GET' ? objectToArray(data) : undefined,
        postData: method == 'POST' ? { text: JSON.stringify(data) } : undefined,
        headers: objectToArray(headers)
      }

      this.generateSnippet()
    },
    generateSnippet() {
      const snippet = new HTTPSnippet(store.snippet);
      store.request = snippet.convert(store.language)
    },
    resetCodeView() {
      store.request = ''
      store.response = ''
    }
  }
};
