
import { Message } from 'discord.js';
import axios from 'axios';
const randomCat = async (message: Message) => {

    const a = await axios.get('https://cataas.com/cat', {
        responseType: 'arraybuffer'
    });
    const result = await a.data;
    const img = Buffer.from(result);
    message.reply({ content: "Xem ảnh mèo nè!", files: [img] })

};

export default randomCat;
