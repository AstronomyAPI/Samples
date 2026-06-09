import { store } from "../store.js";

const XML_HTTP_REQUEST_HEADER = "XMLHttpRequest";

function encodeBase64(value) {
  if (typeof btoa === "function") {
    return btoa(value);
  }

  return Buffer.from(value).toString("base64");
}

export function createAuthHeaderValue(appId = store.appId, appSecret = store.appSecret) {
  return `Basic ${encodeBase64(`${appId}:${appSecret}`)}`;
}

export function getAuthHeaders(appId = store.appId, appSecret = store.appSecret) {
  return {
    "X-Requested-With": XML_HTTP_REQUEST_HEADER,
    Authorization: createAuthHeaderValue(appId, appSecret),
  };
}

export function setFormattedResponse(data) {
  store.response = JSON.stringify(data, null, 2);
}
