import dotenv from 'dotenv';
import { APIEmbed, Client, GatewayIntentBits, JSONEncodable, Partials } from 'discord.js';
import connect from './database/database';
import milk from './commands/milk';
import feed from './commands/feed';
import { helpEmbed } from './customEmbed/cutomEmbed';
import rank from './commands/rank';
import status from './commands/status';
import config from './config/config';
import randomCat from './commands/randomCat';
import express from 'express';
import cors from 'cors';
import { informationEmbed } from './commands/information';
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
			if ((command[1].indexOf('thongke') !== -1) || command[1].indexOf('stat') !== -1) {
				const pagePart = command[1].split(' ')[1];
				const page = Math.abs(Number.parseInt(pagePart)) || 1;
				await rank(message, client, page);
			}
			message.channel.sendTyping();
			switch (command[1]) {
				case 'thongtin':
				case 'info': {
					const embed = await informationEmbed(client) as unknown as APIEmbed | JSONEncodable<APIEmbed>;
					message.channel.send({ embeds: [embed] });
					break;
				}
				case 'help': {
					const embed = await helpEmbed(client) as unknown as APIEmbed | JSONEncodable<APIEmbed>;
					message.channel.send({ embeds: [embed] });
					break;
				}

				case 'vatsua':
				case 'milk': {
					await milk(message);
					break;
				}

				case 'xemkho':
				case 'inven': {
					await status(message);
					break;
				}

				case 'anco':
				case 'eat': {
					await feed(message);
					break;
				}
				case 'xemmeo':
				case 'cat': {
					await randomCat(message);
					break;
				}
			}
		}
	} catch (e) {
		console.log(e)
		message.channel.sendTyping();
		message.reply(
			'Ôi không! Hình như bò đang không ổn, chờ thằng chủ bỏ fix lại nhé :">'
		);
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
