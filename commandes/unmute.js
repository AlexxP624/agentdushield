const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const db = require('quick.db')

module.exports = {
    name: "unmute",
    description: "Permet de unmute l'utilisateur mentionné",
    usage: ".unmute <@user>",
    run: async (client, message, args) => {
      const color = db.get(`color_${message.guild.id}`)
        if(message.channel.type === "dm") return;
        if (message.author.bot) return;

        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply(":x: Vous n'avez pas la permission !")
        if(!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.reply("❌ Je n'est pas la permission de unmute !");
        let mute = message.mentions.members.first() //|| message.guild.members.get(args[0])
        if(!mute) return message.channel.send(":x: Veuillez mentioner un utilisateur !")

        let muterole = message.guild.roles.cache.find(r => r.name === "Agent - Muted")
        if(!muterole) return message.channel.send(":x: Je n'ai pas trouvé le rôles `Agent - Muted` !")

        db.delete(`membermuted_${message.guild.id}_${mute.id}`)
        await mute.roles.remove(muterole.id).then(() => {
            var embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL)
            .setColor(`${color || "BLACK"}`)
            .addField("Mute", stripIndents`**> Commande :** +unmute
            **> Utilisateur qui a reçu le unmute :** <@${mute.id}>
            **> Unmute par :** ${message.author.username}
            **> Date :** ${message.createdAt.toLocaleString()}`)
            message.channel.send(embed)
        })
        }
    }

module.exports.help = {
    name: "unmute"
}