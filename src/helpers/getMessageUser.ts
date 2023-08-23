import { ChatInputCommandInteraction, Message } from "discord.js";

export default (message: Message | ChatInputCommandInteraction) => {
    if (message instanceof Message)
        return message.author
    if (message instanceof ChatInputCommandInteraction)
        return message.user
    return null;
}