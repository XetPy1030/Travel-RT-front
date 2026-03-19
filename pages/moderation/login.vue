<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useModerationAuthStore } from "@moderation/stores/useModerationAuthStore";
import { useModerationApi } from "@moderation/composables/useModerationApi";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

useHead({ title: "Модерация | Вход" });

definePageMeta({
  layout: "empty",
});

const router = useRouter();
const authStore = useModerationAuthStore();
const { auth } = useModerationApi();

const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

onMounted(() => {
  authStore.initFromStorage();
});

async function onSubmit() {
  if (!password.value.trim()) {
    errorMessage.value = "Введите пароль";
    return;
  }
  loading.value = true;
  errorMessage.value = "";
  try {
    const { data } = await auth.loginTokenPost({
      tokenRequest: { password: password.value },
    });
    authStore.setToken(data.access_token);
    await router.push("/moderation/news");
  } catch (err: unknown) {
    const ax = err as { response?: { status?: number; data?: unknown } };
    if (ax.response?.status === 401) {
      errorMessage.value = "Неверный пароль";
    } else if (ax.response?.status === 422) {
      errorMessage.value = "Ошибка валидации";
    } else {
      errorMessage.value = "Ошибка входа. Проверьте сеть и попробуйте снова.";
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="moderation-login">
    <div class="moderation-login__card">
      <h1 class="moderation-login__title">Модерация</h1>
      <p class="moderation-login__subtitle">Введите пароль для входа</p>
      <form class="moderation-login__form" @submit.prevent="onSubmit">
        <div class="moderation-login__field">
          <label for="mod-password">Пароль</label>
          <Password
            id="mod-password"
            v-model="password"
            placeholder="Пароль"
            :feedback="false"
            toggle-mask
            input-class="w-full"
          />
        </div>
        <p v-if="errorMessage" class="moderation-login__error">
          {{ errorMessage }}
        </p>
        <Button
          type="submit"
          label="Войти"
          :loading="loading"
          class="moderation-login__submit"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.moderation-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: var(--surface-ground);
}
.moderation-login__card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: var(--surface-card);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
.moderation-login__title {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}
.moderation-login__subtitle {
  margin: 0 0 1.5rem;
  font-size: 0.95rem;
  color: var(--text-color-secondary);
}
.moderation-login__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.moderation-login__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.moderation-login__field label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
}
.moderation-login__error {
  margin: 0;
  font-size: 0.9rem;
  color: var(--red-500);
}
.moderation-login__submit {
  margin-top: 0.5rem;
}
</style>
