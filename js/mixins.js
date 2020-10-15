import Config from "./config.json";

export default {
  methods: {
    _callApi(endpoint, params) {
      return axios.get(`${Config.apiEndpoint}${endpoint}`, {
        params: params,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Basic ${btoa(`${Config.appId}:${Config.appSecret}`)}`,
        },
      });
    },
  },
};
