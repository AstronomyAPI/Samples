export function objectToArray(dataObject) {
  return Object.keys(dataObject)
    .filter((key) => key !== "X-Requested-With")
    .map((key) => ({
      name: key,
      value: dataObject[key] ? dataObject[key].toString() : "",
    }));
}

export function buildSnippetData(method, url, data, headers) {
  return {
    method,
    url,
    queryString: method === "GET" ? objectToArray(data) : undefined,
    postData: method === "POST" ? { text: JSON.stringify(data) } : undefined,
    headers: objectToArray(headers),
  };
}
