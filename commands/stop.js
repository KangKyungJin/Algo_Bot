const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, algoProblem, servers, argo) => {
    var server =servers[message.guild.id];
            if(message.guild.voiceConnection){
                for (var i =server.queue.length-1; i >= 0;i--){
                    server.queue.splice(i,1);
                }
                server.dispatcher.end();
                message.channel.send("ending the queue leaving the chanel!")
                console.log('stops th queue')
            }
            if(message.guild.connection) message.guild.voiceConnection.disconnect(); 
};

module.exports.help = {
    name: "stop"
};