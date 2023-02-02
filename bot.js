// Initial requirements and variables
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
require('dotenv/config')
const { Connection } = require('@solana/web3.js')
const connection = new Connection(process.env.ENDPOINT, "confirmed");

// Sets the Bots intents on what it needs access to from the Discord API
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds]
});

// Gets path to command files
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Gets command data 
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

// One time after bot logs in
client.once('ready', async () => {
    // Displays in console as running
    console.log(`Solana RPC Bot is running!`);
});


// Handles receiving Discord Slash Commands
client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client, connection);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});
// Logs the bot in using the Bot Token
client.login(process.env.TOKEN);
