import { useNuxtApp } from "#imports";

export function useModerationApi() {
  const { $moderationApi } = useNuxtApp() as {
    $moderationApi: { auth: unknown; moderation: unknown };
  };

  const authRaw = $moderationApi.auth as {
    loginTokenPost?: (params: { tokenRequest: { password: string } }) => Promise<unknown>;
    loginApiModerationTokenPost?: (params: { tokenRequest: { password: string } }) => Promise<unknown>;
  };

  const auth = {
    loginTokenPost: (params: { tokenRequest: { password: string } }) => {
      if (authRaw.loginTokenPost) return authRaw.loginTokenPost(params);
      if (authRaw.loginApiModerationTokenPost) return authRaw.loginApiModerationTokenPost(params);
      throw new Error("Метод loginTokenPost недоступен в API клиенте");
    },
  };

  const moderationRaw = $moderationApi.moderation as unknown as {
    listPendingNewsApiModerationModerationPendingNewsGet?: (params?: { limit?: number }) => Promise<unknown>;
    getNewsApiModerationModerationNewsNewsIdGet?: (params: { newsId: number }) => Promise<unknown>;
    approveNewsApiModerationModerationNewsNewsIdApprovePost?: (params: { newsId: number }) => Promise<unknown>;
    rejectNewsApiModerationModerationNewsNewsIdRejectPost?: (params: { newsId: number; reason?: string }) => Promise<unknown>;
    approveAllPendingNewsApiModerationModerationNewsApproveAllPost?: () => Promise<unknown>;
  };

  const moderation = {
    listPendingNews: (params?: { limit?: number }) => {
      if (!moderationRaw.listPendingNewsApiModerationModerationPendingNewsGet) {
        throw new Error("Метод listPendingNews недоступен в API клиенте");
      }
      return moderationRaw.listPendingNewsApiModerationModerationPendingNewsGet(params);
    },
    getNews: (params: { newsId: number }) => {
      if (!moderationRaw.getNewsApiModerationModerationNewsNewsIdGet) {
        throw new Error("Метод getNews недоступен в API клиенте");
      }
      return moderationRaw.getNewsApiModerationModerationNewsNewsIdGet(params);
    },
    approveNews: (params: { newsId: number }) => {
      if (!moderationRaw.approveNewsApiModerationModerationNewsNewsIdApprovePost) {
        throw new Error("Метод approveNews недоступен в API клиенте");
      }
      return moderationRaw.approveNewsApiModerationModerationNewsNewsIdApprovePost(params);
    },
    rejectNews: (params: { newsId: number; reason?: string }) => {
      if (!moderationRaw.rejectNewsApiModerationModerationNewsNewsIdRejectPost) {
        throw new Error("Метод rejectNews недоступен в API клиенте");
      }
      return moderationRaw.rejectNewsApiModerationModerationNewsNewsIdRejectPost(params);
    },
    approveAllPendingNews: () => {
      if (!moderationRaw.approveAllPendingNewsApiModerationModerationNewsApproveAllPost) {
        throw new Error("Метод approveAllPendingNews недоступен в API клиенте");
      }
      return moderationRaw.approveAllPendingNewsApiModerationModerationNewsApproveAllPost();
    },
  };

  return {
    auth,
    moderation,
  };
}
