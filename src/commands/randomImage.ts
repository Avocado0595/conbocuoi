import { Message } from 'discord.js';
import { getRandomImage } from '../controllers/imageController';
import { ImageTypes } from '../models/imageModel';
import { getUser, takeMoney } from '../controllers/userController';
import config from '../config/config';
import { roundDouble } from '../helpers';

const randomImage = async (message: Message, type: ImageTypes) => {
    const user = await getUser(message.author.id);
    if (user.money < config.imagePrice) {
        message.reply("Ôi không, bạn không đủ tiền mất rồi :woman_shrugging:\nChăm chỉ vắt sữa bán kiếm tiền nhé!")
        return;
    }
    await takeMoney(user);
    const imgLink = await getRandomImage(type);
    const user2 = await getUser(message.author.id);
    message.reply(imgLink.link)
    message.reply(`\nBạn còn **${roundDouble(user2.money)}cc** trong ví nhé`)

};

export default randomImage;