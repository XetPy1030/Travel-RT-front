import { MODERATION_TOKEN_STORAGE_KEY } from "@/modules/moderation/constants";

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;

  const path = to.path;
  const isLogin = path === "/moderation/login";
  const isModeration = path.startsWith("/moderation");

  if (!isModeration) return;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(MODERATION_TOKEN_STORAGE_KEY)
      : null;
  const hasToken = !!token;

  if (isLogin && hasToken) {
    return navigateTo("/moderation/news", { replace: true });
  }

  if (!isLogin && !hasToken) {
    return navigateTo("/moderation/login", { replace: true });
  }
});
