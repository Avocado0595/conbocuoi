import { ChatInputCommandInteraction, Message } from "discord.js";
import { getUser } from "../controllers/userController";
import getMessageUser from "./getMessageUser";

/**
 * check
 */
export default async (message: Message | ChatInputCommandInteraction, amount: number) => {
    const messUser = getMessageUser(message);
    const user = await getUser(messUser.id);
    if (user.money < amount) {
        message.reply("Ôi không, bạn không đủ tiền mất rồi :woman_shrugging:\nChăm chỉ vắt sữa bán kiếm tiền nhé!")
        return false;
    }
    return true;
}