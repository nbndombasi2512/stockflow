import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearAuth,
  getToken,
  getUser,
  setToken,
  setUser,
  type AuthUser,
} from "stockflow-helpers";

/*
  AuthContext is a context that provides the authentication state to the entire application.
  This file creates an authentication system for the React application.
  "In simple words: Who is currently logged in? what is their token? and what should happen when they log in or log out?"

  It uses the useQueryClient hook to clear the query cache when the user logs out.
  It uses the useNavigate hook to navigate to the login page when the user logs out.
  It uses the useState hook to store the authentication state.
  It uses the createContext hook to create the authentication context.
  It uses the useContext hook to access the authentication context.
*/

export interface AuthLoginPayload { 
  accessToken: string; 
  user: AuthUser;
}

export interface AuthContextValue { 
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: AuthLoginPayload) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined); 

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient(); 
  const navigate = useNavigate(); 
  const [token, setTokenState] = useState<string | null>(() => getToken()); 
  const [user, setUserState] = useState<AuthUser | null>(() => getUser());

  const login = ({ accessToken, user: authUser }: AuthLoginPayload) => {
    setToken(accessToken);
    setUser(authUser);
    setTokenState(accessToken);
    setUserState(authUser);
  };

  const logout = () => {
    clearAuth();
    setTokenState(null);
    setUserState(null);
    queryClient.clear();
    navigate("/login", { replace: true });
  };

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
