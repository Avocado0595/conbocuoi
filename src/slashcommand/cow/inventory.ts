import { inventory, milk } from "../../commands/cow";
import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, Client } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("inv")
    .setDescription("Xem kho");

async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    await inventory(client, interaction);
}

export default { data, execute };