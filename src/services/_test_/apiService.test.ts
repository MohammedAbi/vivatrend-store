import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiRequest } from "../apiService";
import { API_CONFIG } from "../api";

// Reset all mocks before each test so tests are clean
beforeEach(() => {
  vi.restoreAllMocks();
});

describe("apiRequest", () => {
  it("returns data when request is successful", async () => {
    const mockData = { success: true };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await apiRequest("/success");
    expect(result).toEqual(mockData);
  });

  it("throws API error from error JSON", async () => {
    const errorJson = {
      errors: [{ message: "Invalid request" }],
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve(errorJson),
      })
    );

    await expect(apiRequest("/error")).rejects.toThrow("Invalid request");
  });

  it("throws fallback error if error JSON can't be parsed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error("Broken JSON")),
      })
    );

    await expect(apiRequest("/broken")).rejects.toThrow(
      "Request failed with status 500"
    );
  });

  it("throws if fetch itself fails (like no internet)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error"))
    );

    await expect(apiRequest("/fail")).rejects.toThrow(
      "API request failed: Network error"
    );
  });

  it("merges default and custom headers correctly", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    vi.stubGlobal("fetch", mockFetch);

    await apiRequest("/custom", {
      headers: { Authorization: "Bearer 123" },
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          ...API_CONFIG.DEFAULT_HEADERS,
          Authorization: "Bearer 123",
        }),
      })
    );
  });
});
