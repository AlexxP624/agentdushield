const Discord = require('discord.js');
const db = require('quick.db');
require('@weky/inlinereply');
const { Calculator } = require('weky');

module.exports.run = async(client, message, args) => {
    if(message.channel.type === "dm") return;
    const color = db.get(`color_${message.guild.id}`);
        if (message.author.bot) return
    await Calculator({
        message: message,
        embed: {
            title: `Calculatrice | ${message.guild.name}`,
            color: `${color || "BLACK"}`,
            footer: 'Agent du Shield',
            timestamp: true,
        },
        disabledQuery: 'La calculatrice est désactivé !',
        invalidQuery: 'L\'équation fournie est invalide !',
        othersMessage: 'Seul <@{{author}}> peut utiliser les boutons !',
    });
}

module.exports.help = {
    name: "calc"
}