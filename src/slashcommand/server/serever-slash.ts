import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction, Client } from 'discord.js';
import listServer from '../../commands/server/listServer';

const data = new SlashCommandBuilder()
    .setName('s')
    .setDescription('Xem list server có bò');

async function execute(interaction: ChatInputCommandInteraction, client: Client) {
    await listServer(client, interaction)
}

export { data, execute };