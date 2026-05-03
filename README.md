# Discord.js Template

A modular, typescript template for Discord.js bots

## Requirements

- [Bun](https://bun.sh) runtime.

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in your `DISCORD_TOKEN`, `CLIENT_ID`, and `GUILD_ID`.

## Installation

```bash
bun install
```

## Commands

- **Deploy Commands**: `bun run deploy` (Registers guild slash commands with Discord)
- **Development**: `bun run dev` (Runs with auto-reloading)
- **Production**: `bun start`
- **Linting**: `bun lint`

## Structure

Organise your `commands` and `events` in their respective directories and any subdirectories of your choosing.

- `src/commands/`
- `src/events/`
