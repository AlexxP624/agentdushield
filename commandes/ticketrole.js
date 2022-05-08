const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const disbut = require('discord-buttons')
const db = require("quick.db")

module.exports = {
    name: "deletechannel",
    description: "Permet de le salon dit",
    usage: ".deletechannel <name>",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        /*if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":x: Cette commande n'est pas accésible pour vous.")
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.reply("❌ Je n'est pas la permission de supprimer un salon !")/*
/*        let role = message.mentions.roles.first()
        if(!role) return message.channel.send(":x: Veuillez mentionner un rôle !")
        let channel = message.guild.channels.cache.has("ticket")
        /*const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(":x: Veuillez mentionner un salon")*/
      let role = "798199340538527814"
  message.channel.updateOverwrite(role, {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true
})
    }
}

module.exports.help = {
    name: "ticketrole"
}