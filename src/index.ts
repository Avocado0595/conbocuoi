import dotenv from 'dotenv';
import { APIEmbed, Client, Events, GatewayIntentBits, JSONEncodable, Message, Partials, TextChannel } from 'discord.js';
import connect from './database/database';
import { milk, feed, status, moneyStat, sell, give, randomCat, randomImage, setRatio, getRatio } from './commands';
import { helpEmbed } from './customEmbed/cutomEmbed';
import config from './config/config';
import express from 'express';
import cors from 'cors';
import { informationEmbed } from './commands/information';
import { commands, executes } from './slashcommand/slashcommands';
import { adminchat, listServer } from './commands/server';
import { isInt, isIntOrFloat } from './helpers';
import { decMilk } from './controllers/userController';
import addComedy from './commands/relax/addComedy';
import getComedy from './commands/relax/getComedy';
import verifyComedy from './commands/relax/verifyComedy';
import { ComedyStatusType } from './models/comedyModel';

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
				// case 'thongke':
				// case 'topmilk': {
				// 	const pagePart = commandParts[1];
				// 	const page = isInt(pagePart) ? parseInt(pagePart) : 1;
				// 	await stat(message, client, page);
				// 	break;
				// }
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
				case 'joke': {
					await addComedy(message, rawCommandParts.slice(1).join(' '));
					break;
				}
				case 'happy': {
					await getComedy(message);
					break;
				}
				case 'verify-joke': {
					await verifyComedy(message, commandParts[1], commandParts[2] as ComedyStatusType);
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
