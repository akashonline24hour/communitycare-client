// Only allow in-site paths, so ?redirect= can't send users to another website
export function safeRedirect(raw) {
  if (
    !raw ||
    !raw.startsWith("/") ||
    raw.startsWith("//") ||
    raw.startsWith("/\\") ||
    raw.startsWith("/login") ||
    raw.startsWith("/register")
  ) {
    return "/";
  }
  return raw;
}

// Adds query parameters to a path: withParams("/events", { social: "google" })
export function withParams(path, params) {
  const url = new URL(path, "http://local");
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value),
  );
  return url.pathname + url.search;
}
