import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// 브라우저(클라이언트 컴포넌트)에서 사용하는 Supabase 클라이언트.
// anon key만 사용하며, RLS로 직접 읽기/쓰기는 막혀 있다.
// 실제 데이터 조회/변경은 항상 /api 라우트를 통해 이루어진다.
export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase 환경변수(NEXT_PUBLIC_SUPABASE_URL/ANON_KEY)가 설정되지 않았습니다.");
  }

  return createClient<Database>(url, anonKey);
}
