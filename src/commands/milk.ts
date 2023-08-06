
import {
	decStrength,
	getUser,
	getTotalMilkByDay,
	updateUser,
	addUser,
} from '../controllers/userController';
import { ChatInputCommandInteraction, Message } from 'discord.js';

import  config  from '../config/config';
import { randomRange, roundDouble } from '../helpers';


const milk = async (message: Message | ChatInputCommandInteraction) => {
    let userId: string;
    let reply: (content: string) => void;
	let tag: string;

    if (message instanceof Message) {
        userId = message.author.id;
		reply = (content: string) => message.reply(content);
		tag = message.author.tag;
    } else if (message instanceof ChatInputCommandInteraction) {
        userId = message.user.id;
        reply = (content: string) => message.reply(content);
		tag = message.user.tag;
    } else {
        return;
    }

    const user = await getUser(userId),
        milk = roundDouble(randomRange(config.maxMilk, config.minMilk));
    if (user) {
        const newStrength = await decStrength(user),
            diffTime = new Date(user.lastTimeTakeMilk).getTime() - new Date().getTime(),
            diffSecond = Math.abs(Math.ceil(diffTime / 1000)),
            timeLeft = config.coolDownMilk - diffSecond;

        if (timeLeft > 0) {
            const timeLeftMin = Math.floor(timeLeft / 60),
                timeLeftSec = timeLeft % 60;
            reply(
                `**${tag.split('#')[0]
                }** vắt từ từ thôi nè ! Chờ ${timeLeftMin} phút ${timeLeftSec} giây nữa vắt tiếp nhé :face_with_spiral_eyes: !`
            );
        } else if (newStrength < 50)
            reply(
                'Bò đang đói :tired_face:, hãy cho bò ăn để có sữa nhé!\nDùng **b!anco** :ear_of_rice:  để cho bò ăn nè.'
            );
        else {
            const totalMilkPerDay = await getTotalMilkByDay(user, new Date());
            if (totalMilkPerDay <= config.maxMilkPerDay) {
                reply(
                    `**${tag.split('#')[0]
                    }** vừa vắt được ${milk} lít sữa bò! :bucket:`
                );
                const editUser = {
                    totalMilk: roundDouble(user.totalMilk + milk),
                    numberOfCow: user.numberOfCow,
                    userId,
                    lastTimeTakeMilk: new Date(),
                    milkTank: [
                        ...user.milkTank,
                        { milk, takingTime: new Date() },
                    ],
                };
                await updateUser(user._id, editUser);
            } else {
                reply(
                    `**${tag.split('#')[0]
                    }** bạn vừa vắt hết sữa hôm nay rồi :open_mouth: ! Hôm sau quay lại nhé :wink: !`
                );
            }
        }
    } else {
        await addUser(tag, userId, milk);
        reply(
            `Lần đầu tiên, **${tag.split('#')[0]
            }** vừa vắt được ${milk} lít sữa bò!`
        );
    }
};

export default milk;
