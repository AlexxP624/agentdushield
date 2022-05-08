const Discord = require('discord.js')
const { stripIndents } = require("common-tags");


module.exports = {
  name: "ban",
  description: "Permet de banir l'utilisateur mentionné",
  usage: ".ban <@user> <raison>",
  run: async (client, message, args) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    message.channel.send("Voici le serveur Support ! https://discord.gg/BSBGj5Fa9v");
  }
}

module.exports.help = {
  name: "support"
}
