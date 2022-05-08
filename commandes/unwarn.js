const db = require('quick.db');
const Discord = require("discord.js");

module.exports = {
    name: "unwarn",
    description: "Permet de retier un avertissement à un utilisateur.",
    usage: ".unwarn <@user> <nombre>",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if (message.author.bot) return;
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("❌ Vous n'avez pas la permission de warn")
        const user = message.mentions.members.first();
        if(!user) return message.channel.send(":x: Veuillez mentionner un utilisateur !")
        const nombre = args[1];
        if(!nombre) return message.channel.send(":x: Veuillez dire le nombre de warn que vous voulez supprimer a l'utilisateur")
        if(nombre > 3) {
          return message.channel.send(`:x: Désoler, c'est impossible de supprimer ${nombre} warns à ${user} car la limite de warn est de **3** !`)
        }
        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
        if(warnings === null) {
          return message.channel.send(`❌ ${message.mentions.members.first} n'a pas de warn !`)
        }
        db.subtract(`warnings_${message.guild.id}_${user.id}`, args[1])
        message.channel.send(`J'ai supprimer ${nombre} warn(s) à ${user}`)
    }
}

module.exports.help = {
    name: "unwarn"
}