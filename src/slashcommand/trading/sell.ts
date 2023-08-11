import { sell } from '../../commands'
import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("sell")
    .setDescription("bán sữa").addNumberOption(option =>
        option.setName('amount')
            .setDescription('Số lượng sữa')
            .setRequired(true));

async function execute(interaction: ChatInputCommandInteraction) {
    await sell(interaction, interaction.options.getNumber('amount'));
}

export { data, execute };