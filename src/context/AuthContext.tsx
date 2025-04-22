import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
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
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
      setUser({
        name: userData.name,
        email: userData.email,
        bio: userData.bio || undefined,
        avatar: userData.avatar || undefined,
        banner: userData.banner || undefined,
        venueManager: userData.venueManager || false,
      });
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
        setError(
          err instanceof Error ? err.message : "Login failed, please try again"
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthSuccess, navigate]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      setIsLoading(true);
      setError(null);
      try {
        await authService.register(data);
        navigate("/login");
        // Optional: Add success notification here
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Registration failed, please try again"
        );
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
    // Optional: Add logout notification here
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
