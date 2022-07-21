const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

// for guild-based commands
rest.delete(Routes.applicationGuildCommand(clientId, guildId, "999630160066248775"))
.then(() => console.log('Successfully deleted guild command'))
.catch(console.error);

// for global commands
rest.delete(Routes.applicationCommand(clientId, "999630160066248775"))
.then(() => console.log('Successfully deleted application command'))
.catch(console.error);
