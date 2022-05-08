const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const disbut = require('discord-buttons')
const db = require("quick.db")

module.exports = {
    name: "deletechannel",
    description: "Permet de le salon dit",
    usage: ".deletechannel <name>",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if (message.author.bot) return;

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: Cette commande n'est pas accésible pour vous.")
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.reply("❌ Je n'est pas la permission de supprimer un salon !");
        /*var rc = args.join(" ")
        var fetchedChannel = message.guild.channels.cache.find(r => r.name === rc);
        if (!fetchedChannel){
         return message.channel.send(":x: Ce salon n'existe pas !")
        }
        /*var fetchedChannel = message.channel;
        if(message.channel.name !== "ticket") return message.channel.send(":x: Ce n'est pas un salon ticket !")
        message.channel.send(`✅ Le salon ${message.channel} a été supprimé avec succès !`)
        //message.guild.deleteChannel(rc)
        //message.channel.send(`✅ Le salon ${rc} a été supprimé avec succès !`)
        var embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("Le ticket sera supprimé dans **3 secondes**")
        message.channel.send(embed).then(m => m.delete({ timeout: 3000 }));
        setTimout(() => {
          fetchedChannel.delete()
        }, 3000)*/
                //let ticketID = db.get(`ticketID_${message.author.id}_${message.guild.id}`);
        //if(message.channel.id === ticketID) {
              let buttonClose = new disbut.MessageButton().setStyle("green").setID("closee").setLabel("Fermer");
              let buttonCancel = new disbut.MessageButton().setStyle("red").setID("cancell").setLabel("Annulé");
              let row = new disbut.MessageActionRow().addComponents(buttonClose, buttonCancel);

              let embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription("Cliquez sur le bouton pour fermer le ticket.")
              .setTimestamp(Date.now())
              .setFooter(`Fermer un ticket`)
              message.channel.send(embed, { components: row }).then((msg) => {
                const filter1 = (button1) => button1.clicker.user.id === message.author.id;
                let collect1 = msg.createButtonCollector(filter1, { time: 30000 });

                collect1.on('collect', async(x) => {
                  x.reply.defer()
                  if(x.id === "closee") {
                    x.message.edit("Le salon sera supprimé dans **3 secondes**", null).then(() => {
                      setTimeout(() => {
                        db.delete(`ticketName_${message.author.id}_${message.guild.id}`);
                        db.delete(`ticketID_${message.author.id}_${message.guild.id}`);
                        x.message.channel.delete().catch(() => { return });
                      }, 3000)
                    })
                  } else if (x.id === "cancell") {
                    let embedCancel = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("Le salon ticket fermé est annulé... ")
                    .setTimestamp(Date.now())
                    .setFooter(`Annulé...`)
                    msg.edit(embedCancel, null).then(x => x.delete({ timeout: 10000 })).catch(() => { return });
                  }
                  
                  setTimeout(() => {
                      let embedTimeout = new Discord.MessageEmbed()
                  .setColor("RED")
                  .setDescription("Il n'y a pas de réponse de la part de l'utilisateur de la commande, réessayez plus tard !")
                  .setTimestamp(Date.now())
                  msg.edit(embedTimeout, null).then(x => x.delete({ timeout: 10000 })).catch(() => { return });
                  }, 30000)
                })
              })
          /*} else {
            message.delete().catch(() => { return });
            return message.channel.send(`:x: Vous pouvez utiliser ça que dans un salon ticket ${message.author}!`).then(x => x.delete({ timeout: 10000 })).catch(() => { return });
          } */
    }
}

module.exports.help = {
    name: "close"
}