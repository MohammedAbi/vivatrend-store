// Import Vitest testing utilities and type for mocking functions
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

// Import the API config and the function under test
import { API_CONFIG, apiRequest } from "../../api";
import { authService } from "../../auth/authService";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../../auth/types";

// Mock the apiRequest function globally
vi.mock("../../api"); // Mock the entire apiRequest module

describe("authService", () => {
  // Reset mocks before each test to avoid state bleed between tests
  beforeEach(() => {
    vi.resetAllMocks(); // Clear mocks to ensure no state is carried over
  });

  describe("register", () => {
    it("throws error for non-@stud.noroff.no email", async () => {
      const user: RegisterData = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      };
      await expect(authService.register(user)).rejects.toThrow(
        "Email must be a @stud.noroff.no address"
      );
    });

    it("throws error for password shorter than 8 characters", async () => {
      const user: RegisterData = {
        email: "user@stud.noroff.no",
        password: "short",
        name: "Test User",
      };
      await expect(authService.register(user)).rejects.toThrow(
        "Password must be at least 8 characters"
      );
    });

    it("calls apiRequest with correct data", async () => {
      const user: RegisterData = {
        email: "user@stud.noroff.no",
        password: "securepass123",
        name: "Test User",
      };

      // Create a mock for the apiRequest call
      const mockApiRequest = apiRequest as Mock;
      mockApiRequest.mockResolvedValue(undefined); // Simulate successful API response

      await authService.register(user);

      expect(mockApiRequest).toHaveBeenCalledWith(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(user),
        })
      );
    });
  });

  describe("login", () => {
    it("calls apiRequest and returns response", async () => {
      const credentials: LoginCredentials = {
        email: "user@stud.noroff.no",
        password: "securepass123",
      };
      const mockResponse: AuthResponse = {
        data: {
          accessToken: "abc123",
          name: "Test User",
          email: credentials.email,
        },
        meta: {},
      };

      // Create a mock for the apiRequest call
      const mockApiRequest = apiRequest as Mock;
      mockApiRequest.mockResolvedValue(mockResponse); // Simulate successful login response

      const result = await authService.login(credentials);

      expect(mockApiRequest).toHaveBeenCalledWith(
        expect.stringContaining(API_CONFIG.ENDPOINTS.AUTH.LOGIN),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(credentials),
        })
      );

      expect(result).toEqual(mockResponse);
    });
  });
});
