import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";

export abstract class BaseCommand {
	abstract readonly data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
	abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;
	readonly cooldown: number = 0;
}
