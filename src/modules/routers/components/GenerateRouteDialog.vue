<template>
  <Dialog
    v-model:visible="visible"
    header="Сгенерировать маршрут"
    modal
    :style="{ width: '500px' }"
    :closable="!generating"
    @hide="onHide"
  >
    <div class="generate-form">
      <div class="field">
        <label for="user_text">Опишите, какой маршрут хотите</label>
        <Textarea
          id="user_text"
          v-model="userText"
          rows="4"
          placeholder="Например: погулять с детьми в Казани, бесплатные места, 2–3 часа"
          :disabled="generating"
        />
      </div>
      <div class="field">
        <label>Город или район (необязательно)</label>
        <div class="location-row">
          <Dropdown
            v-model="selectedDistrict"
            :options="districts"
            option-label="name"
            placeholder="Регион"
            :loading="loadingDistricts"
            class="location-dropdown"
            :disabled="generating"
            :filter="true"
            filter-placeholder="Поиск региона"
            @change="onDistrictChange"
            @filter="onDistrictFilterInput"
          >
            <template #footer>
              <Button
                v-if="hasMoreDistricts && !loadingDistricts"
                label="Загрузить ещё"
                link
                size="small"
                :loading="loadingMoreDistricts"
                class="w-full"
                @click="loadMoreDistricts"
              />
            </template>
          </Dropdown>
          <Dropdown
            v-model="selectedSettlement"
            :options="settlements"
            option-label="name"
            placeholder="Населённый пункт"
            :loading="loadingSettlements"
            class="location-dropdown"
            :disabled="generating"
            :filter="true"
            filter-placeholder="Поиск населённого пункта"
            @change="onSettlementChange"
            @filter="onSettlementFilterInput"
          >
            <template #footer>
              <Button
                v-if="hasMoreSettlements && !loadingSettlements"
                label="Загрузить ещё"
                link
                size="small"
                :loading="loadingMoreSettlements"
                class="w-full"
                @click="loadMoreSettlements"
              />
            </template>
          </Dropdown>
        </div>
      </div>
      <Message v-if="errorMessage" severity="error" :closable="false">
        {{ errorMessage }}
      </Message>
      <Message v-if="generating" severity="info" :closable="false">
        <div class="generating-message">
          <ProgressSpinner style="width: 24px; height: 24px" stroke-width="4" />
          <span>{{ generatingMessage }}</span>
        </div>
      </Message>
    </div>
    <template #footer>
      <Button
        label="Отмена"
        text
        :disabled="generating"
        @click="visible = false"
      />
      <Button
        label="Сгенерировать"
        icon="pi pi-sparkles"
        :loading="generating"
        :disabled="!canSubmit"
        @click="submit"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import { useDistricts } from '@composables/useDistricts'
import { useSettlements } from '@composables/useSettlements'
import type { District, Settlement } from '@api/generated'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

const router = useRouter()
const { $api } = useNuxtApp()
const {
  districts,
  loading: loadingDistricts,
  loadingMore: loadingMoreDistricts,
  hasMore: hasMoreDistricts,
  fetchDistricts,
  loadMore: loadMoreDistricts
} = useDistricts()
const {
  settlements,
  loading: loadingSettlements,
  loadingMore: loadingMoreSettlements,
  hasMore: hasMoreSettlements,
  fetchSettlements,
  loadMore: loadMoreSettlements
} = useSettlements()

let districtFilterTimer: ReturnType<typeof setTimeout> | null = null
let settlementFilterTimer: ReturnType<typeof setTimeout> | null = null
const onDistrictFilterInput = (event: { value: string }) => {
  if (districtFilterTimer) clearTimeout(districtFilterTimer)
  districtFilterTimer = setTimeout(() => {
    fetchDistricts(event.value || undefined)
    districtFilterTimer = null
  }, 300)
}
const onSettlementFilterInput = (event: { value: string }) => {
  if (settlementFilterTimer) clearTimeout(settlementFilterTimer)
  settlementFilterTimer = setTimeout(() => {
    fetchSettlements(selectedDistrict.value?.id, event.value || undefined)
    settlementFilterTimer = null
  }, 300)
}

const userText = ref('')
const selectedDistrict = ref<District | null>(null)
const selectedSettlement = ref<Settlement | null>(null)
const errorMessage = ref('')
const generating = ref(false)
const generatingMessage = ref('Генерация маршрута…')

const canSubmit = computed(() => {
  const hasText = (userText.value || '').trim().length > 0
  const hasLocation = selectedDistrict.value != null || selectedSettlement.value != null
  return hasText || hasLocation
})

const POLL_INTERVAL_MS = 2500

let pollTimer: ReturnType<typeof setInterval> | null = null

function onDistrictChange() {
  if (selectedDistrict.value) {
    fetchSettlements(selectedDistrict.value.id)
  } else {
    selectedSettlement.value = null
    fetchSettlements()
  }
}

function onSettlementChange() {
  // no-op
}

function onHide() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
  errorMessage.value = ''
  generatingMessage.value = 'Генерация маршрута…'
}

async function submit() {
  errorMessage.value = ''
  if (!canSubmit.value) return

  generating.value = true
  generatingMessage.value = 'Генерация маршрута…'

  try {
    const res = await $api.api.apiRoutersGenerate({
      user_text: userText.value.trim(),
      district_id: selectedDistrict.value?.id ?? null,
      settlement_id: selectedSettlement.value?.id ?? null
    })
    const taskId = res.data.task_id
    if (!taskId) {
      errorMessage.value = 'Не получен идентификатор задачи.'
      generating.value = false
      return
    }
    generatingMessage.value = 'Подбор мест и построение маршрута…'
    pollStatus(taskId)
  } catch (err: unknown) {
    generating.value = false
    const ax = err as { response?: { data?: { clarification_question?: string; message?: string } } }
    const data = ax.response?.data
    errorMessage.value = data?.clarification_question || data?.message || 'Ошибка запроса. Попробуйте снова.'
  }
}

async function pollStatus(taskId: string) {
  const check = async () => {
    try {
      const res = await $api.api.apiRoutersGenerateStatus(taskId)
      const { status, router_id, error_message } = res.data
      if (status === 'completed' && router_id) {
        if (pollTimer) {
          clearInterval(pollTimer)
          pollTimer = null
        }
        generating.value = false
        visible.value = false
        router.push(`/routers/${router_id}`)
        return
      }
      if (status === 'failed') {
        if (pollTimer) {
          clearInterval(pollTimer)
          pollTimer = null
        }
        generating.value = false
        errorMessage.value = error_message || 'Генерация не удалась.'
      }
    } catch {
      // keep polling
    }
  }
  await check()
  pollTimer = setInterval(check, POLL_INTERVAL_MS)
}

watch(visible, (v) => {
  if (v) {
    fetchDistricts()
    fetchSettlements()
  }
})
</script>

<style scoped>
.generate-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 500;
}

.location-row {
  display: flex;
  gap: 0.75rem;
}

.location-dropdown {
  flex: 1;
  min-width: 0;
}

.generating-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
</style>
