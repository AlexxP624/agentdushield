const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "setEdit",
    description: "Si un message et modifié vous pourrais quand même voir l'anciens avant qu'il est modifié.",
    usage: ".setEdit <#channel>",
    run: async(client, message, args) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ Vous n'avez pas la permission !")
        let roles = db.get(`autoRole_${message.guild.id}`)
        let role = message.mentions.roles.first()
        if(!role) {
            return message.channel.send(":x: Veuillez mentionner un rôle !")
        }
        db.set(`autoRole_${message.guild.id}`, role.id)
        /*if(roles) {
            message.channel.send(`L'autorole est déjà activé`)
        } else {*/
            message.channel.send(`L'autorole est mis sur : ${message.mentions.roles.first()}`)
        //}

    }
}

module.exports.help = {
    name: "setautorole"
}