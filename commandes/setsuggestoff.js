const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "setReport",
    description: "Permet de envoyé un message report dans le salon defini.",
    usage: ".setReport <#channel>",
    run: async(client, message, args) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ Vous n'avez pas la permission !")
        db.delete(`suggestion_${message.guild.id}`)
        message.channel.send(`Les suggestions sont désactivé.`)
    }
}

module.exports.help = {
    name: "setsuggestoff"
}