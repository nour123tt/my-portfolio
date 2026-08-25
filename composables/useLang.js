import { ref, computed } from 'vue'


const currentLang = ref('fr')
const translations = { fr, en }

export function useLang() {
  function t(key) {
    const keys = key.split('.')
    let value = translations[currentLang.value]
    for (const k of keys) {
      value = value?.[k]
    }
    return value ?? key
  }

  function setLang(lang) {
    if (translations[lang]) {
      currentLang.value = lang
      if (process.client) {
        localStorage.setItem('lang', lang)
      }
    }
  }

  return {
    currentLang,
    t,
    setLang
  }
}