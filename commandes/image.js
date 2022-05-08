const img = require('images-scraper')
const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'image',
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send('Please enter a search query')

        message.channel.send("Recherche de l'image en cours...").then(async m => {
            const results = await google.scrape(query, 1)
            m.edit(results[0].url)
        })
        //message.channel.send(results[0].url);
    }
}

module.exports.help = {
    name: "image"
}