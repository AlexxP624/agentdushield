const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

    if(message.author.id !== "677908734911053855") return message.channel.send("❌ Cette commande est accessible que pour le owner du bot !");
    //if(message.author.id !== "598597108467236874") return message.channel.send("❌ Cette commande est accessible que pour le owner du bot !");

    if(!args[0]) return message.channel.send("❌ Veuillez mettre une commande pour reload !")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage .reload <name>
        client.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        client.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`<a:Nop:778978668445040680> Impossible de reload : \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`<a:Yeah:778978676283932712> La commande \`${args[0].toUpperCase()}\` a été reload avec succès !`)
    console.log(`✅ La commande ${args[0]} à été reload avec succès !`)
}

module.exports.help = {
    name: "reload"
}