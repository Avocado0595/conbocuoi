import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';
import { randomCat } from '../../commands/relax';

const data = new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Ảnh mòe zui nhộn (free)');

async function execute(interaction: ChatInputCommandInteraction) {
    return await randomCat(interaction);
}

export default { data, execute };