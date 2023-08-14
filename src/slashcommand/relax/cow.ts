import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction, Client } from 'discord.js';
import { randomImage } from '../../commands';

const data = new SlashCommandBuilder()
    .setName('cow')
    .setDescription('Xem ảnh bò vjpro');

async function execute(interaction: ChatInputCommandInteraction) {
    await randomImage(interaction, 'bocute');
}

export { data, execute };