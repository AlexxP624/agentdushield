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
        
        let mentionMember = message.mentions.members.first();
        if(!mentionMember) return message.channel.send(":x: Veuillez mentionner un utilisateur !");
        const reason = args.slice(1).join(' ')
        if(!reason) return message.channel.send(":x: Veuillez mettre une raison !")
        
        let embed = new Discord.MessageEmbed()
        .setColor(`${color || "BLACK"}`)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .addField("Banissement", stripIndents`**> Commande :** &ban
        **> Utilisateur qui a reçu le ban :** ${mentionMember}
        **> Banni par :** ${message.author.username}
        **> Raison : ** ${reason}
        **> Date :** ${message.createdAt.toLocaleString()}`)
        await mentionMember.ban({ reason: reason }).then(() => message.channel.send(embed));
        //db.set(`ban_${message.guild.id}_${mentionMember.id}`, 0)
        db.add(`ban_${message.guild.id}_${mentionMember.id}`, 1)
    }
}

module.exports.help = {
    name: "ban"
}
