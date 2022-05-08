const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "sreply",
  category: "suggestion",
  run: async (client, message, args) => {
    
let channel = await db.get(`suggestion_${message.guild.id}`);
if (!channel) return message.channel.send(":x: Il n'y a pas de salon de suggestion !");
     
      //if(!message.member.hasPermission('ADMINISTRATOR')) return;
      
    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(' ');
      
    const number = new MessageEmbed()
      .setDescription(`:x: | Je ne pense pas que ce soit un identifiant de message !`)
      .setColor("FF2052")
      
    const id = new MessageEmbed()
      .setDescription(`:x: | Veuillez mettre l'id d'un message de suggestion !`)
      .setColor("FF2052")
      
    const query = new MessageEmbed()
      .setDescription(`:x: | Veuillez fournir une raison !`)
      .setColor("FF2052")
      
    const reply = new MessageEmbed()
      .setDescription(`✅ | Vous avez refusé la suggestion avec succès.`)
      .setColor("00FFFF")
      
    const noChannel = new MessageEmbed()
      .setDescription(`:x: | Le salon de suggestions ne sont pas mis en place.`)
      .setColor("FF2052")
      
    const noMessage = new MessageEmbed()
      .setDescription(`:x: | Je n'ai trouvé aucun message avec cet ID !`)
      .setColor("FF2052")
    
      if(!messageID) return message.channel.send(id);
      
      if (!rgx.test(messageID)) return message.channel.send(number);
      
      if(!replyQuery) return message.channel.send(query)
      
      try{
      const suggestionChannel = message.guild.channels.cache.get(channel)
      
      if(!suggestionChannel) return message.channel.send(noChannel)
      
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
    const noMessage = new MessageEmbed()
      .setDescription(`:x: | Je n'ai trouvé aucun message avec cet ID !`)
      .setColor("FF2052")
  return message.channel.send(noMessage);
  })
     
      const data = suggestedEmbed.embeds[0];
     
      const replyEmbed = new MessageEmbed()
      .setAuthor(`${data.author.name}`, data.author.iconURL)
      .setDescription(data.description)
      .setColor("RED")
        .addField(":x: | Statut : Refusé", `\`\`\`Raison : ${replyQuery}\`\`\``)
      .setFooter(`Refusé par : ${message.author.tag}`)
      .setTimestamp();
      
     suggestedEmbed.edit(replyEmbed)
     
     message.channel.send(reply)
      
      const user = await client.users.cache.find((u) => u.tag === data.author.name)
      
    const embed = new MessageEmbed()
      .setDescription(`:x: Votre suggestion à été refusé. **[Lien du message](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`)
      .setColor("RED")
      user.send(embed)
        
      } catch(err) {
        return;
    }
  }
}

        module.exports.help = {
          name: "sdecline"
        } 