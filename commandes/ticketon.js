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
        db.set(`ticket_${message.guild.id}`, "On")
        message.channel.send(`Les tickets sont activé !`)
    }
}

module.exports.help = {
    name: "ticketon"
}