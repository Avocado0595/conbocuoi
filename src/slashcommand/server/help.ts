import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction, Client } from 'discord.js';
import help from '../../commands/help';

const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Đọc kỹ HDSD trước khi dùng');

async function execute(interaction: ChatInputCommandInteraction, client: Client) {
    await help(client)
}

export { data, execute };