<template>
  <Dialog
    v-model:visible="visible"
    header="Сгенерировать маршрут"
    modal
    :style="{ width: '680px', maxWidth: '95vw' }"
    :closable="!generating"
    @hide="onHide"
  >
    <div class="generate-form">
      <div class="field">
        <label>Как вам удобнее задать маршрут?</label>
        <div class="mode-switch">
          <Button
            label="Своими словами"
            :outlined="generationMode !== 'free_text'"
            :disabled="generating"
            @click="generationMode = 'free_text'"
          />
          <Button
            label="Квиз"
            :outlined="generationMode !== 'quiz'"
            :disabled="generating"
            @click="generationMode = 'quiz'"
          />
        </div>
      </div>
      <div class="field">
        <template v-if="generationMode === 'free_text'">
          <label for="user_text">Опишите, какой маршрут хотите</label>
          <Textarea
            id="user_text"
            v-model="userText"
            rows="4"
            placeholder="Например: погулять с детьми в Казани, бесплатные места, 2–3 часа"
            :disabled="generating"
          />
        </template>
        <template v-else>
          <label>Ответьте на несколько вопросов</label>
          <div class="quiz-grid">
            <div class="quiz-field">
              <label for="quiz_companion">С кем идёте?</label>
              <Dropdown
                id="quiz_companion"
                v-model="quizCompanion"
                :options="quizCompanionOptions"
                option-label="label"
                option-value="value"
                placeholder="Выберите формат"
                :disabled="generating"
              />
            </div>
            <div class="quiz-field">
              <label for="quiz_transport">Как планируете передвигаться?</label>
              <Dropdown
                id="quiz_transport"
                v-model="quizTransportMode"
                :options="quizTransportOptions"
                option-label="label"
                option-value="value"
                placeholder="Выберите транспорт"
                :disabled="generating"
              />
            </div>
            <div class="quiz-field">
              <label for="quiz_duration">Сколько времени хотите потратить?</label>
              <Dropdown
                id="quiz_duration"
                v-model="quizDuration"
                :options="quizDurationOptions"
                option-label="label"
                option-value="value"
                placeholder="Выберите длительность"
                :disabled="generating"
              />
            </div>
            <div class="quiz-field">
              <label for="quiz_budget">Какой бюджет?</label>
              <Dropdown
                id="quiz_budget"
                v-model="quizBudget"
                :options="quizBudgetOptions"
                option-label="label"
                option-value="value"
                placeholder="Выберите бюджет"
                :disabled="generating"
              />
            </div>
            <div class="quiz-field">
              <label for="quiz_time">В какое время суток удобнее?</label>
              <Dropdown
                id="quiz_time"
                v-model="quizTimeOfDay"
                :options="quizTimeOptions"
                option-label="label"
                option-value="value"
                placeholder="Любое время"
                :disabled="generating"
              />
            </div>
            <div class="quiz-field quiz-field--full">
              <label for="quiz_interests">Что интересно?</label>
              <MultiSelect
                id="quiz_interests"
                v-model="quizInterests"
                :options="quizInterestOptions"
                option-label="label"
                option-value="value"
                display="chip"
                :max-selected-labels="3"
                placeholder="Выберите интересы"
                :disabled="generating"
              />
            </div>
            <div class="quiz-field quiz-field--full">
              <label for="quiz_requirements">Особые условия</label>
              <MultiSelect
                id="quiz_requirements"
                v-model="quizSpecialRequirements"
                :options="quizSpecialRequirementOptions"
                option-label="label"
                option-value="value"
                display="chip"
                :max-selected-labels="3"
                placeholder="Например, с коляской или с питомцем"
                :disabled="generating"
              />
            </div>
            <div class="quiz-field quiz-field--full">
              <label for="quiz_extra">Дополнительные пожелания (необязательно)</label>
              <Textarea
                id="quiz_extra"
                v-model="quizExtra"
                rows="3"
                placeholder="Например: без подъёмов, больше фото-точек, сделать паузу на кофе"
                :disabled="generating"
              />
            </div>
          </div>
        </template>
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
import MultiSelect from 'primevue/multiselect'
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
type GenerateMode = 'free_text' | 'quiz'
type Option = { label: string; value: string }
const generationMode = ref<GenerateMode>('free_text')

const quizCompanion = ref<string | null>(null)
const quizTransportMode = ref<string | null>(null)
const quizDuration = ref<string | null>(null)
const quizBudget = ref<string | null>(null)
const quizTimeOfDay = ref<string | null>(null)
const quizInterests = ref<string[]>([])
const quizSpecialRequirements = ref<string[]>([])
const quizExtra = ref('')

const quizCompanionOptions = [
  { label: 'Один/одна', value: 'solo' },
  { label: 'С парой', value: 'couples' },
  { label: 'С семьёй', value: 'family' },
  { label: 'С детьми', value: 'kids' },
  { label: 'С друзьями/группой', value: 'groups' }
] as const
const quizTransportOptions: Option[] = [
  { label: 'Пешком', value: 'pedestrian' },
  { label: 'На машине', value: 'car' },
  { label: 'На общественном транспорте', value: 'public_transport' }
]
const quizDurationOptions: Option[] = [
  { label: 'Быстро (до 2 часов)', value: 'short' },
  { label: 'Средне (2-4 часа)', value: 'medium' },
  { label: 'Долго (4-6 часов)', value: 'long' },
  { label: 'Целый день', value: 'full_day' }
]
const quizBudgetOptions: Option[] = [
  { label: 'Бесплатно', value: 'free' },
  { label: 'Бюджетно', value: 'budget' },
  { label: 'Средний', value: 'mid_range' },
  { label: 'Премиум', value: 'premium' }
]
const quizTimeOptions: Option[] = [
  { label: 'Утро', value: 'morning' },
  { label: 'День', value: 'afternoon' },
  { label: 'Вечер', value: 'evening' },
  { label: 'Ночь', value: 'night' }
]
const quizInterestOptions: Option[] = [
  { label: 'История', value: 'history' },
  { label: 'Искусство', value: 'art' },
  { label: 'Природа', value: 'nature' },
  { label: 'Еда', value: 'food' },
  { label: 'Архитектура', value: 'architectural' },
  { label: 'Локальные места', value: 'local_favorite' },
  { label: 'Фото-точки', value: 'instagrammable' }
]
const quizSpecialRequirementOptions: Option[] = [
  { label: 'Доступно для колясок', value: 'wheelchair_accessible' },
  { label: 'Можно с питомцами', value: 'pet_friendly' },
  { label: 'Предпочтительно в помещении', value: 'indoor' },
  { label: 'Предпочтительно на улице', value: 'outdoor' }
]

const companionAudienceMap: Record<string, string[]> = {
  solo: ['solo_traveler'],
  couples: ['couples'],
  family: ['family'],
  kids: ['family', 'kids'],
  groups: ['groups']
}

const selectedDistrict = ref<District | null>(null)
const selectedSettlement = ref<Settlement | null>(null)
const errorMessage = ref('')
const generating = ref(false)
const generatingMessage = ref('Генерация маршрута…')

function findOptionLabel(options: readonly Option[], value: string | null): string | null {
  if (!value) return null
  return options.find((item) => item.value === value)?.label ?? null
}

function findOptionLabels(options: readonly Option[], values: string[]): string[] {
  const labelsByValue = new Map(options.map((item) => [item.value, item.label]))
  return values.map((value) => labelsByValue.get(value) || value)
}

function buildQuizUserText(): string {
  const lines: string[] = ['Сформируй туристический маршрут по анкете пользователя.']

  const companionLabel = findOptionLabel(quizCompanionOptions as unknown as Option[], quizCompanion.value)
  const companionAudience = quizCompanion.value ? companionAudienceMap[quizCompanion.value] || [] : []
  if (companionLabel) {
    lines.push(`С кем: ${companionLabel}. audience: ${companionAudience.join(', ') || 'solo_traveler'}`)
  }

  const transportLabel = findOptionLabel(quizTransportOptions, quizTransportMode.value)
  if (transportLabel && quizTransportMode.value) {
    lines.push(`Транспорт: ${transportLabel}. transport_mode: ${quizTransportMode.value}`)
  }

  const durationLabel = findOptionLabel(quizDurationOptions, quizDuration.value)
  if (durationLabel && quizDuration.value) {
    lines.push(`Длительность: ${durationLabel}. duration: ${quizDuration.value}`)
  }

  const budgetLabel = findOptionLabel(quizBudgetOptions, quizBudget.value)
  if (budgetLabel && quizBudget.value) {
    lines.push(`Бюджет: ${budgetLabel}. budget: ${quizBudget.value}`)
  }

  const timeLabel = findOptionLabel(quizTimeOptions, quizTimeOfDay.value)
  if (timeLabel && quizTimeOfDay.value) {
    lines.push(`Время суток: ${timeLabel}. time_of_day: ${quizTimeOfDay.value}`)
  }

  if (quizInterests.value.length) {
    const interestLabels = findOptionLabels(quizInterestOptions, quizInterests.value)
    lines.push(`Интересы: ${interestLabels.join(', ')}. preferred_tags: ${quizInterests.value.join(', ')}`)
  }

  if (quizSpecialRequirements.value.length) {
    const requirementLabels = findOptionLabels(quizSpecialRequirementOptions, quizSpecialRequirements.value)
    lines.push(
      `Особые условия: ${requirementLabels.join(', ')}. special_requirements: ${quizSpecialRequirements.value.join(', ')}`
    )
  }

  if (quizExtra.value.trim()) {
    lines.push(`Дополнительно: ${quizExtra.value.trim()}`)
  }

  lines.push('Если какие-то параметры не указаны, предложи универсальный и комфортный вариант.')
  return lines.join('\n')
}

const hasQuizInput = computed(() => {
  return Boolean(
    quizCompanion.value ||
      quizTransportMode.value ||
      quizDuration.value ||
      quizBudget.value ||
      quizTimeOfDay.value ||
      quizInterests.value.length ||
      quizSpecialRequirements.value.length ||
      quizExtra.value.trim()
  )
})

const canSubmit = computed(() => {
  const hasText = generationMode.value === 'quiz' ? hasQuizInput.value : (userText.value || '').trim().length > 0
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

  const requestText = generationMode.value === 'quiz' ? buildQuizUserText() : userText.value.trim()

  generating.value = true
  generatingMessage.value = 'Генерация маршрута…'

  try {
    const res = await $api.api.apiRoutersGenerate({
      user_text: requestText,
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

watch(generationMode, () => {
  errorMessage.value = ''
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

.mode-switch {
  display: flex;
  gap: 0.5rem;
}

.quiz-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.quiz-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.quiz-field--full {
  grid-column: 1 / -1;
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

@media (max-width: 768px) {
  .mode-switch {
    flex-direction: column;
  }

  .quiz-grid {
    grid-template-columns: 1fr;
  }

  .location-row {
    flex-direction: column;
  }
}
</style>
