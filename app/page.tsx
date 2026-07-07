import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-medium text-brand-gray">점장AI</p>
        <h1 className="text-2xl font-bold leading-snug">
          전화 받기 힘든 사장님을 위한
          <br />
          AI 예약비서
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/reserve"
          className="w-full rounded-xl bg-brand-black py-4 text-center text-base font-semibold text-white active:opacity-80"
        >
          예약하기
        </Link>
        <Link
          href="/faq"
          className="w-full rounded-xl border border-gray-300 bg-white py-4 text-center text-base font-semibold text-brand-black active:bg-brand-light"
        >
          FAQ 문의
        </Link>
        <Link
          href="/admin"
          className="w-full rounded-xl py-4 text-center text-sm font-medium text-brand-gray active:bg-brand-light"
        >
          관리자
        </Link>
      </div>
    </main>
  );
}
