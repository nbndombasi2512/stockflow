import { getToken } from "./tokenStorage";

export interface ApiClientOptions {
  baseUrl?: string;
}

export interface ApiErrorBody {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body?: ApiErrorBody,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const formatErrorMessage = (
  status: number,
  body: ApiErrorBody | undefined,
): string => {
  if (body?.message === undefined) {
    return `Request failed: ${status}`;
  }

  if (Array.isArray(body.message)) {
    return body.message.join("; ");
  }

  return body.message;
};

const parseErrorBody = async (
  response: Response,
): Promise<ApiErrorBody | undefined> => {
  try {
    return (await response.json()) as ApiErrorBody;
  } catch {
    return undefined;
  }
};

const buildHeaders = (init?: RequestInit): Headers => {
  const headers = new Headers({ "Content-Type": "application/json" });
  const token = getToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (init?.headers) {
    new Headers(init.headers).forEach((value, key) => {
      headers.set(key, value);
    });
  }

  return headers;
};

/**
 * Minimal typed fetch wrapper. Centralizes base URL, JSON handling, and error
 * normalization so feature code can stay focused on data shapes.
 */
export const createApiClient = (options: ApiClientOptions = {}) => {
  const baseUrl = options.baseUrl ?? "/api";

  const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: buildHeaders(init),
    });

    if (!response.ok) {
      const body = await parseErrorBody(response);
      throw new ApiError(
        response.status,
        formatErrorMessage(response.status, body),
        body,
      );
    }

    return (await response.json()) as T;
  };

  return {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) =>
      request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  };
};
