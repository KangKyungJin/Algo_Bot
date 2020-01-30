const Discord = require('discord.js');
const auth = require('./auth.json');
const {
	prefix,
	token,
} = require('./auth.json');
const fetch = require('node-fetch');

// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(auth.token)

var algoProblem;

//initiallizes bot and fetches api data
bot.on('ready', () => {
    console.log("Connected");
    fetch("http://18.223.166.150/api/algos")
        .then(res => res.json())
            .then(data => {
                algoProblem = data.results;
            })
});

//bot commands
bot.on('message', async message => {
    if (message.author.bot) return;
    //command for returning random algos
    if (message.content === `!algo`) {
        let num = Math.floor(Math.random() * Math.floor(algoProblem.length))
        message.channel.send("Difficulty: " + algoProblem[num].difficulty +  "\n Algorithm: " + algoProblem[num].algorithm)
    }
});

bot.login(token)
