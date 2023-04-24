const localization = {
    "en": {
        "PART_SIDEBAR_HOME": "Home",
        "PART_SIDEBAR_SIGNIN": "Sign in",
        "PART_SIDEBAR_JOIN": "Join",
    },
    "ru": {
        "PART_SIDEBAR_HOME": "Дом",
        "PART_SIDEBAR_SIGNIN": "Войти",
        "PART_SIDEBAR_JOIN": "Присоединится",
    }
} as any;

// TODO: Move to JSON
const GetTextTranslation = (code: string, lang: string) => {
    const currentLanguage = localization[lang];
    const phrase = currentLanguage[code];
    return phrase;
}

export default GetTextTranslation;