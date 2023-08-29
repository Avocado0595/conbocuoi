import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';
import getJoke from '../../commands/relax/getJoke';

const data = new SlashCommandBuilder()
    .setName('happy')
    .setDescription('Bò kể truyện cười');

async function execute(interaction: ChatInputCommandInteraction) {
    await getJoke(interaction)
}

export default { data, execute };