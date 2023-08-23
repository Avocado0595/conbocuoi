import { Message } from 'discord.js';
import { verify } from '../../controllers/comedyController';
import config from '../../config/config';
import { ComedyStatusType } from '../../models/comedyModel';
import { addMoney } from '../../controllers/userController';
import { isAdmin } from '../../helpers';

const verifyJoke = async (message: Message, comedyId: string, status: ComedyStatusType) => {
    if (!isAdmin(message.author.id))
        return;
    const comedy = await verify(comedyId, status);
    await addMoney(comedy.author, config.addJokePrice);
    message.reply(`Truyện cười của <@${comedy.author}> đã ${status == 'verified' ? `được duyệt và được trả ${config.addJokePrice.toFixed(2)}cc nhé` : 'bị từ chối, thật là tiếc - lần sau hề hước lên nữa nhé'}!`);
};

export default verifyJoke;