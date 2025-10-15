// modules/partners/composables/usePartners.ts
import { ref, computed } from 'vue'

export interface Partner {
  id: number
  name: string
  url: string
  logo?: string
  isFeatured?: boolean
  description?: string
}

// Mock данные для демонстрации
// TODO: Заменить на реальный API когда будет готов
const mockPartners: Partner[] = [
  // Главный партнер
  { 
    id: 1, 
    name: 'Ассамблея туристских волонтёров', 
    url: 'https://vk.com/atv2009', 
    logo: 'https://sun9-84.userapi.com/s/v1/if2/_txsuqsSZz7BXeCpYKggsS5IR4qS75r7L_ekTLsSRiDY6v_Qtd0BaoZSPSuyBBtLJxAbjz-VN0YEwnCfbbhISsDz.jpg?quality=95&as=32x24,48x36,72x54,108x82,160x121,240x182,360x272,480x363,540x409,640x484,720x545,1080x817,1094x828&from=bu&cs=1094x0',
    isFeatured: true, 
    description: 'Объединение энтузиастов туризма Республики Татарстан' 
  },
  
  // Государственные организации
  { id: 2, name: 'Госкомитет РТ по туризму', url: 'https://tourism.tatarstan.ru' },
  { id: 3, name: 'Visit Tatarstan', url: 'https://visit-tatarstan.com' },
  { id: 4, name: 'ТИЦ г. Казань', url: 'https://kazantravel.ru' },
  { id: 5, name: 'Дирекция по природным территориям РТ', url: 'https://ecotourism.tatar/?ysclid=mfo1mvhzec748892666' },
  { id: 6, name: 'Волжско-Камский заповедник', url: 'https://vkgz.ru/ru' },
  { id: 7, name: 'Туристический портал г. Казань', url: 'https://go.kzn.ru' },

  // Туроператоры
  { id: 8, name: 'Казанские экскурсии', url: 'https://kazan.land' },
  { id: 9, name: 'Татар-тур', url: 'https://tatar-tur.ru/?ysclid=mfo20oke67400515541' },
  { id: 10, name: 'Лидер Казань', url: 'https://to-kazan.ru' },
  { id: 11, name: 'Sputnik8', url: 'https://www.sputnik8.com' },
  { id: 12, name: 'Туроператор Казань', url: 'https://kaztur.ru' },
  { id: 13, name: 'Тур-Казань', url: 'https://tur-kazan.ru' },

  // Культурные объекты
  { id: 14, name: 'Выставки РТ', url: 'https://www.culture.ru/afisha/respublika-tatarstan/vistavki' },
  { id: 15, name: 'Музеи Республики Татарстан', url: 'https://collections.museum.tatar.ru' },
  { id: 16, name: 'Национальный музей РТ', url: 'https://tatmuseum.ru/?ysclid=mfo21xhond423192874' },
  { id: 17, name: 'Казанский Кремль', url: 'https://kazan-kremlin.ru' },
  { id: 18, name: 'Чистопольский музей-заповедник', url: 'https://chistopol-museum.ru' },
  { id: 19, name: 'Музей г. Набережные Челны', url: 'https://collections.museum.tatar.ru/entity/MUSEUM/31' },
  { id: 20, name: 'Нижнекамский городской музей', url: 'https://e-nkama.ru/infrastruktura/social/kyltyra/Museum/' },
  { id: 21, name: 'Комплексный музей г. Нижнекамск', url: 'https://collections.museum.tatar.ru/entity/MUSEUM/13' },
  { id: 22, name: 'Елабужский музей-заповедник', url: 'https://www.elabuga.com' },
  { id: 23, name: 'Альметьевский краеведческий музей', url: 'https://almetmuseum.orgs.biz' },
  { id: 24, name: 'Болгарский музей-заповедник', url: 'https://vbolgar.ru/' },

  // Загородный отдых
  { id: 25, name: 'Своё За городом', url: 'https://svoe-zagorodom.ru' },
  { id: 26, name: 'Свияжские холмы', url: 'https://sviyaga-hills.com' },
  { id: 27, name: 'Загородный клуб Утрау', url: 'https://utrau.ru' },
  { id: 28, name: 'Экопарк Дикая ферма', url: 'https://dikayaferma.ru' },
  { id: 29, name: 'Urman Camp', url: 'https://urman.camp/' },
  { id: 30, name: 'Yurt Resort', url: 'https://yurt-resort.ru' },

  // Гостиницы
  { id: 31, name: 'THE Камский', url: 'https://thekamsky.ru' },
  { id: 32, name: 'Kol Gali Resort & SPA 5★', url: 'https://kolgaliresort.ru' },
  { id: 33, name: 'Minger Tower', url: 'https://minger.ru' },

  // Рестораны
  { id: 34, name: 'Tatar by Tubatay', url: 'https://tatar.rest/' },
  { id: 35, name: 'Ресторан Чирэм', url: 'https://cheerem-tatar.orgs.biz' },
  { id: 36, name: 'Ресторан Гусь', url: 'https://gusrest.ru' }
]

export const usePartners = () => {
  const partners = ref<Partner[]>(mockPartners)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchPartners = async () => {
    try {
      loading.value = true
      // TODO: Заменить на реальный API вызов
      // const response = await $api.api.apiPartnersList()
      // partners.value = response.data
      await new Promise(resolve => setTimeout(resolve, 500)) // Имитация загрузки
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const featuredPartners = computed(() => 
    partners.value.filter(p => p.isFeatured)
  )

  const regularPartners = computed(() => 
    partners.value.filter(p => !p.isFeatured)
  )

  return {
    partners,
    featuredPartners,
    regularPartners,
    loading,
    error,
    fetchPartners
  }
}

