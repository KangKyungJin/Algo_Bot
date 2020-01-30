const Discord = require('discord.js');
const config = require('./config.json');
const fetch = require('node-fetch');
const fs = require('fs');

// Initialize Discord Bot
const bot = new Discord.Client({disableEveryone: true});
bot.login(config.token);

var algoProblem;

//initiallizes bot and fetches api data
bot.on('ready', async () => {
    console.log(`${bot.user.username} is connected!`);
    bot.user.setActivity("Storming the DunderDome");
    fetch("http://18.223.166.150/api/algos")
        .then(res => res.json())
            .then(data => {
                algoProblem = data.results;
            })
});

// load commands
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js")

    if (jsfiles.length <= 0) {
        console.log("There are no commands");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands...`)
    jsfiles.forEach(f => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    })
});

//bot commands
bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) {
        cmd.run(bot, message, args, algoProblem);
    }
});