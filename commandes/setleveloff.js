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

        db.delete(`levelchannel_${message.guild.id}`)

        message.channel.send(`Les messages de levels ne se envera plus dans le salon que vous avez défini.`)
    }
}

module.exports.help = {
    name: "levellogoff"
}