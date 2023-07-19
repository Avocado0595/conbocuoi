import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping Bot!');

async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Pong!');
}

export { data, execute };
