import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('g9')
    .setDescription('Chúc ngủ ngon');

async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Ngủ ngon nè!');
}

export { data, execute };
