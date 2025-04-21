import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  UserProfile,
} from "../services/auth/types";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize with null and handle parsing in the hook itself
  const [user, setUser, removeUser] = useLocalStorage<UserProfile | null>(
    "user",
    null
  );
  const [token, setToken, removeToken] = useLocalStorage<string | null>(
    "token",
    null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthSuccess = useCallback(
    (response: AuthResponse) => {
      const { accessToken, ...userData } = response.data;

      setToken(accessToken);
      setUser(userData);
      setError(null);
    },
    [setToken, setUser]
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.login(credentials);
        handleAuthSuccess(response);
        navigate("/");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
        throw err; // Re-throw to allow component-level handling
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthSuccess, navigate]
  );

  const register = useCallback(
    async (userData: RegisterData) => {
      setIsLoading(true);
      setError(null);
      try {
        await authService.register(userData);

        navigate("/login");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Registration failed";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    removeToken();
    removeUser();
    navigate("/login");
  }, [navigate, removeToken, removeUser]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
