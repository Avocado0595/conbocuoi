import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction, Client } from 'discord.js';
import { randomImage } from '../../commands/relax';

const data = new SlashCommandBuilder()
    .setName('cow')
    .setDescription('Xem ảnh bò vjpro');

async function execute(interaction: ChatInputCommandInteraction) {
    return await randomImage(interaction, 'bocute');
}

export { data, execute };