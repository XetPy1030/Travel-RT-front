import { useNuxtApp } from "#imports";

export function useModerationApi() {
  const { $moderationApi } = useNuxtApp() as {
    $moderationApi: { auth: import("@/api/generated-moderation").AuthApi; moderation: import("@/api/generated-moderation").ModerationApi };
  };
  return $moderationApi;
}
