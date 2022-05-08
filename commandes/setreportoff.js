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

        db.delete(`reportchannel_${message.guild.id}`)

        message.channel.send(`Les logs des messages de report sont maintenant désactivé`)
    }
}

module.exports.help = {
    name: "setreportoff"
}