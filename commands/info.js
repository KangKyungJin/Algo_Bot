const Discord = require("discord.js");

module.exports.run = async (bot, message, args, algoProblem, server, ago) => {
    return message.channel.send(
        "Hello, I'm Algo_Bot \n" +
        "Commands: \n" +
        "!info - command list \n" +
        "!algos - gives a random algorithm \n" +
        "!play - plays the mp3 from a Youtube URL \n" +
        "!skip - skips the current song \n" +
        "!stop - stops the currently playing song and disconnects the bot \n" +
        "!clear {{num}} - clears 'num' amounts of previous messages \n" +
        "!embed - shows your info"
    );
};

module.exports.help = {
    name: "info"
};