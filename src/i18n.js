import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cache from 'i18next-localstorage-cache';

import translationRU from './locales/ru/translation.json';
import translationKZ from './locales/kz/translation.json';

const resources = {
  ru: {
    translation: translationRU
  },
  kz: {
    translation: translationKZ
  }
}

const options = {
  order: [ 'navigator', 'htmlTag', 'path', 'subdomain'],

  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'],

  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  htmlTag: document.documentElement,
  checkWhitelist: true
}

i18n
  .use(Backend) 
  .use(LanguageDetector) 
  .use(initReactI18next)
  .use(Cache)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || "ru",
    fallbackLng: 'ru', 
    debug: false,
    whitelist: ['ru', 'kz'],
    detection: options,

    interpolation: {
      escapeValue: false
    },

    Cache: {
      enabled: false,
      prefix: 'translation_',
      expirationTime: Infinity,
      Version: {},
    },
  });

export default i18n;