const Discord = require('discord.js')
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
    name: "addrole",
    description: "Permet de ajouter un rôle a l'utilisateur mentionné",
    usage: ".addrole <@user> <@role> <raison>",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if(message.author.bot) return;
        message.delete();
    
        if(message.author.id != "677908734911053855") return message.reply("<a:Nop:778978668445040680> Vous n'avez pas la permission !")
        if(message.author.id != "677908734911053855") return message.reply("<a:Nop:778978668445040680> Je n'est pas la permission de ajouté des rôles !")
        const color = db.get(`color_${message.guild.id}`);
        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
        if(!rMember) return message.channel.send("<a:Nop:778978668445040680> Veuillez mentionner un utilisateur pour lui ajouter son rôle !")
        let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
        if(!role) return message.channel.send("<a:Nop:778978668445040680> Veuillez dire le nom du rôle ou le mentionner pour l'ajouter a l'utilisateur !") 
    
        if(rMember.roles.cache.has(role.id)) {
            return message.channel.send(`<a:Nop:778978668445040680> ${rMember.displayName} a déjà le rôle !`)
        } else {
            await rMember.roles.add(role.id).catch(e => console.log(e.message))
            message.channel.send(`<a:Yeah:778978676283932712> Le rôle ${role.name}, a été ajouté à ${rMember.displayName} avec succès !`)
        }
    
        let embed = new Discord.MessageEmbed()
        .setColor(`${color || "BLACK"}`)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .addField("Add Role", stripIndents`**> Commande :** +addrole
        **> Utilisateur qui a reçu le rôle :** ${rMember.user.username}
        **> Ajouté par :** ${message.author.username}
        **> Rôle : ** ${role.name}
        **> Date :** ${message.createdAt.toLocaleString()}`)
            message.channel.send(embed)
    }
}

module.exports.help = {
    name: "addrole"
}
