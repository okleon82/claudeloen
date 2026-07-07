import "server-only";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// 서버 전용 Supabase 클라이언트 (service role key 사용, RLS 우회).
// API Route Handler / Server Component / Server Action에서만 import 한다.
// 절대 클라이언트 컴포넌트에서 import하면 안 된다.
let adminClient: ReturnType<typeof createClient<Database>> | null = null;

export function createAdminSupabaseClient() {
  if (adminClient) return adminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase 환경변수(NEXT_PUBLIC_SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY)가 설정되지 않았습니다.");
  }

  adminClient = createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false },
  });

  return adminClient;
}
