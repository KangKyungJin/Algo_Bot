const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, algoProblem, servers, argo) => {
    var server =servers[message.guild.id];
    if(server.dispatcher) server.dispatcher.end();
    message.channel.send("skipping the song!")
};

module.exports.help = {
    name: "skip"
};