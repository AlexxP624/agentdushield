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
        const voice = db.get(`voicechannel_${message.guild.id}`)
        let channel = message.mentions.channels.first()

        if(!channel) {
            return message.channel.send(":x: Veuillez mentionner un salon !")
        }

        db.set(`voicechannel_${message.guild.id}`, channel.id)
        if(voice) {
            message.channel.send("Les logs des voice sont déjà activé !")
        } else {
            message.channel.send(`Les logs des voice seront mis sur : ${channel}`)
        }

    }
}

module.exports.help = {
    name: "setlogvoice"
}