import { apiRequest } from "../api";
import { API_CONFIG } from "../api/config";
import type { AuthResponse, LoginCredentials, RegisterData } from "./types";

// Login returns AuthResponse (used to store token)
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await apiRequest<AuthResponse>(
    API_CONFIG.ENDPOINTS.AUTH.LOGIN,
    {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
      },
    }
  );
  return response;
};

// Register only performs registration – returns void
export const register = async (userData: RegisterData): Promise<void> => {
  if (!userData.email.endsWith("@stud.noroff.no")) {
    throw new Error("Email must be a @stud.noroff.no address");
  }

  if (userData.password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  await apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
  });
};

export const authService = {
  login,
  register,
};
