import dotenv from 'dotenv';
import { APIEmbed, Client, Events, GatewayIntentBits, JSONEncodable, Partials } from 'discord.js';
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
import setRatio from './commands/setRatio';
import getRatio from './commands/getRatio';
import changeMoney from './commands/changeMoney';
import { commands } from './slashcommand/slashcommands';
import * as pingSlashCommand from './slashcommand/ping'
import * as goodnightSlashCommand from './slashcommand/goodnight'



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
		if (handleMessage.indexOf(config.prefix) === 0) {
			const command = handleMessage.split('!');
			if ((command[1].indexOf('thongke') !== -1) || command[1].indexOf('stat') !== -1) {
				const pagePart = command[1].split(' ')[1];
				const page = Math.abs(Number.parseInt(pagePart)) || 1;
				await rank(message, client, page);
				return;
			}
			if (command[1].indexOf('setratio') !== -1 && message.author.id === config.ownerIds[0]) {
				const ratio = parseFloat(command[1].split(' ')[1]);
				await setRatio(message, ratio);
				return;
			}
			if (command[1].indexOf('sell') !== -1) {
				const milk = parseFloat(command[1].split(' ')[1]);
				await changeMoney(message, milk);
				return;
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
	if(!interaction.isChatInputCommand()) return;
	if(interaction.commandName === "ping"){
		pingSlashCommand.execute(interaction)
	}
	if (interaction.commandName === 'g9') {
		goodnightSlashCommand.execute(interaction)
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
