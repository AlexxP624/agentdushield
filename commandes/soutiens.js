const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();

module.exports = {
    name: "setEdit",
    description: "Si un message et modifié vous pourrais quand même voir l'anciens avant qu'il est modifié.",
    usage: ".setEdit <#channel>",
    run: async(client, message, args) => {
       /* const link = db.get(`soutiens_${message.guild.id}`)
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ Vous n'avez pas la permission !")
        
        db.set(`soutiens_${message.guild.id}`, 'On')
        if (link){
            message.channel.send("Soutiens déjà activé")
        } else {
            message.channel.send(`Si un membre a discord.gg/rbxfr dans son status, ça lui ajoutera le role si il envoie un message.`)
        }

    }
}*/
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ Vous n'avez pas la permission !")
        //let roles = db.get(`autoRole_${message.guild.id}`)
        let role = message.mentions.roles.first()
        if(!role) {
            return message.channel.send(":x: Veuillez mentionner un rôle !")
        }
        db.set(`soutiens_${message.guild.id}`, role.id)
        /*if(roles) {
            message.channel.send(`L'autorole est déjà activé`)
        } else {*/
            message.channel.send(`Soutiens est mis sur : ${message.mentions.roles.first()}`)
        //}

    }
}

module.exports.help = {
    name: "soutiens"
}