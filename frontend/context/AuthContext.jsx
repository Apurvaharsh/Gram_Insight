import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.getMe();
      if (response && response._id) {
        setUser(response);
        setIsAuthenticated(true);
      } else {
        // Invalid token
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.success && response.data) {
        localStorage.setItem("token", response.data.token);
        setUser({
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        });
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message || "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.message || "Login failed. Please try again.",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success && response.data) {
        localStorage.setItem("token", response.data.token);
        setUser({
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        });
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message || "Registration failed" };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.message || "Registration failed. Please try again.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const isOfficer = () => {
    return user?.role === "officer";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
        isAdmin,
        isOfficer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

