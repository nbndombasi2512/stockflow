import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, theme } from "stockflow-component";
import {
  AuthProvider,
  HomeScreen,
  LoginPage,
  ProtectedRoute,
  SignupPage,
} from "stockflow-feature";
import { ThemeProvider } from "styled-components";

export function App() {
  const [queryClient] = useState(() => new QueryClient()); // new QueryClient() is a function that creates a new QueryClient instance.
  // saves it in the state, and reuses it for the same one on every re-render. 
  // This is a best practice to avoid creating a new queryClient on every re-render.

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomeScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
