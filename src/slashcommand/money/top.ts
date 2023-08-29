import { milk } from "../../commands/cow";
import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, Client } from "discord.js";
import { moneyStat } from "../../commands/money";

const data = new SlashCommandBuilder()
    .setName("top")
    .setDescription("Top đại gia");

async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    await moneyStat(client, interaction);
}

export default { data, execute };