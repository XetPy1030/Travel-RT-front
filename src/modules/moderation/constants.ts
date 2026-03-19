/** Ключ в localStorage для JWT модератора */
export const MODERATION_TOKEN_STORAGE_KEY = "travel_rt_moderation_token";

/** Коды тем с бэка → подпись для UI */
export const TOPIC_LABELS: Record<string, string> = {
  ecology: "Экология",
  culture: "Культура",
  society: "Общество",
};

export function getTopicLabel(code: string | null | undefined): string {
  if (code == null || code === "") return "";
  return TOPIC_LABELS[code] ?? code;
}

/** Статусы модерации с бэка → подпись для UI */
export const MODERATION_STATUS_LABELS: Record<string, string> = {
  pending: "На модерации",
  approved: "Одобрено",
  rejected: "Отклонено",
  moderation_pending: "На модерации",
  moderation_approved: "Одобрено",
  moderation_rejected: "Отклонено",
};

export function getModerationStatusLabel(code: string | null | undefined): string {
  if (code == null || code === "") return "";
  return MODERATION_STATUS_LABELS[code] ?? code;
}
