// import values from .env file
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const token = process.env.BOT_TOKEN; // bot token;

// import all the dependencies needed to start Discord.js
const fs = require("node:fs");
const path = require("node:path");
const moment = require("moment");
const { Client, GatewayIntentBits, Collection} = require('discord.js');
const { REST } = require('@discordjs/rest');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});

// Import the command files
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) { 
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

// import the event files
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) { 
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, event.execute);
    } else {
        client.on(event.name, event.execute);
    }
}




// Ready Client Event
client.once('ready', () => {
    console.log(`Ready to receive a message from ${CLIENT_ID}.`);
});



// Interaction Event Handler
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
        
    } catch (error) {
        console.error(error);
        await interaction.reply(`Sorry, I encountered an error trying to execute that command.`);
        
    }
}) 

client.login(token)



