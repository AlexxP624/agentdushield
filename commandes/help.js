const Discord = require("discord.js")
const db = require('quick.db')
const paginator = require('../ButtonPaginator')

module.exports = {
    name: "warnings",
    description: "Permet de voir les warns de la personnes mentionner.",
    usage: ".warnings",
    run: async (client, message, args) => {
        if(message.channel.type === "dm") return;
        if (message.author.bot) return;
        const color = db.get(`color_${message.guild.id}`)
        const e = new Discord.MessageEmbed()
        .setTitle("Modération")
        .setColor(`${color || "BLACK"}`)
        .setDescription(`*Les paramètres peuvent être des noms, des mentions, ou des IDs
        Si ce ne sont pas des mentions ils doivent être séparés par \`,,\`*
        \n**\`+sanctions <membre>\`**\nAffiche les sanctions reçues par un membre
        **\`+unwarn <membre> <numéro>\`**\nSupprime une sanction pour un membre
        **\`+clear [nombre]\`**\nSupprime le nombre de messages donnés dans le salon actuel.
        **\`+warn <membre> [raison]\`**\nDonne un warn à un membre, une raison peut être précisée
        **\`+mute <membre> [raison]\`**\nMute un ou plusieurs membres, une raison peut être précisée
        **\`+tempmute <membre> <durée> [raison]\`**\nMute un membre pour une durée déterminée
        **\`+unmute <membre>\`**\nMet fin au mute d'un membre
        **\`+kick <membre> [raison]\`**\nExpulse un ou plusieurs membres du serveur
        **\`+ban <membre> [raison]\`**\nBannit un ou plusieurs membres du serveur, une raison dois être précisée
        **\`+tempban <membre> <durée> [raison]\`**\nBannit un membre du serveur pour une durée déterminée, une raison peut dois précisée
        **\`+unban <membre>\`**\nEnlève le ban d'un ou plusieurs membres sur le serveur
        **\`+addrole <membre> <rôle>\`**\nAjoute le rôle souhaité à la personne souhaitée
        **\`+removerole <membre> <rôle>\`**\nSupprime le rôle souhaité à la personne souhaitée`)
        .setFooter("Made By FrostFou#1111 and AlexxP62#0001")
        const e2 = new Discord.MessageEmbed()
        .setTitle("Modération settings")
        .setColor(`${color || "BLACK"}`)
        .setDescription(`*Les paramètres peuvent être des noms, des mentions, ou des IDs
        Si ce ne sont pas des mentions ils doivent être séparés par \`,,\`*
        \n**\`+settings\`**\nAffiche les paramètres du bot sur le serveur
        **\`+antilink\`**\nActive l'antilink
        **\`+antilinkoff\`**\nDésactive l'antilink
        **\`+setjoin\`**\nActive les logs si un membre rejoint le serveur
        **\`+setjoinoff\`**\nDésactive les logs si un membre rejoint le serveur
        **\`+setleave\`**\nActive les logs si un membre quitte le serveur
        **\`+setleaveoff\`**\nDésactive les logs si un membre quitte le serveur
        **\`+setautorole\`**\nAjoute un rôle à tout les personne rejoignant votre serveur
        **\`+setautoroleoff\`**\nDésactive l'autorole
        **\`+setreport\`**\nPermet de définir le salon des reports
        **\`+setreportoff\`**\nPermet de supprimé le salon défini pour les reports
        **\`+levellog\`**\nActive les logs si quelqu'un passe un niveau
        **\`+levellogoff\`**\nDésactive les logs des niveaux
        **\`+setticketon\`**\nActive les tickets
        **\`+setticketoff\`**\nDésactive les tickets`)
        //**\`+antispam\`**\rActive l'antispam
        //**\`+antispamoff\`**\nDésactive l'antispam
        .setFooter("Made By FrostFou#1111 and AlexxP62#0001")
        const e3 = new Discord.MessageEmbed()
        .setTitle("Logs")
        .setColor(`${color || "BLACK"}`)
        .setDescription(`*Les paramètres peuvent être des noms, des mentions, ou des IDs
        Si ce ne sont pas des mentions ils doivent être séparés par \`,,\`*
        \n**\`+setlogmessage [salon]\`**\nActive les logs de messages supprimés et édités
        **\`+setlogmessageoff\`**\nDésactive les logs de messages supprimés et édités
        **\`+setlogvoice [salon]\`**\nActive les logs de l'activité vocale dans un salon
        **\`+setlogvoiceoff\`**\nDésactive les logs de l'activité vocale
        **\`+setjoin\`**\nActive les logs si un membre rejoint le serveur
        **\`+setjoinoff\`**\nDésactive les logs si un membre rejoint le serveur
        **\`+setleave\`**\nActive les logs si un membre quitte le serveur
        **\`+setleaveoff\`**\nDésactive les logs si un membre quitte le serveur`)
.setFooter("Made By FrostFou#1111 and AlexxP62#0001")
        const e4 = new Discord.MessageEmbed()
        .setTitle("Server Config")
        .setColor(`${color || "BLACK"}`)
        .setDescription(`*Les paramètres peuvent être des noms, des mentions, ou des IDs
        Si ce ne sont pas des mentions ils doivent être séparés par \`,,\`*
        \n**\`+slowmode [salon] <durée> || +slowmode <durée> \`**\nChange la durée du mode lent sur un salon (max 6h)
        **\`+slowmode off\`**\nDésactive le slowmode
        **\`+setjoin\`**\nActive les logs si un membre rejoint le serveur
        **\`+setjoinoff\`**\nDésactive les logs si un membre rejoint le serveur
        **\`+setleave\`**\nActive les logs si un membre quitte le serveur
        **\`+setleaveoff\`**\nDésactive les logs si un membre quitte le serveur
        **\`+setprefix\`**\nChange le prefix du bot sur le serveur
        **\`+setautorole\`**\nAjoute un rôle à tout les personne rejoignant votre serveur
        **\`+setautoroleoff\`**\nDésactive l'autorole
        **\`+setreport\`**\nPermet de définir le salon des reports
        **\`+setreportoff\`**\nPermet de supprimé le salon défini pour les reports
        **\`+setticketon\`**\nActive les tickets
        **\`+setticketoff\`**\nDésactive les tickets`)
        .setFooter("Made By FrostFou#1111 and AlexxP62#0001")
        const e5 = new Discord.MessageEmbed()
        .setTitle("Server gestion")
        .setColor(`${color || "BLACK"}`)
        .setDescription(`*Les paramètres peuvent être des noms, des mentions, ou des IDs
        Si ce ne sont pas des mentions ils doivent être séparés par \`,,\`*
        \n**\`+giveaway <temps> <winners> <prix>\`**\nDémarre un giveaway
        **\`+create-emo <lien image/lien émoji> <nom>\`**\nCrée un émoji custom sur le serveur, à partir d'une photo ou d'un émoji nitro
        **\`+voicekick <membre>\`**\nDéconnecte un membre de son vocaal actuel
        **\`+temprole <membre> <rôle> <temps>\`**\nAjoute un rôle à un membre pour la durée donnée
        **\`+untemprole <membre> <rôle>\`**\Supprime un rôle d'un membre`)
        .setFooter("Made By FrostFou#1111 and AlexxP62#0001")
        const e6 = new Discord.MessageEmbed()
        .setTitle("Utility")
        .setColor(`${color || "BLACK"}`)
        .setDescription(`*Les paramètres peuvent être des noms, des mentions, ou des IDs
        Si ce ne sont pas des mentions ils doivent être séparés par \`,,\`*
        \n**\`+ping\`**\nAffiche la vitesse de réaction du bot
        **\`+serveurinfo\`**\nAffiche les informations relatives au serveur
        **\`+roleinfo <rôle>\`**\nAffiche les informations relatives à un rôle
        **\`+userinfo <membre>\`**\nAffiche les informations relatives à un utilisateur
        **\`+pic <membre>\`**\nPermet de récupérer la photo de profil de quelqu'un
        **\`+serverpic\`**\nPermet de récupérer l'icône du serveur
        **\`+snipe\`**\nAffiche le dernier message supprimé du salon
        **\`+image <mot-clé>\`**\nFait une recherche google image avec le bot
        **\`+support\`**\nAffiche le lien d'invitation pour le serveur Support
        **\`+invite\`**\nAffiche le lien d'invitation du bot
        **\`+calc\`**\nPermet de résoudre des calculs ou des équations
        **\`+report\`**\nPermet de report la personne mentionner
        **\`+ticket\`**\nPermet de créé un ticket
        **\`+rank\`**\nPermet de voir votre niveau`)
        .setFooter("Made By FrostFou#1111 and AlexxP62#0001")
        const e7 = new Discord.MessageEmbed()
        .setTitle("Musique")
        .setColor(`${color || "BLACK"}`)
        .setDescription(`*Les paramètres peuvent être des noms, des mentions, ou des IDs
        Si ce ne sont pas des mentions ils doivent être séparés par \`,,\`*
        \n**\`+play <musique>\`**\nJoue une musique dit dans votre canal vocal
        **\`+stop\`**\nArrête toute les musique et quitte le bot du canal vocal
        **\`+queue\`**\nPermet de voir toutes les musique dans la queue
        **\`+skip\`**\nPermet de passé la musique en cour et prendre la prochaine de la queue
        **\`+loop\`**\nPermet de rejouer indéfiniment la musique en cour
        **\`+pause\`**\nMets la musique en cour en pause
        **\`+resume\`**\nRemet la musique en cour
        **\`+volume <nombre>\`**\nAugment/réduit le volume de la musique
        **\`+np\`**\Dit dans le chat la musique en cour sur le serveur`)
        .setFooter("Made By FrostFou#1111 and AlexxP62#0001")
        let pages = [e, e2, e3, e4, e5, e6, e7]

        paginator(message, pages)
    }
}

module.exports.help = {
    name: "help"
}