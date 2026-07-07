export const ADMIN_SESSION_COOKIE = "jeonjang_admin_session";

// ADMIN_PASSWORD 없이도 데모를 체험할 수 있도록 하는 기본 비밀번호.
// 운영 배포 시에는 반드시 ADMIN_PASSWORD 환경변수를 설정해야 한다.
const DEMO_ADMIN_PASSWORD = "admin1234";

function getEffectiveAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEMO_ADMIN_PASSWORD;
}

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** 비밀번호 기반 세션 토큰. 비밀번호가 바뀌면 기존 세션도 자동 만료된다. */
export async function createAdminSessionToken(): Promise<string> {
  return sha256Hex(getEffectiveAdminPassword());
}

export function verifyAdminPassword(input: string): boolean {
  return input === getEffectiveAdminPassword();
}
