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
        if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("❌ Je ne peux pas mute cette utilisateur !");
      if(!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.reply("❌ Je n'est pas la permission de mute !");
      let reason = args.slice(2).join(" ");
      if(!reason) return message.channel.send(":x: Veuillez mettre une raison !")
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
        //end of create role
        let mutetime = args[1];
        if(!mutetime) return message.reply("❌ Veuillez presiser le temps !");
    
        await(tomute.roles.add(muterole.id));
            //db.set(`tempmute_${message.guild.id}_${tomute.id}`, 0)
            db.add(`tempmute_${message.guild.id}_${tomute.id}`, 1)
//        message.reply(`✅ <@${tomute.id}> a été mute pendant ${ms(ms(mutetime))}, avec succès !`);

        db.set(`membertempmute_${message.guild.id}_${tomute.id}`, mutetime)
        db.set(`membertempmuted_${message.guild.id}_${tomute.id}`, muterole.id)
            var embed = new Discord.MessageEmbed()
                .setColor(`${color || "BLACK"}`)
                .setDescription(`Bonjour <${tomute.id}> , vous avez été tempmute sur le serveur ${message.guild.name} par ${message.author.username} pendant ${ms(ms(mutetime))}`)
                tomute.send(embed);
    
        setTimeout(function(){
           db.delete(`membertempmute_${message.guild.id}_${tomute.id}`)
          db.delete(`membertempmuted_${message.guild.id}_${tomute.id}`)
            tomute.roles.remove(muterole.id);
            message.channel.send(`<@${tomute.id}> a été unmute avec succès !`);
        }, ms(mutetime));
    
        var embed = new Discord.MessageEmbed()
            .setColor(`${color || "BLACK"}`)
            .setDescription(`<@${tomute.id}> a été mute **${ms(ms(mutetime))}** pour **${reason}** par **${message.author.username}**`)
            message.channel.send(embed); 
    if(tomute.voice.channel) {
          tomute.voice.kick()
        }
        //end of module
    }
}

module.exports.help = {
    name: "tempmute"
}