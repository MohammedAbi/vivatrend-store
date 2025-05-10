import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiRequest } from "../../api";
import { API_CONFIG } from "../../api/config";

// This runs before each test and resets any mocked functions
beforeEach(() => {
  vi.restoreAllMocks();
});

// Group of tests for apiRequest function
describe("apiRequest", () => {
  // Test 1: Should return data if the request is successful
  it("returns data when the response is successful", async () => {
    const fakeResponse = { message: "Success" };

    // Replace the real fetch with a fake one
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(fakeResponse),
      })
    );

    const result = await apiRequest("test");
    expect(result).toEqual(fakeResponse);
  });

  // Test 2: Should throw the error message from the API if it fails
  it("throws error message from JSON if response is not OK", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () =>
          Promise.resolve({
            errors: [{ message: "Invalid request" }],
          }),
      })
    );

    await expect(apiRequest("error")).rejects.toThrow("Invalid request");
  });

  // Test 3: Should throw a default error if it can’t read the JSON error message
  it("throws fallback error if JSON can't be read", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error("Invalid JSON")),
      })
    );

    await expect(apiRequest("broken")).rejects.toThrow(
      "Request failed with status 500"
    );
  });

  // Test 4: Should throw an error if fetch itself fails (e.g., no internet)
  it("throws when fetch completely fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error"))
    );

    await expect(apiRequest("fail")).rejects.toThrow(
      "API request failed: Network error"
    );
  });

  // Test 5: Should correctly merge custom headers with default headers
  it("merges headers correctly", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    vi.stubGlobal("fetch", mockFetch);

    await apiRequest("headers", {
      headers: { "X-Custom": "test" },
    });

    // Check that the correct headers were passed to fetch
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          ...API_CONFIG.DEFAULT_HEADERS,
          "X-Custom": "test",
        }),
      })
    );
  });
});
