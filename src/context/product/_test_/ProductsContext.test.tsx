import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductsProvider, useProducts, Product } from "../ProductsContext";
import * as apiModule from "../../../services/api";

// 📦 Mock the API so we can control what it returns
vi.mock("../../../services/api", async () => {
  const actual = await vi.importActual<typeof apiModule>(
    "../../../services/api"
  );
  return {
    ...actual,
    apiRequest: vi.fn(), // Replace real API call with a fake one
  };
});

const fakeApi = apiModule.apiRequest as ReturnType<typeof vi.fn>;

// ✅ Helper: wraps your hook with the ProductsProvider
const withProvider = ({ children }: { children: React.ReactNode }) => (
  <ProductsProvider>{children}</ProductsProvider>
);

describe("ProductsProvider", () => {
  // 🧼 Reset mocks before every test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads products and updates state", async () => {
    // 🧪 Make fake product data
    const testProducts: Product[] = [
      {
        id: "1",
        title: "Cool Shirt",
        description: "A nice shirt",
        price: 30,
        discountedPrice: 25,
        image: { url: "shirt.jpg", alt: "shirt" },
        rating: 4,
        tags: ["shirt", "fashion"],
        reviews: [],
      },
    ];

    // 📦 Tell the mock API to return the fake products
    fakeApi.mockResolvedValueOnce({ data: testProducts });

    // 🧪 Run the hook inside the provider
    const { result } = renderHook(() => useProducts(), {
      wrapper: withProvider,
    });

    // ⏳ Wait until loading finishes
    await waitFor(() => expect(result.current.loading).toBe(false));

    // ✅ Check that products are set and no error
    expect(result.current.products).toEqual(testProducts);
    expect(result.current.error).toBeNull();
  });

  it("shows error when API call fails", async () => {
    // ❌ Simulate API error
    fakeApi.mockRejectedValueOnce(new Error("Network Error"));

    // 🧪 Run the hook inside the provider
    const { result } = renderHook(() => useProducts(), {
      wrapper: withProvider,
    });

    // ⏳ Wait until loading finishes
    await waitFor(() => expect(result.current.loading).toBe(false));

    // ❌ Should not have products, should show error
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(
      "Failed to load products. Please try again later."
    );
  });

  it("throws error if used without provider", () => {
    // 🚨 Try using hook without the provider
    const callHookWithoutProvider = () => renderHook(() => useProducts());

    // ✅ Should throw a clear error message
    expect(callHookWithoutProvider).toThrowError(
      "useProducts must be used within a ProductsProvider"
    );
  });
});
