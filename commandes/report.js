const Discord = require('discord.js')
const { stripIndents } = require('common-tags')
const db = require('quick.db')
const client = new Discord.Client()

module.exports = {
    name: "report",
    description: "Permet de report un utilisateur",
    usage: ".report <@user> <raison>",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if (message.author.bot) return;

        if(message.deletable) message.delete();

      const channel = db.get(`reportchannel_${message.guild.id}`)
        //const channel = message.guild.channels.find(c => c.name === "reports")
        if(!channel)
            return message.channel.send(`Désoler, il n'a pas de salon défini encore sur se serveur pour les messages de report. Pour le setup veuillez faire : **+setreport <#channel>**`)
        let rMember = message.mentions.members.first();
        if(!rMember) 
            return message.channel.send(":x: Veuillez mentionner un utilisateur !");

        //if(rMember.hasPermissions("BAN_MEMBERS") || rMember.user.bot)
          //  return message.channel.send(":x: Je ne peux pas report cet utilisateur !")
        
        if(!args[1]) 
            return message.channel.send(":x: Veuillez dire une raison !")
        
        message.reply("✅ Votre report à bien été envoyer !").then(msg => msg.delete(3000))

        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL())
            .setAuthor("Membre report", rMember.user.displayAvatarURL())
            .setDescription(stripIndents`**> Membre :** ${rMember} (${rMember.id})
            **> Report par :** ${message.author} (${message.author.id})
            **> Report dans :** ${message.channel}
            **> Raison :** ${args.slice(1).join(" ")}
            **> Date :** ${message.createdAt.toLocaleString()}`)

        client.channels.cache.get(channel).send(embed)

    }
}

module.exports.help = {
    name: "report"
}