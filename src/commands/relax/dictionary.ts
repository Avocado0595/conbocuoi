
import { ChatInputCommandInteraction, EmbedBuilder, Message } from 'discord.js';
import axios from 'axios';
const dictionary = async (word: string, message: Message | ChatInputCommandInteraction) => {
    try {
        const raw = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const a = raw.data[0];
        let result = 'No meaning';
        result = a.phonetic + '\n'
        const means = a.meanings;

        for (let i = 0; i < means.length; i++) {
            result += `*(${means[i].partOfSpeech})*:\n`
            for (let j = 0; j < Math.min(4, means[i].definitions.length); j++) {
                result += `+ ${means[i].definitions[j].definition}\n`
            }
        }
        const em = new EmbedBuilder()
            .setColor([0, 153, 255])
            .setAuthor({ name: a.word })
            .setDescription(
                '```md\n' + result + '```'
            )

        message.reply({ embeds: [em] })
    }
    catch {
        message.reply('No meaning.')
    }


};

export default dictionary;
