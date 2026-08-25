import { computed } from 'vue'


// The full content data now lives inside locales/en.json and locales/fr.json
// under the "profile" key, alongside the regular UI strings. This composable
// just pulls that "profile" block out of whichever locale is currently
// active, reactively, so it updates automatically on a language switch.
export function useDeveloperData() {
 

  const config = computed(() => messages.value[locale.value]?.profile)

  return { config, locale }
}