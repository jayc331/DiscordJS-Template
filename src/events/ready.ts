import { Events, type Client } from "discord.js";
import { BaseEvent } from "../models/BaseEvent.ts";

export default class ReadyEvent extends BaseEvent<Events.ClientReady> {
	readonly name = Events.ClientReady;
	override readonly once = true;

	execute(client: Client<true>) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}
}
