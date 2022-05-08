const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();

module.exports = {
    name: "setEdit",
    description: "Si un message et modifié vous pourrais quand même voir l'anciens avant qu'il est modifié.",
    usage: ".setEdit <#channel>",
    run: async(client, message, args) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ Vous n'avez pas la permission !")
        
        db.delete(`soutiens_${message.guild.id}`)
            message.channel.send(`Soutiens désactivé.`)

    }
}

module.exports.help = {
    name: "soutiensoff"
}