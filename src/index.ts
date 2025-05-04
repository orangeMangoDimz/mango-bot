import { CacheType, Channel, Client, Events, GatewayIntentBits, Interaction } from "discord.js";
import { config } from "./config";
import { request } from "undici";
import { baseCommands, registerCommands } from "./command";
import { handleText } from "./utils/handle_text";
import cron from 'node-cron';
import { CHANNEL, LIST_COMMANDS } from "./utils/constant";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`);

    const repeated_commnads = baseCommands.filter(command => command.is_repeat)
    console.log("repeeat command: ", repeated_commnads)
    repeated_commnads.map(command => {
        cron.schedule(command.repeat_cron_time, async () => {
            console.log("Channel id: ", command.channel.key)
            console.log("uff: ", CHANNEL[command.channel.key])
            // FIX: why command.channel.id is empty
            const channel: Channel | null = await client.channels.fetch(CHANNEL[command.channel.key]);
            if (!channel || !channel.isTextBased()) return;

            const url: string = `${config.BE_DOMAIN}/${command.url}`
            const response = await request(url)
            const dataJson = await response.body.json()
            handleText(dataJson, channel)
        })
    })

});

client.on(Events.InteractionCreate, async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === LIST_COMMANDS.SUBSCRIBE_WORDS) {
        const channel = interaction.options.getChannel('channel');
        if (!channel) {
            interaction.reply("Please mention a channel")
            return
        }
        CHANNEL["today-words-channel"] = channel.id
        await interaction.reply("Success!");
        return;
    }

    if (interaction.commandName === LIST_COMMANDS.SUBSCRIBE_NEWS) {
        const channel = interaction.options.getChannel('channel');
        if (!channel) {
            interaction.reply("Please mention a channel")
            return
        }
        CHANNEL["news-channel"] = channel.id
        await interaction.reply("Success!");
        return;
    }

    if (interaction.commandName === LIST_COMMANDS.SUBSCRIBE_HOLIDAY) {
        const channel = interaction.options.getChannel('channel');
        if (!channel) {
            interaction.reply("Please mention a channel")
            return
        }
        CHANNEL["holiday-channel"] = channel.id
        console.log("subscribe cahnnel id: ", channel.id)
        await interaction.reply("Success!");
        return;
    }

    if (interaction.commandName === LIST_COMMANDS.UNSUBSCRIBE_NEWS) {
        CHANNEL["news-channel"] = ""
        await interaction.reply("Success!");
        return;
    }

    if (interaction.commandName === LIST_COMMANDS.UNSUBSCRIBE_WORDS) {
        CHANNEL["today-words-channel"] = ""
        await interaction.reply("Success!");
        return;
    }

    if (interaction.commandName === LIST_COMMANDS.UNSUBSCRIBE_HOLIDAY) {
        CHANNEL["holiday-channel"] = ""
        await interaction.reply("Success!");
        return;
    }


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
