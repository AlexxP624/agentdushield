const Discord  = require('discord.js');
const ms = require('ms');
const { stripIndents } = require("common-tags");
const db = require('quick.db')


module.exports = {
    name: "tempmute",
    description: "Permet de tempmute l'utilisateur mentionné",
    usage: ".tempmute <@user> <temps>",
    run: async (client, message, args) => {
      const color = db.get(`color_${message.guild.id}`)
        if(message.channel.type === "dm") return;
        if (message.author.bot) return;
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply(":x: Vous n'avez pas la permission !")
    
        //.tempmute @user 1s/m/h/d
    
        let tomute = message.mentions.members.first() //|| message.guild.members.get(args[0]);
        if(!tomute) return message.reply("❌ Impossible de trouver l'utilisateur !");
        if(tomute.hasPermission("BAN_MEMBERS")) return message.reply("❌ Je ne peux pas mute cette utilisateur !");
      if(!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.reply("❌ Je n'est pas la permission de mute !");
      let reason = args.slice(2).join(" ");
      if(!reason) return message.channel.send(":x: Veuillez mettre une raison !")
      
        //end of create role
        let bantime = args[1];
        if(!bantime) return message.reply("❌ Veuillez presiser le temps !");
    
        await tomute.ban({ reason: reason })
        message.reply(`✅ <@${tomute.id}> a été tempban pendant ${ms(ms(bantime))}, avec succès !`);
            var embed1 = new Discord.MessageEmbed()
                .setColor(`${color || "BLACK"}`)
                .setDescription(`Bonjour <${tomute.id}> , vous avez été tempban sur le serveur ${message.guild.name} par ${message.author.username} pendant ${ms(ms(bantime))}`)
                tomute.send(embed);
    
        setTimeout(function(){
            message.guild.members.unban(tomute.id)
            message.channel.send(`✅ <@${tomute.id}> a été unban avec succès !`);
        }, ms(bantime));
    
        var embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL)
            .setColor(`${color || "BLACK"}`)
            .addField("Tempban", stripIndents`**> Commande :** &tempban
            **> Utilisateur qui a reçu le mute :** <@${tomute.id}>
            **> Tempban par :** ${message.author.username}
            **> Raison :** ${reason}
            **> Pendant :** ${ms(ms(bantime))}
            **> Date :** ${message.createdAt.toLocaleString()}`)
          message.channel.send(embed); 
            db.set(`tempban2_${message.guild.id}`, 0)
            db.add(`tempban2_${message.guild.id}_${tomute.id}`, 1)
        //end of module
    }
}

module.exports.help = {
    name: "tempban"
}