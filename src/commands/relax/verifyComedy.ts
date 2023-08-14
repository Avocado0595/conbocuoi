import { Client, Message } from 'discord.js';
import { addComedy as add, verify } from '../../controllers/comedyController';
import config from '../../config/config';
import { ComedyStatusType } from '../../models/comedyModel';

const verifyComedy = async (message: Message, comedyId: string, status: ComedyStatusType) => {
    if (message.author.id !== config.ownerIds[0])
        return;
    const comedy = await verify(comedyId, status);

    message.reply(`Truyện cười của <@${comedy.author}> đã ${status == 'verified' ? 'được duyệt' : 'bị từ chối'}!`);
};

export default verifyComedy;