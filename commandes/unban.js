const Discord = require('discord.js')
const { stripIndents } = require("common-tags");
const db = require('quick.db')

module.exports = {
    name: "ban",
    description: "Permet de banir l'utilisateur mentionné",
    usage: ".ban <@user> <raison>",
    run: async (client, message, args) => {
        message.delete()
        const color = db.get(`color_${message.guild.id}`)
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")){
            return message.reply("❌ Vous n'avez pas la permission de bannir")
        }
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("❌ Je n'est pas la permission de bannir !");
        
        let mentionMember = args[0];
        if(!mentionMember) return message.channel.send(":x: Veuillez mettre l'id d'un utilisateur !");
        let embed = new Discord.MessageEmbed()
        .setColor(`${color || "BLACK"}`)
        .setDescription(`${mentionMember} as bien été unban par ${message.author.username}`)
        message.guild.members.unban(mentionMember).then(() => message.channel.send(embed));
    }
}

module.exports.help = {
    name: "unban"
}
