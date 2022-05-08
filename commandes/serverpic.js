const Discord = require('discord.js')
const { stripIndents } = require("common-tags");
const db = require('quick.db')

module.exports = {
    name: "ban",
    description: "Permet de banir l'utilisateur mentionné",
    usage: ".ban <@user> <raison>",
    run: async (client, message, args) => {
      const color = db.get(`color_${message.guild.id}`)
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        let embed = new Discord.MessageEmbed()
        .setColor(`${color || "BLACK"}`)
        .setAuthor(`${message.guild.name}`)
        .setImage(message.guild.iconURL())
       message.channel.send(embed);
    }
}

module.exports.help = {
    name: "serverpic"
}
