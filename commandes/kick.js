const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const ms = require('ms');
const db = require('quick.db')

module.exports = {
    name: "mute",
    description: "Permet de mute l'utilisateur mentionné",
    usage: "mute <@user>",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if (message.author.bot) return;

        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("❌ Vous n'avez pas la permission de expulser")
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("❌ Je n'est pas la permission de kick !");
        const user = message.mentions.users.first();
        if(user === message.author) return message.channel.send("❌ Vous ne pouvez pas vous kick vous même :)")
        if(user) {
            const member = message.guild.member(user)
            if(member) {
                member.kick(' ').then(() => {
                    message.reply(`${user.tag} a été kick avec succès !`)
                }).catch(err => {
                    message.reply("❌ Vous n'avez pas la permission d'expluser une personne")
                })
            }else{
                message.reply("❌ Cet utilisateur n'est pas dans le serveur")
            }
        }else{
            message.reply("❌ Vous n'avez mentionné personne !")
        }
        let embed = new Discord.MessageEmbed()
        .setColor(`BLACK`)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .addField("Exclu", stripIndents`**> Utilisateur qui a reçu le kick :** ${user.tag}
        **> Excpulser par :** ${message.author.username}
        **> Date :** ${message.createdAt.toLocaleString()}`)
    
            message.channel.send(embed)
            db.set(`kick_${message.guild.id}`, 0)
            db.add(`kick_${message.guild.id}_${user.id}`, 1)

    }
}

module.exports.help = {
    name: "kick"
}