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
        const report = db.get(`reportchannel_${message.guild.id}`)
        let channel = message.mentions.channels.first()

        if(!channel) {
            return message.channel.send(":x: Veuillez mentionner un salon !")
        }

        db.set(`reportchannel_${message.guild.id}`, channel.id)
        if(report) {
        message.channel.send("Les logs des message de report est déjà activé !")

        } else {
        message.channel.send(`Les messages de report seront mis sur : **${channel}**`)
        }
    }
}

module.exports.help = {
    name: "setreport"
}