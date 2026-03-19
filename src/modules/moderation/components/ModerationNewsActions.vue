<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useModerationApi } from "@moderation/composables/useModerationApi";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";

const props = defineProps<{ newsId: number }>();
const emit = defineEmits<{ (e: "done"): void }>();

const router = useRouter();
const { moderation } = useModerationApi();

const rejectDialogVisible = ref(false);
const rejectReason = ref("");
const actionLoading = ref(false);
const actionError = ref("");

async function approve() {
  actionLoading.value = true;
  actionError.value = "";
  try {
    await moderation.approveNewsModerationNewsNewsIdApprovePost({ newsId: props.newsId });
    emit("done");
    router.push("/moderation/news");
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : "Ошибка одобрения";
  } finally {
    actionLoading.value = false;
  }
}

function openRejectDialog() {
  rejectReason.value = "";
  actionError.value = "";
  rejectDialogVisible.value = true;
}

async function confirmReject() {
  actionLoading.value = true;
  actionError.value = "";
  try {
    await moderation.rejectNewsModerationNewsNewsIdRejectPost({
      newsId: props.newsId,
      reason: rejectReason.value.trim() || undefined,
    });
    rejectDialogVisible.value = false;
    emit("done");
    router.push("/moderation/news");
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : "Ошибка отклонения";
  } finally {
    actionLoading.value = false;
  }
}
</script>

<template>
  <div class="moderation-actions">
    <p v-if="actionError" class="moderation-actions__error">{{ actionError }}</p>
    <div class="moderation-actions__buttons">
      <Button
        label="Одобрить"
        icon="pi pi-check"
        severity="success"
        :loading="actionLoading"
        :disabled="actionLoading"
        @click="approve"
      />
      <Button
        label="Отклонить"
        icon="pi pi-times"
        severity="danger"
        :loading="actionLoading"
        :disabled="actionLoading"
        @click="openRejectDialog"
      />
    </div>

    <Dialog
      v-model:visible="rejectDialogVisible"
      header="Причина отклонения"
      modal
      :style="{ width: '400px' }"
      :closable="!actionLoading"
      @hide="rejectReason = ''"
    >
      <Textarea
        v-model="rejectReason"
        placeholder="Укажите причину (необязательно)"
        rows="3"
        class="w-full"
      />
      <template #footer>
        <Button
          label="Отмена"
          severity="secondary"
          text
          :disabled="actionLoading"
          @click="rejectDialogVisible = false"
        />
        <Button
          label="Отклонить"
          severity="danger"
          :loading="actionLoading"
          :disabled="actionLoading"
          @click="confirmReject"
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.moderation-actions {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--surface-border);
}
.moderation-actions__error {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: var(--red-500);
}
.moderation-actions__buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
