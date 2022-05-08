const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const ms = require('ms');
const db = require('quick.db')

module.exports = {
    name: "mute",
    description: "Permet de mute l'utilisateur mentionné",
    usage: "mute <@user>",
    run: async (client, message, args) => {
      const color = db.get(`color_${message.guild.id}`)
        if(message.channel.type === "dm") return;
        if (message.author.bot) return;

        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply(":x: Vous n'avez pas la permission !")
if(!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.reply("❌ Je n'est pas la permission de mute !");
        let mute = message.mentions.members.first() //|| message.guild.members.get(args[0])
        if(!mute) return message.channel.send(":x: Veuillez mentioner un utilisateur !")

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "Pas de raison !"
        //db.set(`mute_${message.guild.id}`, 0)
        

        let muterole = message.guild.roles.cache.find(r => r.name === "Agent - Muted")
        if(!muterole) {
            try {
                muterole = await message.guild.roles.create({
                    data: {
                    name: "Agent - Muted",
                    color: "#000000",
                    permissions: []
                    }
                })
                message.guild.channels.cache.filter(c => c.type === "text").forEach(async (channel, id) => {
                
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        CONNECT: false,
                        SPEAK: false,
                        ADD_REACTIONS: false
                    })
                })
                message.guild.channels.cache.filter(c => c.type === "voice").forEach(async (channel, id) => {
                
                    await channel.createOverwrite(muterole, {
                        SPEAK: false,
                    })
                })
            } catch(e) {
                console.log(e.stack)
            }
        }       
                db.set(`membermuted_${message.guild.id}_${mute.id}`, muterole.id)
        await mute.roles.add(muterole.id).then(() => {
            var embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL)
            .setColor(`${color || "BLACK"}`)
            .addField("Mute", stripIndents`**> Commande :** &mute
            **> Utilisateur qui a reçu le mute :** <@${mute.id}>
            **> Mute par :** ${message.author.username}
            **> Raison :** ${reason}
            **> Date :** ${message.createdAt.toLocaleString()}`)
            message.channel.send(embed)
            db.add(`mute_${message.guild.id}_${mute.id}`, 1)
        })
        if(mute.voice.channel) {
          mute.voice.kick()
        }
    }
}

module.exports.help = {
    name: "mute"
}