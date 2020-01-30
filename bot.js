const Discord = require('discord.js');
const config = require('./config.json');
const fetch = require('node-fetch');

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

//bot commands
bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    // command for bot info
    if (cmd === `${prefix}info`) {
        return message.channel.send(
            "Hello, I'm Algo_Bot \n" +
            "Commands: \n" +
            "!info - command list \n" +
            "!algo - gives a random algorithm"

        );
    }
    // command for returning random algos
    if (cmd === `${prefix}algo`) {
        let num = Math.floor(Math.random() * algoProblem.length-1);
        return message.channel.send("Difficulty: " + algoProblem[num].difficulty +  "\n Algorithm: " + algoProblem[num].algorithm);
    }
});