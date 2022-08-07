const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Get User Info"),
  async execute(interaction) {
    await interaction.reply("User info.");
  },
};
