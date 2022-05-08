const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const db = require('quick.db')

module.exports = {
    name: "warn",
    description: "Permet de donné un avertissemnt à l'utilisateur mentionné",
    usage: ".warn <@user> <raison>",
    run: async (client, message, args) => {
      const color = db.get(`color_${message.guild.id}`)
        if(message.channel.type === "dm") return;
        message.delete()
        if (message.author.bot) return;
        
        var mentionned = message.mentions.users.first()
        if(!mentionned) return message.channel.send(":x: Veuillez mentionner un utilisateur !")
        let warnings = db.get(`warnings_${message.guild.id}_${mentionned.id}`)
        if(warnings === 10) {
          return message.channel.send(`${mentionned} à atteint la limite d'avertissement requis qui est de **10**`)
        }
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("❌ Vous n'avez pas la permission de warn")
        if(message.mentions.users.size === 0) {
            return message.channel.send("❌ Veuillez mentionner un utilisateur !");
        }else{
            const args = message.content.split(' ').slice(1)
            if(args[0] === "<@!" + mentionned.id + ">" | (args[0] === "<@" + mentionned.id + ">")){
                if(args.slice(1).length != 0) {
//                    message.channel.send(`✅ ${mentionned.tag} a été averti avec succès !`)
                        if(warnings === null) {
                          db.set(`warnings_${message.guild.id}_${mentionned.id}`, 1)
                            var embed = new Discord.MessageEmbed()
                            .setDescription(`Bonjour vous venez d'être averti dans le serveur ${message.guild.name} par ${message.author.username}\nRaison : ${args.slice(1).join(' ')}`)
                            .setColor(`${color || "BLACK"}`)
                            mentionned.send(embed) 
                        } else if(warnings !== null) {
                          db.add(`warnings_${message.guild.id}_${mentionned.id}`, 1)
                          var embed = new Discord.MessageEmbed()
                            .setDescription(`Bonjour vous venez d'être averti dans le serveur ${message.guild.name} par ${message.author.username}\nRaison : ${args.slice(1).join(' ')}`)
                            .setColor(`${color || "BLACK"}`)
                            mentionned.send(embed) 
                        }
                        }else{
                    return message.reply("❌ Utilisation incorrect")
                }
            }else{
                return message.reply("❌ Utilisation incorrect")
            }
            var embed = new Discord.MessageEmbed()
                .setColor(`${color || "BLACK"}`)
                .setDescription(`**${mentionned.tag}** a été warn par **${message.author.username}** pour **${args.slice(1).join(' ')}**`)
                message.channel.send(embed);
        }
    
    }
}

module.exports.help = {
    name: "warn"
}