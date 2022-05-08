const Discord = require('discord.js')
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
    name: "addrole",
    description: "Permet de ajouter un rôle a l'utilisateur mentionné",
    usage: ".addrole <@user> <@role> <raison>",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if(message.author.bot) return;
        if(!args.length) {
          return message.channel.send(":x: Veuillez mettre un emoji pour l'ajouter à votre serveur !")
        }
        for (const emojis of args) {
          const getEmoji = Discord.Util.parseEmoji(emojis);

          if (getEmoji.id) {
            const emojiExt = getEmoji.animated ? ".gif" : ".png";
            const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExt}`;
            message.guild.emojis.create(emojiURL, getEmoji.name).then((emoji) => {
              message.channel.send(`<a:Yeah:778978676283932712> J'ai ajouté avec succès l'emoji : ${emoji} - (\`${emoji.name}\`) à votre serveur !`)
            })
          }
        }
    }
}

module.exports.help = {
    name: "addemoji"
}
