const Discord = require('discord.js');
const db = require('quick.db')


module.exports.run = async(client, message, args) => {
    if(message.channel.type === "dm") return;
    if (message.author.bot) return;
    const member = message.guild.members.cache.get()
    const color = db.get(`color_${message.guild.id}`)
    if(!message.guild.premiumSubscriptionCount) {
        message.channel.send(":x: Il n'a pas de boost sur le serveur !")
    } else {
        const embed = new Discord.MessageEmbed()
        .setColor(`${color || "BLACK"}`)
        .addField("Nombre de boosts :", message.guild.premiumSubscriptionCount)
        .addField("Tier :", message.guild.premiumTier)
        message.channel.send(embed)
    }
}

module.exports.help = {
    name: "boost"
}