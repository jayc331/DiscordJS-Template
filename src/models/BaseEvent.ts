import { type ClientEvents } from "discord.js";

export abstract class BaseEvent<T extends keyof ClientEvents> {
	abstract readonly name: T;
	readonly once: boolean = false;
	abstract execute(...args: ClientEvents[T]): Promise<void> | void;
}
