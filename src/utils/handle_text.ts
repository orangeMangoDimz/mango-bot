import { CacheType, Channel, Interaction, TextChannel } from "discord.js";

export const handleText = async (dataJson: any, interaction: Interaction<CacheType> | Channel) => {
    if (
        typeof dataJson === "object" &&
        dataJson !== null &&
        "data" in dataJson
    ) {
        const data: string = dataJson.data as string;

        // Split the message into paragraphs (assuming paragraphs are separated by double newlines)
        const paragraphs = data
            .split("\n\n")
            .filter((p) => p.trim().length > 0);

        let currentMessage = "";
        for (const paragraph of paragraphs) {
            if (currentMessage.length + paragraph.length > 2000) {
                if (currentMessage.length > 0) {
                    await get_interaction_type(interaction, currentMessage)
                    currentMessage = "";
                }
                // If a single paragraph is too long, split it
                if (paragraph.length > 2000) {
                    const chunks = paragraph.match(/[\s\S]{1,2000}/g) || [];
                    for (const chunk of chunks) {
                        await get_interaction_type(interaction, chunk)
                    }
                } else {
                    currentMessage = paragraph;
                }
            } else {
                if (currentMessage.length > 0) {
                    currentMessage += "\n\n";
                }
                currentMessage += paragraph;
            }
        }

        if (currentMessage.length > 0) {
            await get_interaction_type(interaction, currentMessage)
        }
    } else {
        await get_interaction_type(interaction, "Ada sesuatu yang salah");
    }
};

const get_interaction_type = async (interaction: Interaction<CacheType> | Channel, currentMessage: string) => {
    if (interaction && "followUp" in interaction && typeof interaction.followUp === 'function') {
        await interaction.followUp(currentMessage)
    } else if (interaction && interaction instanceof TextChannel) {
        await interaction.send(currentMessage);
    }
}
