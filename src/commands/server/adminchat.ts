import { Client, Message } from 'discord.js';
import { TextChannel } from 'discord.js';



export const adminchat = async (client: Client, message: Message, chanelId: string, content: string) => {
    (client.channels.cache.get(chanelId) as TextChannel).send(content)
};

