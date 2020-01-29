const Discord = require('discord.js');
const auth = require('./auth.json');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/Algo_Bot_algosAPI");

// Initialize Discord Bot
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log("Connected");
});

bot.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send("pong");
    }
});

bot.login(auth.token)

// fetch("https://leetcode.com/api/problems/algorithms/")
//         .then(res => res.json())
//             .then(data => {
//                 algoProblem = data.stat_status_pairs[0].stat;
//                 console.log(algoProblem);
//             })
//         .catch(err => console.log("Error in grabbing data"))
