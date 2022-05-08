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

        let channel = message.mentions.channels.first()
        const mes = db.get(`deletechannel_${message.guild.id}`)
        if(!channel) {
            return message.channel.send(":x: Veuillez mentionner un salon !")
        }

        db.set(`deletechannel_${message.guild.id}`, channel.id)
        db.set(`editchannel_${message.guild.id}`, channel.id)
        if(mes) {
            message.channel.send("Les logs des messages sont déjà activé !")
        } else {
            message.channel.send(`Les logs des messages seront mis sur : ${channel}`)
        }   
    }
}

module.exports.help = {
    name: "setlogmessage"
}