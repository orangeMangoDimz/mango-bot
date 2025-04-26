import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "./config";
import { request } from "undici";
import { baseCommands, registerCommands } from "./command";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    for (const command of baseCommands) {
        if (interaction.commandName === command.name) {
            await interaction.deferReply();
            const url: string = `${config.BE_DOMAIN}/${command.url}`
            const response = await request(url)
            const dataJson = await response.body.json()

            if (typeof dataJson === 'object' && dataJson !== null && "data" in dataJson) {
                const data: string = dataJson.data as string;

                // Split the message into paragraphs (assuming paragraphs are separated by double newlines)
                const paragraphs = data.split('\n\n').filter(p => p.trim().length > 0);

                // First send an initial message if we have multiple paragraphs
                if (paragraphs.length > 1 || data.length > 2000) {
                    await interaction.followUp("Sending response in parts...");
                }

                // Send each paragraph as a separate message
                let currentMessage = '';
                for (const paragraph of paragraphs) {
                    // If adding this paragraph would exceed the limit, send what we have and start a new message
                    if (currentMessage.length + paragraph.length > 2000) {
                        if (currentMessage.length > 0) {
                            await interaction.followUp(currentMessage);
                            currentMessage = '';
                        }
                        // If a single paragraph is too long, split it
                        if (paragraph.length > 2000) {
                            const chunks = paragraph.match(/[\s\S]{1,2000}/g) || [];
                            for (const chunk of chunks) {
                                await interaction.followUp(chunk);
                            }
                        } else {
                            currentMessage = paragraph;
                        }
                    } else {
                        if (currentMessage.length > 0) {
                            currentMessage += '\n\n';
                        }
                        currentMessage += paragraph;
                    }
                }

                // Send any remaining content
                if (currentMessage.length > 0) {
                    if (paragraphs.length > 1 || data.length > 2000) {
                        await interaction.followUp(currentMessage);
                    } else {
                        await interaction.followUp(currentMessage);
                    }
                }
            } else {
                await interaction.followUp("Ada sesuatu yang salah");
            }
        }
    }

});

client.login(config.TOKEN)
    .then(() => registerCommands())
    .catch(console.error);
