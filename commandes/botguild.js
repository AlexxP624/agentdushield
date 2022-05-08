const Discord  = require('discord.js');
const ms = require('ms');
const { stripIndents } = require("common-tags");

module.exports = {
    name: "tempmute",
    description: "Permet de tempmute l'utilisateur mentionné",
    usage: ".tempmute <@user> <temps>",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if (message.author.bot) return;
       let guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(70)

       const description = guilds.map((guild, index) => {
         return `\`${index+1}\`. ${guild.name} -> ${guild.memberCount} membres -> ${guild.owner.user.tag}`
       }).join('\n')

       message.channel.send(
         new Discord.MessageEmbed()
         .setTitle("Top 10 Des Serveur où est AlexxBot")
         .setColor("RANDOM")
         .setDescription(description)
       )    
       
    }
}

module.exports.help = {
    name: "botguild"
}