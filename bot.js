const Discord = require('discord.js');
const auth = require('./auth.json');
const {
	prefix,
	token,
} = require('./auth.json');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const ffmpeg = require('ffmpeg')


// mongoose.connect("mongodb://localhost/Algo_Bot_algosAPI");

// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(auth.token)

var algoProblem;
const queue = new Map();

bot.on('ready', () => {
    console.log("Connected");
    fetch("http://18.223.166.150/api/algos")
        .then(res => res.json())
            .then(data => {
                algoProblem = data.results;
            })
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.content === '!ping') {
        message.channel.send("pong");
    }
    if (message.content.startsWith === `${prefix}algo`) {
        let num = Math.floor(Math.random() * Math.floor(algoProblem.length))
        message.channel.send("Difficulty: " + algoProblem[num].difficulty +  "\n Algorithm: " + algoProblem[num].algorithm)
    }
});

bot.login(token)
