import { Client, Message, TextChannel } from 'discord.js';
import { addComedy as add } from '../../controllers/comedyController';
import { ComedyCreateDTO, ComedyModel } from '../../models/comedyModel';
import config from '../../config/config';

const addJoke = async (client: Client, message: Message, content: string) => {
    if (content.length > 2000 || content.length < 10)
        return;
    const userLastComedy = await ComedyModel.findOne({ author: message.author.id }).sort({ createdAt: -1 })
    if (userLastComedy) {
        const diffTime = new Date((userLastComedy as any).createdAt).getTime() - new Date().getTime(),
            diffSecond = Math.abs(Math.ceil(diffTime / 1000)),
            timeLeft = config.coolDownForAddJoke - diffSecond / (60 * 60 * 24);
        if (timeLeft >= 0) {
            message.reply(`Hôm sau thêm nữa nhé!`);
            return;
        }
    }
    const newComedy: ComedyCreateDTO = { content, author: message.author.id, status: 'pending' };
    const c = await add(newComedy);
    (client.channels.cache.get(config.adminSavedChannel) as TextChannel).send(c._id.toString());
    message.reply(`Một truyện cười đã được thêm vào hàng đợi, chờ duyệt nhé!`);
};

export default addJoke;