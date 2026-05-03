import { REST, Routes } from "discord.js";
import type { APIApplicationCommand } from "discord.js";
import { loadCommands } from "./utils/loader.ts";

const commands = await loadCommands();
const commandsJSON = commands.map(cmd => cmd.data.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

void (async () => {
	try {
		console.log(`Started refreshing ${commandsJSON.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
			{ body: commandsJSON },
		) as APIApplicationCommand[];

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		console.error(error);
	}
})();
