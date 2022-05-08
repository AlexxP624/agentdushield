const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();

module.exports = {
    name: "setEdit",
    description: "Si un message et modifié vous pourrais quand même voir l'anciens avant qu'il est modifié.",
    usage: ".setEdit <#channel>",
    run: async(client, message, args) => {
        const link = db.get(`antilink_${message.guild.id}`)
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ Vous n'avez pas la permission !")

        db.set(`antilink_${message.guild.id}`, "On")
        if (link){
            message.channel.send("L'antilink est déja activé")
        } else {
            message.channel.send(`L'antilink est maintenant activé`)
        }

    }
}

module.exports.help = {
    name: "antilink"
}