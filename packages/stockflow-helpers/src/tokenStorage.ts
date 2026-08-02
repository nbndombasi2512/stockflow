const ACCESS_TOKEN_KEY = "stockflow.accessToken";
const USER_KEY = "stockflow.user";

export interface AuthUser {
  id: string;
  email: string;
  createdAt: string;
}

export const getToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const clearToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

/**
 * Reads the persisted authenticated user, returning null when absent or stored
 * in an unexpected shape.
 *
 * @example
 * const user = getUser(); // { id: "1", email: "a@b.com", createdAt: "..." }
 */
export const getUser = (): AuthUser | null => {
  const stored = localStorage.getItem(USER_KEY);

  if (stored === null) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<AuthUser>;
    const hasRequiredFields =
      typeof parsed.id === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.createdAt === "string";

    if (!hasRequiredFields) {
      return null;
    }

    return parsed as AuthUser;
  } catch {
    return null;
  }
};

/**
 * Persists the authenticated user so auth state survives a page reload.
 *
 * @example
 * setUser({ id: "1", email: "a@b.com", createdAt: "2026-07-16T12:00:00.000Z" });
 */
export const setUser = (user: AuthUser): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Removes the persisted authenticated user.
 *
 * @example
 * clearUser();
 */
export const clearUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Clears every persisted auth value (token and user) in one call, used on logout.
 *
 * @example
 * clearAuth();
 */
export const clearAuth = (): void => {
  clearToken();
  clearUser();
};
