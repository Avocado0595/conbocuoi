import dotenv from 'dotenv';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import connect from './database/database.js';
import milk from './commands/milk.js';
import feed from './commands/feed.js';
import { helpEmbed } from './customEmbed/cutomEmbed.js';
import rank from './commands/rank.js';
import status from './commands/status.js';
import config from './config/config.js';
import randomCat from './commands/randomCat.js';
import express from 'express';
import cors from 'cors';
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
	partials: [Partials.Channel]
});

dotenv.config();
connect();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});
client.on('messageCreate', async (message) => {
	try {

		const handleMessage = message.content.toLowerCase();
		if (handleMessage.indexOf(config.prefix) === 0) {

			const command = handleMessage.split('!');
			if (command[1].indexOf('thongke') !== -1) {
				const pagePart = command[1].split(' ')[1];
				const page = Math.abs(Number.parseInt(pagePart)) || 1;
				await rank(message, client, page);
			}
			message.channel.sendTyping();
			switch (command[1]) {
				case 'help': {
					message.channel.send({ embeds: [helpEmbed()] });
					break;
				}

				case 'vatsua': {
					await milk(message);
					break;
				}

				case 'xemkho': {
					await status(message);
					break;
				}

				case 'anco': {
					await feed(message);
					break;
				}
				case 'xemmeo': {
					await randomCat(message);
					break;
				}
			}
		}
	}
	catch {
		message.channel.sendTyping();
		message.reply("Ôi không! Hình như bò đang không ổn, chờ thằng chủ bỏ fix lại nhé :\">");
	}

});
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	if (interaction.commandName === 'g9') {
		await interaction.reply('Ngủ ngon nè! <3');
	}
});

client.login(process.env.TOKEN);

const app = express()
const port = process.env.PORT || 3000;
app.use(cors());
app.get('/', (req, res) => {
	res.send('Hello Conbocuoi!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
