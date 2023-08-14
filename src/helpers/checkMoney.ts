import { ChatInputCommandInteraction, Message } from "discord.js";
import { getUser, takeMoney } from "../controllers/userController";

export default async (message: Message | ChatInputCommandInteraction, amount: number) => {
    let userId = null;
    if (message instanceof Message) {
        userId = message.author.id;
    }
    else {
        userId = message.user.id;
    }
    const user = await getUser(userId);
    if (user.money < amount) {
        message.reply("Ôi không, bạn không đủ tiền mất rồi :woman_shrugging:\nChăm chỉ vắt sữa bán kiếm tiền nhé!")
        return false;
    }
    await takeMoney(user);
    return true;
}