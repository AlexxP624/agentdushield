const Discord = require('discord.js');
const ms = require('ms') //npm i ms
const db = require('quick.db');

module.exports.run = async(client, message, args) => {
  const color = db.get(`color_${message.guild.id}`);
    function parseDur(ms) {
        let seconds = ms / 1000,
            days = parseInt(seconds / 86400);
        seconds = seconds % 86400
        
        let hours = parseInt(seconds / 3600);
        seconds = seconds % 3600
        
        let minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60)
        
        if (days) {
          return `${days} jours, ${hours} heures, ${minutes} minutes`
        } else if (hours) {
          return `${hours} heures, ${minutes} minutes, ${seconds} secondes`
        } else if (minutes) {
          return `${minutes} minutes, ${seconds} secondes`
        }
        return `${seconds} secondes`
      } // Uptime bot.

    const embed = new Discord.MessageEmbed()
        .setColor(`${color || "BLACK"}`)
        .setAuthor(`${client.user.username} Uptime`)
        .setDescription(`${parseDur(client.uptime)}`)
        message.channel.send(embed)
}

module.exports.help = {
    name: "uptime"
}