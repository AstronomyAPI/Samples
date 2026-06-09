import { describe, expect, it, vi } from "vitest";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

import axios from "axios";
import { verifyCredentials } from "./credentials.js";

describe("verifyCredentials", () => {
  it("calls credentials endpoint with auth headers", () => {
    verifyCredentials("https://api.astronomyapi.com", "app-id", "secret");

    expect(axios.get).toHaveBeenCalledWith("https://api.astronomyapi.com/api/v2/bodies", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Basic YXBwLWlkOnNlY3JldA==",
      },
    });
  });
});
