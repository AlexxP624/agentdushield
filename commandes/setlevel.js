const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "setLevel",
    description: "Permet de envoyé un message de levelup dans le salon defini.",
    usage: ".setLevel <#channel>",
    run: async(client, message, args) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ Vous n'avez pas la permission !")
        
        let channel = message.mentions.channels.first()

        if(!channel) {
            return message.channel.send(":x: Veuillez mentionner un salon !")
        }

        db.set(`levelchannel_${message.guild.id}`, channel.id)

        message.channel.send(`Les messages de levelup seront mis sur : **${channel}**`)
    }
}

module.exports.help = {
    name: "levellog"
}