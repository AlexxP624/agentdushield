const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();

module.exports = {
    name: "setEdit",
    description: "Si un message et modifié vous pourrais quand même voir l'anciens avant qu'il est modifié.",
    usage: ".setEdit <#channel>",
    run: async(client, message, args) => {
        const join = db.get(`joinchannel_${message.guild.id}`)
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ Vous n'avez pas la permission !")
        let channel = message.mentions.channels.first()

        if(!channel) {
            return message.channel.send(":x: Veuillez mentionner un salon !")
        }
        db.set(`joinchannel_${message.guild.id}`, channel.id)
        /*if(join) {
            message.channel.send("Les message de join sont déjà activé !")
        } else {*/
            message.channel.send(`Message de join mis dans : ${channel}`)
        //}
    }
}

module.exports.help = {
    name: "setjoin"
}