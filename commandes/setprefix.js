const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db')


module.exports = {
    name: "setprefix",
    description: "Permet de changer le prefix du bot",
    usage: ".setprefix <nouveau prefix>",
    run: async (client, message, args) => {
      const color = db.get(`color_${message.guild.id}`)
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
    
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌ Vous n'avez pas la permission !");
        if(!args[0] || args[0 == "help"]) return message.reply("❌ Utilise : .setprefix <ton nouveau prefix> !");
    
        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    
        prefixes[message.guild.id] = {
            prefixes: args[0]
        };
    
        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.log(err)
        });
    
        let sEmbed = new Discord.MessageEmbed()
        .setColor(`${color || "BLACK"}`)
        .setTitle("Nouveau prefix !")
        .setDescription(`Prefix : ${args[0]}`)
        message.channel.send(sEmbed);
    }
}

module.exports.help = {
    name: "setprefix"
}