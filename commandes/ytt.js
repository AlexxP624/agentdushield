const Discord = require("discord.js");
const fetch = require('node-fetch')
const config = require('../config.json')
const token = config.token

module.exports = {
  name: "warnings",
  description: "Permet de voir les warns de la personnes mentionner.",
  usage: ".warnings",
  run: async (client, message, args) => {
    if (message.channel.type === "dm") return;
    if(message.author.id != "598597108467236874") return;
    if (message.author.bot) return;
    let channel = message.member.voice.channel;
    if (!channel) return message.channel.send(":x: Veuillez vous connecter sur un canal vocal !")
    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
      method: "POST",
      body: JSON.stringify({
        max_age: 86400,
        max_uses: 0,
        target_application_id: "755600276941176913",
        target_type: 2,
        temporary: false,
        validate: null
      }),
      headers: {
        "Authorization": `Bot ${token}`,
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(invite => {
      if (!invite.code) return message.channel.send("Sadly i can't start ytt")
      const e = new Discord.MessageEmbed()
        .setDescription(`[Clique Sur Moi](https://discord.com/invite/${invite.code})`)
        .setColor("BLACK")
      message.channel.send(e)
    })
  }
}

module.exports.help = {
  name: "ytt"
}