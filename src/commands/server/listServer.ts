
import { ChatInputCommandInteraction, Client, Message } from 'discord.js';

const listServer = async (client: Client, message: Message | ChatInputCommandInteraction) => {
    const serverList = []
    client.guilds.cache.forEach(guild => {
        serverList.push(`${guild.name} | ${guild.id}`);
    })
    message.reply(
        "Total: " + serverList.length + " servers\n" +
        serverList.map((s, index) => `${index}. ${s}`).join("\n")
    );
};

export default listServer;
