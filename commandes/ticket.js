const Discord = require('discord.js');
const db = require("quick.db");
const disbut = require("discord-buttons");

module.exports = {
    name: "text-art",
    description: "Transforme ton text en truc stylé",
    usage: ".text-art <message>",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if(message.author.bot) return;
        const color = db.get(`color_${message.guild.id}`);
        let args1 = args[0];
        let time = 10000;

        let ticketon = db.get(`ticket_${message.guild.id}`)
        if(!ticketon) return message.channel.send(":x: Les ticket ne sont pas activé sur ce serveur !")

        let ticketCreate = ['new', 'create', 'add', 'enable'];
        let ticketClose= ['remove', 'disable', 'close'];

        if(!args1) {
          let embed = new Discord.MessageEmbed()
          .setColor(`${color || "BLACK"}`)
          .setDescription("Utilise cette commande\n+ticket create \`(Créé un salon ticket)\`\n+ticket close\`(Ferme le salon ticket)`")
          .setTimestamp(Date.now())
          message.channel.send(embed)
        }

        let ticketName = db.get(`ticketName_${message.author.id}_${message.guild.id}`);
        let ticketID = db.get(`ticketID_${message.author.id}_${message.guild.id}`);

        if(ticketCreate.some(x => x.includes(args1))) {
          if(message.channel.id === ticketID) {
            message.delete().catch(() => { return });
            message.channel.send(`:x: Vous ne pouvez pas créé un ticket dans ce salon ! - ${message.author}`).then(x => x.delete({ timeout: time }));
          } else {
            if(!message.guild.channels.cache.find(x => x.name === ticketName)) {
              let buttonYes = new disbut.MessageButton().setStyle("green").setID("yes").setLabel("Oui");
              let buttonNo = new disbut.MessageButton().setStyle("red").setID("no").setLabel("Non");
              let row = new disbut.MessageActionRow().addComponents(buttonYes, buttonNo);

              let embed = new Discord.MessageEmbed()
              .setColor(`${color || "BLACK"}`)
              .setDescription("Êtes vous sûre de créé un salon ticket ?")
              .setTimestamp(Date.now())
              .setFooter(`Créé un ticket`)
              message.channel.send(embed, { components: row }).then((msg) => {
                const filter = (button1) => button1.clicker.user.id === message.author.id;
                let collect = msg.createButtonCollector(filter, { time: 30000 });

                collect.on('collect', async(x) => {
                  x.reply.defer()
                  if (x.id === "yes") {
                    message.guild.channels.create(`ticket-${message.author.tag}`).then((channel) => {
                      db.set(`ticketName_${message.author.id}_${message.guild.id}`, channel.name);
                      db.set(`ticketID_${message.author.id}_${message.guild.id}`, channel.id);
                      //channel.setParent({ name: ticket })

                      channel.updateOverwrite(message.author, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                      })

                      channel.updateOverwrite(message.guild.id, {
                        SEND_MESSAGES: false, 
                        VIEW_CHANNEL: false
                      })
/*if (channel.guild.id === "751398500893458523") {*/
        let role = "798199340538527814"
  channel.updateOverwrite(role, {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true
})
    /*} else {
        return;
    } */
                      channel.send("<@&798199340538527814>")
                      var fdp = new Discord.MessageEmbed()
                      .setColor(`${color || "BLACK"}`)
                      .setDescription(`Bonjour ${message.author}, veuillez décrire votre problème! Pour fermer le ticket faites +ticket close. **Pour les modérateur, si le ticket est fini faîtes +close **`)
                      channel.send(fdp, null)
                      
                      let embedYes = new Discord.MessageEmbed()
                      .setColor("GREEN")
                      .setDescription(`Votre ticket à été créé avec succès, aller voir dans : **${channel}**`)
                      .setTimestamp(Date.now())
                      .setFooter("Créé Un Salon Ticket")
                      msg.delete().catch(() => { return });
                      message.channel.send(embedYes, null).catch(() => { return });
                    })
                  } else if (x.id === "no") {
                    let embedNo = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("Annulation de la création du salon ticket...")
                    .setTimestamp(Date.now())
                    .setFooter("Annulation...")
                    msg.edit(embedNo, null).then(x => x.delete({ timeout: time })).catch(() => { return });
                  }
                })

                setTimeout(() => {
                  let embedTimeout = new Discord.MessageEmbed()
                  .setColor("RED")
                  .setDescription("Il n'y a pas de réponse de la part de l'utilisateur de la commande, réessayez plus tard !")
                  .setTimestamp(Date.now())
                  msg.edit(embedTimeout, null).then(x => x.delete({ timeout: time })).catch(() => { return });
                }, 30000)
              })
            } else {
              message.channel.send(":x: Désoler, vous avez déjà créé un ticket !")
            }
          }
        }

        if(ticketClose.some(x => x.includes(args1))) {
          if(message.channel.id === ticketID) {
              let buttonClose = new disbut.MessageButton().setStyle("green").setID("close").setLabel("Fermer");
              let buttonCancel = new disbut.MessageButton().setStyle("red").setID("cancel").setLabel("Annulé");
              let row = new disbut.MessageActionRow().addComponents(buttonClose, buttonCancel);

              let embed = new Discord.MessageEmbed()
              .setColor(`${color || "BLACK"}`)
              .setDescription("Cliquez sur le bouton pour fermer le ticket.")
              .setTimestamp(Date.now())
              .setFooter(`Fermer un ticket`)
              message.channel.send(embed, { components: row }).then((msg) => {
                const filter1 = (button1) => button1.clicker.user.id === message.author.id;
                let collect1 = msg.createButtonCollector(filter1, { time: 30000 });

                collect1.on('collect', async(x) => {
                  x.reply.defer()
                  if(x.id === "close") {
                    x.message.edit("Le salon sera supprimé dans **3 secondes**", null).then(() => {
                      setTimeout(() => {
                        db.delete(`ticketName_${message.author.id}_${message.guild.id}`);
                        db.delete(`ticketID_${message.author.id}_${message.guild.id}`);
                        x.message.channel.delete().catch(() => { return });
                      }, 3000)
                    })
                  } else if (x.id === "cancel") {
                    let embedCancel = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("Le salon ticket fermé est annulé... ")
                    .setTimestamp(Date.now())
                    .setFooter(`Annulé...`)
                    msg.edit(embedCancel, null).then(x => x.delete({ timeout: time })).catch(() => { return });
                  }
                  
                  setTimeout(() => {
                      let embedTimeout = new Discord.MessageEmbed()
                  .setColor("RED")
                  .setDescription("Il n'y a pas de réponse de la part de l'utilisateur de la commande, réessayez plus tard !")
                  .setTimestamp(Date.now())
                  msg.edit(embedTimeout, null).then(x => x.delete({ timeout: time })).catch(() => { return });
                  }, 30000)
                })
              })
          } else {
            message.delete().catch(() => { return });
            return message.channel.send(`:x: Vous pouvez utiliser ça que dans un salon ticket ${message.author}!`).then(x => x.delete({ timeout: time })).catch(() => { return });
          }
        }
    }
}

module.exports.help = {
    name: "ticket"
}