import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import Products from "../Products";
import { MemoryRouter } from "react-router-dom";

// Mock SpinnerDotted to avoid real import issues
vi.mock("spinners-react", () => ({
  SpinnerDotted: () => <div role="status">Loading...</div>,
}));

// Mock SidebarFilter and SearchBar with test ids
vi.mock("../../../components/ui/SidebarFilter", () => ({
  default: ({ availableTags, selectedTags, onTagToggle }: any) => (
    <div>
      {availableTags.map((tag: string) => (
        <button
          key={tag}
          data-testid={`tag-button-${tag}`}
          onClick={() => onTagToggle(tag)}
        >
          {tag}
        </button>
      ))}
      <div data-testid="selected-tags">{selectedTags.join(",")}</div>
    </div>
  ),
}));

vi.mock("../../../components/ui/SearchBar", () => ({
  default: ({ searchQuery, onSearchChange }: any) => (
    <input
      data-testid="search-input"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  ),
}));

// Mock ProductsGrid
vi.mock("../ProductsGrid", () => ({
  default: ({ products }: any) => (
    <div data-testid="products-grid">
      {products.map((p: any) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  ),
}));

// Mock useProducts hook
const mockUseProducts = vi.fn();
vi.mock("../../../context/product/ProductsContext", () => ({
  useProducts: () => mockUseProducts(),
}));

// Product fixture
const productFixture = {
  id: "1",
  title: "Cool Shirt",
  tags: ["fashion", "shirt"],
};

describe("Products", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading spinner", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
    });

    render(<Products />, { wrapper: MemoryRouter });

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error message", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      loading: false,
      error: "Failed to load",
    });

    render(<Products />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      /error loading products/i
    );
  });

  it("renders filtered products and filters by search", () => {
    mockUseProducts.mockReturnValue({
      products: [productFixture],
      loading: false,
      error: null,
    });

    render(<Products />, { wrapper: MemoryRouter });

    expect(screen.getByText("Cool Shirt")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "non-matching" },
    });

    expect(screen.getByTestId("no-products")).toBeInTheDocument();
  });

  it("filters products by selected tag", () => {
    mockUseProducts.mockReturnValue({
      products: [productFixture],
      loading: false,
      error: null,
    });

    render(<Products />, { wrapper: MemoryRouter });

    // Click the tag filter button
    const fashionButton = screen.getByTestId("tag-button-fashion");
    fireEvent.click(fashionButton);

    expect(screen.getByText("Cool Shirt")).toBeInTheDocument();

    // Check that "fashion" is shown as selected
    expect(screen.getByTestId("selected-tags")).toHaveTextContent("fashion");

    // Unselect the tag
    fireEvent.click(fashionButton);

    expect(screen.getByText("Cool Shirt")).toBeInTheDocument();
    expect(screen.getByTestId("selected-tags")).toHaveTextContent("");
  });
});
