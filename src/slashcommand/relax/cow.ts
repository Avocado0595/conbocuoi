import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction, Client } from 'discord.js';
import { randomImage } from '../../commands/relax';
import config from '../../config/config';

const data = new SlashCommandBuilder()
    .setName('cow')
    .setDescription(`Xem ảnh bò vjpro (tốn${config.imagePrice}cc)`);

async function execute(interaction: ChatInputCommandInteraction) {
    return await randomImage(interaction, 'bocute');
}

export default { data, execute };