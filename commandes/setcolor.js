const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db')
module.exports = {
    name: "setcolorembed",
    description: "Permet de changer le prefix du bot",
    usage: ".setcolorembed <nouveau prefix>",
    run: async (client, message, args) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
    
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(":x: Vous n'avez pas la permission !");
        if(!args[0] || args[0 == "help"]) return message.reply(":x: Utilise : +setcolor <ta nouvelle couleurs> !");
    
        db.set(`color_${message.guild.id}`, args[0])
        const color = db.get(`color_${message.guild.id}`)
        let sEmbed = new Discord.MessageEmbed()
        .setColor(`${color || "BLACK"}`)
        .setTitle("Nouvelle couleur embed")
        .setDescription(`Couleurs : ${args[0]}`)
        message.channel.send(sEmbed);
    }
}

module.exports.help = {
    name: "setcolor"
}