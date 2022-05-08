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
      let embedcolor = JSON.parse(fs.readFileSync("./embedcolor.json", "utf8"));

      let user = message.mentions.members.first()

      let tempmute = db.get(`tempmute_${message.guild.id}_${user.id}`)
      let ban = db.get(`ban_${message.guild.id}_${user.id}`)
      let mute = db.get(`mute_${message.guild.id}_${user.id}`)
      let tempban = db.get(`tempban2_${message.guild.id}_${user.id}`)
      let kick = db.get(`kick_${message.guild.id}_${user.id}`)
let warn = db.get(`warnings_${message.guild.id}_${user.id}`)

      var embed = new Discord.MessageEmbed()
        .setAuthor(user.displayName, user.user.displayAvatarURL())
        .setColor("BLACK")
        .addField(`Nombre de mute:`,`${mute || "0"}`)
        .addField(`Nombre de tempmute:`,`${tempmute || "0"}`)
        .addField(`Nombre de ban:`,`${ban || "0"}`)
        .addField(`Nombre de tempban:`,`${tempban || "0"}`)
        .addField(`Nombre de kick:`,`${kick || "0"}`)
      .addField("Nombre de warn:", `${warn || "0"}`)



      message.channel.send(embed)
    }
}

module.exports.help = {
  name: "casier"
}