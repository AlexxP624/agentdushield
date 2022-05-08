const Discord = require('discord.js');
const moment = require('moment')
module.exports = {
    name: "serveurinfo",
    description: "Permet de voir les informations du serveur",
    usage: ".serveurinfo",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if(message.author.bot) return;
        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };
        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydney: 'Sydney',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };    
        let x = Date.now() - message.guild.createdAt;
        let h = Math.floor(x / 86400000)
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString())
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor("BLUE")
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .addField("Général", [
            `**> Nom :** ${message.guild.name}`,
            `**> ID :** ${message.guild.id}`,
            `**> Fondateur :** ${message.guild.owner.user.tag} - (${message.guild.ownerID})`,
            `**> Région :** ${regions[message.guild.region]}`,
            `**> Boost Tier :** ${message.guild.premiumTier ?  `Tier ${message.guild.premiumTier}`: "Rien"}`,
            `**> Filtre Explicite :** ${filterLevels[message.guild.explicitContentFilter]}`,
            `**> Level De Vérification :** ${verificationLevels[message.guild.verificationLevel]}`,
            `**> Créé Le :** ${moment(message.guild.createdTimestamp).format('LL')} à ${moment(message.guild.createdTimestamp).format("LT")} sois il y à ${moment(message.guild.createdTimestamp).fromNow()}/${h} jours`
            //'\u200b'
        ], true)
        .addField("Statistiques", [
            `**> Nombre De Rôles :** ${roles.length}`,
            `**> Nombre D'Emojis :** ${emojis.size}`,
            `**> Nombre D'Emoji Static :** ${emojis.filter(emoji => !emoji.animated).size}`,
            `**> Nombre D'Emoji Animé :** ${emojis.filter(emoji => emoji.animated).size}`,
            `**> Nombre De Membres :** ${message.guild.memberCount}`,
            `**> Nombre D'Humains :** ${members.filter(member => !member.user.bot).size}`,
            `**> Nombre De Bots :** ${members.filter(member => member.user.bot).size}`,
            `**> Nombre De Salons Textuel :** ${channels.filter(channel => channel.type === "text").size}`,
            `**> Nombre De Salons Vocal :** ${channels.filter(channel => channel.type === "voice").size}`,
            `**> Nombre De Boost :** ${message.guild.premiumSubscriptionCount || '0'}`
            //'\u200b'
        ], true)
        .addField("Presence", [
            `**> En Ligne :** ${members.filter(member => member.presence.status === "online").size}`,
            `**> Inactif :** ${members.filter(member => member.presence.status === "idle").size}`,
            `**> Ne Pas Déranger :** ${members.filter(member => member.presence.status === "dnd").size}`,
            `**> Hors Ligne :** ${members.filter(member => member.presence.status === "offline").size}`
        ], false)
        //.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'Rien')
        .setTimestamp()
        message.channel.send(embed)
    }
}

module.exports.help = {
    name: "serveurinfo"
}