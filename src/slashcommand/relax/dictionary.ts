import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';
import dictionary from '../../commands/relax/dictionary';

const data = new SlashCommandBuilder()
    .setName('dict')
    .setDescription('English dictionary')
    .addStringOption(option =>
        option.setName('word')
            .setDescription('word')
            .setRequired(true));

async function execute(interaction: ChatInputCommandInteraction) {
    return await dictionary(interaction.options.getString('word'), interaction);
}

export default { data, execute };