export const ENV_ERROR_MSG = {
    NOT_CONFIGURED: "MODE_ENV is not configured!",
    UNKNOWN_MODE_ENV: "Uknown mode env!",
    TOKEN: "Set up discord token first!",
    PUBLIC_KEY: "Set up public key first!",
    CLIENT_ID: "Set up client id first!",
    BE_DOMAIN: "Set up BE domain first!",
};

export const CRON_TAB = {
    EVERYDAY_AT_1_PM: "0 13 * * *",
    EVERY_MONDAY_AT_8_AM: "0 8 * * 1",
    EVERY_FIRST_DATE_OF_MONTH_AT_8_AM: "0 8 1 * *",
}

export const CHANNEL = {
    "news-channel": "",
    "holiday-channel": "",
    "today-words-channel": "",
}

export const LIST_COMMANDS = {
    GET_TODAY_NEWS: "get-today-news",
    GET_PROFILE: "get-profile",
    GET_TODAY_HOLIDAY: "get-today-holidays",
    GET_TODAY_WORD: "get-today-words",
    // Subscribe
    SUBSCRIBE_NEWS: "subscribe-news",
    SUBSCRIBE_HOLIDAY: "subscribe-holidays",
    SUBSCRIBE_WORDS: "subscribe-todays-words",
    // Unsubscribe
    UNSUBSCRIBE_NEWS: "unsubscribe-news",
    UNSUBSCRIBE_HOLIDAY: "unsubscribe-holidays",
    UNSUBSCRIBE_WORDS: "unsubscribe-todays-words",
}
