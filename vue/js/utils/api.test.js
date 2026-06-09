import { describe, expect, it } from "vitest";
import { createAuthHeaderValue, getAuthHeaders, setFormattedResponse } from "./api.js";
import { store } from "../store.js";

describe("createAuthHeaderValue", () => {
  it("creates a basic auth header from credentials", () => {
    expect(createAuthHeaderValue("app-id", "secret")).toBe("Basic YXBwLWlkOnNlY3JldA==");
  });
});

describe("getAuthHeaders", () => {
  it("returns request headers with authorization", () => {
    expect(getAuthHeaders("app-id", "secret")).toEqual({
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Basic YXBwLWlkOnNlY3JldA==",
    });
  });
});

describe("setFormattedResponse", () => {
  it("stores pretty JSON in shared store response", () => {
    setFormattedResponse({ data: { value: 1 } });
    expect(store.response).toBe('{\n  "data": {\n    "value": 1\n  }\n}');
  });
});
