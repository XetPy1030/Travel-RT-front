import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { createApiClient } from "../src/api";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const publicApiBaseUrl = runtimeConfig.public.apiBaseUrl ?? "";
  // TODO: посмотреть как работает
  const basePath = import.meta.server
    ? (runtimeConfig.apiBaseUrl || publicApiBaseUrl)
    : publicApiBaseUrl;

  const appApi = createApiClient(basePath);

  return {
    provide: {
      api: appApi
    }
  };
});
