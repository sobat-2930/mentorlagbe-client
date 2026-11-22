const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

let cached: { token: string; expires: number } | null = null;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const clearJwt = () => {
  cached = null;
};

// Session cookie diye server theke JWT ney
export async function getJwt(force = false): Promise<string | null> {
  if (!force && cached && cached.expires > Date.now()) return cached.token;
  try {
    const res = await fetch("/api/auth/mentor-jwt", { credentials: "include", cache: "no-store" });
    if (!res.ok) {
      cached = null;
      return null;
    }
    const { token } = await res.json();
    cached = { token, expires: Date.now() + 10 * 60 * 1000 };
    return token as string;
  } catch {
    return null;
  }
}

type Options = { method?: string; body?: unknown };

// Protected API call: Authorization: Bearer <jwt>
export async function api<T = unknown>(path: string, options: Options = {}): Promise<T> {
  const send = async (force: boolean) => {
    const token = await getJwt(force);
    return fetch(`${API}${path}`, {
      method: options.method ?? (options.body !== undefined ? "POST" : "GET"),
      headers: {
        ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  };

  let res = await send(false);
  if (res.status === 401) res = await send(true); // token expire hole notun token niye ekbar retry

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError((data as { message?: string }).message || "Something went wrong", res.status);
  }
  return data as T;
}