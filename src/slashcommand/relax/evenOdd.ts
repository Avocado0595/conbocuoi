import { sell } from '../../commands/money'
import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { evenOdd } from '../../commands/relax';

const data = new SlashCommandBuilder()
    .setName("chanle")
    .setDescription("Hên xui may rủi").addStringOption(option =>
        option.setName('choice')
            .setDescription('Chọn chẳn hay lẻ')
            .setRequired(true)
            .addChoices({ name: 'chan', value: 'chan' })
            .addChoices({ name: 'le', value: 'le' }))
    .addNumberOption(option =>
        option.setName('amount')
            .setDescription('Mức cược')
            .setRequired(true));

async function execute(interaction: ChatInputCommandInteraction) {
    await evenOdd(interaction, interaction.options.getString('choice'), interaction.options.getNumber('amount'));
}

export default { data, execute };