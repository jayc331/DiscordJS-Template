import { Collection } from "discord.js";
import { BaseCommand } from "../models/BaseCommand.ts";

declare module "discord.js" {
	export interface Client {
		commands: Collection<string, BaseCommand>;
		cooldowns: Collection<string, Collection<string, number>>;
	}
}
