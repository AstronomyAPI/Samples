import axios from "axios";
import { getAuthHeaders } from "./api.js";

export function verifyCredentials(apiEndpoint, appId, appSecret) {
  return axios.get(`${apiEndpoint}/api/v2/bodies`, {
    headers: getAuthHeaders(appId, appSecret),
  });
}
