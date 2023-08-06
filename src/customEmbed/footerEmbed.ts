import config from '../config/config';
import { Client } from 'discord.js';
export default async (client: Client) => {
    const ownerIds = config.ownerIds;
    const owners = await Promise.all(ownerIds.map((id) => client.users.fetch(id)));
    return {
        text: `Contributors: ${owners
            .map((owner) => owner.username)
            .join(',')}`,
        iconURL: owners[0].avatarURL({ extension: 'png', size: 1024 }),
    }

}