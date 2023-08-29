import { give, sell } from '../../commands/money'
import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, Client } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("transfer")
    .setDescription("Chuyển tiền")
    .addNumberOption(option =>
        option.setName('amount')
            .setDescription('Số lượng sữa')
            .setRequired(true))
    .addUserOption(option =>
        option.setName("to")
            .setDescription('Người nhận')
            .setRequired(true))
    .addStringOption(option =>
        option.setName("message")
            .setDescription("Lời nhắn")
            .setRequired(false));

async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    await give(client, interaction, interaction.options.getNumber('amount'), interaction.options.getUser('to').id, interaction.options.getString('message'));
}

export default { data, execute };