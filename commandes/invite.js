const Discord = require('discord.js')
const { stripIndents } = require("common-tags");


module.exports = {
  name: "ban",
  description: "Permet de banir l'utilisateur mentionné",
  usage: ".ban <@user> <raison>",
  run: async (client, message, args) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    message.channel.send("https://discord.com/oauth2/authorize?client_id=877177600307511386&permissions=8&scope=bot");
  }
}

module.exports.help = {
  name: "invite"
}
