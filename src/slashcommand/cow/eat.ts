import { eat } from "../../commands/cow";
import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("eat")
    .setDescription("Cho bò ăn cỏ");

async function execute(interaction: ChatInputCommandInteraction) {
    await eat(interaction);
}

export default { data, execute };