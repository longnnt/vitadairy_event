import { LANG } from 'src/common/constants/common.interfaces';

export function getTranslationByLang<Type>(lang: LANG, translates: Array<Type>): Type {
  let translation: Type = {} as Type;
  translates.forEach((translate) => {
    for (const [key, value] of Object.entries(translate as object)) {
      if (key === 'lang' && value === lang) {
        translation = { ...translate };
      }
    }
  });
  return translation;
}
