const Discord = require('discord.js');
const client = new Discord.Client();
const Enmap = require("enmap");
const { stripIndents } = require("common-tags");
const config = require("./config.json");
const db = require('quick.db')
const settings = require("./settings.json")

client.settings = new Enmap({ name: "settings", fetchAll: false, autoFetch: true, cloneLevel: 'deep' });

client.on("ready", async () => {
    console.log(`Bot is now online on port $!`);

    const webPortal = require("./server");
    webPortal.load(client);
});

var prefix = "+";
client.commands = new Discord.Collection()
const fs = require('fs')
const disbut = require('discord-buttons');
disbut(client);
const canvacord = require('canvacord')

fs.readdir('./commandes/', (err, files) => {
  if (err) console.log(err);
  console.log(`Chargement des ${files.length} commandes...`);
  console.log(`✅ ${files.length} commandes son prète a être utiliser ! Mais, le bot n'est pas connecté.`);
  console.log(`Veuillez patientez...`);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log('commandes non trouvée.');
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commandes/${f}`);
    client.commands.set(props.help.name, props);
  })
})
client.on('ready', () => {
  const statues = [
    () => `+help | ${client.guilds.cache.size} Serveurs`,
    () => `+help | ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} Membres`,
  ]
  let i = 0
  setInterval(() => {
    client.user.setActivity(statues[i](), { type: "COMPETING", url: "https://twitch.tv/hiweraa" })
    i = ++i % statues.length
  }, 5000)
  console.log("j'suis en ligne bg")
  
  client.user.setStatus("online")
})

client.on("message", message => {
  if (message.channel.type === "dm") return;
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let Args = messageArray.slice(1);
  let args = message.content.substring(prefix.length).split(" ");

  if (message.content.startsWith(prefix)) {
    let commandeFile = client.commands.get(cmd.slice(prefix.length));
    if (commandeFile) commandeFile.run(client, message, Args, args)
  }
  switch (args[0].toLowerCase()) {
    case "clear":
      if (!message.content.startsWith(prefix)) return;
      if (message.channel.type === "dm") return;
      if (message.author.bot) return;
      message.delete();
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("❌ Vous n'avez pas la permission !")
      if (!args[1]) return message.channel.send('Veuillez mettre le nombre de message que vous voulez clear.')
      message.channel.bulkDelete(args[1]).then; {
        message.channel.send("📜 " + message.author.username + ` , Vous avez supprimé ${args[1]} messages ✏️ !`).then(msg => {
          msg.react("✅").then(msg.delete(3000));
        })
        //console.log(`${message.author.username} à supprimé ${args[1]} messages dans ${message.channel.name}`)
        break;
      }
    case "settings":
      if (!message.content.startsWith(prefix)) return;
      if (message.channel.type === "dm") return;
      if (message.author.bot) return;
      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      let embedcolor = JSON.parse(fs.readFileSync("./embedcolor.json", "utf8"));
      if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("❌ Vous n'avez pas la permission")

      if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
          prefixes: config.prefix
        };
      }
      let edi = db.get(`editchannel_${message.guild.id}`);
      const color = db.get(`color_${message.guild.id}`)
      const voice = db.get(`voicechannel_${message.guild.id}`)
      const link = db.get(`antilink_${message.guild.id}`)
      const joinc = db.get(`joinchannel_${message.guild.id}`)
      const anti = db.get(`antispam_${message.guild.id}`)
      const leavec = db.get(`leavechannel_${message.guild.id}`)
      let role = db.get(`autoRole_${message.guild.id}`)
      let reportchan = db.get(`reportchannel_${message.guild.id}`)
      let level = db.get(`levelchannel_${message.guild.id}`)
      const ticket = db.get(`ticket_${message.guild.id}`)

      var embed = new Discord.MessageEmbed()
        .setTitle("Settings")
        .setColor(`${color || "BLACK"}`)
        .setDescription(`**Prefix :** ${prefixes[message.guild.id].prefixes}
        **Log des messages :** ${client.channels.cache.get(edi) || "`Off`"}
        **Log des voices :** ${client.channels.cache.get(voice) || "`Off`"}
        **Log des joins :** ${client.channels.cache.get(joinc) || "`Off`"}
        **Log des leave :** ${client.channels.cache.get(leavec) || "`Off`"}
        **Log des messages de report :** ${client.channels.cache.get(reportchan) || "`Off`"}
        **Level log :** ${client.channels.cache.get(level) || "`Off`"}
        **Tickets :** ${ticket || "`Off`"}
        **Antilink :** ${link || "`Off`"}
        **Autorole :** ${role || "`Rien`"}
        **Couleurs :** ${color || "`BLACK`"}`) //**Antispam :** ${anti || "`Off`"}
      message.channel.send(embed)
      break;
    case "create-emo":
      if (!message.content.startsWith(prefix)) return;
      var src = args[1];
      if (!args[1]) return message.channel.send(":x: Veuillez mettre le lien d'une image ou le lien d'un émoji !")
      var name = args[2]
      if (!args[2]) return message.channel.send(":x: Veuillez mettre un nom !")
      message.guild.emojis.create(`${args[1]}`, `${args.slice(2).join(" ")}`).then(emoji => {
        const embed = new Discord.MessageEmbed()
          .setColor(`${color || "BLACK"}`)
          .setTitle("Nouvel émoji !")
          .setDescription(`\nEmoji : ${emoji.toString()}.\nNom : ${emoji.name}\nID : ${emoji.id}.\nAnimé : ${emoji.animated}`)
        message.channel.send(embed)
      })
  }
});
/*client.on('message', async message => {
	const prefix = '+';

	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();
  if(message.author.id !== "526469112549867540") return message.channel.send("Pas la permission mgl")

	if (cmd === 'say') {
		if (message.deletable) message.delete();

		if (args.length < 1)
			return message
				.reply('❌ Veuillez faire une phrase à côté de .say ou .say embed')
				.then(m => m.delete(5000));

		if (args[0].toLowerCase() === 'embed') {
			var embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setDescription(args.slice(1).join(' '))
				.setAuthor(message.author.username, message.author.displayAvatarURL());

			message.channel.send(embed);
		} else {
			if (message.content.includes('@everyone')) {
				return message.channel.send('Interdit de mentionner everyone !');
			}
			if (message.content.includes('@here')) {
				return message.channel.send('Interdit de mentionner here !');
			}
			message.channel.send(args.join(' ')
                            
                           );
		}
	}
});*/
const snipes = new Discord.Collection()
client.on("messageDelete", message => {
  const color = db.get(`color_${message.guild.id}`)
  if (message.channel.type === "dm") return;
  snipes.set(message.channel.id, message)
  let chx = db.get(`deletechannel_${message.guild.id}`);
  if (!chx) return;
  if (message.author.bot) return;
  const DeletedLog = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**Message supprimé dans :** ${message.channel}
    ${message.content || "`Off`"}`)
    .setColor(`${color || "BLACK"}`)
  client.channels.cache.get(chx).send(DeletedLog)
  //client.channels.get("832231535495217162").send(DeletedLog)
});
client.on("message", message => {
  if (message.content === prefix + "snipe") {
    const color = db.get(`color_${message.guild.id}`)
    if (message.channel.type === "dm") return;
    let sniped = snipes.get(message.channel.id);
    if (!sniped) return message.channel.send(":x: Je ne vois pas le dernier message supprimé dans ce salon ou bien il en à pas eu.");

    const snipeEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setColor(`${color || "BLACK"}`)
      .setDescription(`Dernier message supprimé: **${sniped}**`)
    message.channel.send(snipeEmbed)
  }
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
  const color = db.get(`color_${oldMessage.guild.id}`)
  if (oldMessage.channel.type === "dm") return;
  let chx = db.get(`editchannel_${oldMessage.guild.id}`);
  if (!chx) return;
  if (oldMessage.author.bot) return;
  const EditLog = new Discord.MessageEmbed()
    .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL({ dynamic: true }))
    .setDescription("**Message edité dans :**", `${oldMessage.channel}`)
    .addField('**Avant **', oldMessage.content)
    .addField('**Après**', newMessage.content)
    .setColor(`${color || "BLACK"}`)
    .setThumbnail(oldMessage.author.displayAvatarURL)
  client.channels.cache.get(chx).send(EditLog)
});

/*client.on("voiceStateUpdate", (oldVoice, newVoice, message) => {
  //if(newVoice.channel.type === "dm") return;
  //if(newVoice.author.bot) return;
  let user = client.users.cache.get(oldVoice.id);
  let log = db.get(`voicechannel_${newVoice.guild.id}`);
  if (!log) return;
  let oldvoice = client.channels.cache.get(oldVoice.channelID);
  let newvoice = client.channels.cache.get(newVoice.channelID);

  if (newvoice, message) {
    const color = db.get(`color_${message.guild.id}`)
    let embed = new Discord.MessageEmbed()
      .setAuthor(user.username, user.avatarURL({ dynamic: true }))
      .setColor(`${color || "BLACK"}`)
      .setDescription(`${user} à rejoint le salon vocal : <#${newvoice.id}>`)
      .setTimestamp()
    client.channels.cache.get(log).send(embed)
  }
  if (oldvoice, message) {
    let embed = new Discord.MessageEmbed()
      .setAuthor(user.username, user.avatarURL({ dynamic: true }))
      .setColor(`${color || "BLACK"}`)
      .setDescription(`${user} à quitté le salon vocal : <#${oldvoice.id}>`)
      .setTimestamp()
    client.channels.cache.get(log).send(embed)
  }
});*/
client.on('voiceStateUpdate', (oldVoice, newVoice) => {
	let user = client.users.cache.get(oldVoice.id);
	let log = db.get(`voicechannel_${newVoice.guild.id}`);
	if (!log) return;
	let oldvoice = client.channels.cache.get(oldVoice.channelID);
	let newvoice = client.channels.cache.get(newVoice.channelID);

	if (newvoice) {
    const color = db.get(`color_${newvoice.guild.id}`)
		let embed = new Discord.MessageEmbed()
			.setAuthor(user.username, user.avatarURL({ dynamic: true }))
			.setColor(`${color || "BLACK"}`)
			.setDescription(`${user} à rejoint le salon vocal : <#${newvoice.id}>`)
			.setTimestamp();
		client.channels.cache.get(log).send(embed);
	}
	if (oldvoice) {
    const color = db.get(`color_${oldvoice.guild.id}`)
		let embed = new Discord.MessageEmbed()
			.setAuthor(user.username, user.avatarURL({ dynamic: true }))
			.setColor(`${color || "BLACK"}`)
			.setDescription(`${user} à quitté le salon vocal : <#${oldvoice.id}>`)
			.setTimestamp();
		client.channels.cache.get(log).send(embed);
	}
});
client.on(`message`, async message => {
  const color = db.get(`color_${message.guild.id}`)
  const antilink = db.get(`antilink_${message.guild.id}`)
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (antilink) {
    const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`, `http://`, `https://`, `https:`, `http:`, `https :`, `http :`]
    try {
      if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
        if (message.author.id === message.guild.ownerID) return;
        if (message.member.hasPermission("ADMINISTRATOR")) return;
        await message.delete();
        await message.author.send(`Vous ne pouvez pas mettre de lien dans ce serveur !`);
      }
    } catch (e) {
      console.log(e);
    }
  }
  if (!antilink) return;
});
const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api')

const youtube = new YouTube("AIzaSyCXpZ32KW0PSxbCQrhQYSzrLEi_Ri0KWqI")

const queue = new Map()

client.on("message", async message => {
  const color = db.get(`color_${message.guild.id}`)
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return

  const args = message.content.substring(prefix.length).split(" ")
  const searchString = args.slice(1).join(' ')
  const url = args[1] ? args[1].replace(/<(._)>/g, '$1') : ''
  const serverQueue = queue.get(message.guild.id)
  if(message.content.startsWith(`${prefix}join`)) {
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.channel.send(":x: Veuillez vous connecter à un canal vocal !")
    //if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(":x: Le bot est déjà connecté sur un canal vocal !")
  }
  if (message.content.startsWith(`${prefix}play`)) {
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.channel.send(":x: Veuillez vous connecter à un canal vocal !")
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.+)$/)) {
      const playlist = await youtube.getPlaylist(url)
      const videos = await playlist.getVideos()
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id)
        await handleVideo(video2, message, voiceChannel, true)
      }
      message.channel.send(`🔀 **|** Playlist **${playlist.title}** a été ajouté à la queue`)
      return undefined
    } else {
      try {
        var video = await youtube.getVideoByID(url)
      } catch {
        try {
          var videos = await youtube.searchVideos(searchString, 10)
          var index = 0
          let resp = `__**Selection de Musique**__\n${videos.map(video2 => `**${++index} -** ${video2.title}`).join("\n")}\n\nChoisisez un nombre entre \`1-10\``
          const embed = new Discord.MessageEmbed()
            .setDescription(resp)
            .setColor(`${color || "BLACK"}`)
          message.channel.send(embed)
          try {
            var responce = await message.channel.awaitMessages(msg => msg.content > 0 && msg.content < 11, {
              max: 1,
              time: 30000,
              errors: ["time"]
            })
          } catch {
            message.channel.send(":x: Non ou une selection de chanson invalide !")
          }
          const videoIndex = parseInt(responce.first().content)
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id)
        } catch {
          return message.channel.send(":x: Je n’ai pas pu trouver de résultats de recherche.")
        }
      }
      return handleVideo(video, message, voiceChannel)
    }

  } else if (message.content.startsWith(`${prefix}stop`)) {
    if (!message.member.voice.channel) return message.channel.send(":x: Veuillez vous connecter sur un canal vocal !")
    if (!message.guild.me.voice.channel) return message.channel.send(":x: Je ne suis pas connecté a un canal vocal sur ce serveur !")
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(":x: Veuillez vous connecté sur le même canal vocal que le bot !")
    if (!serverQueue) return message.channel.send(":x: Il n'y à rien qui joue.")
    serverQueue.songs = []
    serverQueue.connection.dispatcher.end()
    message.channel.send("▶ **|** J'ai stopper toute les musiques et j'ai quitté le canal vocal !")
    return undefined
  } else if (message.content.startsWith(`${prefix}skip`)) {
    if (!message.member.voice.channel) return message.channel.send(":x: Veuillez vous connecter sur un canal vocal !")
    if (!message.guild.me.voice.channel) return message.channel.send(":x: Je ne suis pas connecté a un canal vocal sur ce serveur !")
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(":x: Veuillez vous connecté sur le même canal vocal que le bot !")
    if (!serverQueue) return message.channel.send(":x: Il n'a pas de musique dans la queue.")
    serverQueue.connection.dispatcher.end()
    message.channel.send(`⏭️  **|**  Musique skip avec succès !`);
    return undefined
  } else if (message.content.startsWith(`${prefix}volume`)) {
    if (!message.member.voice.channel) return message.channel.send(":x: Veuillez vous connecter sur un canal vocal !")
    if (!message.guild.me.voice.channel) return message.channel.send(":x: Je ne suis pas connecté a un canal vocal sur ce serveur !")
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(":x: Veuillez vous connecté sur le même canal vocal que le bot !")
    if (!serverQueue) return message.channel.send(":x: Il n'a pas de musique dans la queue.")
    if (!args[1]) return message.channel.send(`⏫ **|** Le volume est de : **${serverQueue.volume}**`)
    if (isNaN(args[1])) return message.channel.send(":x: Veuillez mettre un nombre **valide**.")
    serverQueue.volume = args[1]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
    message.channel.send(`⏫ **|** Le volume du bot a été mis à : **${args[1]}**`)
    return undefined
  } else if (message.content.startsWith(`${prefix}np`)) {
    if (!serverQueue) return message.channel.send(":x: Il n'a pas de musique dans la queue.")
    message.channel.send(`🎶  **|**  En train de jouer : **\`${serverQueue.songs[0].title}\`**`)
    return undefined
  } else if (message.content.startsWith(`${prefix}queue`)) {
    if (!serverQueue) return message.channel.send(":x: Il n'a pas de musique dans la queue.")
    let resp = `🎶 __**Joue maintenent**__\n**${serverQueue.songs[0].title}**\n\n__**Queue**__\n`;

    for (var i = 1; i < serverQueue.songs.length; i++) {
      resp += `${i}. **${serverQueue.songs[i].title}**\n`;
    }
    const embed = new Discord.MessageEmbed()
      .setDescription(resp)
      .setColor(`${color || "BLACK"}`)
    message.channel.send(embed)
    return undefined
  } else if (message.content.startsWith(`${prefix}pause`)) {
    if (!message.member.voice.channel) return message.channel.send(":x: Veuillez vous connecter sur un canal vocal !")
    if (!message.guild.me.voice.channel) return message.channel.send(":x: Je ne suis pas connecté a un canal vocal sur ce serveur !")
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(":x: Veuillez vous connecté sur le même canal vocal que le bot !")
    if (!serverQueue) return message.channel.send(":x: Il n'a pas de musique dans la queue.")
    if (!serverQueue.playing) return message.channel.send("▶ **|** La musique est déjà mis en pause !")
    serverQueue.playing = false
    serverQueue.connection.dispatcher.pause()
    message.channel.send(`▶ **|** *${serverQueue.songs[0].title}* a été mis en pause avec succès !`)
    return undefined
  } else if (message.content.startsWith(`${prefix}resume`)) {
    if (!message.member.voice.channel) return message.channel.send(":x: Veuillez vous connecter sur un canal vocal !")
    if (!message.guild.me.voice.channel) return message.channel.send(":x: Je ne suis pas connecté a un canal vocal sur ce serveur !")
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(":x: Veuillez vous connecté sur le même canal vocal que le bot !")
    if (!serverQueue) return message.channel.send(":x: Il n'a pas de musique dans la queue.")
    if (serverQueue.playing) return message.channel.send("⏸ **|** La musique est déjà résumer !")
    serverQueue.playing = true
    serverQueue.connection.dispatcher.resume()
    message.channel.send(`⏸ **|** Je remet en marche la musique : *${serverQueue.songs[0].title}* !`)
    return undefined
  } else if (message.content.startsWith(`${prefix}loop`)) {
    if (!message.member.voice.channel) return message.channel.send(":x: Veuillez vous connecter sur un canal vocal !")
    if (!message.guild.me.voice.channel) return message.channel.send(":x: Je ne suis pas connecté a un canal vocal sur ce serveur !")
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(":x: Veuillez vous connecté sur le même canal vocal que le bot !")
    if (!serverQueue) return message.channel.send(":x: Il n'a pas de musique dans la queue.")

    serverQueue.loop = !serverQueue.loop

    return message.channel.send(`🔁 **|** J’ai maintenant ${serverQueue.loop ? `**Activé**` : `**Désactivé**`} le loop`)
    return undefined
  } else if (message.content === prefix + `remove`) {
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(":x: Veuillez vous connecté sur le même canal vocal que le bot !");
    if (!message.guild.me.voice.channel) return message.channel.send(":x: Je ne suis pas connecté a un canal vocal sur ce serveur !")
    if (!args[1]) return message.reply(":x: Veuillez dire la position de la musique que vous voulez supprimé !")
    var num = parseInt(args[1]);
    var msg = message;
    if (serverQueue) {
      if (!serverQueue) return message.reply(":x: Il n'a pas de musique dans la queue")
      if (num <= 0 || num > serverQueue.songs.length) return msg.channel.send(`:x: Il n'a pas de musique à la position : ${args[1]}`);
      var rmm = serverQueue.songs[num];
      serverQueue.songs.splice(num, 1);
      return msg.channel.send(`❌ **|** Vous avez remove **\`${rmm.title}\`** de la queue !`);
    }
    return msg.channel.send(":x: Il n'a pas de musique dans la queue");
    return undefined
  }
})

async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id)

  const song = {
    id: video.id,
    title: video.title,
    url: `http://www.youtube.com/watch?v=${video.id}`
  }

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
      loop: false
    }
    queue.set(message.guild.id, queueConstruct)

    queueConstruct.songs.push(song)

    try {
      var connection = await voiceChannel.join()
      queueConstruct.connection = connection
      play(message.guild, queueConstruct.songs[0])
    } catch (error) {
      queue.delete(message.guild.id)
      return message.channel.send(`Il y a eu une erreur de connexion au canal vocal : ${error}`)
    }
  } else {
    serverQueue.songs.push(song)
    if (playlist) return undefined
    else return message.channel.send(`**${song.title}** a été ajouté à la queue !`)
  }
  return undefined
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id)

  if (!song) {
    serverQueue.voiceChannel.leave()
    queue.delete(guild.id)
    return
  }

  const dispatcher = serverQueue.connection.play(ytdl(song.url))
    .on('finish', () => {
      if (!serverQueue.loop) serverQueue.songs.shift()
      play(guild, serverQueue.songs[0])
    })
    .on('error', error => {
      console.log(error)
    })
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
  serverQueue.textChannel.send(`🎶 __Joue maintenent__ : **${song.title}**`)
}

client.on("guildMemberAdd", (member) => {
    let role = db.get(`autoRole_${member.guild.id}`)
  if(!role) return;
  member.roles.add(member.guild.roles.cache.get(role))
})

client.on("guildMemberAdd", async (member) => {
  const color = db.get(`color_${member.guild.id}`)
  let chx = db.get(`joinchannel_${member.guild.id}`);
  if (!chx) return;

  /*const wembed = new Discord.MessageEmbed()
    .setAuthor(`${member.user.username}`, member.user.displayAvatarURL({ dynamic: true }))
    .setColor(`${color || "BLACK"}`)
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription(`Bienvenue à **${member.user.tag}** sur **${member.guild.name}** ! Tu est le **${member.guild.memberCount}** eme membres.`)
    .setTimestamp()
    .setFooter(`${member.user.tag} - (${member.user.id})`, member.user.displayAvatarURL({ dynamic: true }))
  client.channels.cache.get(chx).send(wembed)*/
    const welcomeCard = new canvacord.Welcomer()
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setAvatar(member.user.displayAvatarURL({format: "png"}))
  .setGuildName(member.guild.name)
  .setColor("title", "#68048a")
  .setColor("username-box", "#68048a")
  .setColor("message-box", "#68048a")
  .setColor("avatar", "#550dd1")
  .setBackground("https://cdn.discordapp.com/attachments/704736599669211187/893562606747533312/R.jpg")
  .setMemberCount(member.guild.memberCount)
  let attachment = new Discord.MessageAttachment(await welcomeCard.build(), "welcome.png")
  //client.channels.cache.get(chx).send(member.user.toString(), attachment)
  const wembed = new Discord.MessageEmbed()
  .setColor("PURPLE")
  .setAuthor(member.guild.name, member.guild.iconURL())
  .attachFiles(attachment)
  .setImage(`attachment://welcome.png`)
  .setTimestamp()
  .setFooter(`${member.user.tag} - (${member.user.id})`, member.user.displayAvatarURL({dynamic: true}))
  client.channels.cache.get(chx).send(member.user.toString(), wembed)
});
client.on("guildMemberRemove", async (member) => {
  const color = db.get(`color_${member.guild.id}`)
  let chx = db.get(`leavechannel_${member.guild.id}`);
  if (!chx) return;

  /*const gembed = new Discord.MessageEmbed()
    .setAuthor(`${member.user.username}`, member.user.displayAvatarURL({ dynamic: true }))
    .setColor(`${color || "BLACK"}`)
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription(`**${member.user.tag}** à quitté le serveur. Maintenent nous sommes **${member.guild.memberCount}** membres.`)
    .setTimestamp()
    .setFooter(`${member.user.tag} - (${member.user.id})`, member.user.displayAvatarURL({ dynamic: true }))
  client.channels.cache.get(chx).send(gembed)*/
  const welcomeCard = new canvacord.Leaver()
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setAvatar(member.user.displayAvatarURL({format: "png"}))
  .setGuildName(member.guild.name)
  .setColor("title", "#68048a")
  .setColor("username-box", "#68048a")
  .setColor("message-box", "#68048a")
  .setColor("avatar", "#550dd1")
  .setBackground("https://cdn.discordapp.com/attachments/704736599669211187/893562606747533312/R.jpg")
  .setMemberCount(member.guild.memberCount)
  let attachment = new Discord.MessageAttachment(await welcomeCard.build(), "welcome.png")
  //client.channels.cache.get(chx).send(member.user.toString(), attachment)
  const wembed = new Discord.MessageEmbed()
  .setColor("PURPLE")
  .setAuthor(member.guild.name, member.guild.iconURL())
  .attachFiles(attachment)
  .setImage(`attachment://welcome.png`)
  .setTimestamp()
  .setFooter(`${member.user.tag} - (${member.user.id})`, member.user.displayAvatarURL({dynamic: true}))
  client.channels.cache.get(chx).send(member.user.toString(), wembed)
});
if (!Array.isArray(db.get('giveaways'))) db.set('giveaways', []);
const { GiveawaysManager } = require('discord-giveaways');
const ms = require('ms')
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  async getAllGiveaways() {
    return db.get('giveaways');
  }
  async saveGiveaway(messageID, giveawayData) {
    db.push('giveaways', giveawayData);
    return true;
  }
  async editGiveaway(messageID, giveawayData) {
    const giveaways = db.get('giveaways');
    const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
    newGiveawaysArray.push(giveawayData);
    db.set('giveaways', newGiveawaysArray);
    return true;
  }
  async deleteGiveaway(messageID) {
    const giveaways = db.get('giveaways');
    const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
    db.set('giveaways', newGiveawaysArray);
    return true;
  }
};

client.on('message', (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'giveaway') {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Vous n'avez pas la permission !")
    if (!args[0]) return message.channel.send(":x: Veuillez mettre le temps")
    if (!args[1]) return message.channel.send(":x: Veuillez mettre le nombre de winner(s)")
    if (!args.slice(2).join(" ")) return message.channel.send(":x: Veuillez mettre le prix")
    client.giveawaysManager.start(message.channel, {
      time: ms(args[0]),
      winnerCount: parseInt(args[1]),
      prize: args.slice(2).join(' ')
    }).then((gData) => {
    });
  }
});
const manager = new GiveawayManagerWithOwnDatabase(client, {
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    exemptPermissions: [],
    embedColor: 'BLACK',
    embedColorEnd: '#000000',
    reaction: '🎉'
  }
});
client.giveawaysManager = manager;
/*client.on("message", message => {
  const soutiens = db.get(`soutiens_${message.guild.id}`)
  if (soutiens) {
    const activities = [];
    let role = "816049595325874197"
    let customStatus;
    const member = message.author;
    for (const activity of member.presence.activities.values()) {
      switch (activity.type) {
        /*case 'PLAYING':
          activities.push(`Playing **${activity.name}**`);
          break;
        case 'CUSTOM_STATUS':
          customStatus = activity.state;
          if (customStatus === "discord.gg/rbxfr") {
            message.member.roles.add(role)
          }
          if (customStatus !== "discord.gg/rbxfr") {
            message.member.roles.remove(role)
          }
          if (!customStatus) {
            message.member.roles.remove(role)
          }
      }
    }
  }
})*/
client.on("guildCreate", guild => {
  const embed = new Discord.MessageEmbed()
  .setTitle(":tada: **|** Je viens d'être ajouté dans un nouveau serveur !")
  .setColor("GREEN")
  .setDescription(`Je viens d'être ajouté dans le serveur **${guild.name}** qui comporte ${guild.memberCount} membres \n\nJe suis maintenant à ${client.guilds.cache.size} serveurs avec ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} membres`)
  .setTimestamp()
  const logChannel = client.channels.cache.get("877578027964461067")
  logChannel.send(embed)
})
client.on("guildDelete", guild => {
  const embed = new Discord.MessageEmbed()
  .setTitle(":disappointed_relieved: **|** Je viens d'être retiré dans un nouveau serveur !")
  .setColor("RED")
  .setDescription(`Je viens d'être retiré dans le serveur **${guild.name}** qui comporte ${guild.memberCount} membres \n\nJe suis maintenant à ${client.guilds.cache.size} serveur avec ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} membres`)
  .setTimestamp()
  const logChannel = client.channels.cache.get("877578048038371398")
  logChannel.send(embed)
})

const { AutoPoster } = require('topgg-autoposter')

const poster = AutoPoster("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NzE3NzYwMDMwNzUxMTM4NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI5NzI0NjQ3fQ.z28FIlNSrls5Ptg2gVRE3QGNIW3-r4Lfd4qJGAt3kOo", client)

poster.on("posted", (stats) => {
  console.log(`Posted stats top top.gg | ${stats.serverCount} servers`)
})

const voiceCollection = new Discord.Collection();
client.on("voiceStateUpdate", async(oldState, newState) => {
  const user = await client.users.fetch(newState.id);
  const member = newState.guild.member(user)

  if(!oldState.channel && newState.channel.id === "879362454205923348") {
    const channel = await newState.guild.channels.create(user.tag, {
      type: "voice",
      parent: newState.channel.parent,
    });
    member.voice.setChannel(channel)
    voiceCollection.set(user.id, channel.id);
    channel.createOverwrite(user, {
      MANAGE_CHANNELS: true
    })
  } else if (!newState.channel) {
    if(oldState.channelID === voiceCollection.get(newState.id))
    return oldState.channel.delete();
  }
})

client.on("guildUpdate", async (oldGuild, newGuild) => {
  if(!newGuild.id !== "751398500893458523") return;
  else {
    if(oldGuild.vanityURLCode === newGuild.vanityURLCode) return;

    if (!oldGuild.me.permissions.has("VIEW_AUDIT_LOG")) return;
    const fetchGuildAuditLogs = await oldGuild.fetchAuditLogs({
        limit: 1,
        type: 'GUILD_UPDATE'
    })
    const vanityurlmodifier = fetchGuildAuditLogs.entries.first();
    const { executor } = vanityurlmodifier;
            await fetch(`https://discord.com/api/v8/guilds/${newGuild.id}/vanity-url`, {
                    "credentials": "include",
                    "headers": {
                        "accept": "*/*",
                        "authorization": "Bot " + config.token,
                        "content-type": "application/json",
                    },
                    "referrerPolicy": "no-referrer-when-downgrade",
                    "body": JSON.stringify({
                        "code": oldGuild.vanityURLCode
                    }),
                    "method": "PATCH",
                    "mode": "cors"
                });
            await executor.kick("modification de l'url non autorisée")
            oldGuild.ownerID.send("Tentative de modification de l'url non autorisée !")
  }
})*

/*const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 10, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 11, // Amount of messages sent in a row that will cause a mute
	kickThreshold: 12, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 13, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 3000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, veuillez arrêtez de spammer.', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** à été kick pour spam.', // Message that will be sent in chat upon kicking a user.
	muteMessage: '**{user_tag}** à été mute pour spam.',// Message that will be sent in chat upon muting a user.
	banMessage: '**{user_tag}** à été ban pour spam.', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 6, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
	ignoredPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredMembers: [], // Array of User IDs that get ignored.
	muteRoleName: "Muted", // Name of the role that will be given to muted users!
	removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
	// And many more options... See the documentation.
});

client.on('message', message => {
  let anti = db.get(`antispam_${message.guild.id}`)
  if(!anti) return;
  if(anti) {
    antiSpam.message(message)
  }
});*/

client.on("message", async message => {
    xp(message)
    if(message.content === prefix + "rank") {
      const color = db.get(`color_${message.guild.id}`)
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        var user = message.mentions.users.first() || message.author;
        var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 1;
        var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
        var xpNeeded = level * 115 + 100
          let every = db.fetchAll().filter(i => i.ID.startsWith(`guild_${message.guild.id}_level_`)).sort((a, b) => b.data - a.data);
          let rank1 = every.map(x => x.ID).indexOf(`guild_${message.guild.id}_level_${user.id}`) + 1;
            /*const embedlvl = new Discord.RichEmbed()
            .setTitle(`${user.username} level`)
            //.addField("**RANK :**", `${rank1}`, true)
            .addField(`**LEVEL :**`, `${level}`, true)
            .addField(`**XP :**`,`${currentxp}/${xpNeeded}`,false)
            .setColor("RANDOM")
            .setThumbnail(user.displayAvatarURL)
            message.channel.send(embedlvl)*/
            const img = message.author.displayAvatarURL({ dynamic: false, format: "png" })
            const rank = new canvacord.Rank()
            .setAvatar(img)
            //.setRank(rank1)
            .setRank(1, 'RANK', false)
            .setCurrentXP(currentxp)
            .setRequiredXP(xpNeeded)
            .setLevel(level)
            .setStatus(message.member.presence.status)
            .setProgressBar(`${color || "black"}`, "COLOR")
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator);

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
    });
    }
});

function xp(message) {
            if(message.author.bot) return;
            if(message.channel.type === "dm") return;
            const chx = db.get(`levelchannel_${message.guild.id}`)
            const randomNumber = Math.floor(Math.random() * 1) + 3;
            db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
            db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
            var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
            var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
            var xpNeeded = level * 100;
            if(xpNeeded < xp) {
                var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
                db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
                if(!chx) {
                    message.channel.send(`🎉 Bravo **${message.author}**, tu as levelup ! Tu est maintenent level **${newLevel}**`) 
                } else {
                    client.channels.cache.get(chx).send(`🎉 Bravo **${message.author}**, tu as levelup ! Tu est maintenent level **${newLevel}**`)
                }
            }
}
client.on("guildMemberAdd", async (member) => {
  const role = db.get(`membermuted_${member.guild.id}_${member.user.id}`)
  if(!role) return;
  member.roles.add(member.guild.roles.cache.get(role))
  member.send("Désoler, vous avez été mute même si vous quitté le serveur, vous serez toujours mute <3")
})
client.on("guildMemberAdd", async (member) => {
  const role = db.get(`membertempmuted_${member.guild.id}_${member.id}`)
  if(!role) return;
  member.roles.add(member.guild.roles.cache.get(role))
  member.send("Désoler, vous avez été mute même si vous quitté le serveur, vous serez toujours mute <3")
})
client.on("ready", () => {
  client.api.applications(client.user.id).guilds("926269474422796300").commands.post({
    data: {
      name: "help",
      description: "Permet de voir la page d'aide.",

      options: [
        {
          name: "content",
          description: "Permet de voir la page d'aide.",
          type: 3,
          required: true
        }
      ]
    }
  });
  client.ws.on("INTERACTION_CREATE", async interaction => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    if(command == 'help') {
     /* client.api.interactions(interaction.id, interaction.token).callback.post({
         data: {
           type: 4,
           data: {
             content: "Testing"
           }
         }
       });*/
      const description = args.find(arg => arg.name.toLowerCase() == "content").value
      const embed = new Discord.MessageEmbed()
        .setTitle("title")
        .setDescription(description)
      .setAuthor(interaction.member.user.username)
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, embed)
        }
      })
    }
  })
})

    async function createAPIMessage(interaction, content) {
      const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
    .resolveData()
      .resolveFiles()

      return apiMessage
      //return (apiMessage.data, files: apiMessage.files)
    }
/*client.on('presenceUpdate', async (oldPresence, newPresence) => { 
  //if(!newPresence.guild.id === "815919981854064670") return;
  const role = db.get(`soutiens_${newPresence.guild.id}`)  
  //const role = newPresence.guild.roles.cache.get("951123092967673947");
    const member = newPresence.member
    const activities = member.user.presence.activities[0];
  
    if (activities &&  activities.state && (activities.state.includes( "discord.gg/rbxfr" ) || activities.state.includes(".gg/rbxfr" ))) {
        return newPresence.member.roles.add(newPresence.guild.roles.cache.get(role))
        .catch(err => {
        console.log(err)
        return;
        })
  
      }
    else {
      if(member.roles.cache.get(newPresence.guild.roles.cache.get(role))) {
        newPresence.member.roles.remove(role)
     }
    }
})*/
client.login(config.token)

/*client.on('message', async (message) => {

    client.settings.ensure(message.guild.id, {
        guildID: message.guild.id,
        prefix: "!"
    }); //You can add to this enmap. Such as more settings!

    const fetchedPrefix = client.settings.get(message.guild.id, "prefix");

    const prefix = fetchedPrefix || config.prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const color = db.get(`color_${message.guild.id}`)

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (cmd === "prefix") {
        const curPrefix = client.settings.get(message.guild.id);

        const newPrefix = args[0];
        if (!newPrefix) return message.channel.send(`**Current Prefix: \`${curPrefix.prefix || config.prefix}\`**\nYou will need to specify a new prefix if you want to change it.`);

        if (newPrefix === curPrefix.prefix) return message.channel.send(`The bot's prefix is already set as that!`);

        client.settings.set(message.guild.id, newPrefix, "prefix");
        const prefixEmbed = new MessageEmbed()
            .setTitle(`**Bot Prefix**`)
            .setColor(`${color || "BLACK"}`)
            .setDescription(stripIndents`
            Successfully set the prefix as: **\`${newPrefix}\`**
            `)

        return message.channel.send(prefixEmbed);
    };

    if (cmd === "ping") {
        const msg = await message.channel.send(`🏓 Pinging....`);
        msg.edit(`🏓 Pong!\nThe Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`);
    };

});*/ 