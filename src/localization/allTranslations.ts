const localization = {
    "en": {
        "PART_SIDEBAR_HOME": "Home",
        "PART_SIDEBAR_SIGNIN": "Sign in",
        "PART_SIDEBAR_JOIN": "Join",

        "ERRCODE_VALIDATION_NO_TYPE": "Failed to validate field type.",
        "ERRCODE_VALIDATION_FAIL": "Failed to validate field",

        "ERRVALID_CANTBENULL": "Can't be empty",
        "ERRVALID_LEN": "Invalid length",
        "ERRVALID_INVALID": "Invalid field",
        "ERRVALID_INVALIDCHARS": "Invalid characters",

        "ERRVALID_NICKNAME_LEN": "Invalid nickname length. Must be greater than 3 and less than 30",
        "ERRVALID_NICKNAME_INVALIDCHARS": "Invalid characters in nickname. Nickname should only contain English letters and numbers",

        "ERRVALID_EMAIL_LEN": "Invalid email length. Must be greater than 3 and less than 250",
        "ERRVALID_EMAIL_INVALID": "Email is invalid",

        "ERRVALID_PASSWORD_LEN": "Invalid password length. Must be greater than 8 and less than 50",
        "ERRVALID_PASSWORDS_NOT_EQUALS": "Passwords are not equal",

        "ERRVALID_TOS_NOT_ACCEPTED": "You must accept ToS and Privacy Policy",

        "ERRCODE_USER_EXISTS": "User is already exist with this nickname or email",
        "ERRCODE_INVALID_CREDITS": "Login or Password is not valid",
        "ERRCODE_USER_EMAIL_NOT_VERIFIED": "Email is not verified. Re-create account or verify email",
    },
    "ru": {
        "PART_SIDEBAR_HOME": "Главная",
        "PART_SIDEBAR_SIGNIN": "Войти",
        "PART_SIDEBAR_JOIN": "Присоединится",

        "ERRCODE_VALIDATION_NO_TYPE": "Невозможно определить тип поля.",
        "ERRCODE_VALIDATION_FAIL": "Невозможно проверить поле.",

        "ERRVALID_CANTBENULL": "Поле не может быть пустым",
        "ERRVALID_LEN": "Неверная длинна",
        "ERRVALID_INVALID": "Неверное поле",
        "ERRVALID_INVALIDCHARS": "Поле содержит недопутимые символы",

        "ERRVALID_NICKNAME_LEN": "Никнейм имеет неправильную длинну. Должно быть больше 3 и меньше 30",
        "ERRVALID_NICKNAME_INVALIDCHARS": "Никнейм имеет некоректные символы. Никнейм должен содержать в себе только Английские буквы и цыфры",

        "ERRVALID_EMAIL_LEN": "Е-мейл имеет неправильную длинну. Должно быть больше 3 и меньше 250",
        "ERRVALID_EMAIL_INVALID": "Введён некорректный Е-мейл",

        "ERRVALID_PASSWORD_LEN": "Пароль должен иметь больше 8 и меньше 50 символов",
        "ERRVALID_PASSWORDS_NOT_EQUALS": "Пароли не равны",

        "ERRVALID_TOS_NOT_ACCEPTED": "Вы должны принять Tos и Privacy Policy",

        "ERRCODE_USER_EXISTS": "Пользователь уже существует с таким никнеймом или е-мейлом",
        "ERRCODE_INVALID_CREDITS": "Не правильный логин или прароль",
        "ERRCODE_USER_EMAIL_NOT_VERIFIED": "Е-мейл не подтверждён. Пересоздайте аккаунт или подтвердите е-мейл"
    }
} as any;

// TODO: Move to JSON
const GetTextTranslation = (code: string, lang: string) => {
    const currentLanguage = localization[lang];
    const phrase = currentLanguage[code];

    if (phrase == undefined || phrase == null) {
        return code;
    }

    return phrase;
}

export default GetTextTranslation;