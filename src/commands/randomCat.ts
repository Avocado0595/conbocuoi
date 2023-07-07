
import { Message } from 'discord.js';
import fetch from 'node-fetch';
const randomCat = async (message: Message) => {

    const a = await fetch('https://cataas.com/cat');
    const result = await a.arrayBuffer();
    const img = Buffer.from(result);
    message.reply({ content: "Xem ảnh mèo nè!", files: [img] })

};

export default randomCat;
