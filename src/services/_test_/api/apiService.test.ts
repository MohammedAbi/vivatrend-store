import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiRequest } from "../../apiService";
import { API_CONFIG } from "../../api";

// Reset all mocks before each test
beforeEach(() => {
  vi.restoreAllMocks();
});

describe("apiRequest", () => {
  // Test 1: Successful response
  it("returns data when response is successful", async () => {
    const fakeData = { message: "Success!" };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(fakeData),
      })
    );

    const result = await apiRequest("/test");
    expect(result).toEqual(fakeData);
  });

  // Test 2: API returns error with JSON message
  it("throws API error message if response is not OK", async () => {
    const errorResponse = {
      errors: [{ message: "Invalid request" }],
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve(errorResponse),
      })
    );

    await expect(apiRequest("/bad")).rejects.toThrow("Invalid request");
  });

  // Test 3: API returns invalid JSON when failing
  it("throws default error if JSON cannot be parsed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error("invalid json")),
      })
    );

    await expect(apiRequest("/broken")).rejects.toThrow(
      "Request failed with status 500"
    );
  });

  // Test 4: Fetch itself fails (e.g. network error)
  it("throws error when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error"))
    );

    await expect(apiRequest("/fail")).rejects.toThrow(
      "API request failed: Network error"
    );
  });

  // Test 5: Correct headers are merged
  it("merges custom headers with default headers", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    vi.stubGlobal("fetch", mockFetch);

    await apiRequest("/headers", {
      headers: {
        "X-Test-Header": "123",
      },
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          ...API_CONFIG.DEFAULT_HEADERS,
          "X-Test-Header": "123",
        }),
      })
    );
  });
});
