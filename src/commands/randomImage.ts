import { Message } from 'discord.js';
import axios from 'axios';
import { getRandomImage } from '../controllers/imageController';
import { ImageTypes } from '../models/imageModel';
import { getUser, takeMoney } from '../controllers/userController';
import config from '../config/config';

const randomImage = async (message: Message, type: ImageTypes) => {
    const user = await getUser(message.author.id);
    if (user.money < config.imagePrice) {
        message.reply("Ôi không, bạn không đủ tiền mất rồi :woman_shrugging:\nChăm chỉ vắt sữa bán kiếm tiền nhé!")
        return;
    }
    await takeMoney(user);
    const imgLink = await getRandomImage(type);
    message.reply(imgLink.link)

};

export default randomImage;