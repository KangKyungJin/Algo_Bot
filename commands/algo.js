const Discord = require("discord.js");

module.exports.run = async (bot, message, args, algoProblem, server, argo) => {
    let num = Math.floor(Math.random() * algoProblem.length-1);
    return message.channel.send("Difficulty: " + algoProblem[num].difficulty +  "\n Algorithm: " + algoProblem[num].algorithm);
};

module.exports.help = {
    name: "algos"
};