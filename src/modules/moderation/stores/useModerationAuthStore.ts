import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { MODERATION_TOKEN_STORAGE_KEY } from "@moderation/constants";

export const useModerationAuthStore = defineStore("moderationAuth", () => {
  const token = ref<string>("");

  function initFromStorage() {
    if (import.meta.server || typeof window === "undefined") return;
    token.value = localStorage.getItem(MODERATION_TOKEN_STORAGE_KEY) ?? "";
  }

  function setToken(accessToken: string) {
    token.value = accessToken;
    if (typeof window !== "undefined") {
      localStorage.setItem(MODERATION_TOKEN_STORAGE_KEY, accessToken);
    }
  }

  function clearToken() {
    token.value = "";
    if (typeof window !== "undefined") {
      localStorage.removeItem(MODERATION_TOKEN_STORAGE_KEY);
    }
  }

  const isAuthenticated = computed(() => !!token.value);

  return {
    token,
    isAuthenticated,
    initFromStorage,
    setToken,
    clearToken,
  };
});
