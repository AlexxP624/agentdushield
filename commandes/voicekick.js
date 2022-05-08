const Discord = require("discord.js");

module.exports = {
    name: "warnings",
    description: "Permet de voir les warns de la personnes mentionner.",
    usage: ".warnings",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if (message.author.bot) return
        if(!message.member.permissions.has("MOVE_MEMBERS")) return message.channel.send(":x: Vous n'avez pas la permission !")
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(":x: Veuillez mentionner le membre !")
        if(!member.voice.channel) {
            message.channel.send(":x: Ce membre n'est pas dans un salon vocal !")
        } else {
            member.voice.kick().then(channel => {
                message.channel.send(`Je viens de kick ${member} du salon vocal.`)
            })
        }
    }
}

module.exports.help = {
    name: "voicekick"
}