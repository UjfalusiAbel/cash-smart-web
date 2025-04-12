import { createContext, useEffect, useState } from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  Identifier?: string;
}
import { apiURL } from "../constants/Constants";

export const AuthContext = createContext({
  isAuthenticated: false,
  userToken: null as string | null,
  userInfo: {},
  login: async (email: string, password: string) => {},
  register: async (email: string, password: string, displayName: string) => {},
  logout: () => {},
  getUserId: () => null as unknown as string | false | undefined,
});

import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<CustomJwtPayload | {}>({});

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
      setIsAuthenticated(true);
      decodeToken(token);
    }
  }, []);

  const getUserId = () => {
    if (!userToken) return false;
    try {
      const decoded = userToken ? jwtDecode<CustomJwtPayload>(userToken) : null;
      return decoded?.Identifier;
    } catch (error) {
      console.error("Error decoding token!", error);
      return false;
    }
  };

  const isTokenExpired = (token: string) => {
    try {
      const decoded = token ? jwtDecode(token) : null;
      const currentTime = Date.now() / 1000;
      return decoded && decoded.exp !== undefined && decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token!", error);
      return true;
    }
  };

  const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      setUserInfo(decoded);
    } catch (error) {
      console.log("Error decoding token ", error);
    }
  };

  const handleValidToken = (token: string) => {
    setUserToken(token);
    setIsAuthenticated(true);
    decodeToken(token);
  };

  const startTokenExpirationCheck = () => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("userToken");
      if (token && isTokenExpired(token)) {
        console.log("Login expired!");
        clearInterval(interval);
        logout();
      }
    }, 0.5 * 60 * 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (userToken) {
      const clearExpirationCheck = startTokenExpirationCheck();
      return () => clearExpirationCheck();
    }
  }, [userToken]);

  const login = async (email: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append("Email", email);
      formData.append("Password", password);

      const response = await fetch(`${apiURL}/user/login`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("userToken", token);
        handleValidToken(token);
        console.info("Successful login!");
      } else {
        console.error("Login failed!");
        if (response.status === 404) {
          throw new Error("User does not exist!");
        }
        if (response.status === 401) {
          throw new Error("Invalid credentials!");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("Email", email);
      formData.append("Password", password);
      formData.append("UserName", displayName);

      const response = await fetch(`${apiURL}/user/register`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("userToken", token);
        handleValidToken(token);
        console.info("Successful register!");
      } else {
        if (response.status === 409) {
          throw new Error("User already exists with this email!");
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserToken(null);
    setUserInfo({});
    localStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userToken,
        userInfo,
        login,
        register,
        logout,
        getUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
