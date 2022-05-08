const ms = require('ms');
const humanize = require("humanize-duration");
const Discord = require('discord.js');
const db = require('quick.db')


module.exports = {
    name: "slowmode",
    description: "Permet de mettre un slowmode",
    usage: ".slowmode <temps> || .slowmode <#channel> <temps>",
    run: async (client, message, args) => {
      const color = db.get(`color_${message.guild.id}`)
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(":x: Vous n'avez pas la permission !")
        };
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.reply("❌ Je n'est pas la permission de gérer des salons !");
        let channel = message.mentions.channels.first() || message.channel;// ? message.mentions.channel.first() : message.channel;
        let time = message.mentions.channels.first() ? args[1] : args[0];
        let deja = new Discord.MessageEmbed()
            .setDescription("Ce channel a déjà été un-slowmoded !")
            .setColor(`${color || "BLACK"}`)
        let slow = new Discord.MessageEmbed()
            .setDescription(`<#${channel.id}> slowmode a été désactivé.`)
            .setColor(0x7289DA)
        if (time === "reset" || time === "off") {
            if (channel.rateLimitPerUser < 1) 
            return message.channel.send(deja)
            await channel.setRateLimitPerUser(0);
            return message.channel.send(slow)
        }
        if (!time) return message.channel.send(":x: Veuillez dire le temps ! `ex : 30m, 90m ou 105m`");

        let toMS = ms(time);
        let result = Math.floor(toMS / 1000);

        if (!result) return message.channel.send(":x: Veuillez mettre un temps **valide** ! `ex : 30m, 90m ou 105m`");
        if (result > 21600) return message.channel.send(":x: Le temps devrait être inférieur ou égal à 6 heures.");
        else if (result < 1) return message.channel.send(":x: Le temps devrait être supérieur ou égal à 1 seconde.");

        let slowyes = new Discord.MessageEmbed()
            .setDescription(`<#${channel.id}> est maintenant au ralenti pour : ${humanize(toMS)}.`)   
            .setColor(0x7289DA)

        await channel.setRateLimitPerUser(result);
        return message.channel.send(slowyes)
    }
}

module.exports.help = {
    name: "slowmode"
}