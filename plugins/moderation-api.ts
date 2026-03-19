import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import axios from "axios";
import { Configuration, AuthApi, ModerationApi } from "@/api/generated-moderation";
import { MODERATION_TOKEN_STORAGE_KEY } from "@/modules/moderation/constants";

function clearModerationToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(MODERATION_TOKEN_STORAGE_KEY);
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const basePath =
    (runtimeConfig.public.moderationApiBaseUrl as string) ?? "";

  const authConfig = new Configuration({ basePath });
  const authApi = new AuthApi(authConfig);

  const getAccessToken = (): string => {
    if (import.meta.server || typeof window === "undefined") return "";
    return localStorage.getItem(MODERATION_TOKEN_STORAGE_KEY) ?? "";
  };

  const moderationAxios = axios.create();
  moderationAxios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) {
        clearModerationToken();
        if (typeof window !== "undefined") {
          window.location.href = "/moderation/login";
        }
      }
      return Promise.reject(err);
    }
  );

  const moderationConfig = new Configuration({
    basePath,
    accessToken: getAccessToken,
  });
  const moderationApi = new ModerationApi(moderationConfig, basePath, moderationAxios);

  return {
    provide: {
      moderationApi: {
        auth: authApi,
        moderation: moderationApi,
      },
    },
  };
});
