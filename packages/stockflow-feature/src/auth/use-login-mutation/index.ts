import { useMutation } from "@tanstack/react-query";
import { createApiClient } from "stockflow-helpers";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  email: string;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  user: LoginUser;
}

const apiClient = createApiClient();

async function login(body: LoginRequest): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>("/auth/login", body);
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
  });
}
