import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { createApiClient } from "../src/api";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const publicApiBaseUrl = runtimeConfig.public.apiBaseUrl ?? "";
  const serverApiBaseUrl = runtimeConfig.apiBaseUrl || publicApiBaseUrl;
  const basePath = import.meta.server ? serverApiBaseUrl : publicApiBaseUrl;

  const appApi = createApiClient(basePath);

  return {
    provide: {
      api: appApi
    }
  };
});
