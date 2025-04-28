import { REST, Routes } from "discord.js";
import { config } from "./config";
import { CRON_TAB } from "./utils/constant";

export const baseCommands = [
    {
        name: "get-today-news",
        url: "get-today-news",
        description: "Get today news",
        is_repeat: true,
        repeat_cron_time: CRON_TAB.EVERYDAY_AT_1_PM,
    },
    {
        name: "get-profile",
        url: "get-profile",
        description: "Get discord profile",
        is_repeat: false,
        repeat_cron_time: "",
    },
];

const commands = baseCommands.map(({ url, is_repeat, repeat_cron_time,...rest }) => rest);
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
