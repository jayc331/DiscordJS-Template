import { Client, GatewayIntentBits, Collection } from "discord.js";
import { loadCommands, loadEvents, registerCommands, registerEvents } from "./utils/loader.ts";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.cooldowns = new Collection();

const commands = await loadCommands();
const events = await loadEvents();
registerCommands(client, commands);
registerEvents(client, events);

client.login(process.env.DISCORD_TOKEN).catch(console.error);
