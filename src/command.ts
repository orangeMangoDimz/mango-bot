import { REST, Routes } from "discord.js";
import { config } from "./config";
import { CHANNEL, CRON_TAB, LIST_COMMANDS } from "./utils/constant";

export const baseCommands = [
    {
        name: LIST_COMMANDS.GET_TODAY_NEWS,
        url: "get-today-news",
        description: "Get today news",
        is_repeat: true,
        repeat_cron_time: CRON_TAB.EVERYDAY_AT_1_PM,
        channel: {
            key: "news-channel",
        }
    },
    {
        name: LIST_COMMANDS.GET_TODAY_WORD,
        url: "get-today-words",
        description: "Get today words",
        is_repeat: true,
        repeat_cron_time: CRON_TAB.EVERY_MONDAY_AT_8_AM,
        channel: {
            key: "today-words-channel",
        }
    },
    {
        name: LIST_COMMANDS.GET_PROFILE,
        url: "get-profile",
        description: "Get discord profile",
        is_repeat: false,
        repeat_cron_time: "",
        channel: {
            key: "",
        }
    },
    {
        name: LIST_COMMANDS.GET_TODAY_HOLIDAY,
        url: "get-today-month-holiday",
        description: "Get this month holidays",
        is_repeat: true,
        repeat_cron_time: CRON_TAB.EVERY_FIRST_DATE_OF_MONTH_AT_8_AM,
        channel: {
            key: "holiday-channel",
        }
    },
    {
        name: LIST_COMMANDS.UNSUBSCRIBE_NEWS,
        url: "",
        description: "Unsubscribe news",
        is_repeat: false,
        repeat_cron_time: "",
        channel: {
            key: "",
        }
    },
    {
        name: LIST_COMMANDS.UNSUBSCRIBE_HOLIDAY,
        url: "",
        description: "Unsubscribe holidays date info",
        is_repeat: false,
        repeat_cron_time: "",
        channel: {
            key: "",
        }
    },
    {
        name: LIST_COMMANDS.UNSUBSCRIBE_WORDS,
        url: "",
        description: "Unsubscribe monday words",
        is_repeat: false,
        repeat_cron_time: "",
        channel: {
            key: "",
        }
    },
    {
        name: LIST_COMMANDS.SUBSCRIBE_WORDS,
        url: "",
        description: "Get monday words",
        is_repeat: false,
        repeat_cron_time: "",
        options: [
            {
                name: "channel",
                description: "The channel to register",
                type: 7, // Channel type
                required: true
            }
        ],
        channel: {
            key: "today-words-channel",
        }
    },
    {
        name: LIST_COMMANDS.SUBSCRIBE_NEWS,
        url: "",
        description: "Get daily news",
        is_repeat: false,
        repeat_cron_time: "",
        options: [
            {
                name: "channel",
                description: "The channel to register",
                type: 7, // Channel type
                required: true
            }
        ],
        channel: {
            key: "",
        }
    },
    {
        name: LIST_COMMANDS.SUBSCRIBE_HOLIDAY,
        url: "",
        description: "Get monthly holidays date",
        is_repeat: false,
        repeat_cron_time: "",
        options: [
            {
                name: "channel",
                description: "The channel to register",
                type: 7, // Channel type
                required: true
            }
        ],
        channel: {
            key: "",
        }
    },
];

const commands = baseCommands.map(({ url, is_repeat, repeat_cron_time, channel, ...rest }) => rest);
const rest = new REST({ version: "10" }).setToken(config.TOKEN);

async function registerCommands() {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
            body: commands,
        });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
}

export { registerCommands };
