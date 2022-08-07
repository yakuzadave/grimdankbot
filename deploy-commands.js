const path = require('node:path');
const fs = require('node:fs');

// import the SlashCommandBuilder and Routes modules from discord.js
const {
  SlashCommandBuilder,
  Routes,
} = require("discord.js");

// import the Discord.js REST module
const { REST } = require("@discordjs/rest");

// import the .env file values
require("dotenv").config();
const clientId = process.env.CLIENT_ID;
const token = process.env.BOT_TOKEN; // bot token;
const guildId = process.env.GUILD_ID; // guild id;

// Create and register the commands
const commands = []
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) { 
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}




// Create the Discord.js REST client and register the commands
const rest = new REST({ version: "10" }).setToken(token);


// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
//     .then(() => console.log("Commands successfully deployed."))
//     .catch(err => console.error(err));


(async () => { 
    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        console.log("Commands successfully deployed.");
    } catch (err) {
        console.error(err);
    }
}) 