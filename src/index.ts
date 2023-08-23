import dotenv from 'dotenv';
import { APIEmbed, Client, Events, GatewayIntentBits, JSONEncodable, Message, Partials } from 'discord.js';
import connect from './database/database';
import { helpEmbed } from './customEmbed/cutomEmbed';
import config from './config/config';
import express from 'express';
import cors from 'cors';
import { commands, executes } from './slashcommand/slashcommands';
import { listServer, randomCat, randomImage } from './commands/relax';
import { isInt, isIntOrFloat } from './helpers';
import { decMilk } from './controllers/userController';
import addComedy from './commands/relax/addJoke';
import getComedy from './commands/relax/getJoke';
import { ComedyStatusType } from './models/comedyModel';
import { feed, inventory, milk } from './commands/cow';

import { adminchat, setRatio, verifyJoke } from './commands/admin'
import { getRatio, give, sell } from './commands/money';
import { moneyStat } from './commands';
import informationEmbed from './commands/information';

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
client.on(Events.MessageCreate, async (message: Message) => {
	try {
		const handleMessage = message.content.toLowerCase();
		const rawMessage = message.content;
		if (handleMessage.includes('b!'))
			message.channel.sendTyping();
		if (handleMessage.indexOf(config.prefix) === 0) {
			const command = handleMessage.split('!');
			const rawCommand = rawMessage.split('!')
			decMilk(message.author.id);
			const commandParts = command[1].split(" ");
			const rawCommandParts = rawCommand[1].split(" ");
			switch (commandParts[0]) {
				case 's': {
					await listServer(client, message);
					break;
				}
				case 'chat': {
					if (message.author.id !== config.ownerIds[0])
						break;
					await adminchat(message.author.id, client, commandParts[1], rawCommandParts.slice(2).join(' '));
					break;
				}
				case 'joke': {
					await addComedy(message, rawCommandParts.slice(1).join(' '));
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
				case 'top': {
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
					await sell(message, commandParts[1]);
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
				case 'milk':
				case 'm': {
					await milk(message);
					break;
				}

				case 'xemkho':
				case 'inv': {
					await inventory(client, message);
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

				case 'happy': {
					await getComedy(message);
					break;
				}
				case 'verify-joke': {
					await verifyJoke(message, commandParts[1], commandParts[2] as ComedyStatusType);
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
	switch (interaction.commandName) {
		case 'ping':
			executes.pingSlashCommand.execute(interaction)
			break;
		case 'g9':
			executes.goodnightSlashCommand.execute(interaction)
			break;
		case 'help':
			executes.helpCommand.execute(interaction, client);
			break;
		case 's':
			executes.serverSlashCommand.execute(interaction, client);
			break;
		case 'milk':
			executes.milkSlashCommand.execute(interaction);
			break;
		case 'sell':
			executes.sellSlashCommand.execute(interaction);
			break;
		case 'happy':
			executes.getComedyCommand.execute(interaction);
			break;
		case 'cow':
			executes.cowCommand.execute(interaction);
			break;
		default:
			break;
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
