const Discord = require("discord.js");

module.exports.run = async (bot, message, args, algoProblem) => {
    return message.channel.send(
        "Hello, I'm Algo_Bot \n" +
        "Commands: \n" +
        "!info - command list \n" +
        "!algos - gives a random algorithm"
    );
};

module.exports.help = {
    name: "info"
};