import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { header_en, home_en, product_en, footer_en, user_en, cart_en } from '~/locales/en'
import { header_vi, home_vi, product_vi, footer_vi, user_vi, cart_vi } from '~/locales/vi'
export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: home_en,
    product: product_en,
    header: header_en,
    footer: footer_en,
    user: user_en,
    cart: cart_en
  },
  vi: {
    home: home_vi,
    product: product_vi,
    header: header_vi,
    footer: footer_vi,
    user: user_vi,
    cart: cart_vi
  }
} as const

export const defaultNS = 'product'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home', 'product'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
