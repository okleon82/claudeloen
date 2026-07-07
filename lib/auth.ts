export const ADMIN_SESSION_COOKIE = "jeonjang_admin_session";

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** ADMIN_PASSWORD 기반 세션 토큰. 비밀번호가 바뀌면 기존 세션도 자동 만료된다. */
export async function createAdminSessionToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return sha256Hex(password);
}

export function verifyAdminPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password) && input === password;
}
