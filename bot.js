const Discord = require('discord.js');
const auth = require('./auth.json');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const ffmpeg = require('ffmpeg')
// mongoose.connect("mongodb://localhost/Algo_Bot_algosAPI");

// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(auth.token)

var algoProblem;
bot.on('ready', () => {
    console.log("Connected");
    fetch("http://18.223.166.150/api/algos")
        .then(res => res.json())
            .then(data => {
                algoProblem = data.results;
                console.log(algoProblem[0]);
            })
});

bot.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send("pong");
    }
    if (message.content === '!algo') {
        message.channel.send("Difficulty: " + algoProblem[0].difficulty +  "\n Algorithm: " + algoProblem[0].algorithm)
    }
});



// fetch("https://leetcode.com/api/problems/algorithms/")
//         .then(res => res.json())
//             .then(data => {
//                 algoProblem = data.stat_status_pairs[0].stat;
//                 console.log(algoProblem);
//             })
//         .catch(err => console.log("Error in grabbing data"))
