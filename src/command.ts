import { REST, Routes } from "discord.js";
import { config } from "../config";

export const baseCommands = [
    {
        name: "get-today-news",
        url: "/get-today-news",
        description: "Get today news",
    },
];

const commands = baseCommands.map(({ url, ...rest }) => rest);
const rest = new REST({ version: "10" }).setToken(config.TOKEN);

try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
        body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
} catch (error) {
    console.error(error);
}
