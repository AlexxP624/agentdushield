const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    if(message.channel.type === "dm") return;
    const color = db.get(`color_${message.guild.id}`)
    if (message.author.bot) return;
    message.channel.send("Calcule le ping...").then((resultMessage) => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp
        let embed = new Discord.MessageEmbed()
        .setColor(`${color || "BLACK"}`)
        .addField("Votre ping", `${ping}ms`, true)
        .addField("Ping du Bot", `${client.ws.ping}ms`, true)
        resultMessage.edit(embed)
    })
}

module.exports.help = {
    name: "ping"
}