import { defineNuxtConfig } from "nuxt/config";
// import { fileURLToPath } from "node:url";
// import { resolve, dirname } from "node:path";
//
// const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: "2026-03-19",
  devtools: { enabled: false },
  css: [
    "primeicons/primeicons.css",
    "@/style.css"
  ],
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    apiBaseUrl: "",
    public: {
      apiBaseUrl: "",
      mediaBaseUrl: "",
      moderationApiBaseUrl: ""
    }
  },
  alias: {
    "@": "/src",
    "@api": "/src/api",
    "@assets": "/src/assets",
    "@components": "/src/components",
    "@composables": "/src/composables",
    "@home": "/src/modules/home",
    "@news": "/src/modules/news",
    "@places": "/src/modules/places",
    "@routers": "/src/modules/routers",
    "@partners": "/src/modules/partners",
    "@moderation": "/src/modules/moderation",
    "@stores": "/src/stores"
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          "@/*": ["../src/*"],
          "@api/*": ["../src/api/*"],
          "@components/*": ["../src/components/*"],
          "@composables/*": ["../src/composables/*"],
          "@home/*": ["../src/modules/home/*"],
          "@news/*": ["../src/modules/news/*"],
          "@places/*": ["../src/modules/places/*"],
          "@routers/*": ["../src/modules/routers/*"],
          "@partners/*": ["../src/modules/partners/*"],
          "@moderation/*": ["../src/modules/moderation/*"],
          "@stores/*": ["../src/stores/*"]
        }
      }
    }
  },
  routeRules: {
    "/": { ssr: true },
    "/**": { ssr: false }
  },
  app: {
    head: {
      title: "Путешествуем РТ"
    }
  }
} as any);