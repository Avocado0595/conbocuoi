import { Client } from 'discord.js';
import { TextChannel } from 'discord.js';
import { isAdmin } from '../../helpers';

/**
 * 
 * use for bot chat (by admin)
 * 
 */
const adminchat = async (userId: string, client: Client, chanelId: string, content: string) => {
    if (isAdmin(userId))
        return (client.channels.cache.get(chanelId) as TextChannel).send(content)
    return;
};

export default adminchat;