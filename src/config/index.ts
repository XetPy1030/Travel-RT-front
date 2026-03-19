export const useAppRuntimeConfig = () => {
  const runtimeConfig = useRuntimeConfig();
  const apiBaseUrl = import.meta.server
    ? (runtimeConfig.apiBaseUrl || runtimeConfig.public.apiBaseUrl)
    : runtimeConfig.public.apiBaseUrl;

  return {
    apiBaseUrl,
    mediaBaseUrl: runtimeConfig.public.mediaBaseUrl
  };
};
