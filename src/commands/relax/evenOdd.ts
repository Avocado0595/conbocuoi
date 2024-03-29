
import { ChatInputCommandInteraction, Message } from 'discord.js';
import { getMessageUser, isIntOrFloat, randomInt, randomRange } from '../../helpers';
import { addMoney, getUser } from '../../controllers/userController';

const evenOdd = async (message: Message | ChatInputCommandInteraction, choice: string, amount: number | string) => {
    if (!isIntOrFloat(amount as string)) {
        await message.reply('Lỗi input rồi bạn.');
        return;
    }
    amount = parseFloat(amount as string);
    if (amount <= 0) {
        await message.reply('Có ngon thì cược số lớn hơn 0 đi nào');
        return;
    }
    const dissUser = getMessageUser(message);
    const user = await getUser(dissUser.id);
    if (!user) {
        await message.reply('``/milk`` để có tiền chơi nhé.');
        return;
    }
    if (user.money < amount) {
        await message.reply('Hông đủ tiền rồi, ``/milk`` để có thêm tiền nè!');
        return;
    }
    const x = Math.floor(randomRange(0, 100));
    const isEven = x % 2 === 0;
    const evenTerms = ['chan', 'c', 'a'];
    const oddTerms = ['le', 'l', 'e'];
    const bchoiceIsEven = evenTerms.some(i => choice.includes(i)) ? 1 : 0;
    const bchoiceIsOdd = oddTerms.some(i => choice.includes(i)) ? 1 : 0;
    if (bchoiceIsEven + bchoiceIsOdd !== 1) {
        await message.reply('Chọn ``chan, c, a`` hoặc ``le, l, e``');
        return;
    }
    /**
     * TODO: rút gọn chỗ này sau
     */
    const isWin = isEven === Boolean(bchoiceIsEven);
    const winTerms = ['Ghê quá nha!', 'Quá đỉnh!', 'Bạn là nhất!', 'Chúa tể may mắn!', 'Liều ăn nhiều!'];
    const loseTerms = ['Bạn gà vãi!', 'Quá íu!', 'Đen thôi!', 'Hehe boiz!']
    const k = isWin ? 1 : -1;
    await addMoney(user.userId, k * amount);
    await message.reply(`Bạn chọn: ${bchoiceIsEven === 1 ? 'chẳn' : 'lẻ'}. Kết quả xổ số: ${x}.\n${isWin ? winTerms[randomInt(0, winTerms.length - 1)] : loseTerms[randomInt(0, loseTerms.length - 1)]} ${isWin ? '+' : '-'}${amount.toFixed(2)}cc`);
    return;
};

export default evenOdd;