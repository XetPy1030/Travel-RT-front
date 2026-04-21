import { ref, computed } from "vue";
import { useModerationApi } from "@moderation/composables/useModerationApi";

type NewsRead = {
  id: number;
  parsed_title: string;
  parsed_created_at: string;
  external_source: string;
};

export function useModerationNews() {
  const { moderation } = useModerationApi();

  const pendingList = ref<NewsRead[]>([]);
  const currentDetail = ref<NewsRead | null>(null);
  const loading = ref(false);
  const loadingDetail = ref(false);
  const approvingAll = ref(false);
  const error = ref<string | null>(null);

  async function fetchPendingList(limit?: number) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = (await moderation.listPendingNews({ limit })) as { data: NewsRead[] };
      pendingList.value = Array.isArray(data) ? data : [];
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Ошибка загрузки списка";
      pendingList.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function fetchNewsDetail(newsId: number) {
    if (!Number.isFinite(newsId) || newsId <= 0) return;
    loadingDetail.value = true;
    error.value = null;
    try {
      const { data } = (await moderation.getNews({ newsId })) as { data: NewsRead | null };
      currentDetail.value = data ?? null;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Ошибка загрузки новости";
      currentDetail.value = null;
    } finally {
      loadingDetail.value = false;
    }
  }

  async function approveAllPending() {
    approvingAll.value = true;
    error.value = null;
    try {
      await moderation.approveAllPendingNews();
      pendingList.value = [];
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Ошибка массового одобрения";
    } finally {
      approvingAll.value = false;
    }
  }

  function removeFromPending(id: number) {
    pendingList.value = pendingList.value.filter((item) => item.id !== id);
  }

  const hasPending = computed(() => pendingList.value.length > 0);

  return {
    pendingList,
    currentDetail,
    loading,
    loadingDetail,
    approvingAll,
    error,
    fetchPendingList,
    fetchNewsDetail,
    approveAllPending,
    removeFromPending,
    hasPending,
  };
}
