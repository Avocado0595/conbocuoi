
import {
    decStrength,
    getUser,
    getTotalMilkByDay,
    updateUser,
    addUser,
} from '../../controllers/userController';
import { ChatInputCommandInteraction, Message } from 'discord.js';

import config from '../../config/config';
import { getMessageUser, randomRange } from '../../helpers';

const milk = async (message: Message | ChatInputCommandInteraction) => {
    const messUser = getMessageUser(message);
    const userId = messUser.id;
    const tag = messUser.tag;
    const reply = (content: string) => message.reply(content);

    const user = await getUser(userId);
    const milk = randomRange(config.maxMilk, config.minMilk);
    if (user) {
        //limit time
        const diffTime = new Date(user.lastTimeTakeMilk).getTime() - new Date().getTime();
        const diffSecond = Math.abs(Math.ceil(diffTime / 1000));
        const timeLeft = config.coolDownMilk - diffSecond;
        if (timeLeft > 0) {
            const timeLeftMin = Math.floor(timeLeft / 60),
                timeLeftSec = timeLeft % 60;
            reply(
                `**${tag.split('#')[0]
                }** vắt từ từ thôi nè ! Chờ ${timeLeftMin} phút ${timeLeftSec} giây nữa vắt tiếp nhé :face_with_spiral_eyes: !`
            );
            return;
        }
        //limit strength
        const newStrength = await decStrength(user);
        if (newStrength < config.minCowStrength) {
            reply(
                'Bò đang đói :tired_face:, hãy cho bò ăn để có sữa nhé!\nDùng **b!anco** :ear_of_rice:  để cho bò ăn nè.'
            );
            return;
        }
        //limit total milk per day
        const totalMilkPerDay = await getTotalMilkByDay(user, new Date());
        if (totalMilkPerDay > config.maxMilkPerDay) {
            reply(
                `**${tag.split('#')[0]
                }** bạn vừa vắt hết sữa hôm nay rồi :open_mouth: ! Hôm sau quay lại nhé :wink: !`
            );
            return;
        }
        //everything is oke
        const editUser = {
            totalMilk: user.totalMilk + milk,
            lastTimeTakeMilk: new Date(),
            milkTank: [
                ...user.milkTank,
                { milk, takingTime: new Date() },
            ],
        };
        await updateUser(user._id, editUser);
        reply(
            `**${tag.split('#')[0]
            }** vừa vắt được ${milk.toFixed(2)} lít sữa bò! :bucket:`
        )

    } else {
        await addUser(tag, userId, milk);
        reply(
            `Lần đầu tiên, **${tag.split('#')[0]
            }** vừa vắt được ${milk.toFixed(2)} lít sữa bò!`
        );
    }
};

export default milk;
