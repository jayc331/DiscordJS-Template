import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import { BaseCommand } from "../../models/BaseCommand.ts";

export default class PingCommand extends BaseCommand {
	readonly data = new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!");

	override cooldown = 3

	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply("Pong!");
	}
}
