const { Message } = require('discord.js');

module.exports.run = async(client, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Vous n'avez pas la permission !");
    if(!message.guild.me.hasPermission("MANAGE_CHANNEL")) return message.channel.send(":x: Je n'ai pas la permission de MANAGE_CHANNELS");

    message.channel.clone().then((ch) => {
        ch.setParent(message.channel.parent.id);
        ch.setPosition(message.channel.position);
        message.channel.delete();

        ch.send(`Salon recréé par ${message.author}`)
    })
}

module.exports.help = {
    name: "nuke"
}