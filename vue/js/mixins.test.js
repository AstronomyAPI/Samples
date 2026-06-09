import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./utils/snippet.js", () => ({
  buildSnippetData: vi.fn(() => ({ method: "GET", headers: [] })),
}));

const convert = vi.fn(() => "converted-snippet");
vi.mock("httpsnippet", () => ({
  HTTPSnippet: vi.fn().mockImplementation(function HTTPSnippetMock() {
    return {
    convert,
    };
  }),
}));

import { buildSnippetData } from "./utils/snippet.js";
import mixins from "./mixins.js";
import { store } from "./store.js";

describe("mixins methods", () => {
  beforeEach(() => {
    store.credentialsValid = false;
    store.request = "";
    store.response = "";
    store.snippet = null;
    vi.clearAllMocks();
  });

  it("redirects to home when credentials are invalid", () => {
    const replace = vi.fn();
    mixins.methods.checkAuth.call({ $router: { replace } });

    expect(replace).toHaveBeenCalledWith({ name: "home" });
  });

  it("does not redirect when credentials are valid", () => {
    const replace = vi.fn();
    store.credentialsValid = true;
    mixins.methods.checkAuth.call({ $router: { replace } });

    expect(replace).not.toHaveBeenCalled();
  });

  it("delegates snippet setup and generates code", () => {
    const context = {
      generateSnippet: mixins.methods.generateSnippet,
    };

    mixins.methods.setSnippetData.call(
      context,
      "GET",
      "https://api.astronomyapi.com/test",
      { term: "polaris" },
      { Authorization: "Basic abc" },
    );

    expect(buildSnippetData).toHaveBeenCalledWith(
      "GET",
      "https://api.astronomyapi.com/test",
      { term: "polaris" },
      { Authorization: "Basic abc" },
    );
    expect(store.request).toBe("converted-snippet");
  });
});
