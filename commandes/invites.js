const Discord = require('discord.js')
const db = require('quick.db')
const { getMember, formatDate } = require("../functions");

module.exports = {
  name: "invites",
  description: "Permet de affiché les invitations du membre",
  usage: ".invites",
  run: async (client, message, args) => {
    if(message.channel.type === "dm") return;
    if (message.author.bot) return;
    const color = db.get(`color_${message.guild.id}`)
    const member = getMember(message, args.join(" "));
    let invites = await message.guild.  fetchInvites();
    let userInv = invites.filter(u => u.inviter && u.inviter.id === member.id)
    if(userInv.size <= 0) {
      return message.channel.send(`:x: ${member} n'a pas d'invitations !`)
    }
    let i = 0;
    userInv.forEach(inv => i += inv.uses)

    const embed = new Discord.MessageEmbed()
    .setAuthor(`📜 Invitations de ${member.displayName}`, member.user.displayAvatarURL)
    .addField("**Invitations :**", `${member} à inviter ${i} membres.`)
    .setColor(`${color || "BLACK"}`)
    message.channel.send(embed)
  }
}

module.exports.help = {
    name: 'invites'
}