const db = require('quick.db');
const Discord = require("discord.js");

module.exports = {
    name: "warnings",
    description: "Permet de voir les warns de la personnes mentionner.",
    usage: ".warnings",
    run: async (client, message, args) => {
      const color = db.get(`color_${message.guild.id}`)
        if(message.channel.type === "dm") return;
        if (message.author.bot) return;
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("❌ Vous n'avez pas la permission")
        const user = message.mentions.members.first();
        if(!user) return message.channel.send(":x: Veuillez mentionner un utilisateur !")
        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
        if(warnings === null) warnings = 0;
        const embed = new Discord.MessageEmbed()
        .setTitle(`🛑 Avertissement`)
        .setDescription(`${user} à **${warnings}** warn(s)`)
        .setColor(`${color || "BLACK"}`)
        message.channel.send(embed)
    }
}

module.exports.help = {
    name: "sanctions"
}