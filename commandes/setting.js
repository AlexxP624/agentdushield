const ms = require('ms');
const humanize = require("humanize-duration");
const Discord = require('discord.js');
const db = require('quick.db')
const fs = require("fs")
const config = require('../config.json')

module.exports = {
    name: "slowmode",
    description: "Permet de mettre un slowmode",
    usage: ".slowmode <temps> || .slowmode <#channel> <temps>",
    run: async (client, message, args) => {
      if (message.channel.type === "dm") return;
      if (message.author.bot) return;
      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      let embedcolor = JSON.parse(fs.readFileSync("./embedcolor.json", "utf8"));

      if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
          prefixes: config.prefix
        };
      }
      let edi = db.get(`editchannel_${message.guild.id}`);
      const color = db.get(`color_${message.guild.id}`)
      const voice = db.get(`voicechannel_${message.guild.id}`)
      const link = db.get(`antilink_${message.guild.id}`)
      const joinc = db.get(`joinchannel_${message.guild.id}`)
      const anti = db.get(`antispam_${message.guild.id}`)
      const leavec = db.get(`leavechannel_${message.guild.id}`)
      let role = db.get(`autoRole_${message.guild.id}`)
      let reportchan = db.get(`reportchannel_${message.guild.id}`)
      let level = db.get(`levelchannel_${message.guild.id}`)
      const ticket = db.get(`ticket_${message.guild.id}`)

      var embed = new Discord.MessageEmbed()
        .setTitle("Settings")
        .setColor(`${color || "BLACK"}`)
        .setDescription(`**Prefix :** ${prefixes[message.guild.id].prefixes}
        **Log des messages :** ${client.channels.cache.get(edi) || "`Off`"}
        **Log des voices :** ${client.channels.cache.get(voice) || "`Off`"}
        **Log des joins :** ${client.channels.cache.get(joinc) || "`Off`"}
        **Log des leave :** ${client.channels.cache.get(leavec) || "`Off`"}
        **Log des messages de report :** ${client.channels.cache.get(reportchan) || "`Off`"}
        **Level log :** ${client.channels.cache.get(level) || "`Off`"}
        **Tickets :** ${ticket || "`Off`"}
        **Antilink :** ${link || "`Off`"}
        **Autorole :** ${role || "`Rien`"}
        **Couleurs :** ${color || "`BLACK`"}`) //**Antispam :** ${anti || "`Off`"}
      message.channel.send(embed)
    }
}

module.exports.help = {
  name: "setting"
}