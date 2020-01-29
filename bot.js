var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const fetch = require('node-fetch');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
var algoProblem;
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    fetch("https://leetcode.com/api/problems/algorithms/")
        .then(res => res.json())
            .then(data => {
                algoProblem = data.stat_status_pairs[0].stat;
                console.log(algoProblem);
            })
        .catch(err => console.log("Error in grabbing data"))
    
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'practice':
                bot.sendMessage({
                    to: channelID,
                    message: algoProblem.question__title
                });
                console.log(algoProblem.question_id)
            break;
            // Just add any case commands if you want to..
         }
     }
});