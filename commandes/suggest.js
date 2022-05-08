const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
 
module.exports = {
  name: "suggest",
  category:"suggestion",
  
  run: async (client, message, args) => {
   
  let channel = await db.get(`suggestion_${message.guild.id}`);
    if (!channel) return message.channel.send(":x: Il n'y a pas de salon de suggestion !");
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply(":x: Veuillez suggérer quelque chose !");
    
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setDescription(`${suggestionQuery}`)
       .setColor("ORANGE")
    .addField("Statut :", "```⌛ | En attente...```")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`✅ | Votre suggestion à été postée ici, <#${channel}>.`)
       .setColor("00FFFF")
       
    message.channel.send(done)
    
    let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
    
    await msgEmbed.react('<:dboatsV:759347007617237002>')
    await msgEmbed.react('<:dboatsX:759346998943023137>')
  }
}

      module.exports.help = {
        name: "suggest"
      } 