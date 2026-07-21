import { useMutation } from "@tanstack/react-query";
import { createApiClient } from "stockflow-helpers";

export interface SignupRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  email: string;
  createdAt: string;
}

const apiClient = createApiClient();

async function signup(body: SignupRequest): Promise<SignupResponse> {
  return apiClient.post<SignupResponse>("/auth/signup", body);
}

export function useSignupMutation() {
  return useMutation({
    mutationFn: signup,
  });
}
