import { Events, MessageFlags, type Interaction, Collection } from "discord.js";
import { BaseEvent } from "../models/BaseEvent.ts";

export default class InteractionCreateEvent extends BaseEvent<Events.InteractionCreate> {
	readonly name = Events.InteractionCreate;

	async execute(interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		// Handle Cooldowns
		if (command.cooldown > 0) {
			const { cooldowns } = interaction.client;

			if (!cooldowns.has(command.data.name)) {
				cooldowns.set(command.data.name, new Collection());
			}

			const now = Date.now();
			const timestamps = cooldowns.get(command.data.name)!;
			const cooldownAmount = command.cooldown * 1000;

			if (timestamps.has(interaction.user.id)) {
				const expirationTime = timestamps.get(interaction.user.id)! + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					const message = `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.data.name}\` command.`;

					if (interaction.replied || interaction.deferred) {
						await interaction.followUp({ content: message, flags: MessageFlags.Ephemeral });
					}
					else {
						await interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
					}
					return;
				}
			}

			timestamps.set(interaction.user.id, now);
			// Reduce memory bloat
			setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
		}

		// Execute Command
		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			const errorMessage = "There was an error while executing this command!";

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: errorMessage, flags: MessageFlags.Ephemeral });
			}
			else {
				await interaction.reply({ content: errorMessage, flags: MessageFlags.Ephemeral });
			}
		}
	}
}
