import dotenv from 'dotenv';
import { APIEmbed, Client, Events, GatewayIntentBits, JSONEncodable, Message, Partials } from 'discord.js';
import connect from './database/database';
import config from './config/config';
import express from 'express';
import cors from 'cors';
import { commands, executes } from './slashcommand/slashcommands';
import { evenOdd, listServer, randomCat, randomImage } from './commands/relax';
import { isIntOrFloat } from './helpers';
import { decMilk } from './controllers/userController';
import { addJoke, getJoke } from './commands/relax';
import { ComedyStatusType } from './models/comedyModel';
import { eat, inventory, milk } from './commands/cow';
import { adminchat, setRatio, verifyJoke } from './commands/admin'
import { getRatio, give, moneyStat, sell } from './commands/money';
import { help } from './commands';
import informationEmbed from './commands/information';
import dictionary from './commands/relax/dictionary';

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
				//sever
				case 's': {
					await listServer(client, message);
					break;
				}
				case 'help': {
					await help(message, client);
					break;
				}
				case 'info': {
					const embed = await informationEmbed(client) as unknown as APIEmbed | JSONEncodable<APIEmbed>;
					message.channel.send({ embeds: [embed] });
					break;
				}
				//admin
				case 'chat': {
					if (message.author.id !== config.ownerIds[0])
						break;
					await adminchat(message.author.id, client, commandParts[1], rawCommandParts.slice(2).join(' '));
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
				//relax
				case 'joke': {
					await addJoke(client, message, rawCommandParts.slice(1).join(' '));
					break;
				}
				case 'd': {
					await dictionary(commandParts[1], message);
					break;
				}
				//money
				case 'give': {
					if (!isIntOrFloat(commandParts[1])) {
						message.reply(":woman_gesturing_no: Đừng có mà nhập linh tinh cho bò nè! Nhập số >0 thôi.");
						break;
					}
					await give(client, message, parseFloat(commandParts[1]), commandParts[2], commandParts.length >= 3 ? rawCommandParts.slice(3).join(' ') : null);
					break;
				}
				case 'top': {
					await moneyStat(client, message);
					break;
				}

				case 'sell': {
					await sell(message, commandParts[1]);
					break;
				}

				//cow
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
					await eat(message);
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
				case 'chanle': {
					await evenOdd(message, commandParts[1], commandParts[2]);
					break;
				}
				case 'happy': {
					await getJoke(message);
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
			'Ôi không! Hình như bò đang không ổn, chờ thằng chủ bò fix lại nhé :">'
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
		//server
		case 'help':
			executes.helpSlash.execute(interaction, client);
			break;
		case 's':
			executes.serverListSlash.execute(interaction, client);
			break;
		//cow
		case 'milk':
			executes.milkSlash.execute(interaction);
			break;
		case 'eat':
			executes.eatSlash.execute(interaction);
			break;
		case 'inv':
			executes.invSlash.execute(client, interaction);
			break;
		//money
		case 'sell':
			executes.sellSlash.execute(interaction);
			break;
		case 'transfer':
			executes.giveSlash.execute(client, interaction);
			break;
		case 'top':
			executes.topSlash.execute(client, interaction);
			break;
		//relax
		case 'happy':
			executes.getJokeSlash.execute(interaction);
			break;
		case 'cow':
			executes.cowSlash.execute(interaction);
			break;
		case 'cat':
			executes.catSlash.execute(interaction);
			break;
		case 'chanle':
			executes.evenOddSlash.execute(interaction);
			break;
		case 'dict':
			executes.dictionarySlash.execute(interaction);
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
