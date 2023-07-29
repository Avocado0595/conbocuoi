import config from '../config/config';
import { addUser, decStrength, getTotalMilkByDay, getUser, updateUser } from '../controllers/userController';
import randomRange from '../helpers/randomRange';
import roundDouble from '../helpers/roundDouble';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('milk')
    .setDescription('milk (vắt sữa bò)');
    

async function execute(interaction: ChatInputCommandInteraction) {
    const user = await getUser(interaction.user.id),
    milk = roundDouble(randomRange(config.maxMilk, config.minMilk));
if (user) {
    const newStrength = await decStrength(user),
        diffTime = new Date(user.lastTimeTakeMilk).getTime() - new Date().getTime(),
        diffSecond = Math.abs(Math.ceil(diffTime / 1000)),
        timeLeft = config.coolDownMilk - diffSecond;

    if (timeLeft > 0) {
        const timeLeftMin = Math.floor(timeLeft / 60),
            timeLeftSec = timeLeft % 60;
        interaction.reply(
            `**${interaction.user.tag.split('#')[0]
            }** vắt từ từ thôi nè ! Chờ ${timeLeftMin} phút ${timeLeftSec} giây nữa vắt tiếp nhé :face_with_spiral_eyes: !`
        );
    } else if (newStrength < 50)
        interaction.reply(
            'Bò đang đói :tired_face:, hãy cho bò ăn để có sữa nhé!\nDùng **b!anco** :ear_of_rice:  để cho bò ăn nè.'
        );
    else {
        const totalMilkPerDay = await getTotalMilkByDay(user, new Date());
        if (totalMilkPerDay <= config.maxMilkPerDay) {
            interaction.reply(
                `**${interaction.user.tag.split('#')[0]
                }** vừa vắt được ${milk} lít sữa bò! :bucket:`
            );
            const editUser = {
                totalMilk: roundDouble(user.totalMilk + milk),
                numberOfCow: user.numberOfCow,
                userId: interaction.user.id,
                lastTimeTakeMilk: new Date(),
                milkTank: [
                    ...user.milkTank,
                    { milk, takingTime: new Date() },
                ],
            };
            await updateUser(user._id, editUser);
        } else {
            interaction.reply(
                `**${interaction.user.tag.split('#')[0]
                }** bạn vừa vắt hết sữa hôm nay rồi :open_mouth: ! Hôm sau quay lại nhé :wink: !`
            );
        }
    }
} else {
    await addUser(interaction.user.tag, interaction.user.id, milk);
    interaction.reply(
        `Lần đầu tiên, **${interaction.user.tag.split('#')[0]
        }** vừa vắt được ${milk} lít sữa bò!`
    );
}
};

export { data, execute };
