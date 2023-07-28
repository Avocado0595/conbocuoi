import dotenv from 'dotenv';
import { APIEmbed, Client, Events, GatewayIntentBits, JSONEncodable, Partials, TextChannel } from 'discord.js';
import connect from './database/database';
import milk from './commands/milk';
import feed from './commands/feed';
import { helpEmbed } from './customEmbed/cutomEmbed';
import stat from './commands/stat';
import status from './commands/status';
import config from './config/config';
import randomCat from './commands/randomCat';
import express from 'express';
import cors from 'cors';
import { informationEmbed } from './commands/information';
import setRatio from './commands/setRatio';
import getRatio from './commands/getRatio';
import { commands } from './slashcommand/slashcommands';
import * as pingSlashCommand from './slashcommand/ping'
import * as goodnightSlashCommand from './slashcommand/goodnight'
import * as serverSlashCommand from './slashcommand/server/serever-slash'
import randomImage from './commands/randomImage';
import sell from './commands/sell';
import { isInt, isIntOrFloat } from './helpers/isValidNumber';
import moneyStat from './commands/moneyStat';
import listServer from './commands/server/listServer';
import { adminchat } from './commands/server/adminchat';
import give from './commands/give';

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

client.once(Events.ClientReady, c => {
	console.log(`Logged in as ${c.user.tag}!`);
	client.application?.commands.set(commands);
});
client.on(Events.MessageCreate, async (message) => {
	try {
		const handleMessage = message.content.toLowerCase();
		if (handleMessage.includes('b!'))
			message.channel.sendTyping();
		if (handleMessage.indexOf(config.prefix) === 0) {
			const command = handleMessage.split('!');

			const commandParts = command[1].split(" ");
			switch (commandParts[0]) {
				case 'thongke':
				case 'topmilk': {
					const pagePart = commandParts[1];
					const page = isInt(pagePart) ? parseInt(pagePart) : 1;
					await stat(message, client, page);
					break;
				}
				case 's': {
					await listServer(client, message);
					break;
				}
				case 'chat': {
					if (message.author.id !== config.ownerIds[0])
						break;
					await adminchat(client, message, commandParts[1], commandParts.slice(2).join(" "))
					break;
				}
				case 'give': {
					if (!isIntOrFloat(commandParts[1])) {
						message.reply(":woman_gesturing_no: Đừng có mà nhập linh tinh cho bò nè! Nhập số >0 thôi.");
						break;
					}
					await give(client, message, parseFloat(commandParts[1]), commandParts[2]);
					break;
				}
				case 'topmoney': {
					const pagePart = commandParts[1];
					const page = isInt(pagePart) ? parseInt(pagePart) : 1;
					await moneyStat(message, client, page);
					break;
				}
				case 'setratio': {

					if (!isIntOrFloat(commandParts[1])) {
						message.reply(":woman_gesturing_no: Đừng có mà nhập linh tinh cho bò nè! Nhập số >0 thôi.");
						break;
					}
					const ratio = parseFloat(commandParts[1]);
					await setRatio(message, ratio);
					break;
				}
				case 'sell': {

					if (!isIntOrFloat(commandParts[1])) {
						message.reply(":woman_gesturing_no: Đừng có mà nhập linh tinh cho bò nè! Nhập số >0 thôi.");
						break;
					}
					const milk = parseFloat(commandParts[1]);
					await sell(message, milk);
					break;
				}
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
				case 'inv': {
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
				};
				case 'cow': {
					await randomImage(message, 'bocute');
					break;
				};
				case 'ratio':
				case 'tygia': {
					await getRatio(message);
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


client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	if (interaction.commandName === "ping") {
		pingSlashCommand.execute(interaction)
	}
	if (interaction.commandName === 'g9') {
		goodnightSlashCommand.execute(interaction)
	}
	if (interaction.commandName === 's') {
		serverSlashCommand.execute(interaction, client);
	}
})


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
