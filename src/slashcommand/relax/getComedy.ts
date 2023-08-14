import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction, Client } from 'discord.js';
import getComedy from '../../commands/relax/getComedy';

const data = new SlashCommandBuilder()
    .setName('happy')
    .setDescription('Bò kể truyện cười');

async function execute(interaction: ChatInputCommandInteraction) {
    await getComedy(interaction)
}

export { data, execute };