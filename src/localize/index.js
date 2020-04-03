import ru from '../localize/ru.json'
import en from '../localize/en.json'

const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function localizeFilter(key) {
  const locale = 'ru-RU'
  return locales[locale][key] || locales[locale]['LocalizeError']
}