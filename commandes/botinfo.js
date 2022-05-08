const Discord = require("discord.js");
const version = require('../package-lock.json');
const ms = require('ms');
const os = require('os');
const db = require('quick.db')
const { stripIndents } = require('common-tags');

//**> Utilisateurs :** ${client.guilds.reduce((a, g) => a + g.memberCount, 0)}

module.exports = {
    name: "botinfo",
    description: "Permet de voir les information du bot.",
    usage: ".botinfo",
    run: async (client, message, args) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        //function duration(ms) { 
          //  const sec = Math.floor((ms / 1000) % 60).toString()
            //const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            //const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            //const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            //return `${days.padStart(2, '0')} jours, ${hrs.padStart(2, '0')} heures, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} secondes`
        //}
        function parseDur(ms) {
            let seconds = ms / 1000,
                days = parseInt(seconds / 86400);
            seconds = seconds % 86400
            
            let hours = parseInt(seconds / 3600);
            seconds = seconds % 3600
            
            let minutes = parseInt(seconds / 60);
            seconds = parseInt(seconds % 60)
            
            if (days) {
              return `${days} jours, ${hours} heures, ${minutes} minutes`
            } else if (hours) {
              return `${hours} heures, ${minutes} minutes, ${seconds} secondes`
            } else if (minutes) {
              return `${minutes} minutes, ${seconds} secondes`
            }
            return `${seconds} secondes`
          } // Uptime bot.
        const color = db.get(`color_${message.guild.id}`)
        const embed = new Discord.MessageEmbed()
            .setColor(`${color || "BLACK"}`)
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setAuthor(`${client.user.username} Info`)
            /*.addField("Voila les info du bot :", stripIndents`**> Mémoire :** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
            **> Uptime :** ${parseDur(client.uptime)}
            **> Créé le :** 17/08/2021 à 15:10:37
            **> Node.js :** ${process.version}
            **> Version :** 1.2.2
            **> Discord.js :** v12.5.3
            **> Serveurs :** ${client.guilds.cache.size}
            **> Utilisateurs :** ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}
            **> Salons :** ${client.channels.cache.size}
            **> Support :** [Server invite](https://discord.gg/fCFkdsXsdM)`)*/
            .addField("**:file_cabinet: | Mémoire :**", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("**:card_box: | CPU :**", ` ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`, true)
            .addField("**<:online2:464520569975603200> | En Ligne Depuis**", `${parseDur(client.uptime)}`, true)
            .addField("**<a:dis_on:889444160317313056> Créé le :**", `25/03/2020 à 13:31:49`, true)
            .addField("**<:nodejs:889444255272140861> | Node.js :**", `${process.version}`, true)
            .addField("Version du Bot", "v1.2.4", true)
            .addField("**<:djs:889444284258979850> | Discord.js :**", `v12.5.3`, true)
            .addField("**<:upserver:889073848094433300> | Serveurs :**", `**${client.guilds.cache.size}** Serveurs`, true)
            .addField("**<:membre:889147599981002782> | Utilisateurs :**", `**${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}** Utilisateurs`, true)
            .addField("**<:blurple_textchannel:889444378987339826> | Salons :**", `<:channel:585783907841212418> **| ${client.channels.cache.size}** au total.\n<:channel:585783907841212418> **| ${client.channels.cache.filter(c => c.type === 'text').size}** Textuel \n<:voice:585783907673440266> **| ${client.channels.cache.filter(c => c.type === 'voice').size}** Vocaux
            <:category:889444464957984779> **| ${client.channels.cache.filter(c => c.type === "category").size}** Catégories`, true)
            .addField("**<:emoji:889444408985022524> | Emojis**", `<a:this_up:889444508872360006> **| ${client.emojis.cache.size}** au total.\n<:valide:877873464546041906> **| ${client.emojis.cache.filter(e => e.animated === false).size}** Normal \n<a:Yeah:888883761381535794> **| ${client.emojis.cache.filter(e => e.animated === true).size}** Animé`, true)
            .addField("**<a:typingstatus:393836741272010752> | Ping du bot :**", `**${client.ws.ping}**ms`, true)
            //.addField("**♢ | Shards**", `**${client.shard.count}** Shards`, true)
            .addField("**<:blurple_invite:889444596231335987> | Invitation du Bot**", `[Invite Moi](https://discord.com/oauth2/authorize?client_id=877177600307511386&permissions=8&scope=bot)`, true)
            .addField("**<:blurple_support:889444635364188171> | Support :**", `[Serveur Support](https://discord.gg/BSBGj5Fa9v)`, true)
            
            message.channel.send(embed);
    }
}

module.exports.help = {
    name: "botinfo"
}