import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import Products from "../Products";
import { MemoryRouter } from "react-router-dom";
import { Product } from "../types";

// -------------------
// Mock SpinnerDotted
// -------------------
vi.mock("spinners-react", () => ({
  SpinnerDotted: () => <div role="status">Loading...</div>,
}));

// -------------------------------------
// Mock SidebarFilter with proper types
// -------------------------------------
interface SidebarFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

vi.mock("../../../components/ui/SidebarFilter", () => ({
  default: ({
    availableTags,
    selectedTags,
    onTagToggle,
  }: SidebarFilterProps) => (
    <div>
      {availableTags.map((tag) => (
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

// ----------------------------------
// Mock SearchBar with proper types
// ----------------------------------
interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

vi.mock("../../../components/ui/SearchBar", () => ({
  default: ({ searchQuery, onSearchChange }: SearchBarProps) => (
    <input
      data-testid="search-input"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  ),
}));

// ---------------------------------
// Mock ProductsGrid with types
// ---------------------------------
interface ProductsGridProps {
  products: Product[];
}

vi.mock("../ProductsGrid", () => ({
  default: ({ products }: ProductsGridProps) => (
    <div data-testid="products-grid">
      {products.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  ),
}));

// ----------------------
// Mock useProducts hook
// ----------------------
const mockUseProducts = vi.fn();

vi.mock("../../../context/product/ProductsContext", () => ({
  useProducts: () => mockUseProducts(),
}));

// ------------------
// Product fixture
// ------------------
const productFixture: Product = {
  id: "1",
  title: "Cool Shirt",
  price: 29.99,
  discountedPrice: 24.99,
  description: "A very cool shirt",
  image: { url: "cool-shirt.jpg", alt: "A cool shirt" },
  tags: ["fashion", "shirt"],
  reviews: [],
  rating: 4.5,
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

    fireEvent.change(screen.getByTestId("search-input") as HTMLInputElement, {
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

    const fashionButton = screen.getByTestId("tag-button-fashion");
    fireEvent.click(fashionButton);

    expect(screen.getByText("Cool Shirt")).toBeInTheDocument();
    expect(screen.getByTestId("selected-tags")).toHaveTextContent("fashion");

    fireEvent.click(fashionButton);

    expect(screen.getByText("Cool Shirt")).toBeInTheDocument();
    expect(screen.getByTestId("selected-tags")).toHaveTextContent("");
  });
});
