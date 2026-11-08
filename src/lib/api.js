import { authClient } from "@/lib/auth-client";

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export async function apiFetch(
  path,
  { method = "GET", body, auth = false } = {},
) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const { data } = await authClient.token();

    // For debugging
    console.log(data);

    if (!data?.token) {
      const err = new Error("Please log in to continue");
      err.status = 401;
      throw err;
    }
    headers.Authorization = `Bearer ${data.token}`;
  }

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("API error:", method, `${API}${path}`, res.status, json);
    const err = new Error(json.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return json;
}
