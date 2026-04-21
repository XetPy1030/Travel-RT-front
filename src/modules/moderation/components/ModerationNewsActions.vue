<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useModerationApi } from "@moderation/composables/useModerationApi";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";

const PRESET_REJECT_REASONS = [
  "Не подходит тема",
  "Дубликат",
  "Некорректный контент",
  "Не по тематике РТ",
  "Устаревшая информация",
  "Спам / реклама",
] as const;

const props = defineProps<{ newsId: number }>();
const emit = defineEmits<{ (e: "done"): void }>();

const router = useRouter();
const { moderation } = useModerationApi();

const rejectDialogVisible = ref(false);
const rejectReason = ref("");
const actionLoading = ref(false);
const actionError = ref("");

function setPresetReason(reason: string) {
  rejectReason.value = reason;
}

async function approve() {
  actionLoading.value = true;
  actionError.value = "";
  try {
    await moderation.approveNews({ newsId: props.newsId });
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

const REJECT_REASON_OFF_TOPIC = "Не подходит тема";

async function rejectWithReason(reason: string) {
  actionLoading.value = true;
  actionError.value = "";
  try {
    await moderation.rejectNews({
      newsId: props.newsId,
      reason: reason.trim() || undefined,
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

async function confirmReject() {
  await rejectWithReason(rejectReason.value);
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
        :label="REJECT_REASON_OFF_TOPIC"
        icon="pi pi-ban"
        severity="secondary"
        outlined
        :loading="actionLoading"
        :disabled="actionLoading"
        @click="rejectWithReason(REJECT_REASON_OFF_TOPIC)"
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
      :style="{ width: '440px' }"
      :closable="!actionLoading"
      @hide="rejectReason = ''"
    >
      <p class="moderation-actions__preset-label">Быстрый выбор:</p>
      <div class="moderation-actions__presets">
        <Button
          v-for="reason in PRESET_REJECT_REASONS"
          :key="reason"
          :label="reason"
          size="small"
          severity="secondary"
          text
          class="moderation-actions__preset-btn"
          :class="{ 'moderation-actions__preset-btn--active': rejectReason === reason }"
          :disabled="actionLoading"
          @click="setPresetReason(reason)"
        />
      </div>
      <p class="moderation-actions__preset-label">Или введите свой вариант:</p>
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

.moderation-actions__preset-label {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color-secondary);
}
.moderation-actions__preset-label + .moderation-actions__presets {
  margin-top: 0;
}
.moderation-actions__presets {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.moderation-actions__preset-btn {
  font-size: 0.85rem;
}
.moderation-actions__preset-btn--active {
  font-weight: 600;
  background: var(--surface-200);
}
</style>
