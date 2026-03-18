# Travell-RT Frontend

Frontend приложение для Travell-RT на Nuxt 3 (гибридный рендеринг: SSR для главной, CSR для остальных страниц).

## 🚀 Технологии

- Vue 3
- TypeScript
- Nuxt 3
- Yarn (менеджер пакетов)

## 📋 Предварительные требования

- Node.js (рекомендуется версия 16 или выше)
- Yarn
- OpenAPI Generator CLI

## ⚙️ Установка

1. Установите глобально OpenAPI Generator CLI:
```bash
npm install @openapitools/openapi-generator-cli -g
```

2. Настройте переменные окружения:
   - Скопируйте файл `.env-example` в `.env`
   - Заполните необходимые переменные окружения в файле `.env`

3. Установите зависимости проекта:
```bash
yarn install
```

## 🛠️ Разработка

Запуск сервера разработки:
```bash
yarn dev
```

Сборка для продакшена:
```bash
yarn build
```

Предпросмотр собранного проекта:
```bash
yarn preview
```

Запуск production-сервера после сборки:
```bash
yarn start
```

## 🌐 Рендеринг

- `"/"` рендерится на сервере (SSR + гидратация).
- Остальные маршруты на этапе 1 работают как CSR через `routeRules`.

## 🧭 План фазы 2

1. Включать SSR по группам SEO-страниц: `news`, `places`, `routers`.
2. Перенести data-fetch этих страниц на `useAsyncData` с устранением дублей запросов.
3. Добавить кеширование SSR-ответов для высокочастотных маршрутов.
4. Подключить метрики TTFB и ошибки гидратации.

## 📚 Дополнительная информация

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Nuxt Documentation](https://nuxt.com/docs)
- [OpenAPI Generator Documentation](https://openapi-generator.tech/)
