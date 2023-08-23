import { sell } from '../../commands/money'
import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("sell")
    .setDescription("bán sữa").addNumberOption(option =>
        option.setName('amount')
            .setDescription('Số lượng sữa')
            .setRequired(true)
            .addChoices({ name: 'all', value: -9999 }));

async function execute(interaction: ChatInputCommandInteraction) {
    await sell(interaction, interaction.options.getNumber('amount'));
}

export { data, execute };