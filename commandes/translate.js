const Discord = require('discord.js')
const db = require('quick.db')
const translate = require('@iamtraction/google-translate');


module.exports = {
    name: "translate",
    description: "Permet de traduire du text dans langue que vous voulez.",
    usage: ".translate <ISO> <text> `ex ISO : en --> **Anglais**. fr --> **Français**.`",
    run: async(client, message, args) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        const color = db.get(`color_${message.guild.id}`)
        const txt = args.slice(1).join(" ")
        const lang = args[0]
        if(!lang) return message.channel.send(":x: Veuillez fournir un code ISO de la langue !")
        if(!txt) return message.channel.send(":x: S’il vous plaît fournir un texte à traduire !")
        translate(txt, { to: lang }).then(res => {
            const embed = new Discord.MessageEmbed()
            .setDescription(res.text)
            setColor(`${color || "BLACK"}`)
            message.channel.send(embed)
        }).catch(err => {
            message.channel.send(":x: Veuillez fournir un code ISO **valide** !")
        })
    }
}

module.exports.help = {
    name: "translate"
}