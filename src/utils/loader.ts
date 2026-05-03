import fs from "node:fs";
import path from "node:path";
import { type Client, type ClientEvents } from "discord.js";
import { BaseCommand } from "../models/BaseCommand.ts";
import { BaseEvent } from "../models/BaseEvent.ts";

export function getFilesRecursive(basePath: string): string[] {
	return fs.readdirSync(basePath, { recursive: true })
		.filter((file): file is string => typeof file === "string" && (file.endsWith(".ts") || file.endsWith(".js")))
		.map(file => path.join(basePath, file));
}

export async function loadStructures<T>(dir: string, BaseClass: abstract new (...args: unknown[]) => T): Promise<T[]> {
	const files = getFilesRecursive(dir);
	const instances: T[] = [];

	for (const file of files) {
		try {
			const module = (await import(file)) as { default: unknown };
			const Export = module.default;

			if (typeof Export === "function" && Export.prototype instanceof BaseClass) {
				const ValidClass = Export as new (...args: unknown[]) => T;
				instances.push(new ValidClass());
			}
		}
		catch {
			console.log(`[WARNING] Failed to load structure at ${file}`);
		}
	}

	return instances;
}

const COMMANDS_PATH = path.join(import.meta.dir, "..", "commands");
const EVENTS_PATH = path.join(import.meta.dir, "..", "events");

export const loadCommands = () => loadStructures(COMMANDS_PATH, BaseCommand);

export const loadEvents = () => loadStructures(EVENTS_PATH, BaseEvent);

export function registerCommands(client: Client, commands: BaseCommand[]) {
	for (const command of commands) {
		client.commands.set(command.data.name, command);
	}
}

export function registerEvents(client: Client, events: BaseEvent<keyof ClientEvents>[]) {
	for (const event of events) {
		if (event.once) {
			client.once(event.name, (...args) => {
				void event.execute(...args);
			});
		}
		else {
			client.on(event.name, (...args) => {
				void event.execute(...args);
			});
		}
	}
}
