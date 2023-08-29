import { milk } from "../../commands/cow";
import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("milk")
  .setDescription("Vắt sữa bò");

async function execute(interaction: ChatInputCommandInteraction) {
  await milk(interaction);
}

export default { data, execute };
