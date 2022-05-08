const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();

module.exports = {
    name: "setEdit",
    description: "Si un message et modifié vous pourrais quand même voir l'anciens avant qu'il est modifié.",
    usage: ".setEdit <#channel>",
    run: async(client, message, args) => {
        const spam = db.get(`antispam_${message.guild.id}`)
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ Vous n'avez pas la permission !")

        db.set(`antispam_${message.guild.id}`, "On")
        if (spam){
            message.channel.send("L'antispam est déja activé")
        } else {
            message.channel.send(`L'antispam est maintenant activé`)
        }
    }
}

module.exports.help = {
    name: "antispam"
}