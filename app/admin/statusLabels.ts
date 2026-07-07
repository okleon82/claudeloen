import { ReservationStatus } from "@/lib/types";

export const STATUS_LABEL: Record<ReservationStatus, string> = {
  pending: "대기중",
  confirmed: "확정",
  rejected: "거절됨",
  cancelled: "취소됨",
  no_show: "노쇼",
};

export const STATUS_BADGE_CLASS: Record<ReservationStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-200 text-gray-600",
  no_show: "bg-gray-800 text-white",
};

export function todayStr(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
