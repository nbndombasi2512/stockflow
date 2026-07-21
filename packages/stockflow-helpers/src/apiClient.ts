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

function formatErrorMessage(
  status: number,
  body: ApiErrorBody | undefined,
): string {
  if (body?.message === undefined) {
    return `Request failed: ${status}`;
  }

  if (Array.isArray(body.message)) {
    return body.message.join("; ");
  }

  return body.message;
}

async function parseErrorBody(
  response: Response,
): Promise<ApiErrorBody | undefined> {
  try {
    return (await response.json()) as ApiErrorBody;
  } catch {
    return undefined;
  }
}

/**
 * Minimal typed fetch wrapper. Centralizes base URL, JSON handling, and error
 * normalization so feature code can stay focused on data shapes.
 */
export function createApiClient(options: ApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? "/api";

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { "Content-Type": "application/json", ...init?.headers },
      ...init,
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
  }

  return {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) =>
      request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  };
}
