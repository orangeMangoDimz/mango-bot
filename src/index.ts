import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "./config";
import { request } from "undici";
import { baseCommands, registerCommands } from "./command";
import { handleText } from "./utils/handle_text";
import cron from 'node-cron';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`);

    const repeated_commnads  = baseCommands.filter(command => command.is_repeat)
    repeated_commnads.map(command => {
        cron.schedule(command.repeat_cron_time, async () => {
            const channel = await client.channels.fetch("MAKE THIS DYNAMIC");
            if (!channel || !channel.isTextBased()) return;

            const url: string = `${config.BE_DOMAIN}/${command.url}`
            const response = await request(url)
            const dataJson = await response.body.json()
            handleText(dataJson, channel)
        })
    })

});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    for (const command of baseCommands) {
        if (interaction.commandName === command.name) {
            await interaction.deferReply();
            const url: string = `${config.BE_DOMAIN}/${command.url}`
            const response = await request(url)
            const dataJson = await response.body.json()
            handleText(dataJson, interaction)
        }
    }

});

client.login(config.TOKEN)
    .then(() => registerCommands())
    .catch(console.error);
