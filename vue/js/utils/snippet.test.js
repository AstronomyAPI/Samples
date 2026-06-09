import { describe, expect, it } from "vitest";
import { buildSnippetData, objectToArray } from "./snippet.js";

describe("objectToArray", () => {
  it("removes X-Requested-With and stringifies values", () => {
    const result = objectToArray({
      "X-Requested-With": "XMLHttpRequest",
      Authorization: 123,
      Empty: null,
    });

    expect(result).toEqual([
      { name: "Authorization", value: "123" },
      { name: "Empty", value: "" },
    ]);
  });
});

describe("buildSnippetData", () => {
  it("builds GET snippet payload", () => {
    const result = buildSnippetData(
      "GET",
      "https://example.com",
      { term: "polaris" },
      { Authorization: "Basic abc" },
    );

    expect(result.queryString).toEqual([{ name: "term", value: "polaris" }]);
    expect(result.postData).toBeUndefined();
    expect(result.headers).toEqual([{ name: "Authorization", value: "Basic abc" }]);
  });

  it("builds POST snippet payload", () => {
    const payload = { style: "default" };
    const result = buildSnippetData(
      "POST",
      "https://example.com",
      payload,
      { Authorization: "Basic abc" },
    );

    expect(result.queryString).toBeUndefined();
    expect(result.postData).toEqual({ text: JSON.stringify(payload) });
  });
});
