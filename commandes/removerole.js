const Discord = require('discord.js')
const { stripIndents } = require("common-tags");
const db = require('quick.db')

module.exports = {
    name: "removerole",
    description: "Permet de enlever un rôle a l'utilisateur mentionné",
    usage: ".removerole <@user> <@role> <raison>",
    run: async (client, message, args) => {
      const color = db.get(`color_${message.guild.id}`)
        if(message.channel.type === "dm") return;
        if(message.author.bot) return;
        message.delete();
    
        if(message.author.id != "677908734911053855") return message.reply("❌ Vous n'avez pas la permission !")
        //if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("❌ Je n'est pas la permission de gérer les rôles !")

        let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
        if(!rMember) return message.channel.send("❌ Veuillez mentionner un utilisateur pour lui retirer son rôle !")
        let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
        if(!role) return message.channel.send("❌ Veuillez dire le nom du rôle ou le mentionner pour le retirer a l'utilisateur !") 
        
        if(!rMember.roles.cache.has(role.id)) {
            return message.channel.send(`❌ ${rMember.displayName} n'as pas le rôle !`)
        } else {
            await rMember.roles.remove(role.id).catch(e => console.log(e.message))
            message.channel.send(`✅ Le rôle ${role.name}, a été retiré à ${rMember.displayName} avec succès !`)
        }
    
        let embed = new Discord.MessageEmbed()
        .setColor(`${color || "BLACK"}`)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .addField("Remove Role", stripIndents`**> Commande :** &removerole
        **> Utilisateur qui n'a plus le rôle :** ${rMember.user.username}
        **> Retiré par :** ${message.author.username}
        **> Rôle : ** ${role.name}
        **> Date :** ${message.createdAt.toLocaleString()}`)
    
        message.channel.send(embed)
    }
}

module.exports.help = {
    name: "removerole",
    aliases: ["rr", "-role"]
}